/* eslint-disable no-unused-expressions */
import React, { memo, useState } from 'react';
import { useBox } from 'use-cannon';

import * as textures from '../textures';

const Device = ({
  position,
  texture,
  removeCube,
  gContext,
  setPositionModal,
  setposition,
}) => {
  const [hover, setHover] = useState(null);

  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));
  const color = texture === 'glass' ? 'skyblue' : 'white';
  const handelclick = (x, y, z) => {
    setPositionModal(true);
    setposition({ posX: x, posY: y, posZ: z });
  };

  return (
    <>
      <mesh
        castShadow
        ref={ref}
        onPointerMove={(e) => {
          e.stopPropagation();
          setHover(Math.floor(e.faceIndex / 2));
        }}
        onPointerOut={() => {
          setHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          const clickedFace = Math.floor(e.faceIndex / 2);
          const { x, y, z } = ref.current.position;
          if (clickedFace === 0) {
            gContext.DeltePositionDevice
              ? removeCube(x, y, z)
              : handelclick(x, y, z);
          }
          if (clickedFace === 1) {
            gContext.DeltePositionDevice
              ? removeCube(x, y, z)
              : handelclick(x, y, z);
            return;
          }
          if (clickedFace === 2) {
            gContext.DeltePositionDevice
              ? removeCube(x, y, z)
              : handelclick(x, y, z);
            return;
          }
          if (clickedFace === 3) {
            gContext.DeltePositionDevice
              ? removeCube(x, y, z)
              : handelclick(x, y, z);
            return;
          }
          if (clickedFace === 4) {
            gContext.DeltePositionDevice
              ? removeCube(x, y, z)
              : handelclick(x, y, z);
            return;
          }
          if (clickedFace === 5) {
            gContext.DeltePositionDevice
              ? removeCube(x, y, z)
              : handelclick(x, y, z);
          }
        }}
      >
        <boxBufferGeometry attach="geometry" />{' '}
        <meshStandardMaterial
          attach="material"
          map={textures[texture]}
          color={hover != null ? 'gray' : color}
          opacity={texture === 'glass' ? 0.7 : 1}
          transparent
        />
      </mesh>
    </>
  );
};

function equalProps(prevProps, nextProps) {
  const equalPosition =
    prevProps.position.x === nextProps.position.x &&
    prevProps.position.y === nextProps.position.y &&
    prevProps.position.z === nextProps.position.z;

  return equalPosition && prevProps.texture === nextProps.texture;
}

export default memo(Device, equalProps);
