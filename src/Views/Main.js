import React, { useState, useEffect } from "react";
import { Container, Paper, Box, } from "@material-ui/core";
import { makeStyles, } from '@material-ui/core/styles';
import CustomizedSteppers from "./Stepper";
import { Elements, } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { publishableKeyGet } from '../constants/functions'

const useStyles = makeStyles(theme => ({
    boxWrapper: {
        marginBottom: "10px",
        minHeight: "calc(26vh + 260px)",
        marginTop:"125px"
    },
    container: {
        position: "relative",
        zIndex: "1100",
        marginTop: "-95px",
        marginBottom: "45px",
    }
}));

const Main = ({stripe, isSepcial}) => {
    const classes = useStyles();
    console.log(isSepcial)
    
    const [stripePromise, setStripePromise] = useState(null)

    useEffect(() => {
        // const retrievePublishableKey = async () => {
        //     const publishableKey = await publishableKeyGet()
        //     const stripe = loadStripe(publishableKey);
        //     setStripePromise(stripe)
        // }
        // retrievePublishableKey()


        const promise = loadStripe("pk_test_51HpgOfESTacQj7cFapgiHwtCBCNNfw44k82IX3qfsUEn59PEHl2GijrntIlZL3oundNmzBUp87WsdZLVwcLTchqp006Nq3vz5v")
        setStripePromise(promise)
    }, [])

    return <Box component="main" className={classes.boxWrapper}>
        <Container maxWidth="md" className={classes.container}>
            <Paper elevation={5}>
                {stripePromise
                    ? <Elements stripe={stripePromise}>
                        <CustomizedSteppers  stripe={stripe}  isSpecial={isSepcial} />
                    </Elements>
                    : null
                }
            </Paper>
        </Container>
    </Box>
}

export default Main;