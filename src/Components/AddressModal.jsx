import { Box, Button, Modal, TextField } from '@mui/material'
import { useFormik } from 'formik';
import { MuiTelInput } from 'mui-tel-input';
import React, { useState } from 'react'

export default function AddressModal({ open, handleClose,change,setChange }) {
    const User = JSON.parse(localStorage.getItem("activeUser"));
    const Users = JSON.parse(localStorage.getItem("users"));
    let orderAddress = JSON.parse(localStorage.getItem("orderAddress")) || [User.address] || [];
 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        padding: 8,
        background: "white"
    };
    const onSubmit = (values) => {
        if (!User.address) {
            User.address = values;
            localStorage.setItem("activeUser", JSON.stringify(User));
            localStorage.setItem("orderAddress", JSON.stringify([values]));
            window.location.reload()
        }
        else {
            localStorage.setItem("orderAddress", JSON.stringify([...orderAddress, values]));
            window.location.reload()
        }


        values.city = "";
        values.country = "";
        values.street = "";
        values.zipcode = "";
        handleClose();
    };

    const formik = useFormik({
        initialValues: {
            city: '',
            country: '',
            street: '',
            zipcode: '',
        },
        onSubmit: onSubmit

    })
    const inputTypeData = [
        {
            inputname: "city",
            type: "text",
            id: "city",
            label: "city",
            autoComplete: "city",
        },
        {
            inputname: "country",
            type: "text",
            id: "country",
            label: "country",
            autoComplete: "country",
        },
        {
            inputname: "street",
            type: "text",
            id: "street",
            label: "street",
            autoComplete: "street",
        },
        {
            inputname: "zipcode",
            type: "text",
            id: "zipcode",
            label: "zipcode",
            autoComplete: "zipcode",
        }
    ];
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box style={style} component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                {inputTypeData.map((input) => (
                    <TextField
                        key={input.id}
                        margin="normal"
                        required
                        fullWidth
                        id={input.id}
                        label={input.label}
                        name={input.inputname}
                        autoComplete={input.autoComplete}
                        autoFocus={input.inputname === 'city'}
                        type={input.type}
                        value={formik.values[input.inputname]} // Değişiklik burada yapıldı
                        onChange={formik.handleChange}
                        error={formik.touched[input.inputname] && Boolean(formik.errors[input.inputname])} // Değişiklik burada yapıldı
                        helperText={formik.touched[input.inputname] && formik.errors[input.inputname]} // Değişiklik burada yapıldı
                    />

                ))}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}

                >
                    Save
                </Button>
            </Box>
        </Modal>
    )
}