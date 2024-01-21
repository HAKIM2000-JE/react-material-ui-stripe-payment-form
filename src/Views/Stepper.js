import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Box,
    Grid,
    CircularProgress,
} from '@material-ui/core';
import {
    SentimentVerySatisfied,
    SentimentVeryDissatisfied
} from '@material-ui/icons';
import StepperIcons from "./StepperIcons";
import ContactForm from "./Forms/ContactForm";
import PaymentForm from "./Forms/PaymentForm";
import ServiceForm from "./Forms/ServiceForm";
import { useStateValue } from "../StateContext";
import StepConnector from './StepConnector'
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import {
    clientSecretPull,
    stripeDataObjectConverter,
    clientSecretDataObjectConverter
} from '../constants/functions';

// OVERALL STYLE
const style = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(1),
        background:"#c20508"
        
    },
    buttonBack: {
        marginRight: theme.spacing(1),
        
    },
    mainBox: {
        position: "relative",
        marginTop: "-8px",
        padding: "10px 20px",
        borderBottomRightRadius: "4px",
        borderBottomLeftRadius: "4px",
        background: theme.palette.background.default
    },
    stepper: {
        height: "calc(10vh - 40px)",
        minHeight: "55px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },
    buttonWrapper: {
        justifyContent: "flex-end"
    },
}));

const StepContent = ({ step }) => {
    switch (step) {
        case 0:
            return <ContactForm />;
            
        case 1:
            return <PaymentForm />;
        case 2:
           
            return <ServiceForm />;
        default:
            return <></>;
    }
}

const Steppers = ({stripe}) => {
    const navigate = useNavigate();
    const classes = style();
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [cardStatus, setCardStatus] = useState(true);
    const [cardMessage, setCardMessage] = useState("");
    const [{ formValues }, dispatch] = useStateValue();
    const currentUser= getAuth().currentUser

    function generateRandomNumber() {
        const isRepeated = (num) => /^(.)\1*$/.test(num.toString()); // Check for repeated digits
      
        let randomNumber;
      
        do {
          randomNumber = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 99999
        } while (
          isRepeated(randomNumber) ||     // Check for repeated digits
          (randomNumber > 0 && randomNumber < 100) ||   // Exclude numbers between 1 and 99
          randomNumber === 0 ||            // Exclude 0
          randomNumber === 100 ||          // Exclude 100
          randomNumber === 1000 ||         // Exclude 1000
          randomNumber === 10000           // Exclude 10000
        );
      
       
        dispatch({
            type: "editFormValue",
            key: "RandomNumber",
            value: randomNumber
        })
        return randomNumber;
      }



    const handleNext =  async () => {
        if (activeStep === 1 ) {
            if(formValues.paid){
                generateRandomNumber()
            
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            }else{
                alert("Sorry but you have to pay first !")
            }
           
        } else if(activeStep === 2)  {
          
                await db.collection('Buyers').doc(currentUser.uid).set(formValues)
                console.log(formValues)
                alert('Information Saved Successfully , thank you !')
                navigate("/")


           
           
        
        }else{
            setActiveStep(prevActiveStep => prevActiveStep + 1);

        }
    };
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);

    const capture = async () => {

        setLoading(true);

        console.log(stripe);

        
        //setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setLoading(false);
    }

    return (
        <>
            <Stepper alternativeLabel className={classes.stepper} connector={<StepConnector />} activeStep={activeStep}>
                {/* Change the number of loops here based on StepContent */}
                {[1, 2, 3].map(e =>
                    <Step key={e}>
                        <StepLabel StepIconComponent={StepperIcons} />
                    </Step>
                )}
            </Stepper>
            <Box className={classes.mainBox}>
                {activeStep === 3 ?
                    <Grid
                        container
                        spacing={3}
                        direction="column"
                        justify="space-around"
                        alignItems="center"
                        style={{ height: "400px" }}
                    >
                        {cardStatus
                            ?
                            <SentimentVerySatisfied fontSize="large" color="primary" />
                            :
                            <SentimentVeryDissatisfied fontSize="large" color="error" />
                        }
                        <Typography variant="h4">
                            {cardMessage}
                        </Typography>
                        <Button onClick={cardStatus ? handleReset : handleBack} className={classes.button}>
                            {cardStatus ? "Reset" : "Back"}
                        </Button>
                    </Grid>
                    :
                    <form autoComplete="off" className={classes.form} onSubmit={e => { e.preventDefault(); handleNext() }}>
                        <Grid container spacing={3}>
                            <StepContent step={activeStep} />
                            <Grid container item justify="flex-end">
                                <Button disabled={activeStep === 0} className={classes.buttonBack} onClick={handleBack}>
                                    Back
                                    </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {
                                        loading
                                            ?
                                            <CircularProgress size={24} />
                                            :
                                            activeStep === 2 ? 'Save Information' : 'Next'
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                }
            </Box>
        </>
    );
}

export default Steppers;
