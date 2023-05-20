import { useContext, useState } from 'react';
import { ProductsContext } from '../../Context/Products';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Skeleton, Typography } from '@mui/material';
import Item from "@mui/material/ListItem";
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/Cart';

function AllProducts() {
  const [limit, setLimit] = useState(5)
  const { useGetProduct } = useContext(ProductsContext);
  const { isLoading, error, data, isSuccess } = useGetProduct(limit);


  const { addCart } = useContext(CartContext);


  return (
    <div>
      {isLoading &&
        <Grid container spacing={2} sx={{ marginTop: 10 }}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
              <Grid item xs={3}>
                <Item>
                  <Card sx={{ maxWidth: 345 }}>
                    <Skeleton variant="rounded" width={345} height={145} />
                    <Skeleton variant="rounded" width={345} height={40} style={{ margin: "10px 0" }} />
                    <Skeleton variant="rounded" width={345} height={100} style={{ margin: "10px 0" }} />
                    <Skeleton variant="rounded" width={345} height={50} />
                  </Card>
                </Item>
              </Grid>
            ))}
        </Grid>
      }
      <Grid container spacing={2} sx={{ marginTop: 10 }}>

        {
          error && <div>Error: {error.message}</div>
        }
        {isSuccess &&
          data.map((item) => (
            <Grid item xs={12} md={5} lg={3} key={item.id}>
              <Item>
                <Card sx={{ maxWidth: 345, minHeight: 415, position: "relative" }}>
                  <CardMedia
                    sx={{ objectFit: "contain" }}
                    component="img"
                    alt={item.title}
                    height="140"
                    image={item.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description?.length < 100
                        ? item.description
                        : item.description.slice(0, 100) + '...'}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ position: "absolute", bottom: 0 }}>
                    <Button variant="contained" onClick={() => addCart(item, "incriment")}>Add Cart</Button>
                    <Button size="small" ><Link style={{ textDecoration: "none", color: "blue" }} to={"product/" + item.id}>Learn More</Link></Button>
                  </CardActions>
                </Card>
              </Item>
            </Grid>
          ))}

      </Grid>
      <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: 50 }}>
        {
          limit <= data?.length + 1 ? <Button variant="contained" onClick={() => { setLimit(item => item + 5) }} >More</Button> : null
        }
      </div>
    </div>
  );
}

export default AllProducts;