import React from 'react';

import Cube from './Cube';

export default function Cubes() {
  return (
    <>
      {/* // èIT WIN TA7yA */}

      <Cube position={[0, 1, 0.3]} args={[11, 3, 0.125]} />
      <Cube position={[-5.75, 1, 6]} args={[0.125, 3, 11]} />
      <Cube position={[5.8, 1, 4.25]} args={[0.125, 3, 7.5]} />
      {/* // reuion */}
      <Cube position={[-0.75, 1, 4]} args={[5, 1, 0.0125]} />
      {/* // reuion */}

      {/* <Cube
        position={[-0.25, 1, 5.125]}
        args={[5, 1, 0.0125]}
      /> */}
      {/* // reuion */}

      <Cube position={[-0.75, 1, 6.75]} args={[5, 1, 0.0125]} />
      {/* // èIT BAèTHA EL EBB */}

      <Cube position={[-1.5, 1, 12]} args={[8, 3, 0.125]} />
    </>
  );
}
