import React, { useState } from 'react';
import { Modal, notification } from 'antd';
import axios from "../../api/axios";

const DeleteResponseModal = ({ fetchResponses, visible, response, onCancel, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Gửi yêu cầu xóa dữ liệu phản hồi tới API
      await axios.delete(`/feedback_responses/${response.id}`); // Điều chỉnh endpoint API tương ứng

      setLoading(false);
      fetchResponses();
      onDeleteSuccess();

      // Hiển thị thông báo thành công và tự động biến mất sau 3 giây
      notification.success({
        message: 'Xóa thành công',
        duration: 2,
        closable: false
      });
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setLoading(false);

      // Hiển thị thông báo không thành công và tự động biến mất sau 3 giây
      notification.error({
        message: 'Xóa không thành công',
        duration: 2,
        closable: false
      });
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
      okButtonProps={{ className: 'bg-red-500 text-white' }} // Thêm lớp CSS cho nút Xóa và đặt màu chữ là trắng
      // cancelButtonProps={{ className: 'bg-gray-300' }} // Thêm lớp CSS cho nút Hủy
    >
      <p>Bạn có chắc chắn muốn xóa phản hồi?</p>
    </Modal>
  );
};

export default DeleteResponseModal;
