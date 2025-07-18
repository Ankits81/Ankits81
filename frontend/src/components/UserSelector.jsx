import React from "react";

function UserSelector({ users, onSelect }) {

  return (
    <select  style={{width:'60%'}} class="form-select " aria-label="Default select example" onChange={(e) => onSelect(users.find((u) => u._id === e.target.value))}>
      <option value="">Select a user</option>
      {users.map(user => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

export default UserSelector;
  
// function UserSelector (){
//   return(

//   <select class="form-select" aria-label="Default select example">
//   <option value="">Select a user</option>
//        {users.map(user => (
//          <option key={user.id} value={user.id}>
//            {user.name}
//          </option>))}
// </select>)
// }
// export default UserSelector;