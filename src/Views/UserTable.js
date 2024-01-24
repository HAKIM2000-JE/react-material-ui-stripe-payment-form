
import React, { useState, useEffect } from 'react';
import './UserTable.css'; // Import your CSS file
import {db} from "../firebase"
const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const snapshot = await db.collection('Buyers').get();
          const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUsers(usersData);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredUsers = users.filter(user =>
      user?.randomnumber?.toString().includes(searchTerm)
    );
  
    return (
      <div className="user-table-container">
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
  
        <table className="user-table">
          <thead>
            <tr>
              <th>User Image</th>
              <th>Nickname</th>
              <th>Unique Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.randomnumber} style={{cursor:"pointer"}} >
              <td>
                  {user.imagelink && <img src={user.imagelink} alt="User" className="user-image" />}
                </td>
                <td>{user.lastname}</td>
                
                <td>{user.randomnumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserTable;
  