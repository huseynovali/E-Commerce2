import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const User = JSON.parse(localStorage.getItem("activeUser"))
  const navigation = useNavigate()
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      navigation("/")
    }
  }, [])
  return (
    <Grid container spacing={2} sx={{ padding: 5 }}>
      <Grid item xs={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ borderRadius: "100%" }}
              height="140"
              image=""
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography
                variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>


      </Grid>
      <Grid item xs={8}>

      </Grid>
    </Grid>
  )
}

export default Profile