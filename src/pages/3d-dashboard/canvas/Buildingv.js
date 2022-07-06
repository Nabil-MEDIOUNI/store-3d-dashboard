import React from 'react';
import { useGLTF } from 'drei';

export default function Model({ setDisplayCursor }) {
  const gltf = useGLTF('static/3d/carrefour_store_skaf.glb', '/draco-gltf');
  console.log('gltf', gltf);
  if (gltf) {
    setDisplayCursor(false);
  }
  return <primitive object={gltf.scene} dispose={null} />;
}
useGLTF.preload('static/3d/carrefour_store_skaf.glb');
