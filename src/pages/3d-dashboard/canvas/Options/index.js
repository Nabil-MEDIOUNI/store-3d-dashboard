import React from 'react';

import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import img from '../images/up-and-down.png';
// import ActiveUsers from './ActiveUsers';

const Options = ({
  carrefourView,
  setCarrefourView,
  setDisplayCursor,
  setdisplaychat,
  displaychat,
  users,
}) => (
  // const [usersposition, setusers_position] = useState([]);

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.on('position', (msg) => {
  //     console.log(msg, 'msg');
  //     setusers_position(msg.users.users);
  //   });
  // });
  <>
    <button
      style={{
        position: 'absolute',
        right: '1rem',
        bottom: '4.5rem',
        zIndex: 99999999,
        background: 'white',
        borderRadius: '50%',
        outline: 'none',
        padding: 10,
      }}
      type="button"
      onClick={() => {
        setCarrefourView(!carrefourView);
        setDisplayCursor(true);
      }}
    >
      <img
        src={img}
        style={{ transform: 'rotate(90deg)' }}
        alt=""
        width="20px"
      />
    </button>
    <button
      style={{
        position: 'absolute',
        right: '1rem',
        bottom: '1rem',
        zIndex: 99999999,
        background: 'white',
        borderRadius: '50%',
        outline: 'none',
        padding: 10,
      }}
      type="button"
      onClick={() => {
        window.location.href = '/devices';
      }}
    >
      <img src="/static/icons/home.png" alt="" width="20px" />
    </button>
    <button
      style={{
        position: 'absolute',
        left: '1rem',
        bottom: '1rem',
        zIndex: 99999999,
        background: 'white',
        borderRadius: '50%',
        outline: 'none',
        padding: 12,
      }}
      type="button"
      onClick={() => {
        setdisplaychat(!displaychat);
      }}
    >
      <QuestionAnswerIcon style={{ color: 'black' }} />
    </button>
    {/* <ActiveUsers users={users} /> */}
  </>
);
export default Options;
