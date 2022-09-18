import React from 'react';
import styled from 'styled-components';
import { crimeCategoryMap } from './utils';

interface TotalsProps {
  totals: { [key: string]: number };
}

const TotalsContainer = styled.div``;
const Total = styled.div``;

const TotalsDisplay = (props: TotalsProps): JSX.Element => {
  const { totals } = props;

  return (
    <TotalsContainer>
      <h2>{'Total crimes by category:'}</h2>
      {
        Object.keys(totals).map(t => 
          <Total>
            <p>{`${crimeCategoryMap[t]}: ${totals[t]}`}</p>
          </Total>
        )
      }
    </TotalsContainer>
  );
};

export default TotalsDisplay;