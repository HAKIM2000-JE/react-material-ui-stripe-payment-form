import React, { useState, useEffect } from 'react';
import "./Profile.css"
import {db,auth} from "../firebase"
import { useNavigate } from 'react-router-dom';
import { FaFacebook , FaTwitter, FaInstagram} from "react-icons/fa";
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Switch from 'react-switch';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const CardComponent = (props) => {
  let subtitle
  const  currentUser= auth.currentUser
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showFacebooklMedia, setFacebookMedia] = useState(true);
  const [showTwitterlMedia, setTwitterMedia] = useState(true);
  const [showInstagramMedia, setInstagramMedia] = useState(true);
  const [Nickname, setNickname]=useState(props.lastname)
  const [about, setAbout]=useState(props.line1)
  const [facebook, setFacebook]=useState(props.facebook)
  const [twitter, setTwitter]=useState(props.twitter)
  const [instagram, setInstagram]=useState(props.instagram)
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


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const SaveInformation = async (uid)=>{

    if(Nickname.trim()!=""){
         await db.collection("Buyers").doc(uid).update({
            lastname:Nickname,
            line1:about,
            facebook:facebook,
            twitter:twitter,
            instagram:instagram
         })   
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
        
        <a href={props.facebook} className="activity" target="_blank" rel="noopener noreferrer">
            <div >
            <FaFacebook />
            </div>
        </a>
        <a href={props.twitter} className="activity" target="_blank" rel="noopener noreferrer">
            <div >
            <FaTwitter style={{fontSize:"30px"}} />
            </div>
        </a>
       
        <a href={props.instagram} className="activity" target="_blank" rel="noopener noreferrer">
            <div >
              <FaInstagram style={{ fontSize: "30px" }} />
            </div>
        </a>
      </main>


      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>EloKey</h2>
        <div>Update My information </div>
        <form>
          <input placeholder='Nickname' onChange={(e)=>setNickname(e.target.value)} value={Nickname} />
          <br/>
          <input placeholder='About you ' onChange={(e)=>setAbout(e.target.value)} value={about} />
          <br/>
          <input placeholder='Facebook Link' onChange={(e)=>setFacebook(e.target.value)} value={facebook}/>
           <br/>
          <input placeholder='Twitter Link' onChange={(e)=>setTwitter(e.target.value)} value={twitter} />
          <br/>
          <input placeholder='Instagram Link' onChange={(e)=>setInstagram(e.target.value)} value={instagram}/>
          <br/><br/>
          <label>
            Show Facebook Link
            <Switch
              onChange={handleFacebookChange}
              checked={showFacebooklMedia}
            />
         </label>
         <label>
            Show Twitter Link
            <Switch
              onChange={handleTwitterChange}
              checked={showTwitterlMedia}
            />
         </label>
         <label>
            Show Instagram Link
            <Switch
              onChange={handleInstagramChange}
              checked={showInstagramMedia}
            />
         </label>
          
          <button onClick={()=>SaveInformation(currentUser.uid)}>Save your information</button>
          <button onClick={closeModal}>close</button>
        </form>
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
    if(currentUser?.uid){
        if(userId===undefined){
         
        const snap=  await db.collection('Buyers').doc(currentUser.uid).get()
         setProfileOwner(snap?.data())
        setNumberText(snap?.data()?.randomnumber)
           
        }else{
          console.log(currentUser.uid,userId)
        const snap=  await db.collection('Buyers').doc(!userId?currentUser.uid:userId).get()
         setProfileOwner(snap?.data())
        setNumberText(snap?.data()?.randomnumber)
        }
        
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
      facebook={profileOwner?.facebook}
      twitter={profileOwner?.twitter}
      instagram={profileOwner?.instagram}
      isMyProfile={currentUser?.uid==userId}
    />
  );
}

export default ProfileCard;
