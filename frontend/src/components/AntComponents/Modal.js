import { Modal } from 'antd';
import "antd/dist/antd.less";

export const info = (id) => {
    Modal.info({
      title: 'Your account was succesfully created',
      content: (
        <div>
          <p>For subsequent login in purposes you will be required to use your assigned ID Number</p>
          <p>ID Number is <strong>{id}</strong></p>
        </div>
      ),
      onOk() {},
    });
}
  