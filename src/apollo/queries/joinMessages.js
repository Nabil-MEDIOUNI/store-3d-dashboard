import { REST_API } from '../config';

const JOIN_MESSAGES = (socket, gContext, setMessages) => {
  socket.emit('join', gContext.data.currentPerson, (error) => {
    if (error) {
      alert(error);
    }
    return fetch(`${REST_API}/socket/messages`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // eslint-disable-next-line array-callback-return
        response.map((res) => {
          setMessages((messages) => [...messages, res]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default JOIN_MESSAGES;
