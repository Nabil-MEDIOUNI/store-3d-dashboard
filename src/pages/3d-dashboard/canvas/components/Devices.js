import React from 'react';
import { useStore } from '../hooks/useStore';
import { useInterval } from '../hooks/useInterval';

import Device from './Device';

export default function Devices(props) {
  const [cubes, addCube, removeCube, saveWorld] = useStore((state) => [
    state.cubes,
    state.addCube,
    state.removeCube,
    state.saveWorld,
  ]);

  useInterval(
    () => {
      saveWorld(cubes);
    },
    // every 10 seconds
    10000,
  );

  return cubes.map((cube) => (
    <Device
      key={cube.key}
      texture={cube.texture}
      position={cube.pos}
      addCube={addCube}
      removeCube={removeCube}
      gContext={props.gContext}
      setPositionModal={props.setPositionModal}
      setposition={props.setposition}
    />
  ));
}
