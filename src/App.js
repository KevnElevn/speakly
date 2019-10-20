import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
const socket = io('http://10.38.128.217:3000');

function App() {
  const [msg, changeMsg] = useState('')


    useEffect(()=> {
      socket.on('connect', function(){
        console.log('we have connected')
        socket.on('newMessage', function(msg) {})
      });
})

  function sendMessage({keyCode}, msg) {
    if (keyCode === 13) {
      socket.emit('newMessage', msg)
    }
  }
  return (
    <div className="App">
      <div id='sidebar'>
      </div>
      <div id='chat'>
      <input id='input' onChange={e => changeMsg(e.target.value)} value={msg} onKeyDown={e => sendMessage(e, msg)}/>
      </div>
    </div>
  );
}

export default App;
