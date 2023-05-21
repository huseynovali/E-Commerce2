import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddressCard from '../../Components/AddressCard';
import { useNavigate } from 'react-router-dom';

const steps = ['Select Address', 'Card Operations', 'Confirmation'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [chcekedAddress, setCheckedAddress] = React.useState(0);
    const isStepOptional = (step) => {
        return step === 1;
    };
    const navigation = useNavigate()

    React.useEffect(() => {
        if (!JSON.parse(localStorage.getItem("token"))) {
            navigation("/")
        }
    }, [])


    const confirmationData = () => {
        let date = new Date();
        let orderData = JSON.parse(localStorage.getItem("userOrderData")) ||[]
        localStorage.setItem("userOrderData", JSON.stringify([...orderData,{ ...chcekedAddress, date: date }]));
       navigation("/")
    }
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
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>

                </React.Fragment>
            ) : (
                <React.Fragment>
                    {
                        activeStep == 0 &&
                        <AddressCard chcekedAddress={chcekedAddress} setCheckedAddress={setCheckedAddress} />
                    }
                    {
                        activeStep == 1 &&
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Cart Operation
                        </Typography>
                    }
                    {
                        activeStep == 2 &&
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            <Typography variant='h6'> Address</Typography>
                            <Typography > Country:{chcekedAddress.country}</Typography>
                            <Typography > City:{chcekedAddress.city}</Typography>
                            <Typography > Street:{chcekedAddress.street}</Typography>
                            <Typography > ZipCode:{chcekedAddress.zipcode}</Typography>
                            <Typography variant='h6'> Card</Typography>
                            <Typography > Card data</Typography>
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
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                        }
                    </Box>
                </React.Fragment>
            )
            }
        </Box >
    );
}