import React, { useState } from 'react';
import { createPopper } from '@popperjs/core';
import { Edit } from '@material-ui/icons';
import { useMutation } from '@apollo/react-hooks';

import { IconButton } from '@material-ui/core';
import { DELETE_PERSON } from '../../apollo/mutations/person';
import { ALL_PEOPLE } from '../../apollo/queries/people';
import EditModel from './EditModel';

const TableDropdown = ({ person }) => {
  const [editModel, setEditModel] = useState(false);
  const [showModel, setModel] = useState({ show: false, id: null });

  const getPerson = (id) => {
    setModel({
      show: !showModel.show,
      id,
    });
  };
  const [deletePerson] = useMutation(DELETE_PERSON, {
    refetchQueries: [{ query: ALL_PEOPLE }],
  });

  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  return (
    <>
      <IconButton
        className="text-gray-600 py-1 px-3"
        onClick={() => {
          createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: 'right-start',
          });
          setDropdownPopoverShow(!dropdownPopoverShow);
          getPerson(person.id);
        }}
      >
        <Edit style={{ fontSize: 16 }} />
      </IconButton>
      <div
        style={{
          position: 'fixed',
          right: '5rem',
        }}
        ref={popoverDropdownRef}
        className={`${
          dropdownPopoverShow ? 'block ' : 'hidden '
        }bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48`}
      >
        {showModel.show && person.id === showModel.id && (
          <>
            <a
              href="#pablo"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
              onClick={() => setEditModel(true)}
            >
              Edit Person
            </a>
            <EditModel
              person={person}
              open={editModel}
              onClose={() => {
                setEditModel(false);
                setModel(false);
                setDropdownPopoverShow(false);
              }}
            />
            <a
              href="#pablo"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
              onClick={() =>
                deletePerson({
                  variables: {
                    id: person.id,
                  },
                }).then(() => {
                  setModel(false);
                  setDropdownPopoverShow(false);
                })
              }
            >
              Delete Person
            </a>
          </>
        )}
      </div>
    </>
  );
};

export default TableDropdown;
