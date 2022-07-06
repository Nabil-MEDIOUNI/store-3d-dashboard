/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { usePlane } from 'use-cannon';
import { TextureLoader, RepeatWrapping } from 'three';
import grass from '../images/grass.jpg';

export const Ground = ({
  props,
  gContext,
  positionModal,
  setPositionModal,
  setposition,
}) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const texture = new TextureLoader().load(grass);

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);
  const handelclick = (x, y, z) => {
    setPositionModal(true);
    setposition({ posX: x, posY: y, posZ: z });
  };
  return (
    <mesh
      ref={ref}
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((coord) =>
          Math.ceil(coord),
        );
        !gContext.DeltePositionDevice &&
          gContext.AddPositionDevice &&
          !positionModal &&
          handelclick(x, y, z);
      }}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial map={texture} attach="material" />
    </mesh>
  );
};
