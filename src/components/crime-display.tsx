import React from 'react';
import styled from 'styled-components';
import { crimeCategoryMap, crimeOutcomesMap } from '../utils';

import type { Crime } from '../types';

interface CrimeProps {
  crime: Crime
};

const CrimeDisplayContainer = styled.div`
  background: #4A4A4A;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
`;

const CrimeDisplay = (props: CrimeProps): JSX.Element => {
  const { crime } = props;

  return(
    <CrimeDisplayContainer>
      <h3>{`Crime: ${crimeCategoryMap[crime.category]}`}</h3>
      <h3>{`Outcome: ${crime.outcome_status?.category ? crimeOutcomesMap[crime.outcome_status?.category] : 'Unknown'}`}</h3>
      <p>{`Location: ${crime.location.street.name}`}</p>
      <p>{`Date (YYYY-MM): ${crime.month}`}</p>
    </CrimeDisplayContainer>
  );
};

export default CrimeDisplay;