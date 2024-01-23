import React, { useState, useEffect } from 'react';
import "./Profile.css"
import {db,auth} from "../firebase"
import { useNavigate } from 'react-router-dom';
import { FaFacebook , FaTwitter, FaInstagram} from "react-icons/fa";
const CardComponent = (props) => {
  return (
    <div className="card">
    <style>
        {`
          .card:before {
            ${Object.entries(props.dynamicStyle).map(([key, value]) => `${key}: ${value};`).join('\n')}
          }
        `}
      </style>
      <header className="card-header">
        <div className="hello">
          <img src={props.imageLink} alt="" />
          <div className="heading-box">
            <h1>{props.lastname}</h1>
            <h3>{props.line1} <span><i className="material-icons"> {props.country}  </i> </span></h3>
          </div>
        </div>
        <div className="button-box">
          <a className="follow-btn" href="#"><i className="material-icons" style={props.btnStyle} onClick={props.follow} >{props.icon}</i></a>
        </div>
      </header>
      <main className="card-main">
        <div className="activity" style={{fontSize:"30px"}} >
        <FaFacebook />
        </div>
        <div className="activity">
        <FaTwitter style={{fontSize:"30px"}} />
        </div>
        <div className="activity">
            <FaInstagram  style={{fontSize:"30px"}}/>
        </div>
      </main>
    </div>
  );
}

const ProfileCard = () => {

  const [profileOwner,setProfileOwner]=useState({}) 
  const  currentUser= auth.currentUser
  const navigate = useNavigate();

  const [state, setState] = useState({
    friends: 10,
    icon: 'add_circle',
    text: 'Follow',
    btnStyle: {
      borderRadius: '50%',
      color: 'limegreen',
      cursor: 'pointer'
    }
  });
  const [numberText, setNumberText] = useState("Loading");
  const loadData = async()=>{
    if(currentUser?.uid){
        console.log(currentUser.uid)
        const snap=  await db.collection('Buyers').doc(currentUser.uid).get()
         setProfileOwner(snap?.data())
        setNumberText(snap?.data()?.randomnumber)
    }else{
        navigate("/")
    }
  }

  useEffect(()=>{
    loadData()
  },[])


  const dynamicStyle = {
    color: 'red',
    fontSize: '50px',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '30vh',
    letterSpacing: '2px',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/twitter-game-ed473.appspot.com/o/white-concrete-wall.jpg?alt=media&token=831a0a7d-c8ca-463d-a15c-b5819048b7a8')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    filter: 'saturate(80%)',
    backgroundSize: 'cover',
    content: `"${numberText}"`, // Set the content dynamically
  };




  const follow = (e) => {
    e.preventDefault();
    const currentIcon = state.icon;
    const currentText = state.text;
    const currentFriends = state.friends;

    if (currentIcon === 'add_circle' && currentText === 'Follow') {
      setState({
        friends: currentFriends + 1,
        icon: 'cancel',
        text: 'Unfollow',
        btnStyle: {
          color: 'maroon',
          cursor: 'normal',
          animation: 'spin 200ms ease-in-out'
        }
      });
    } else {
      setState({
        friends: currentFriends - 1,
        icon: 'add_circle',
        text: 'Follow',
        btnStyle: {
          color: 'limegreen',
          cursor: 'pointer',
          animation: 'spinBack 200ms ease-in-out'
        }
      });
    }
  };

  return (
    <CardComponent
      btnStyle={state.btnStyle}
      icon={state.icon}
      text={state.text}
      follow={follow}
      friends={state.friends}
      dynamicStyle={dynamicStyle}
      lastname={profileOwner?.lastname}
      line1={profileOwner?.line1}
      imageLink={profileOwner?.imagelink}
      country={profileOwner?.country?.name}
    />
  );
}

export default ProfileCard;
