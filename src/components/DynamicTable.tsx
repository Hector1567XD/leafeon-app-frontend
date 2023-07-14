import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  styled,
} from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';

const DynamicTable: FunctionComponent<Props<any>> =({ headers, rows, settings, components, className, renderColumnClass, emptyState }) => {
  return (
    <TableContainer component={Paper} className={className}>
      <Table aria-label="dynamic table">
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
          {
            rows.map((row, indexRow) => 
            {
                const rowClassName = renderColumnClass?.(row, indexRow) || '';
                return (
                  <TableRow
                    className={rowClassName}
                    key={`row-${indexRow}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {headers.map(({ fieldName, cellAlignment, ...header }, index) => (
                      <TableCell align={cellAlignment || 'left'} key={`${index}-${fieldName}`}>
                        {fieldName && row[fieldName]}
                        {header.onRender && header.onRender(row, indexRow)}
                      </TableCell>
                    ))}
                    {
                      components && (
                        <TableCell align={settings?.cellAlignment || 'right'}>
                          {
                            components.map((renderComponent, index) => renderComponent(row, indexRow))
                          }
                        </TableCell>
                      )
                    }
                  </TableRow>
                );
              }
            )
          }
          <TableRow>
            <TableCell colSpan={headers.length + (components ? 1 : 0)}>
              {
                  emptyState && rows.length <= 0 ? (emptyState) : ''
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type RowItem = Record<string, any>;
type SettingComponent<T, R> = (rowItem: T, index: number) => R;

interface Props<T> {
  className?: string;
  headers: Header<T>[];
  rows: RowItem[];
  settings?: Settings;
  components?: SettingComponent<T, ReactNode | string>[];
  renderColumnClass?: SettingComponent<T, string>;
  emptyState?: ReactNode | string;
}

export interface Settings {
  cellAlignment?: 'left' | 'center' | 'right';
}

export interface Header<T> {
  columnLabel: string;
  fieldName?: string;
  cellAlignment?: 'left' | 'center' | 'right';
  onRender?: SettingComponent<T, ReactNode | string>;
}

export default styled(DynamicTable)``;
