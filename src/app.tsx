import React from 'react';
import styled from 'styled-components';
import CrimesDisplay from './components/crimes-display';
import { crimeCategoryMap } from './utils';
import { Button, Error, Input } from './components/elements';

import type { Crime, GeoLocation, Totals } from './types';
import Link from './components/link';

const Main = styled.div`
  color: #FFF;
  background: #202020;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  row-gap: 10px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px 20%;
  background: #3a3a3a;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ControlsContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;

const App = (): JSX.Element => {
  const [location, setLocation] = React.useState<string>('');
  const [geoLoc, setGeoLoc] = React.useState<GeoLocation>();
  const [crimes, setCrimes] = React.useState<Crime[]>();
  const [error, setError] = React.useState<string>();
  const [totals, setTotals] = React.useState<Totals>();

  const getCrimeTotals = (crimes: Crime[]): void => {
    const initialMap: Totals = Object.keys(crimeCategoryMap).reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}); // format
    crimes.forEach((c) => initialMap[c.category] = initialMap[c.category]+=1);
    initialMap['total'] = crimes.length;
    setTotals(initialMap);
  }

  const getCrimesForLocation = async(): Promise<void> => {
    // first, geocode user query to coord
    const geoResponse = await fetch(encodeURI(`https://nominatim.openstreetmap.org/search?country=United Kingdom&q=${location}&format=json`));

    if (!geoResponse.ok) {
      console.log('failed to geocode user location: ', geoResponse.status);
      setError('Geocoding failed. Did you enter a valid location?');
      return;
    }

    const geoData = await geoResponse.json();
    const geoLocation = geoData[0];
    
    if (!geoLocation) {
      console.log(`search term ${location} returned no results`);
      setError('Search term returned no results. Make sure you\'ve entered a valid location.');
      return;
    }
    
    setGeoLoc(geoLocation);
    // get the crimes for the entered location

    const response = await fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${geoLocation.lat}&lng=${geoLocation.lon}`);

    if (!response.ok) {
      console.log('Request failed');
      setError('Failed to retrieve crimes for area. Did you enter a valid location?');
      return;
    }

    const data = await response.json();
    getCrimeTotals(data);
    setError('');
    setCrimes(data);
  }

  const searchOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getCrimesForLocation();
    }
  }

  return (
    <Main>
      <Header>
        <h1>{'UK Police Crime Tracker'}</h1>
        <p>{'This tool can be used to see recent and historic crimes near to you, from the UK\'s Police Crime API.'}</p>
        <p>{'Crime data courtesy of '}<Link url={'https://data.police.uk/'}>{'UK Police'}</Link>{' and geolocation courtesy of '}<Link url={'https://nominatim.org/release-docs/latest/'}>{'Nominatim and OSM'}</Link>{'.'}</p>
        <p>{'Please Note: Scottish crime data is provided only by the British Transport Police (BTP) and may not be representative of actual crime levels.'}</p>
        <ControlsContainer>
          <Input onKeyPress={(e) => searchOnEnter(e)} value={location} placeholder='Enter your location' onChange={(e) => setLocation(e.target.value)}></Input>
          <Button onClick={getCrimesForLocation}>{'Search'}</Button>
        </ControlsContainer>
      </Header>
      {
        crimes && crimes.length && totals && geoLoc ?
          <CrimesDisplay geoLoc={geoLoc} totals={totals} crimes={crimes} /> : null
      }
      {
        error ?
          <Error>{error}</Error> : null
      }
    </Main>
  );
}

export default App;