import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './components/Test';
import Phone from './Phone';

function App(props) {
  let [user, setUser] = useState(null)
  let [sampleText, setSampleText] = useState("");
  async function getUser(id) {
    let userData = {}
    if (id) {
      let response = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
      userData = await response.json();
    }
    setUser(userData);
  }
  useEffect(() => {
    getUser(props.id)
  }, [props.id])

  if (!user) {
    return <div>Loading...</div>
  }
  return (
    <>
      <h1 data-testid="name">Hey {user.name || "stranger"}</h1>
      <h2 data-testid="email">{user.email}</h2>
      <Phone number={user.phone} />
      <Test/>
      <input data-testid="sampleText" value={sampleText} onChange={(e)=>{
            setSampleText(e.target.value)
      }}/>
      <ul data-testid="list">
        <li>one</li>
        <li>two</li>
        <li>tree</li>

      </ul>
    </>
  );
}

export default App;
