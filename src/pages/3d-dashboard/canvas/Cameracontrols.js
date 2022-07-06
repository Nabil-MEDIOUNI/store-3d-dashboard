import React from 'react';
import { useThree } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import './styles/styles.css';

const Cameracontrols = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  camera.position.x = 5;
  camera.position.y = -15;
  camera.position.z = 3;
  return (
    <OrbitControls
      args={[camera, domElement]}
      autoRotate={false}
      enableZoom
      zoom0={5}
      maxPolarAngle={Math.PI / 2 - 1}
      minPolarAngle={Math.PI / 2 - 1}
    />
  );
};

export default Cameracontrols;
