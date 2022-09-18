import React from 'react';
import styled from 'styled-components';
import TotalsDisplay from './totals';
import { crimeCategoryMap, crimeOutcomesMap } from './utils';

import type { Crime, GeoLocation, Totals } from './types';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  return (
    <Main>
      <h1>{'UK Police Crime Tracker'}</h1>
      <p>{'This tool can be used to see recent and historic crimes near to you, from the UK\'s Crime API.'}</p>
      <input value={location} placeholder='Enter your location' onChange={(e) => setLocation(e.target.value)}></input>
      <button onClick={getCrimesForLocation}>{'Search'}</button>
      {
        crimes && crimes.length && totals ?
        <>
          <h2>{`Crimes for ${geoLoc?.display_name || 'location'}:`}</h2>
          <TotalsDisplay totals={totals} />
          {
            crimes.map(c => (
              <>
                <h3>{`Crime: ${crimeCategoryMap[c.category]}`}</h3>
                <h3>{`Outcome: ${c.outcome_status?.category ? crimeOutcomesMap[c.outcome_status?.category] : 'Unknown'}`}</h3>
                <p>{`Location: ${c.location.street.name}`}</p>
                <p>{`Date (YYYY-MM): ${c.month}`}</p>
              </>
            ))
          }
        </> : null
      }
      {
        error ?
          <h2>{error}</h2> : null
      }
    </Main>
  );
}

export default App;