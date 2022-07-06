import React, { memo } from 'react';
import { useBox } from 'use-cannon';

const Cube = ({ position, args }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args,
  }));

  return (
    <mesh castShadow ref={ref}>
      {/* <boxBufferGeometry attach="geometry" args={args} />
      {' '}
      <meshStandardMaterial attach="material" transparent /> */}
    </mesh>
  );
};

export default memo(Cube);
