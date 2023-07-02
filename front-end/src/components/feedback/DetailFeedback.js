import React, {useEffect, useState} from 'react';
import { Card, Modal, Typography } from 'antd';
import axios from "../../api/axios";
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
        <Card>
          <div className="mb-4">
            <Text strong>Họ tên: </Text>
            <Text>{feedback.submitter}</Text>
          </div>
          <div className="mb-4">
            <Text strong>Số điện thoại: </Text>
            <Text>{feedback.phone_number}</Text>
          </div>
          <div className="mb-4">
            <Text strong>Địa chỉ: </Text>
            <Text>{feedback.address}</Text>
          </div>
          <div className="mb-4">
            <Text strong>Ngày gửi: </Text>
            <Text>{feedback.date_submitted}</Text>
          </div>
          <div className="mb-4">
            <Text strong>Nội dung: </Text>
            <Text>{feedback.content}</Text>
          </div>
          <div className="mb-4">
            <Text strong>Trạng thái: </Text>
            <Text>{feedback.status}</Text>
          </div>
        </Card>
      )}
    </Modal>
  );
};

export default DetailModal;
