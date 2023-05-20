import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Grid, List, ListItem, ListItemText, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalComponent from '../../Components/Modal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
function Profile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const User = JSON.parse(localStorage.getItem("activeUser"))
  const navigation = useNavigate()
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      navigation("/")
    }
  }, [])
  return (
    <Grid container spacing={2} sx={{ padding: 5 }}>
      <Grid item md={3} xs={24}>
        <Card sx={{width:'100%'}}>
          <CardMedia sx={{ display: "flex", alignItems: "center", justifyContent: "center", m: 5 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 150, height: 150 }} />
          </CardMedia>
          <CardContent>

            <Grid container spacing={2}>
              <Grid item xs={12} >

                <List >
                  <ListItem>
                    <ListItemText> Name:{User?.name}</ListItemText>
                  </ListItem>
                  {
                    User.address && <>
                      <Typography sx={{ m: "15px auto", width: 50, height: 50, bgcolor: "#aaa", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }} variant="h6" component="span">
                        <LocationOnIcon />
                      </Typography>
                      <ListItem>
                        <ListItemText>Country:{User.address?.country}</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>City:{User.address?.city}</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>Street:{User.address?.street}</ListItemText>
                      </ListItem>
                      <Typography sx={{ m: "15px auto", width: 50, height: 50, fontSize: 20, bgcolor: "#aaa", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }} variant="h6" component="span">
                        <LocalPhoneIcon />
                      </Typography>
                      <ListItem>
                        <ListItemText>Phone:{User?.phone}</ListItemText>
                      </ListItem>

                    </>
                  }

                </List>
              </Grid>
            </Grid>

          </CardContent>

          <CardActions>{
            !User.address ? <Button onClick={handleOpen}>Add address</Button> : <Button onClick={handleOpen}>Edit Info</Button>
          }

          </CardActions>
        </Card>
        <ModalComponent open={open} setOpen={setOpen} handleClose={handleClose} />
      </Grid>

      <Grid item xs={24} md={8}>

      </Grid>
    </Grid>
  )
}

export default Profile