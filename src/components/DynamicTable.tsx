import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
} from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';

const DynamicTable: FunctionComponent<Props<any>> =({ headers, rows, settings, components }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
        <TableHead>
          <TableRow>
            {headers.map(({columnLabel, cellAlignment}, index) => (
              <TableCell align={cellAlignment || 'left'} key={columnLabel}>
                {columnLabel}
              </TableCell>
            ))}
            {components && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {headers.map(({fieldName, cellAlignment}, index) => (
                <TableCell align={cellAlignment || 'left'} key={`${row.id}-${fieldName}`}>
                  {row[fieldName]}
                </TableCell>
              ))}
              {
                components && (
                  <TableCell align={settings?.cellAlignment || 'right'}>
                    {
                      components.map((renderComponent) => renderComponent(row))
                    }
                  </TableCell>
                )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type RowItem = Record<string, any>;
type SettingComponent<T> = (rowItem: T) => ReactNode;

interface Props<T> {
  headers: Header[];
  rows: RowItem[];
  settings?: Settings;
  components?: SettingComponent<T>[];
}

export interface Settings {
  cellAlignment?: 'left' | 'center' | 'right';
}

export interface Header {
  columnLabel: string;
  fieldName: string;
  cellAlignment?: 'left' | 'center' | 'right';
}

export default DynamicTable;
