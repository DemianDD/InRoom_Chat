import * as React from 'react';
import { connect } from 'react-redux';
import '../components/Components.css'
import { ConnectBlock } from '../components/ConnectBlock';
import Chat  from '../components/Chat';
import { useReducer } from 'react';
import reducer from '../reducer';
import socket from '../socket';
import axios from 'axios';

export const Home = () => {

  const [state, dispatch] = useReducer(reducer, {
    isConnected: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onConnect = async (obj) => {
    dispatch({
      type: 'IS_CONNECTED',
      payload: obj,
    })

    socket.emit('ROOM:CONNECT', obj)

    const { data } = await axios.get(`http://localhost:4445/rooms/${obj.roomId}`);
      dispatch({
        type: 'SET_DATA',
        payload: data,
      });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
      });
  };

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket;

  return(
    <div>
      {!state.isConnected ? <ConnectBlock onConnect = {onConnect}/> : <Chat {...state} onAddMessage={addMessage}/> }
    </div>
  )
};

connect()(Home);
