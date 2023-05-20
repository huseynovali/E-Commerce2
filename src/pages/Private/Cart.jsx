import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { CartContext } from '../../Context/Cart';
import { Link } from 'react-router-dom';

export default function Cart() {

  const { addCart, cart, setCart } = useContext(CartContext)
  const TAX_RATE = 0.1;
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  function priceRow(qty, unit) {
    return qty * unit;
  }
  const createRow = (qty, unit) => {
    const sum = priceRow(qty, unit);
    return { qty, unit, sum };
  }
  function subtotal(items) {
    return [...items].map(({ sum }) => sum).reduce((sum, i) => sum += i, 0);
  }
  function clearAllCart() {
    setCart([])
    localStorage.setItem("cart", JSON.stringify([]))
  }
  const rows = [...cart]?.map((item) => ({ ...item, ...createRow(item.count, item.price) }))
  console.log(subtotal(rows));
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <>
      {
        rows.length > 0 ?
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="center" colSpan={3}>Price</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align='center'>img</TableCell>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Description</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ width: 5 }}>
                      <img src={row.image} alt={row.title} style={{ width: "100%" }} />
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">

                      <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button onClick={() => addCart(row, "dicriment")}>-</Button>
                        <Button disabled>{row.count}</Button>
                        <Button onClick={() => addCart(row, "incriment")}>+</Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                    <TableCell align="right">{row.sum}</TableCell>
                  </TableRow>
                ))}




                <TableRow >
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
              </TableBody>


            </Table>
            <Grid container spacing={3} style={{ width: "90%", justifyContent: "end", margin: "20px 0" }}>
              <Grid item >
                <Button variant="contained" onClick={() => clearAllCart()}>Clear All</Button>
              </Grid>
              <Grid item >
                <Button variant="contained" onClick={() => { }}>Order</Button>
              </Grid>
            </Grid>
          </TableContainer > :
          <div style={{ width: "100%", height: "80vh", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
            <h1>Product Not Found ! <Link to="/" style={{ color: "blue", textDecoration: "none" }}>continue shopping</Link> </h1>
          </div>
      }
    </>



  );
}