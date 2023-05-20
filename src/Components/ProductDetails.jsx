import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { ProductsContext } from '../Context/Products'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import Item from "@mui/material/ListItem";
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/Cart';
function ProductDetails() {
    const { id } = useParams()
    const { useProductById } = useContext(ProductsContext);
    const { isLoading, error, data, isSuccess } = useProductById(id);
    const { addCart } = useContext(CartContext)

    return (
        <>
            {
                isLoading && <h1>loading</h1>
            }

            {isSuccess &&
                <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                    <Grid item xs={8} key={data.id}>
                        <Item>
                            <Card sx={{ display: "flex", padding: 10 }}>
                                <CardMedia
                                    sx={{ objectFit: "contain" }}
                                    component="img"
                                    alt={data.title}
                                    height="240"
                                    image={data.image}
                                />
                                <div>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" >
                                            {data.title}
                                        </Typography>
                                        <Typography variant="h5" sx={{ margin: "15px 0" }} >
                                            {data.category}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {data.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <Rating name="read-only" value={data.rating.rate} readOnly />
                                        </Typography>

                                    </CardContent>
                                    <CardActions >
                                        <Button size="small" onClick={() => { addCart(data, "incriment") }}>Add Cart</Button>
                                    </CardActions>
                                </div>
                            </Card>
                        </Item>
                    </Grid>
                </div>

            }</>
    )
}

export default ProductDetails