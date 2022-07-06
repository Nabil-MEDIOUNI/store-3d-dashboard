import React, { useContext } from 'react';
import UserInfoContext from '../../components/UserInfo/UserInfoContext';
import UserAvatar from '../../components/_common/Avatar';
import ChangeCover from './Operations/ChangeCover';

export default function CardProfile() {
  const { data: user } = useContext(UserInfoContext);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div
              className="w-full px-4 flex justify-center"
              style={{ marginTop: '-3rem' }}
            >
              <div className="relative">
                <ChangeCover />
                <UserAvatar size="90px" border userAvatar />
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
              {user?.currentPerson.full_name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500" />
              {user?.currentPerson.address || '-'}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-gray-300 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 leading-relaxed text-gray-800">
                  An artist of considerable range lorem. Do velit eu labore
                  nulla aliquip labore incididunt duis commodo aliquip ex
                  incididunt labore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
