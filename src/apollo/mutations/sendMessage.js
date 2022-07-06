import { REST_API } from '../config';

const SEND_MESSAGE = (socket, gContext, message, setMessage) => {
  if (message) {
    socket.emit('sendMessage', message, gContext.data.currentPerson, () =>
      setMessage(''),
    );
    return fetch(`${REST_API}/socket/send`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: gContext.data.currentPerson,
        text: message,
        date: Date.now(),
      }),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  }

  return '';
};

export default SEND_MESSAGE;
