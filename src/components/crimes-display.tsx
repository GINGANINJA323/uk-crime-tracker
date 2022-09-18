import React from 'react';
import styled from 'styled-components';
import TotalsDisplay from './totals';
import CrimeDisplay from './crime-display';

import type { Crime, GeoLocation, Totals } from '../types';

interface CrimesDisplayProps {
  crimes: Crime[];
  geoLoc: GeoLocation;
  totals: Totals;
}

const CrimesDisplayContainer = styled.div`
  margin-top: 10px;
  background: #3a3a3a;
  border-radius: 10px;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
`;

const CrimeContainer = styled.div`
  width: 100%;
`;

const CrimesDisplay = (props: CrimesDisplayProps): JSX.Element => {
  const { crimes, geoLoc, totals } = props;
  return (
    <CrimesDisplayContainer>
      <h2>{`Crimes for ${geoLoc?.display_name || 'location'}:`}</h2>
      <TotalsDisplay totals={totals} />
      <CrimeContainer>
        {
          crimes.map(c => (
            <CrimeDisplay crime={c} />
          ))
        }
      </CrimeContainer>
    </CrimesDisplayContainer>
  );
}

export default CrimesDisplay;