import React, { useState, useEffect } from "react";
import './List.css'
const UserList = () => {
const [users, setUsers] = useState([]);

useEffect(() => {
fetch('https://localhost:7079/api/User')
.then(response => response.json())
.then(data => setUsers(data));
}, []);

const addUser = async (user) => {
const response = await fetch(`https://localhost:7079/api/User?username=${user.username}&name=${user.name}&surname=${user.surname}&password=${user.password}`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(user),
});
const result = await response.json();
setUsers([...users, result]);
};
const deleteUser = userId => {
  fetch(`https://localhost:7079/api/User/${userId}`, { method: "DELETE" })
  .then(() => setUsers(users.filter(u => u.user_id !== userId)));
  };
return (
<div>
<h2>User List</h2>
<ul>
{users.map(user => (
<li key={user.user_id}>
<p>Username:{user.username}</p>
<p>Name:{user.name}</p>
<p>Surname:{user.surname}</p>
<p>Password:{user.password}</p>
<button onClick={() => deleteUser(user.user_id)}>Delete</button>
</li>
))}
</ul>
<UserForm addUser={addUser} />
</div>
);
};

const UserForm = ({ addUser }) => {
const [username, setUsername] = useState(null);
const [name, setName] = useState(null);
const [surname, setSurname] = useState(null);
const [password, setPassword] = useState(null);

const handleSubmit = e => {
e.preventDefault();
addUser({ username, name, surname, password });
};

return (
<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Username"
value={username}
onChange={(e) => setUsername(e.target.value)}
/>
<input
type="text"
placeholder="Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<input
type="text"
placeholder="Surname"
value={surname}
onChange={(e) => setSurname(e.target.value)}
/>
<input
type="text"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<button type="submit">Add User</button>
</form>
);
};

export default UserList;