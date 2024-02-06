import React, {useState , useEffect}
    from 'react';
import {
    TextField,
    Grid,
    Typography,
    CircularProgress,
    Button
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useStateValue } from "../../StateContext";
import StripeInput from '../../components/StripeInput'
import { CardElement , useStripe , useElements } from  '@stripe/react-stripe-js';
import axios from 'axios';
import {db} from "../../firebase"
import Select from 'react-select'


const PaymentForm = ({onSubmit, isSpecial}) => {

    const [{ formValues }, dispatch] = useStateValue();
    const  [amount, setAmount]=useState("")
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [specials,setSpecials]=useState([])
    
    const loadData =  async()=>{
      let snap= await db.collection('Specials').doc('0').get()
     
      let numbers=snap.data()
      let data = numbers.Numbers.filter((num)=>!num.isPaid).map((num) => ({ value: num.Price, label: num.Digit }));

      setSpecials(data)
      console.log(data)
    }

    const handleChange = (selectedOption) => {
        // Do something with the selected option
        console.log('Selected option:', selectedOption);
        setAmount(selectedOption.value)
                        dispatch({
                            type: "editFormValue",
                            key: "amount",
                            value: selectedOption.value
                        })
      }

      
    useEffect(()=>{
        console.log(isSpecial)
        if(isSpecial){
            loadData()
        }
       

    },[])
    function extractNumberFromString(currencyString) {
        // Remove any non-digit characters from the string
        const numericValue = currencyString.replace(/\D/g, '');
      
        // Parse the numeric value as an integer
        const numericInt = parseInt(numericValue, 10);
      
        return numericInt;
      }

    const cardsLogo = [
        "amex",
        "cirrus",
        "diners",
        "dankort",
        "discover",
        "jcb",
        "maestro",
        "mastercard",
        "visa",
        "visaelectron",
    ];

    function convertCurrencyStringToInteger(currencyString) {
        // Remove the dollar sign and parse the remaining string as an integer
        const integerValue = parseInt(currencyString.replace('$', ''), 10);
      
        // Check if the result is a valid integer
        if (isNaN(integerValue)) {
          console.error('Invalid currency format');
          return null; // or handle the error accordingly
        }
      
        return integerValue;
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
      console.log(amount)

  
    //   if(amount=="20$"){
    //     total=20
    //   }else{
    //     total=50
    //   }
   let total=convertCurrencyStringToInteger(amount)
    console.log(total)
    
        try {
             const response = await axios({
            method: 'post',
            // Stripe expects the total in a currencies subunits
            url: `https://us-central1-twitter-game-ed473.cloudfunctions.net/handlePayment/?total=${total*100}`
        });

        console.log(response.data.clientSecret)
        let clientSecret=response.data.clientSecret


      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    })
    console.log(payload)
   
    setLoading(false);
        //   const { paymentIntent, error } = await stripe.handleCardPayment(response.data.clientSecret);
    
        //   if (error) {
        //     setError(error.message);
        //   } else {
        //     // Access paymentIntent for additional information
        //     console.log('PaymentIntent:', paymentIntent);
        //     // You can handle the paymentIntent on your client side
    
        //     // Call the parent component's onSubmit callback
        //     onSubmit(paymentIntent);
        //   }
      if(payload.paymentIntent.status=="succeeded"){
        dispatch({
            type: "editFormValue",
            key: "paid",
            value: true
        })
        dispatch({
            type: "editFormValue",
            key: "numberType",
            value: isSpecial? specials.filter(num=>num.value==amount)[0].label : amount=="15$"?6:amount=="20$"?5:amount=="100$"?4:amount=="2500$"?3:7
        })
        
        setError('Payement Accepted , click Next to get your code');

      }else{
        setError('An error occurred. Please try again.');
      }
        
        } catch (error) {
            setLoading(false);
          // Handle any unexpected errors
          console.error('Error handling card payment:', error.message);
          setError('An error occurred. Please try again.');
        }
      };

    return <>
        <Grid container item xs={12}>
        <br/>
            <Grid item xs={12} sm={3}>
                <Typography variant="h6">Payment Data</Typography>
            </Grid>
            {/*<Grid container item xs={12} sm={9} justify="space-between">
                {cardsLogo.map(e => <img key={e} src={`./cards/${e}.png`} alt={e} width="50px" align="bottom" style={{ padding: "0 5px" }} />)}
    </Grid>*/}
        </Grid>
        <Grid item xs={6} sm={3}>
            {
                isSpecial ?(
                    
                    <Select options={specials}   onChange={handleChange} />
           
                ):
                (
                    <Autocomplete
                    options={currencies}
                    getOptionLabel={option => option.name}
                    renderOption={option => <>{option.name} ({option.code})</>}
                    renderInput={params =>
                        <TextField
                            label="Number of Digits"
                            name="currency"
                            variant="outlined"
                            fullWidth
                            {...params}
                        />
                    }
                    value={formValues.currency}
                    onChange={(event, value) => {
                        setAmount(value?.code)
                        dispatch({
                            type: "editFormValue",
                            key: "amount",
                            value: value?.code
                        })
                        dispatch({
                            type: "editFormValue",
                            key: "currency",
                            value: value
                        })
                    }}
                />
                )

                
            }
            
           
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField
                label="Amount"
                name="amount"
                variant="outlined"
                required
                fullWidth
                value={amount}
                disabled
                onChange={e =>

                    dispatch({
                        type: "editFormValue",
                        key: "amount",
                        value: e.target.value.replace(/[^0-9,.]/g, '')
                    })
                }
            />
        </Grid>

        <Grid item xs={6} md={2}>
         <div  style={{marginTop:"2px", border:"1px solid lightgray", padding:10 , height:32, borderRadius:2, width:300}}   >
           <CardElement />
         </div>
       
    </Grid>
    <Grid item xs={12}>
    <Button  color="primary" onClick={handleSubmit} disabled={loading} >
    {
        
            loading
                ?
                <CircularProgress size={24} />
                : 'Pay'
        
    }

    </Button>
    {error && <p style={{ color: error.includes('error')? 'red' :'green'}}>{error}</p>}
  </Grid>
       {/* <Grid item xs={12} sm={6}>
            <TextField
                label="Credit Card Number"
                name="ccnumber"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardNumberElement
                    },
                }}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
                label="Expiration Date"
                name="ccexp"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputProps: {
                        component: CardExpiryElement
                    },
                    inputComponent: StripeInput
                }}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>
        <Grid item xs={6} sm={6}>
            <TextField
                label="CVC"
                name="cvc"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                    inputProps: {
                        component: CardCvcElement
                    },
                    inputComponent: StripeInput
                }}
                InputLabelProps={{ shrink: true }}
            />
            </Grid>*/}
    </>
}

export default  PaymentForm;

const currencies = [
    {
        "symbol": "AED",
        "name": "3 digits",
        "symbol_native": "د.إ.‏",
        "decimal_digits": "3",
        "rounding": 0,
        "code": "2500$",
        "name_plural": "UAE dirhams"
    },
    {
        "symbol": "Af",
        "name": "4 digits",
        "symbol_native": "؋",
        "decimal_digits": "4",
        "rounding": 0,
        "code": "100$",
        "name_plural": "Afghan Afghanis"
    },
    {
        "symbol": "Af",
        "name": "5 digits",
        "symbol_native": "؋",
        "decimal_digits": "5",
        "rounding": 0,
        "code": "20$",
        "name_plural": "Afghan Afghanis"
    },
    {
        "symbol": "Af",
        "name": "6 digits",
        "symbol_native": "؋",
        "decimal_digits": "6",
        "rounding": 0,
        "code": "15$",
        "name_plural": "Afghan Afghanis"
    },
    
]