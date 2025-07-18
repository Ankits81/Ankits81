import React from "react";

function Leaderboard({ users }) {
  const tab={
     display: 'flex',
     textAlign: 'center',
      justifyContent: 'center',
    alignItems: 'center',
  }

  return (
   
  
    <div className="mt-4">
      <h2 >Leaderboard</h2>
      <div style={tab}>
      <table >
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Rank</th>
            <th className="p-2">Name</th>
            <th className="p-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>

        )
}

export default Leaderboard;
