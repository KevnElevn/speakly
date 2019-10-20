import React, { useState, useEffect } from 'react';
import uuidv4 from 'uuid/v4'
import './App.css';
import io from 'socket.io-client';
const socket = io('localhost:3000');
var translate = require('yandex-translate')('trnsl.1.1.20191019T212733Z.c56b015e56537da4.a39c9ad7fca7503c68b03a2078d249191dc3ba22');

let language = 'en'

function App() {
  console.log('re-render')
  const [msg, changeMsg] = useState('')
  const [msgList, changeMsgList] = useState([])
  console.log(msgList)
  
  useEffect(()=> {
      socket.on('connect', function(){
        console.log('we have connected')
        socket.on('newMessage', function(msg) {

          console.log('GOT MESSAGE FROM BACKEND')
          console.log("msg: " + msg)
          console.log("msgList1: " + msgList)
          // debugger
          changeMsg('')
          translate.translate(msg, { to: language }, (err, res) => {
            if(err) {
              // return msg;
            } else {
              console.log({res})
              console.log(res.text[0])
              msg = msg + `(${res.text[0]})`;
              changeMsgList(msgList => [...msgList, {id: uuidv4(), msg}])
            }
            // console.log({msg})
          });

          // console.log({vari})
        })
      });
}, [])

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
      {
        msgList.map(msgObj => {
          return <div className='msg' key={msgObj.id}>{msgObj.msg}</div>
        })
      }
      <input id='input' onChange={e => changeMsg(e.target.value)} value={msg} onKeyDown={e => sendMessage(e, msg)}/>
      </div>
    </div>
  );
}

export default App;
