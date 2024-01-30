import React, { useState, useEffect } from 'react';
import "./Profile.css"
import {db,auth} from "../firebase"
import { useNavigate } from 'react-router-dom';
import { FaFacebook , FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Switch from 'react-switch';
import Select from 'react-select'
import {
  TextField,
  Grid,
  Typography
} from "@material-ui/core";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width:"50vw",
    transform: 'translate(-50%, -50%)',
  },
};

const options = [
  { value: '#c20508', label: 'red' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'blue', label: 'Blue' },
  { value: 'pink', label: 'Pink' },
  { value: 'orange', label: 'Orange' },

]

const CardComponent = (props) => {
  let subtitle
  const  currentUser= auth.currentUser
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showFacebooklMedia, setFacebookMedia] = useState(props.showFacebooklMedia);
  const [showTwitterlMedia, setTwitterMedia] = useState(props.showTwitterlMedia);
  const [showInstagramMedia, setInstagramMedia] = useState(props.showInstagramMedia);
  const [showTiktokMedia,setTiktokMedia]=useState(props.showTiktokMedia)
  const [Nickname, setNickname]=useState(props.lastname)
  const [about, setAbout]=useState(props.line1)
  const [facebook, setFacebook]=useState(props.facebook)
  const [twitter, setTwitter]=useState(props.twitter)
  const [instagram, setInstagram]=useState(props.instagram)
  const [tiktok,setTiktok]=useState(props.tiktok)
  

  const [color, setColor]=useState(props.color)
  
  const { userId } = useParams();

  const handleFacebookChange = (checked) => {
    setFacebookMedia(checked)
  };
  const handleTwitterChange = (checked) => {
    setTwitterMedia(checked)
  };
  const handleInstagramChange = (checked) => {
   setInstagramMedia(checked)
  };

  const handleTiktokChnage=(checked)=>{
    setTiktokMedia(checked)
  }


  function openModal() {
    setIsOpen(true);
    setNickname(props.lastname)
    setAbout(props.line1)
    setFacebook(props.facebook)
    setTiktok(props.tiktok)
    setTwitter(props.twitter)
    setInstagram(props.instagram)
    setFacebookMedia(props.showFacebooklMedia)
    setTiktokMedia(props.showTiktokMedia)
    setTwitterMedia(props.showTwitterlMedia)
    setInstagramMedia(props.showInstagramMedia)
    
  }

 

  function closeModal() {
    setIsOpen(false);
  }


  const handleChange = (selectedOption) => {
    // Do something with the selected option
    console.log('Selected option:', selectedOption);
    setColor(selectedOption.value)
  }

  const SaveInformation = async (uid)=>{

    if(Nickname.trim()!=""){
         await db.collection("Buyers").doc(uid).update({
            lastname:Nickname,
            line1:about,
            facebook:facebook,
            twitter:twitter,
            instagram:instagram, 
            tiktok:tiktok,
            color:color?color:"#c20508",
            showFacebooklMedia:showFacebooklMedia,
            showInstagramMedia:showInstagramMedia,
            showTwitterlMedia:showTwitterlMedia,
            showTiktokMedia:showTiktokMedia
         })   

         closeModal()
    }else{
      alert("Nicke name cannot be null")
    }

  }

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
        {
          props.isMyProfile?(
            <div className="button-box">
                 <button className='card-editButton' onClick={openModal} >
                     Edit Profile
                 </button>
             </div>

          ):""
        }
      
      </header>
      <main className="card-main">
        {
          props.showFacebooklMedia?(
            <a href={props.facebook} className="activity" target="_blank" rel="noopener noreferrer">
            <div >
            <FaFacebook  style={{fontSize:"30px"}} />
            </div>
        </a>

          ):""
        }
        {
          props.showTwitterlMedia ?(
            <a href={props.twitter} className="activity"  color='black' target="_blank" rel="noopener noreferrer">
            <div >
            <FaTwitter style={{fontSize:"30px"}} />
            </div>
        </a>

          ):""
          

        }
       
       
       
       {
        props?.showInstagramMedia?(
          <a href={props.instagram} className="activity" target="_blank" rel="noopener noreferrer">
            <div >
              <FaInstagram style={{ fontSize: "30px" }} />
            </div>
        </a>

        ):""
       }
       
       {
        props?.showTiktokMedia?(
          <a href={props.tiktok} className="activity" target="_blank" rel="noopener noreferrer">
            <div >
              <FaTiktok style={{ fontSize: "30px" }} />
            </div>
        </a>

        ):""
       }
      </main>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div>Update My information </div>
        <div>
        <Grid item xs={12} sm={4}>
          
        <input placeholder='Nickname' onChange={(e)=>setNickname(e.target.value)} value={Nickname} />
          
          <input placeholder='About you' onChange={(e)=>setAbout(e.target.value)} value={about} />
        
        </Grid>
        <Grid item xs={12} sm={4}>
        <input placeholder='Facebook Link' onChange={(e)=>setFacebook(e.target.value)} value={facebook}/>
           <br/>
          <input placeholder='Twitter Link' onChange={(e)=>setTwitter(e.target.value)} value={twitter} />
          <br/>
        </Grid>
        <Grid item xs={12} sm={4}>
        <input placeholder='Instagram Link' onChange={(e)=>setInstagram(e.target.value)} value={instagram}/>
          <br/><br/>
        </Grid>
          
          
       

          <label>
           
            <Switch
              onChange={handleFacebookChange}
              checked={showFacebooklMedia}
            />
              <br/>
             Show Facebook Link
          
         </label>
         <br/>
         <label>
          
            <Switch
              onChange={handleTwitterChange}
              checked={showTwitterlMedia}
            />
             <br/>
              Show Twitter Link
           
         </label>
         <br/>
         <label>
           
            <Switch
              onChange={handleInstagramChange}
              checked={showInstagramMedia}
            />
               <br/>
             Show Instagram Link
         
         </label>
         <br/>

         <label>
           
            <Switch
              onChange={handleTiktokChnage}
              checked={showTiktokMedia}
            />
               <br/>
             Show Tiktok Link
         
         </label>
         <br/>

         <label>
            Choose profile color
            <Select options={options}   onChange={handleChange} />
         </label>
        
          
          <button onClick={()=>SaveInformation(currentUser.uid)}>Save your information</button>
          <br/> <br/> 
          <button onClick={closeModal}>close</button>
        </div>
      </Modal>
    </div>
  );
}

