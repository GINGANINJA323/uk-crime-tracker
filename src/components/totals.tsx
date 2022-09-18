import React from 'react';
import styled from 'styled-components';
import { crimeCategoryMap } from '../utils';

interface TotalsProps {
  totals: { [key: string]: number };
};

interface TableRowProps {
  index: number;
};

const TableHead = styled.td`
  font-weight: bold;
`

const TotalsContainer = styled.div`
  display: flex;
  padding: 10px 20%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TotalsTable = styled.table`
  margin: 0 20%;
  border-collapse: collapse;
`;

const TableRow = styled.tr<TableRowProps>`
  background: ${props => props.index % 2 === 0 ? '#3a3a3a' : '#535353'};
`;

const TotalsDisplay = (props: TotalsProps): JSX.Element => {
  const { totals } = props;

  return (
    <TotalsContainer>
      <h2>{'Total crimes by category:'}</h2>
      <TotalsTable>
        <TableRow index={0}>
          <TableHead>{'Category'}</TableHead>
          <TableHead>{'Total'}</TableHead>
        </TableRow>
        {
          Object.keys(totals).map((t, i) => 
            <TableRow index={i+1}>
              <td>
                <p>{`${crimeCategoryMap[t]}:`}</p>
              </td>
              <td>
                <p>{`${totals[t]}`}</p>
              </td>
            </TableRow>
          )
        }
      </TotalsTable>
    </TotalsContainer>
  );
};

export default TotalsDisplay;