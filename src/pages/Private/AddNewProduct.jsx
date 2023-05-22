import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

function AddProductForm() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('addproducts')) || []);

  const formik = useFormik({
    initialValues: {
      productName: '',
      price: '',
      description: '',
    },
    onSubmit: (values) => {
      const newProduct = {
        id: Date.now(),
        name: values.productName,
        price: values.price,
        description: values.description,
      };

      // Yeni ürünü localStorage'a ekleyin
      const updatedProducts = [...products, newProduct];
      localStorage.setItem('addproducts', JSON.stringify(updatedProducts));

      // Ürünlerin listesini güncelleyin ve sayfayı yeniden render edin
      setProducts(updatedProducts);

      // Formu sıfırlayın
      formik.resetForm();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="productName"
              name="productName"
              label="Product Name"
              value={formik.values.productName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box mt={4}>
        <Typography variant="h6">Product List</Typography>
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{borderTop:"1px solid #aaa",padding:10}}>
              <Typography variant="subtitle1" component="h3">
                {product.name}
              </Typography>
              <Typography variant="body1">Price: {product.price}</Typography>
              <Typography variant="body1">Description: {product.description}</Typography>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
}

export default AddProductForm;
