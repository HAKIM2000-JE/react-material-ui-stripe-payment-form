import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StateProvider } from './StateContext';
import { ThemeProvider } from '@material-ui/styles';
import theme from './constants/theme';
import { Elements } from 'react-stripe-elements';
import {loadStripe} from "@stripe/stripe-js";
import Header from "./Views/Header";
import Main from "./Views/Main"
import Footer from "./Views/Footer";
import LegalNoticePopup from "./Views/LegalNoticePopups/LegalNoticePopup";
import RegistrationPage from './Views/ResgitrationPage';
import LoginPage from './Views/Login';
import StripeProvider from './components/StripeProvider';

const promise = loadStripe("pk_test_51HpgOfESTacQj7cFapgiHwtCBCNNfw44k82IX3qfsUEn59PEHl2GijrntIlZL3oundNmzBUp87WsdZLVwcLTchqp006Nq3vz5v")

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
    <StripeProvider>
      <StateProvider>
        <div style={{ flexGrow: 1 }}>
          {/* Header is always displayed */}
          <Header title="Get your Elo Key Number" logoLink="elo.jpg" />

          {/* Main content with React Router DOM */}
          <Routes>
            {/* Define your routes here */}
            <Route path="/" exact element={<LoginPage />} />
            <Route path="/register" exact element={<RegistrationPage />} />
             
            <Route path="/home" exact element={
                  <Elements stripe={promise}>
                  <Main />
                  </Elements>
              
        
        
            
            
            } />
            {/* Add more routes as needed */}
          </Routes>

          {/* Footer is always displayed */}
          <Footer />
        </div>

        {/* LegalNoticePopup is always displayed */}
        <LegalNoticePopup />
      </StateProvider>
      </StripeProvider>
    </ThemeProvider>
  </Router>
);

export default App;
