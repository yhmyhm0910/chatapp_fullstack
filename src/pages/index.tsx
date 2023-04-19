import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import styles from './index.module.css'
import { ACTION } from '../../constants/constants';

export default function MyComponent() {

  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState(''); //Send Message Hook
  const [msgSendID, setMsgSendID] = useState(1)   //Msg TO others' div.id (from 1)
  const msgReceiveID = useRef<number>(-1)   //Msg FROM others' div.id (from -1)
  const fromClient = useRef<null | boolean>(null)   //Define margin size (continuous msg from one?)

  useEffect(() => {

    //First connection
    const socket = io('http://localhost:8080');
    setSocket(socket);
    socket.on('connect', () => {
      console.log(`Connected. Socket ID: ${socket.id}`);
    });
    
    //When receive messages from server:
    socket.on(ACTION.SendBacktoClient, (MsgFromServer) => {

      //Create a new element that can store previous Msg
      let newMsgFromServer = document.createElement('div')
      newMsgFromServer.innerText = MsgFromServer
      newMsgFromServer.id = msgReceiveID.current.toString()
      msgReceiveID.current -= 1   //Prepare for the next Receive div.ID
      newMsgFromServer.className = styles.newMsgFromServer
      if (fromClient.current === false){
        newMsgFromServer.style.marginTop = '1px'
      }

      //Add a new elment
      const messageShown = document.getElementById('messageShown');
      if (messageShown) {
        messageShown.appendChild(newMsgFromServer);
      }

      //Set Previous element NOT fromClient
      fromClient.current = false
    });

    return () => {
      socket.off(ACTION.SendBacktoClient);
      socket.disconnect();
    };
  }, []);

  //When clicking 'Send':
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Send message to server
    if (socket){
      socket.emit(ACTION.SendFowardtoServer, message);
    }

    //Create a new Div element
    let newMsgInputted:HTMLElement = document.createElement('div')
    newMsgInputted.className = styles.newMsgInputted
    newMsgInputted.innerText = message
    newMsgInputted.id = msgSendID.toString()
    setMsgSendID(msgSendID + 1)
    if (fromClient.current === true){
      newMsgInputted.style.marginTop = '1px'
    }

    //Add a new elment showing message INPNUTTED
    const messageShown = document.getElementById('messageShown')
    if (messageShown){
      messageShown.appendChild(newMsgInputted)
    }

    //Set Previous element IS fromClient
    fromClient.current = true
  };

  return (
    <div>
      <form onSubmit={handleSend}>
        <label>Message</label>
        <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type='submit'>Send</button>
      </form>
      <div id='messageShown'>
        
      </div>
    </div>
  );
}
