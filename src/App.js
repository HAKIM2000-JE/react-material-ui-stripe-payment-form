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
import ProfileCard from './Views/Profile';
import Navbar from './Views/Navbar';
import UserTable from './Views/UserTable';

const promise = loadStripe("pk_test_51HpgOfESTacQj7cFapgiHwtCBCNNfw44k82IX3qfsUEn59PEHl2GijrntIlZL3oundNmzBUp87WsdZLVwcLTchqp006Nq3vz5v")

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
    <StripeProvider>
      <StateProvider>
        <div style={{ flexGrow: 1 }}>
          {/* Header is always displayed */}
   
          <Navbar/>
          
          {/* Main content with React Router DOM */}
          <Routes>
            {/* Define your routes here */}
            <Route path="/" exact element={<LoginPage />} />
            <Route path="/register" exact element={<RegistrationPage />} />
             
            <Route path="/purchase" exact element={
                  <Elements stripe={promise}>
                  <Main />
                  </Elements>
            } />
             <Route path="/profile/:userId"   element={<ProfileCard/>}  />
             <Route path='/search'  element={<UserTable/>} />
          </Routes>
          <br/><br/><br/>

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
