import React, { useEffect, useState } from "react";
import UserSelector from "./components/UserSelector";
import Leaderboard from "./components/leaderboard";
import { claimPointsAPI, fetchUsersAPI, addUserAPI } from "./services/api";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [newUserName, setNewUserName] = useState('');


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    const data = await fetchUsersAPI();
    setUsers(data);
    setLeaderboard([...data].sort((a, b) => b.totalPoints - a.totalPoints)
    );
  };


  const handleClaim = async () => {
    if (!selectedUser) return alert("Select a user first");

    const result = await claimPointsAPI(selectedUser._id);
    const updatedUsers = users.map((user) =>
      user._id === selectedUser._id
        ? { ...user, totalPoints: user.totalPoints + result.pointsAwarded }
        : user
    );

    setUsers(updatedUsers);
    setLeaderboard(
      [...updatedUsers].sort((a, b) => b.totalPoints - a.totalPoints)
    );
    setHistory((prev) => [
      ...prev,
      { userId: selectedUser._id, name: selectedUser.name, points: result.pointsAwarded, timestamp: new Date() },
    ]);
  };
  const handleAddUser = async () => {
    if (!newUserName) return alert("Enter a name first");

    try {
      await addUserAPI(newUserName);
      setNewUserName('');
      await fetchUsers();
    } catch (err) {
      alert("Failed to add user");
    }
  };


  const user = {
    backgroundColor: 'lightblue',
    textAlign: 'center',
    display: 'flex',
    fontsize: "40px",
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw'

  };


  const boxStyle = {
     width:'70vw',
     margin:'auto',
     borderRadius:'8px',
     backgroundColor:'#88b4bb82',
     marginTop:'30px',
     marginLeft:'15vw',
     padding:'32px',
     textAlign:'center'
  };

  return (
    <div >


      {/* <div style={user}>
        <h1 className="user">User Claim & Leaderboard</h1>
      </div> */}

      <div style={boxStyle}>
        <h4>User Reward</h4> <br></br>
        <div style={{ display: 'inline-flex', alignItems:'stretch' }}>
          <UserSelector users={users} onSelect={setSelectedUser} />
          &nbsp;&nbsp; <button
            className="bg-blue-500 "
            onClick={handleClaim}
          >
            Claim
          </button>
        </div>
        <br></br>
 <h4 style={{marginTop:'30px'}}>Add User</h4>
        <div style={{ display: 'inline-flex',  alignItems:'stretch' }}>
         
<br></br>
     
  
  <div class="col-auto">
    <label for="inputPassword2" class="visually-hidden">Enter Name</label>
    <input class="form-control" id="inputPassword2" placeholder="Enter User name"   type="text"
        
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}/>
  </div> &nbsp;&nbsp;
  <div class="col-auto mr-2">
    <button type="button" onClick={handleAddUser} class="btn btn-primary mb-3">Add</button>
  </div>


        </div>
        
        {/* <button onClick={handleAddUser} >Add user</button> */}

        < Leaderboard users={leaderboard} />
      </div>


      <div className="mt-6">
        <h2 className="text-xl font-semibold">Claim History</h2>
        <ul className="mt-2 list-disc ml-6">
          {history.map((h, index) => (
            <li key={index}>
              {h.name} claimed <strong>{h.points}</strong> points on {h.timestamp.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;
