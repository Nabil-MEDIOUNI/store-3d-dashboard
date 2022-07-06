import React, { useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import AddIcon from '@material-ui/icons/Add';
import { HTML } from 'drei';

const CursorPointer = ({
  display,
  carrefourView,
  positionModal,
  diplaymodalclick,
}) => {
  const ref = useRef();
  const { camera } = useThree();
  useFrame(() => {
    ref.current && (ref.current.position.x = 0);
    ref.current && (ref.current.position.y = 10);
    ref.current && (ref.current.position.z = camera.position._z);
  });

  return (
    <>
      {!positionModal && (
        <mesh ref={ref}>
          <HTML scaleFactor={100}>
            <div className="curser">
              {!display && carrefourView && (
                <AddIcon
                  style={{
                    position: 'absolute',
                    top: '50%',
                    width: '25px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 99999,
                    color: 'black',
                    zoom: '22%',
                  }}
                />
              )}
              {diplaymodalclick && !display && carrefourView && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    width: 'max-content',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 99999,
                    background: 'white',
                    padding: 8,
                    borderRadius: 8,
                    cursor: 'pointer',
                    zoom: '22%',
                  }}
                >
                  <p
                    style={{
                      color: 'black',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    click here
                  </p>
                </div>
              )}
            </div>
          </HTML>
        </mesh>
      )}
    </>
  );
};

export default CursorPointer;
