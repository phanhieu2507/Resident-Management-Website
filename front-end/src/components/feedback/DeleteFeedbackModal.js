import React, { useState } from 'react';
import { Modal } from 'antd';
import axios from "../../api/axios";

const DeleteFeedbackModal = ({ fetchFeedBacks, visible, feedback, onCancel, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Gửi yêu cầu xóa dữ liệu phản hồi tới API
      await axios.delete(`/feedbacks/${feedback.id}`); // Điều chỉnh endpoint API tương ứng

      setLoading(false);
      fetchFeedBacks();
      onDeleteSuccess();
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Xóa phản hồi"
      onCancel={onCancel}
      onOk={handleDelete}
      okText="Xóa"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <p>Bạn có chắc chắn muốn xóa phản hồi?</p>
    </Modal>
  );
};

export default DeleteFeedbackModal;
