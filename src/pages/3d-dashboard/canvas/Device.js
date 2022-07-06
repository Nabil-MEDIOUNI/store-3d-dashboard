import React, { useRef, useState } from 'react';
import usePromise from 'react-promise-suspense';
import { HTML } from 'drei';
import * as THREE from 'three';

import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';

import Widget from './components/Widget/index';

const materialDefault = new THREE.MeshPhysicalMaterial({
  color: 0x00cc00,
  roughness: 0.8,
});
const materialHover = new THREE.MeshPhysicalMaterial({
  color: 0xcc0000,
  roughness: 0.1,
});

const geometryDefault = new THREE.DodecahedronBufferGeometry(0.1);
const geometryHover = new THREE.DodecahedronBufferGeometry(0.2);

const data = [
  { name: 'Page A', increment: 200 },
  { name: 'Page B', increment: 1000 },
  { name: 'Page C', increment: 600 },
  { name: 'Page D', increment: 1600 },
  { name: 'Page D', increment: 1000 },
  { name: 'Page H', increment: 2260 },
  { name: 'Page K', increment: 400 },
];

const Dodecahedron = ({ location, device, position }) => {
  const [hovered, setHover] = useState(false);
  usePromise((ms) => new Promise((res) => setTimeout(res, ms)), [0]);

  return (
    <mesh
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      material={hovered ? materialHover : materialDefault}
      geometry={hovered ? geometryHover : geometryDefault}
      onClick={() => location.push(`/devices/${device.id}`)}
    >
      {hovered && (
        <HTML scaleFactor={10}>
          <div className="picker">
            <Widget styleName="gx-card-full">
              <div className="gx-actchart gx-px-3 gx-pt-3 gx-pb-2 gx-d-flex gx-flex-row">
                <h2 className="gx-mb-0 gx-mr-2 gx-fs-lg">
                  {device.temperature.value || 0} C°
                  <i className="icon icon-menu-up gx-fs-sm" />
                </h2>
                <p className="gx-mb-0 gx-text-grey gx-fs-sm">{device.name}</p>
              </div>
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart
                  data={data}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <Tooltip />
                  <defs>
                    <linearGradient id="color07" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#FF557F" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#6757DE"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="increment"
                    stackId="2"
                    strokeWidth={0}
                    stroke="#4D95F3"
                    fill="url(#color07)"
                    fillOpacity={1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Widget>
          </div>
        </HTML>
      )}
    </mesh>
  );
};

const Device = ({ devices, location, gContext }) => {
  const ref = useRef();
  return (
    <group ref={ref}>
      {devices?.allDevices?.map((device) => (
        <Dodecahedron
          location={location}
          device={device}
          position={[
            device.position?.values.posX,
            1.5,
            device.position?.values.posZ,
          ]}
          gContext={gContext}
        />
      ))}
    </group>
  );
};

export default Device;
