import React, { useState } from 'react';
import uuidv4  from 'uuid/v4'
import './App.css';
import io from 'socket.io-client';

function App() {
  const [currentContact, changeCurrentContact] = useState('')
  const [currentMessages, changeCurrentMessages] = useState([])
  const [typedMsg, changeTypedMsg] = useState('')
  const mockData = [
    {
      id: uuidv4(),
      name: 'Muhtasim',
      messages: [{
        msg: 'hey',
        who: 'me'
      }, {
        msg: 'hi there',
        who: 'you'
      }, 
      {
        msg: 'feeling ok',
        who: 'me'
      }, 
      {
        msg: 'same bro',
        who: 'you'
      }
    ]
    },
    {
      id: uuidv4(),
      name: 'Adnan',
      messages: [{
        msg: 'hola, como te llamas',
        who: 'me'
      }, {
        msg: 'buenas dias, me llamo adnan, y tu',
        who: 'you'
      }, 
      {
        msg: 'soy username, estoy contento',
        who: 'me'
      }, 
      {
        msg: 'yo tambien',
        who: 'you'
      }
    ]
    },
  ]
  const [data, changeData] = useState(mockData)

  function changeChat(id) {
    let messages = []
    for (let i = 0; i < data.length; i++) 
      if (data[i].id === id)
        messages = data[i].messages


    changeCurrentContact(id)
    changeCurrentMessages(messages)
  }

  function onChange(event) {
    changeTypedMsg(event.target.value)
  }

  function sendMessage(typedMsg, currentContact, {keyCode}) {
    const Data = [...data]
    if (keyCode === 13) {
      // send message
      console.log('sendMessage')
      console.log({typedMsg})
      console.log({currentContact})
      console.log({Data})
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === currentContact)
          Data[i].messages.push({msg: typedMsg, who: 'me'})
      }
      changeData(Data)
      console.log('endSendMessage')
    }
  }
  console.log({data})
  return (
    <div className="App">
      <div id='sidebar'>
        {
          data.map(contact => {
            return <div className='contacts' onClick={changeChat.bind(this, contact.id)}
            >{contact.name}</div>
          })
        }
      </div>
      <div id='chat'>
      {
        currentMessages.map(message => <div className={message.who + ' msg'}>{message.msg}</div>)
      }
      <input id='input' onChange={onChange} value={typedMsg} onKeyDown={sendMessage.bind(this, typedMsg, currentContact)}/>
      </div>
    </div>
  );
}

export default App;
