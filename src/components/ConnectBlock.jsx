import * as React from 'react';
import { connect } from 'react-redux';
import './Components.css'
import axios from 'axios';

export const ConnectBlock = ({ onConnect }) => {

  const [userName, setName] = React.useState('');
  const [roomId, setRoomId] = React.useState('');

  const handleConnect = async () => {
    if (!roomId || !userName) {
      return alert('Incorrect data, please try again');
    }
    const obj = {
      roomId,
      userName,
    };
    await axios.post('http://localhost:4445/rooms', obj);
    onConnect(obj);
  };

  return(
    <div>
      <div className='centered'>

        <div>
          <input 
            className='input-style'
            placeholder='Enter your name..' 
            type='text'
            value={userName}
            onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div>
          <input 
            className='input-style'
            placeholder='Enter room ID..' 
            type='text'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            />
        </div>
        
        <div>
          <button className='button-style' onClick={handleConnect}> Connect to chat </button>
        </div>

      </div>
    </div>
  )
};

connect()(ConnectBlock);
