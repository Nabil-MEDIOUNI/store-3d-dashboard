/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { useThree, extend, useFrame } from 'react-three-fiber';
import io from 'socket.io-client';
import * as THREE from 'three';

import { SOCKET_API } from '../../../../apollo/config';

extend({ PointerLockControlsImpl });

const materialHover = new THREE.MeshPhysicalMaterial({
  color: 0xcc0000,
  roughness: 0.1,
});

const geometryHover = new THREE.DodecahedronBufferGeometry(0.2);

let socket;
const FPVControls = ({
  positionModal,
  carrefourView,
  setdiplaymodalclick,
  gContext,
  diplaymodalclick,
  displaychat,
  connecteduserUpdate,
  deconnecteduser,
  skipTuto,
  // setusersposition,
}) => {
  const { camera, gl } = useThree();
  const controls = useRef();
  const [stoped, setstoped] = useState(false);
  const [position, setPosition] = useState([]);
  const [tuto, settuto] = useState(false);
  // camera.position.x = 0;
  // camera.position.y = 0;
  // camera.position.z = 0;
  useFrame(() => {
    if (skipTuto && !tuto) {
      settuto(true);
    }
    if (!carrefourView) {
      camera.rotation.x = 5;
      camera.rotation.y = 0;
      camera.rotation.z = 0;
    }
    if (controls.current && !controls.current.isLocked) {
      setdiplaymodalclick(true);
    } else {
      socket.emit(
        'sendPosition',
        gContext.data.currentPerson,
        camera.position,
        (error) => {
          if (error) {
            alert(error);
          }
        },
      );

      setdiplaymodalclick(false);
    }
  });

  useEffect(() => {
    socket = io(SOCKET_API);
    if (!carrefourView) {
      socket.emit('joinvue', (error) => {
        if (error) {
          alert(error);
        }
      });
    }
    socket.emit('getusers', (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on('emitusers', () => {
      // console.log(msg, 'msg');
      // setusersposition(msg.users.users);
    });

    socket.on('position', (msg) => {
      // console.log(msg, 'msg');
      setPosition(msg.users.users);
    });

    socket.on('positionjoined', (msg) => {
      // console.log(msg, 'msg');
      setPosition(msg.users.users);
      // setusersposition(msg.users.users);
    });

    socket.on('positionleave', (msg) => {
      // console.log(msg, 'msg');
      setPosition(msg.users.users);
      // setusersposition(msg.users.users);
    });

    if (displaychat || !carrefourView) {
      deconnecteduser({
        variables: {
          user: {
            id: gContext.data.currentPerson.id,
          },
        },
      });
      socket.emit('leaveStore', gContext.data.currentPerson, (error) => {
        if (error) {
          alert(error);
        }
      });

      if (controls.current) {
        controls.current.unlock();
      }

      setstoped(true);
    } else {
      if (diplaymodalclick) {
        deconnecteduser({
          variables: {
            user: {
              id: gContext.data.currentPerson.id,
            },
          },
        });
        console.log('deconnected', diplaymodalclick);
        socket.emit('leaveStore', gContext.data.currentPerson, (error) => {
          if (error) {
            alert(error);
          }
        });
      } else if (!diplaymodalclick) {
        connecteduserUpdate({
          variables: {
            user: {
              id: gContext.data.currentPerson.id,
            },
          },
        });
        console.log('connectted', diplaymodalclick);
        socket.emit(
          'joinStore',
          gContext.data.currentPerson,
          camera.position,
          (error) => {
            if (error) {
              alert(error);
            }
          },
        );
      }
      if (!controls.current || !controls.current.isLocked) {
        setdiplaymodalclick(true);
      }
      if (positionModal || !carrefourView) {
        socket.emit('leaveStore', gContext.data.currentPerson, (error) => {
          if (error) {
            alert(error);
          }
        });

        if (controls.current) {
          controls.current.unlock();
        }

        setstoped(true);
      } else {
        setstoped(false);
        document.addEventListener('click', () => {
          setdiplaymodalclick(false);
          socket.emit(
            'joinStore',
            gContext.data.currentPerson,
            camera.position,
            (error) => {
              if (error) {
                alert(error);
              }
            },
          );

          if (controls.current) {
            controls.current.lock();
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionModal, carrefourView, displaychat]);
  // console.log('position', position && position[0] && position[0].camera);

  return (
    <>
      {!stoped && tuto && (
        <pointerLockControlsImpl
          ref={controls}
          args={[camera, gl.domElement]}
        />
      )}
      {position?.map((user) => (
        <mesh
          position={[user?.camera?.x, user?.camera?.y, user?.camera?.z]}
          material={materialHover}
          geometry={geometryHover}
        />
      ))}
    </>
  );
};
export default FPVControls;
