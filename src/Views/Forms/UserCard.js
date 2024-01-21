import React from 'react';
import PropTypes from 'prop-types';
import './Usercard.css'; // Import the CSS file for styling

const UserCard = ({ userImage, userName, userNumber }) => (
  <div className="user-card">
    <img src={userImage} alt={`${userName}'s profile`} className="user-image" />
    <div className="user-info">
      <h2 className="user-name">{userName}</h2>
      <p className="user-number"> <span style={{
        color:"red",
        fontSize:25,
        fontWeight:"bold"
      }}>{userNumber}</span></p>
    </div>
  </div>
);

UserCard.propTypes = {
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userNumber: PropTypes.string.isRequired,
};

export default UserCard;
