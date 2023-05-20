import { Box, Button, Modal, TextField } from '@mui/material'
import { useFormik } from 'formik';
import { MuiTelInput } from 'mui-tel-input';
import React from 'react'

function ModalComponent({ open, handleClose }) {
    const User = JSON.parse(localStorage.getItem("activeUser"));
    const Users = JSON.parse(localStorage.getItem("users"));

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
        const updatedUser = { ...User, address: values.address, phone: values.phone };
        const updatedUsers = Users.map(user => {
            if (user.id === updatedUser.id) {
                return updatedUser;
            }
            return user;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("activeUser", JSON.stringify(updatedUser));
        handleClose();
    };


    const formik = useFormik({
        initialValues: {

            address: {
                city: User?.address?.city || '',
                country: User?.address?.country || '',
                street: User?.address?.street || '',
                zipcode: User?.address?.zipcode || '',
            },

            phone: ''
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
                        name={`address.${input.inputname}`}
                        autoComplete={input.autoComplete}
                        autoFocus={input.inputname === 'city'}
                        type={input.type}
                        value={formik.values.address[input.inputname]}
                        onChange={formik.handleChange}
                        error={formik.touched.address?.[input.inputname] && Boolean(formik.errors.address?.[input.inputname])}
                        helperText={formik.touched.address?.[input.inputname] && formik.errors.address?.[input.inputname]}
                    />

                ))}

                <MuiTelInput value={formik.values.phone}
                    onChange={(phone) => formik.setFieldValue('phone', phone)} />
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

export default ModalComponent