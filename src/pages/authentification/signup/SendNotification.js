/* eslint-disable camelcase */
import Axios from 'axios';

import { OS_TOKEN } from '../../../apollo/config';
import { SEND_SUBSCRIPTION } from '../../../apollo/mutations/notification';

const SendNotification = (posted_to, title, description) => {
  SEND_SUBSCRIPTION({
    title,
    body: description,
    type: 'new_device_position',
    notified_to: {
      can_view: posted_to,
    },
  });
  const os_data_1 = JSON.stringify({
    app_id: '35dd9083-8523-4adc-a37b-c080e05d30c8',
    headings: {
      en: title,
    },
    contents: {
      en: description,
    },
    chrome_web_icon:
      'https://res.cloudinary.com/sofia-technologies/image/upload/v1618445132/favicon_czxgdr.png',
    huawei_small_icon:
      'https://res.cloudinary.com/sofia-technologies/image/upload/v1618445132/favicon_czxgdr.png',
    isAnyWeb: true,
    filters: [
      {
        field: 'tag',
        key: 'is_admin',
        value: true,
      },
    ],
  });
  Axios.post('https://onesignal.com/api/v1/notifications', os_data_1, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: OS_TOKEN,
    },
  });
};

export default SendNotification;
