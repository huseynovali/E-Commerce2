import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddressCard from '../../Components/AddressCard';
import { useNavigate } from 'react-router-dom';

import moment from 'moment/moment';
import { useDispatch } from 'react-redux';

const steps = ['Select Address', 'Card Operations', 'Confirmation'];

export default function Order() {
    const dispatch = useDispatch()
    let activUser = JSON.parse(localStorage.getItem("activeUser"))
    const [checkedAddress, setCheckedAddress] = useState({
        addressindex: 0,
        country: activUser.address?.country || '',
        city: activUser.address?.city || '',
        street: activUser.address?.street || '',
        zipcode: activUser.address?.zipcode || ''
    });

    const navigation = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigation("/login");
        }
        console.log(checkedAddress);
    }, []);

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());


    const isStepOptional = (step) => {
        return step === 1;
    };

    const confirmationData = () => {
        let date = moment(new Date()).format('LLLL');
        let orderData = JSON.parse(localStorage.getItem("userOrderData")) || [];
        let cart = JSON.parse(localStorage.getItem("cart"))
        localStorage.setItem("userOrderData", JSON.stringify([...orderData, { items: [...cart], date: date, ...checkedAddress }]));
        dispatch({type:"CLEAR_ALL"})
        localStorage.setItem('cart', JSON.stringify([]))
        navigation("/");
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: '100%', p: 5 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>

                </>
            ) : (
                <>
                    {

                        activeStep == 0 &&
                        localStorage.getItem("token") &&
                        <AddressCard checkedAddress={checkedAddress} setCheckedAddress={setCheckedAddress} />

                    }
                    {
                        activeStep === 1 &&
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Cart Operation
                        </Typography>
                    }
                    {
                        activeStep === 2 &&
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            <Typography variant='h6'> Address</Typography>
                            <Typography> Country: {checkedAddress.country}</Typography>
                            <Typography> City: {checkedAddress.city}</Typography>
                            <Typography> Street: {checkedAddress.street}</Typography>
                            <Typography> ZipCode: {checkedAddress.zipcode}</Typography>
                            <Typography variant='h6'> Card</Typography>
                            <Typography> Card data</Typography>
                        </Typography>
                    }

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />

                        {activeStep === steps.length - 1 ?
                            <Button onClick={() => (handleNext(), confirmationData())}>
                                Finish
                            </Button> :
                            (
                                activUser.address?.country &&
                                <Button onClick={handleNext}>
                                    Next
                                </Button>
                            )
                        }
                    </Box>
                </>
            )}
        </Box>
    );
}
