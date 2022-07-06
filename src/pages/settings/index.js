import React, { useState } from 'react';

import { useMutation } from 'react-apollo';

import { USER_INFO } from '../../apollo/queries/userQueries';
import { CURRENT_PERSON_UPDATE } from '../../apollo/mutations/currentPerson';

import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderStats from '../../components/Headers/HeaderStats';
import FooterAdmin from '../../components/Footers/FooterAdmin';

import CardProfile from './CardProfile';
import CardSettings from './CardSettings';

export default function Dashboard() {
  const initialState = {
    first_name: '',
    last_name: '',
    full_name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postal_code: 0,
  };
  const [person, setPerson] = useState(initialState);
  const [currentPersonUpdate, { error }] = useMutation(CURRENT_PERSON_UPDATE, {
    refetchQueries: [{ query: USER_INFO }],
  });
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4">
              <CardSettings
                person={person}
                setPerson={setPerson}
                saveChanges={currentPersonUpdate}
                error={error}
              />
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <CardProfile />
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
