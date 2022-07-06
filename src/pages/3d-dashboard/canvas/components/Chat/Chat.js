import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Messages from '../Messages/Messages';
import Input from '../Input/Input';

import SEND_MESSAGE from '../../../../../apollo/mutations/sendMessage';
import JOIN_MESSAGES from '../../../../../apollo/queries/joinMessages';

import { SOCKET_API } from '../../../../../apollo/config';

import './Chat.css';

let socket;

const Chat = ({ location, gContext, displaychat }) => {
  const [id, setID] = useState('');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket = io(SOCKET_API);

    if (!displaychat) {
      socket.emit('leave', gContext.data.currentPerson, (error) => {
        if (error) {
          alert(error);
        }
      });
    } else if (displaychat) {
      socket.emit('join', gContext.data.currentPerson, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displaychat]);
  useEffect(() => {
    socket = io(SOCKET_API);

    setID(gContext.data.currentPerson.id);
    JOIN_MESSAGES(socket, gContext, setMessages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((msgs) => [...msgs, msg]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    SEND_MESSAGE(socket, gContext, message, setMessage);
  };

  return (
    <>
      {displaychat && (
        <div
          style={{
            position: 'absolute',
            left: '5rem',
            bottom: '4.5rem',
            zIndex: 99999999,
            background: 'white',
            borderRadius: '5px',
            outline: 'none',
            padding: 10,
            height: '35rem',
            maxWidth: '35rem',
          }}
        >
          <Messages messages={messages} id={id} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            id={id}
          />
        </div>
      )}
    </>
  );
};

export default Chat;
