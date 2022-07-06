/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Suspense, useState, useContext, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { Sky } from 'drei';
import { Physics } from 'use-cannon';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from 'react-apollo';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { ALL_USERS_CONNECTED } from '../../../apollo/queries/connectedUser';
import {
  CONNECT_USER,
  DISCONNECT_USER,
} from '../../../apollo/mutations/connectedUser';
import CreatePosition from '../../../components/AddActions/CreatePosition';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { Stats } from './Stats';
import { ALL_DEVICES } from '../../../apollo/queries/device';
import Options from './Options';
import Device from './Device';
import CursorPointer from './CursorPointer';
import Cubes from './components/Cubes';
import Devices from './components/Devices';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import Building from './Building';
import Chat from './components/Chat/Chat';
import Buildingv2 from './Buildingv';

function App() {
  const location = useHistory();
  const gContext = useContext(UserInfoContext);

  const { data: devices } = useQuery(ALL_DEVICES, { pollInterval: 5000 });
  const { data: users } = useQuery(ALL_USERS_CONNECTED, { pollInterval: 1000 });

  const [connecteduserUpdate] = useMutation(CONNECT_USER);
  const [deconnecteduser] = useMutation(DISCONNECT_USER);

  const [positionModal, setPositionModal] = useState(false);
  const [carrefourView, setCarrefourView] = useState(true);
  const [displayCursor, setDisplayCursor] = useState(true);
  const [position, setposition] = useState({ posX: '', posY: '', posZ: '' });
  const [diplaymodalclick, setdiplaymodalclick] = useState(true);
  const [displaychat, setdisplaychat] = useState(false);
  const [playSong, setPlaySong] = useState(true);
  const [skipTuto, setSkipTuto] = useState(false);
  // const [usersposition, setusersposition] = useState([]);

  useEffect(() => {
    if (displayCursor && playSong) {
      const audio = document.getElementById('tuto-audio');
      if (audio) {
        audio.volume = 0.6;
        audio.play();
      }
    }
  }, [displayCursor, playSong]);

  return (
    <>
      {!skipTuto && (
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100vh',
            backgroundColor: '#0F0F0F',
            textAlign: 'center',
            zIndex: 99999,
          }}
        >
          <Carousel
            // stopOnHover
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            showIndicators={false}
            swipeable
            autoPlay
            interval={5000}
            infiniteLoop
          >
            <img
              style={{
                transform: 'translate(0%, 0%)',
                width: '100%',
                height: '90%',
                zIndex: 99999999999,
              }}
              src="/static/img/Tutorial-slides/landing-page.png"
              alt=""
            />
            <img
              style={{
                transform: 'translate(0%, 0%)',
                width: '100%',
                height: '90%',
                zIndex: 99999999999,
              }}
              src="/static/img/Tutorial-slides/dashboard-2d.png"
              alt=""
            />
            <img
              style={{
                transform: 'translate(0%, 0%)',
                width: '100%',
                height: '90%',
                zIndex: 99999999999,
              }}
              src="/static/img/Tutorial-slides/edit-profile.png"
              alt=""
            />
            <img
              style={{
                transform: 'translate(0%, 0%)',
                width: '100%',
                height: '90%',
                zIndex: 99999999999,
              }}
              src="/static/img/Tutorial-slides/dashboard-3d.png"
              alt=""
            />
            <img
              style={{
                transform: 'translate(0%, 0%)',
                width: '100%',
                height: '90%',
                zIndex: 99999999999,
              }}
              src="/static/img/Tutorial-slides/dashboard-3d-up.png"
              alt=""
            />
            <img
              style={{
                transform: 'translate(0%, 0%)',
                width: '100%',
                height: '90%',
                zIndex: 99999999999,
              }}
              src="/static/img/Tutorial-slides/device-3d.png"
              alt=""
            />
            <img
              style={{
                transform: 'translate(0%, 0%)',
                width: '100%',
                height: '90%',
                zIndex: 99999999999,
              }}
              src="/static/img/Tutorial-slides/chating.png"
              alt=""
            />
          </Carousel>
          <audio id="tuto-audio" src="/static/mp3/gta.mp3" />
          {displayCursor && <div className="loading" />}
          <img
            src="/static/img/3d-store.webP"
            alt=""
            style={{
              position: 'absolute',
              left: '0.5rem',
              bottom: '0.5rem',
              width: '15%',
            }}
          />
          {displayCursor && (
            <div
              onClick={() => {
                const audio = document.getElementById('tuto-audio');
                if (playSong) {
                  audio.pause();
                  setPlaySong(false);
                } else {
                  audio.play();
                  setPlaySong(true);
                }
              }}
              className="bar-c"
            >
              <div id="bar-1" className="bar" />
              <div id="bar-2" className="bar" />
              <div id="bar-3" className="bar" />
              <div id="bar-4" className="bar" />
              <div id="bar-5" className="bar" />
              <div id="bar-6" className="bar" />
            </div>
          )}
        </div>
      )}
      {!displayCursor && (
        <div
          style={{
            position: 'absolute',
            right: '-4rem',
            bottom: '1rem',
            width: '15%',
            zIndex: 999999999999,
          }}
        >
          <button
            onClick={() => setSkipTuto(true)}
            type="button"
            style={{
              outline: 'none',
              background: 'none',
              border: '1px solid white',
              padding: '0.5rem',
              color: 'white',
              borderRadius: 2,
              display: skipTuto && 'none',
            }}
          >
            Skip Tutorial &gt;&gt;
          </button>
        </div>
      )}
      {skipTuto && (
        <>
          <Chat
            location={location}
            gContext={gContext}
            displaychat={displaychat}
          />
          <Options
            setCarrefourView={setCarrefourView}
            carrefourView={carrefourView}
            setDisplayCursor={setDisplayCursor}
            setdisplaychat={setdisplaychat}
            displaychat={displaychat}
            users={users}
          />
        </>
      )}
      {carrefourView && (
        <Canvas
          shadowMap
          sRGB
          invalidateFrameloop
          style={{ background: '#0e0e0f' }}
          camera={{ position: [0, 0, 10] }}
        >
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.25} />
          <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
          <Physics gravity={[0, -30, 0]}>
            <Device location={location} devices={devices} gContext={gContext} />
            <CursorPointer
              display={displayCursor}
              carrefourView={carrefourView}
              positionModal={positionModal}
              diplaymodalclick={diplaymodalclick}
            />
            <Suspense fallback={null}>
              <mesh position={[0, 0.5, 0]}>
                <Building setDisplayCursor={setDisplayCursor} />
              </mesh>
            </Suspense>
            <Stats />
            <Player
              position={[5, 5, 18]}
              positionModal={positionModal}
              carrefourView={carrefourView}
              setdiplaymodalclick={setdiplaymodalclick}
              gContext={gContext}
              connecteduserUpdate={connecteduserUpdate}
              deconnecteduser={deconnecteduser}
              diplaymodalclick={diplaymodalclick}
              displaychat={displaychat}
              skipTuto={skipTuto}
              // setusersposition={setusersposition}
            />
            <Ground
              gContext={gContext}
              positionModal={positionModal}
              setPositionModal={setPositionModal}
              setposition={setposition}
            />
            <Cubes />
            {gContext.AddPositionDevice && (
              <Devices
                gContext={gContext}
                setPositionModal={setPositionModal}
                setposition={setposition}
              />
            )}
          </Physics>
        </Canvas>
      )}
      {!carrefourView && (
        <>
          <Canvas
            shadowMap
            sRGB
            invalidateFrameloop
            style={{ background: '#0e0e0f' }}
            camera={{ position: [0, 0, 10] }}
          >
            <Sky sunPosition={[100, 20, 100]} />
            <ambientLight intensity={0.25} />
            <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
            <Physics gravity={[0, 0, 0]}>
              <Device
                location={location}
                devices={devices}
                gContext={gContext}
              />
              <CursorPointer
                display={displayCursor}
                carrefourView={carrefourView}
                positionModal={positionModal}
                diplaymodalclick={diplaymodalclick}
              />
              <Suspense fallback={null}>
                <mesh position={[0, 0.5, 0]}>
                  <Buildingv2 setDisplayCursor={setDisplayCursor} />
                </mesh>
              </Suspense>
              <Stats />
              <Player
                position={[-2, 9, 8.5]}
                positionModal={positionModal}
                carrefourView={carrefourView}
                setdiplaymodalclick={setdiplaymodalclick}
                gContext={gContext}
                connecteduserUpdate={connecteduserUpdate}
                deconnecteduser={deconnecteduser}
                diplaymodalclick={diplaymodalclick}
                displaychat={displaychat}
                // setusersposition={setusersposition}
              />
              <Ground
                gContext={gContext}
                positionModal={positionModal}
                setPositionModal={setPositionModal}
                setposition={setposition}
              />
              <Cubes />
              {gContext.AddPositionDevice && (
                <Devices
                  gContext={gContext}
                  setPositionModal={setPositionModal}
                  setposition={setposition}
                />
              )}
            </Physics>
          </Canvas>
        </>
      )}
      <CreatePosition
        open={positionModal}
        onClose={() => setPositionModal(false)}
        position={position}
      />
    </>
  );
}

export default App;
