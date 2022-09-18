import React from 'react';
import styled from 'styled-components';

import type { Crime } from './types';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const App = (): JSX.Element => {
  const [location, setLocation] = React.useState<string>('');
  const [crimes, setCrimes] = React.useState<Crime[]>();
  const [error, setError] = React.useState<string>();

  const crimeCategoryMap: { [key: string]: string } = {
    'drugs': 'Drug Related',
    'other-theft': 'Theft',
    'bicycle-theft': 'Bicycle Theft',
    'criminal-damage-arson': 'Arson',
    'burglary': 'Burglary',
    'anti-social-behaviour': 'Anti-social Behaviour',
    'possession-of-weapons': 'Weapon Possession',
    'public-order': 'Public Order',
    'robbery': 'Robbery',
    'shoplifting': 'Shoplifting',
    'theft-from-the-person': 'Personal Theft/Mugging',
    'vehicle-crime': 'Vehicle Crime',
    'violent-crime': 'Violent Crime',
    'other-crime': 'Other'
  };

  const getCrimesForLocation = async(): Promise<void> => {
    // first, geocode user query to coord
    const geoResponse = await fetch(encodeURI(`https://nominatim.openstreetmap.org/search?country=United Kingdom&q=${location}&format=json`));

    if (!geoResponse.ok) {
      console.log('failed to geocode user location: ', geoResponse.status);
      setError('Geocoding failed. Did you enter a valid location?');
      return;
    }

    const geoData = await geoResponse.json();
    const geoLoc = geoData[0];

    // get the crimes for the entered location

    const response = await fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${geoLoc.lat}&lng=${geoLoc.lon}`);

    if (!response.ok) {
      console.log('Request failed');
      setError('Failed to retrieve crimes for area. Did you enter a valid location?');
      return;
    }

    const data = await response.json();
    setCrimes(data);
  }

  console.log('Crimes: ', crimes);

  return (
    <Main>
      <h1>{'UK Police Crime Tracker'}</h1>
      <p>{'This tool can be used to see recent and historic crimes near to you, from the UK\'s Crime API.'}</p>
      <input value={location} placeholder='Enter your location' onChange={(e) => setLocation(e.target.value)}></input>
      <button onClick={getCrimesForLocation}>{'Search'}</button>
      {
        crimes && crimes.length ?
        <>
          <h2>{'Crimes in your area:'}</h2>
          {
            crimes.map(c => (
              <>
                <h3>{`Crime: ${crimeCategoryMap[c.category]}`}</h3>
                <p>{`Location: ${c.location.street.name}`}</p>
                <p>{`Date (YYYY-MM): ${c.month}`}</p>
              </>
            ))
          }
        </> :
        null
      }
    </Main>
  );
}

export default App;