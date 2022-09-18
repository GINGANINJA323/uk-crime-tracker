import React from 'react';
import TotalsDisplay from './totals';
import { crimeCategoryMap, crimeOutcomesMap } from '../utils';

import type { Crime, GeoLocation, Totals } from '../types';

interface CrimesDisplayProps {
  crimes: Crime[];
  geoLoc: GeoLocation;
  totals: Totals;
}

const CrimesDisplay = (props: CrimesDisplayProps): JSX.Element => {
  const { crimes, geoLoc, totals } = props;
  return (
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
    </>
  );
}

export default CrimesDisplay;