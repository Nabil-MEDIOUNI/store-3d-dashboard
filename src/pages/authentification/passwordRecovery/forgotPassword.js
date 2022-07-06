import React, { useState } from 'react';
import { Typography, Box } from '@material-ui/core';
import AuthNavbar from '../../../components/Navbars/AuthNavbar';
import useStyles from './styles';
import Alert from '../../../utils/alert';
import { FORGOT_PASSWORD } from '../../../apollo/mutations/authentification';

const ForgotPassword = () => {
  const classes = useStyles();
  const [openAlert, setAlert] = useState(false);
  const [error, setError] = useState({ message: undefined });
  const [email, setEmail] = useState('');

  const submitreset = (e) => {
    e.preventDefault();
    FORGOT_PASSWORD({ email }).then((res) => {
      if (res.error) {
        setError({
          message: `Graphql error: ${res.error}`,
        });
        setAlert(true);
      } else {
        setError('');
        setAlert(true);
        localStorage.setItem('resetEmail', email);
      }
    });
  };

  return (
    <>
      <AuthNavbar white transparent />
      <main>
        <section className="relative w-full h-full pt-32 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${'/static/img/register_bg_2.webP'})`,
            }}
          />
          <div className="container mt mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h2 className="text-gray-600 font-bold">
                        Forgot Password ?
                      </h2>
                    </div>
                    <Box mt={1.5}>
                      <Typography className={classes.text}>
                        {' '}
                        We just need your registered email address to send you
                        password reset.
                      </Typography>
                    </Box>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={submitreset}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Send Email
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'The Email is sent successfully!',
      )}
    </>
  );
};

export default ForgotPassword;
