import { notification, message } from 'antd';
// import 'antd/es/notification/style/index.css'
// import 'antd/es/message/style/index.css'


export const successfulSignUp = () => {
  const args = {
    message: 'Your account was created successfully!',
    description:
      'You can now log into your account with your credentials',
    duration: 3,
  };
  notification.open(args);
};


export const success = () => {
  message.success('Logged in succesfully', 3);
};