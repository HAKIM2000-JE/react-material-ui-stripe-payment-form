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
            <br/>
            <Typography variant="h6">Congratulations for getting your unique number !</Typography>
        </Grid>
        <UserCard
      userImage={formValues.imagelink}
      userName={formValues.lastname}
      userNumber={formValues.randomnumber}
    />
       </Grid>

       <Grid item xs={12}>
            <Typography variant="h6">Social Network?</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label="facebook"
                name="facebook"
                variant="outlined"
                fullWidth
                value={formValues.facebook}
                onChange={e =>
                    dispatch({
                        type: 'editFormValue',
                        key: "facebook",
                        value: e.target.value
                    })
                }
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label="twitter"
                name="twitter"
                variant="outlined"
                fullWidth
                value={formValues.twitter}
                onChange={e =>
                    dispatch({
                        type: 'editFormValue',
                        key: "twitter",
                        value: e.target.value
                    })
                }
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                label="Instagram"
                name="instagram"
                variant="outlined"
                fullWidth
                value={formValues.instagram}
                onChange={e =>
                    dispatch({
                        type: 'editFormValue',
                        key: "instagram",
                        value: e.target.value
                    })
                }
            />
        </Grid>
      
    </>
}

export default ServiceForm;
