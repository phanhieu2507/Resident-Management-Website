import React from 'react';
import { Modal, Typography } from 'antd';

const { Text } = Typography;

const DetailModal = ({ feedback, visible, onClose }) => {
  return (
    <Modal
      title="Thông tin chi tiết ý kiến/phản ảnh"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {feedback && (
        <div>
          <Text strong>Họ tên: </Text>
          <Text>{feedback.submitter}</Text>
          <br />
          <Text strong>Số điện thoại: </Text>
          <Text>{feedback.phone_number}</Text>
          <br />
          <Text strong>Địa chỉ: </Text>
          <Text>{feedback.address}</Text>
          <br />
          <Text strong>Ngày gửi: </Text>
          <Text>{feedback.date_submitted}</Text>
          <br />
          <Text strong>Nội dung: </Text>
          <Text>{feedback.content}</Text>
          <br />
          <Text strong>Trạng thái: </Text>
          <Text>{feedback.status}</Text>
        </div>
      )}
    </Modal>
  );
};

export default DetailModal;
