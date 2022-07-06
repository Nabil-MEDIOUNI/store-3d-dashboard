import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import CameraAltTwoToneIcon from '@material-ui/icons/CameraAltTwoTone';
import Loading from '../../../components/_common/Loading';
import Alert from '../../../utils/alert';
import { PHOTO_UPDATE } from '../../../apollo/mutations/currentPerson';
import { USER_INFO } from '../../../apollo/queries/userQueries';

const ChangeCover = () => {
  const [openAlert, setAlert] = useState(false);

  const [changeCoverPhoto, { loading, error }] = useMutation(PHOTO_UPDATE, {
    refetchQueries: [
      {
        query: USER_INFO,
      },
    ],
  });

  const onDrop = useCallback(
    ([file]) => {
      changeCoverPhoto({ variables: { file } });
      setAlert(true);
    },
    [changeCoverPhoto],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (loading) {
    return (
      <>
        <Box
          position="absolute"
          left="49%"
          zIndex="99"
          top="40%"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <Loading />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <CameraAltTwoToneIcon
            style={{
              position: 'absolute',
              zIndex: 99,
              bottom: 0,
              right: 0,
              background: 'white',
              borderRadius: '50%',
              boxShadow: '0px 0px 10px #d0d0d0',
              padding: 2,
            }}
          />
        ) : (
          <CameraAltTwoToneIcon
            style={{
              position: 'absolute',
              zIndex: 99,
              bottom: 0,
              right: 0,
              background: 'white',
              borderRadius: '50%',
              boxShadow: '0px 0px 10px #d0d0d0',
              padding: 2,
            }}
          />
        )}
      </Box>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'Photo is changed successfully!',
      )}
    </>
  );
};

export default ChangeCover;
