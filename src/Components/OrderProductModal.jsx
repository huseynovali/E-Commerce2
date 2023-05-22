
import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
function OrderProductModal({ open, handleCloseModal, selectedOrder }) {
    return (
        <div>
            <Modal open={open} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Order Details
                    </Typography>
                    {selectedOrder && (
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            {selectedOrder.items.map((item, index) => (
                                <ListItem key={index}>
                                    <img src={item.image} alt="Item" style={{ width: '64px', height: '64px', marginRight: '16px' }} />
                                    <ListItemText primary={item.title} secondary={`Price: $${item.price}`} />
                                    <ListItemText primary={`Count: ${item.count}`} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Modal>
        </div>
    )
}

export default OrderProductModal



