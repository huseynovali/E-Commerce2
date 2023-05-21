import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Typography from '@mui/material/Typography';
import OrderProductModal from './OrderProductModal';
import LaunchIcon from '@mui/icons-material/Launch';
export default function UserOrderList() {
    const userOrderData = JSON.parse(localStorage.getItem('userOrderData')) || [];
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                {userOrderData.map((order, index) => (
                    <ListItem key={index} button onClick={() => handleOpenModal(order)}>
                      
                        <ListItemText
                            primary={`Order ${index + 1}`}
                            secondary={
                                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                <div>
                                         <Typography variant="body2" color="text.secondary">
                                        Date: {order.date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Country: {order.country}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        City: {order.city}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Street: {order.street}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Zip Code: {order.zipcode}
                                    </Typography> 
                                </div>
                                <div>
                                <LaunchIcon/>
                                </div>
                                </div>
                            }
                        />
                    </ListItem>
                ))}
            </List>

       <OrderProductModal open={open}  handleCloseModal={handleCloseModal}  selectedOrder={selectedOrder}/>
        </>
    );
}