import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
};

type Props = {
  items: InvoiceItem[];
  discountPercentage: number | null;
};

const InvoiceTable: React.FC<Props> = ({ items, discountPercentage }) => {
  const subtotal = items.reduce((total, item) => total + item.quantity * item.price, 0);
  const discount = (discountPercentage !== null) ? subtotal * (discountPercentage / 100) : 0;
  const total = subtotal - discount;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.description}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">${item.price.toFixed(2)}</TableCell>
              <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          {
            (discountPercentage !== null) && (
              <>
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Typography variant="subtitle1">Subtotal:</Typography>
                </TableCell>
                <TableCell align="right">${subtotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Typography variant="subtitle1">Descuento ({discountPercentage}%):</Typography>
                </TableCell>
                <TableCell align="right">-${discount.toFixed(2)}</TableCell>
              </TableRow>
              </>
            )
          }

          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography variant="subtitle1">Total:</Typography>
            </TableCell>
            <TableCell align="right">${total.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;