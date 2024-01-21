import React , {useEffect, useState} from 'react';
import {
    TextField,
    Grid,
    Typography,
    Button
} from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { useStateValue } from "../../StateContext";
import UserCard from './UserCard';

const ServiceForm = () => {
    const [{ formValues }, dispatch] = useStateValue();
    const [number,setNumber]=useState("")
    const navigate = useNavigate();

   

    
    return <>
        <Grid item xs={12}>
        <Grid item xs={12}>
            <Typography variant="h6">Congratulations for getting your unique number !</Typography>
        </Grid>
        <UserCard
      userImage={formValues.imagelink}
      userName={formValues.lastname}
      userNumber={formValues.randomnumber}
    />
       </Grid>
      
    </>
}

export default ServiceForm;
