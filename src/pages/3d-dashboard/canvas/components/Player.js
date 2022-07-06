/* eslint-disable import/prefer-default-export */
import React, { useEffect, useRef } from 'react';
import { useSphere } from 'use-cannon';
import { useThree, useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';
import FPVControls from './FPVControls';
import { useKeyboardControls } from '../hooks/useKeyboardControls';

const SPEED = 6;

export const Player = ({
  positionModal,
  position,
  carrefourView,
  setdiplaymodalclick,
  gContext,
  deconnecteduser,
  connecteduserUpdate,
  diplaymodalclick,
  displaychat,
  skipTuto,
  // setusersposition,
}) => {
  const { camera } = useThree();

  const { moveForward, moveBackward, moveLeft, moveRight, jump, louta } =
    useKeyboardControls();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position,
  }));

  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useFrame(() => {
    camera.position.copy(ref.current.position);
    const direction = new Vector3();
    let frontVector;
    if (displaychat) {
      frontVector = new Vector3(0, 0, 0);
    } else if (!positionModal) {
      frontVector = new Vector3(
        0,
        0,
        (moveBackward ? 1 : 0) - (moveForward ? 1 : 0),
      );
    } else {
      frontVector = new Vector3(0, 0, 0);
    }

    let sideVector;
    if (displaychat) {
      sideVector = new Vector3(0, 0, 0);
    } else if (!positionModal || !displaychat) {
      sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);
    } else {
      sideVector = new Vector3(0, 0, 0);
    }
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (!displaychat) {
      if (
        !positionModal &&
        jump &&
        Math.abs(velocity.current[1].toFixed(2)) < 0.05
      ) {
        api.velocity.set(velocity.current[0], 8, velocity.current[2]);
      }
      if (
        !positionModal &&
        louta &&
        Math.abs(velocity.current[1].toFixed(2)) < 0.05
      ) {
        api.velocity.set(velocity.current[0], -10, velocity.current[2]);
      }
    }
  });
  return (
    <FPVControls
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
  );
};
