import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, Checkbox, Grid, Modal, Radio, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddressModal from './AddressModal';
function AddressCard({ chcekedAddress, setCheckedAddress }) {
    let UserInfo = JSON.parse(localStorage.getItem('activeUser'))
    let orderAddress = JSON.parse(localStorage.getItem("orderAddress")) || [UserInfo.address];
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChangeAddress = (paramValue) => {
        setCheckedAddress(paramValue);
    }



    return (
        <>
            <AddressModal open={open} handleClose={handleClose} />
            <Grid container spacing={3} >
                {console.log(orderAddress)}
                {
                    orderAddress.map((item, index) => {
                        return <Grid item>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant='h5' sx={{ m: 2, textAlign: "center" }} >Address {index + 1}
                                        <Radio
                                            checked={chcekedAddress === index}
                                            onChange={() => handleChangeAddress(index)}
                                            value={index}
                                            name="radio-buttons"

                                        /></Typography>
                                    <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                        Country:{item.country}
                                    </Typography>
                                    <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                        City:{item.city}
                                    </Typography>
                                    <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                        Street:{item.street}
                                    </Typography>
                                    <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                        ZipCode:{item.zipcode}
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                    })
                }
                <Grid item>
                    <Card sx={{ minWidth: 275, height: 240 }}>
                        <CardActions >
                            <Button
                                onClick={() => setOpen(true)}
                                sx={{ width: "100%", height: 240, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <AddIcon sx={{ fontSize: 30, mb: 3 }} />
                                Add Address
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>
        </>
    )
}

export default AddressCard