const ProfileCard = () => {
  const [profileOwner,setProfileOwner]=useState({}) 
  const  currentUser= auth.currentUser
  const navigate = useNavigate();
  const { userId } = useParams();

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
    console.log(currentUser?.uid)
    console.log(userId)
    if(currentUser?.uid){
        if(userId && userId!="undefined"){
        const snap=  await db.collection('Buyers').doc(userId).get()
         setProfileOwner(snap?.data())
        setNumberText(snap?.data()?.randomnumber)
        console.log(profileOwner)
        }else{
          console.log(currentUser.uid,userId)
        const snap=  await db.collection('Buyers').doc(currentUser.uid).get()
         setProfileOwner(snap?.data())
        setNumberText(snap?.data()?.randomnumber)
        console.log(profileOwner)
        }
        
    }else{
        navigate("/")
    }
  
  }

  useEffect(()=>{
    loadData()
  },[])


  const dynamicStyle = {
    color:   'white',
    fontSize: '50px',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '30vh',
    letterSpacing: '2px',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
    background: profileOwner?.color ? profileOwner?.color : "#c20508",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
      facebook={profileOwner?.facebook}
      twitter={profileOwner?.twitter}
      instagram={profileOwner?.instagram}
      tiktok={profileOwner?.tiktok}
      color={profileOwner?.color}
      isMyProfile={currentUser?.uid==userId}
      showFacebooklMedia={profileOwner?.showFacebooklMedia}
      showInstagramMedia={profileOwner?.showInstagramMedia}
      showTwitterlMedia={profileOwner?.showTwitterlMedia}
      showTiktokMedia={profileOwner?.showTiktokMedia}
    />
  );
}

export default ProfileCard;
