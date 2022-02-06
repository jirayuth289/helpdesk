import { notification } from "antd";

interface NOTI_PROPS {
  type: string;
  message?: string;
}

const openNotificationWithIcon = ({ type, message }: NOTI_PROPS) => {
  notification[type]({
    message: type,
    description: message || 'ขอภัยในความไม่สะดวกระบบไม่สามารถใช้งานได้ชั่วคราว กรุณาลองใหม่ภายหลัง',
  });
};

export { openNotificationWithIcon };
