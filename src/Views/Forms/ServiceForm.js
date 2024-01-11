import React , {useEffect, useState} from 'react';
import {
    TextField,
    Grid,
    Typography,
    Button
} from "@material-ui/core";
import { useStateValue } from "../../StateContext";

const ServiceForm = () => {
    const [{ formValues }, dispatch] = useStateValue();
    const [number,setNumber]=useState("")

    useEffect(()=>{
        console.log(formValues)
    },[])

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
        setNumber(randomNumber)
        console.log(number)
        dispatch({
            type: "editFormValue",
            key: "number",
            value: number
        })
        return randomNumber;
      }

    return <>
        <Grid item xs={12}>
            <Typography variant="h6">Get Your number </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            label="Number"
            name="Number"
            variant="outlined"
            fullWidth
            value={number}
            onChange={e =>
                dispatch({
                    type: 'editFormValue',
                    key: "service",
                    value: e.target.value
                })
            }
        />
       </Grid>
       <Button  color="primary" onClick={generateRandomNumber}  >
        Generate your number
       </Button>
    </>
}

export default ServiceForm;
