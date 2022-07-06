import React, { useState } from 'react';

import { CONTACT_US } from '../../apollo/mutations/contact';
import Alert from '../../utils/alert';

export default function Contact() {
  const initialState = {
    name: '',
    email: '',
    message: '',
    phone: '',
  };
  const [contact, setContact] = useState(initialState);
  const [openAlert, setAlert] = useState(false);
  const [validationError, setError] = useState({ message: '' });

  const sendContact = (e) => {
    e.preventDefault();
    CONTACT_US(contact).then((data) => {
      if (data.error) {
        setError({ message: `Graphql error: ${data.error}` });
        setAlert(true);
      } else {
        setError('');
        setContact(initialState);
        setAlert(true);
      }
    });
  };

  return (
    <>
      <div className="section" id="contact">
        <div className="container-contact">
          <div className="col-md-12">
            <h1
              style={{
                textAlign: 'center',
                marginTop: '-3rem',
                fontSize: '2rem',
              }}
            >
              Contact us
            </h1>
          </div>
          <br />
          <br />
          <div className="col-md-4" data-aos="fade-up">
            <div className="clearfix" />
            <div className="h-50" />
          </div>
          <div className="col-md-8" data-aos="fade-up">
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
              onSubmit={sendContact}
              className="contact-bg"
            >
              <input
                style={{ paddingLeft: 12 }}
                type="text"
                required
                name="name"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
                className="form-control"
                placeholder="Your Name"
              />
              <input
                style={{ paddingLeft: 12 }}
                type="email"
                required
                name="email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                className="form-control"
                placeholder="Your E-mail"
              />
              <input
                style={{ paddingLeft: 12 }}
                type="number"
                required
                name="phone"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
                className="form-control"
                placeholder="Phone Number"
              />
              <textarea
                name="message"
                className="form-control"
                required
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
                placeholder="Your Message"
                style={{ height: 120, paddingLeft: 12, paddingTop: 8 }}
              />
              <button type="submit" name="submit" className="btn btn-glance">
                Send
              </button>
              <div id="success">
                <p className="green textcenter">
                  Your message was sent successfully! I will be in touch as soon
                  as I can.
                </p>
              </div>
              <div id="error">
                <p>
                  Something went wrong, try refreshing and submitting the form
                  again.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {Alert(
        validationError,
        openAlert,
        () => setAlert(false),
        'Your message is sent successfully!',
      )}
    </>
  );
}
