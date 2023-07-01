import React, { useEffect, useState } from 'react';
import { Table, Space, message, Button} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from "../../api/axios";
import DetailModal from './DetailFeedback'
import UpdateFeedbackModal from './UpdateFeedbackModal';
import DeleteFeedbackModal from './DeleteFeedbackModal';
const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('/feedbacks'); // Điều chỉnh endpoint API tương ứng
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };
  useEffect(() => {
   

    fetchFeedbacks();
  }, []);

  const handleEdit = (record) => {
    setSelectedFeedback(record);
    setUpdateModalVisible(true);
  };

  const handleDelete = (feedback) => {
    setSelectedFeedback(feedback);
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setSelectedFeedback(null);
    setDeleteModalVisible(false);
  };

  const handleDeleteSuccess = () => {
    // Xử lý cập nhật lại giao diện sau khi xóa thành công
    // Thí dụ: Gọi hàm để tải lại dữ liệu phản hồi
    // loadData();
    setDeleteModalVisible(false);
  };

  const handleEditClick = (record) => {
    setSelectedFeedback(record);
    setModalVisible(true);
  };
  
  const handleUpdateSuccess = (updatedFeedback) => {
    const updatedFeedbacks = feedbacks.map((feedback) => {
      if (feedback.id === updatedFeedback.id) {
        return updatedFeedback;
      }
      return feedback;
    });

    setFeedbacks(updatedFeedbacks);
    // setModalVisible(false);
    setSelectedFeedback(updatedFeedback);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Họ tên',
      dataIndex: 'submitter',
      key: 'submitter',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'date_submitted',
      key: 'date_submitted',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Phân loại',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <div>
          <Space>
            <EditOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(record);
              }}
              style={{ marginRight: 8 }}
            />
            <DeleteOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(record);
              }}
              style={{ color: 'red' }}
            />
          </Space>
        </div>
      ),
    },
  ];

  return (
    <>
        <Table
        dataSource={feedbacks}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleEditClick(record),
        })}
      />
      <DetailModal
        visible={modalVisible}
        feedback={selectedFeedback}
        onClose={() => setModalVisible(false)}
      />

      {selectedFeedback && (
        <UpdateFeedbackModal
          visible={updateModalVisible}
          feedback={selectedFeedback}
          onClose={() => setUpdateModalVisible(false)}
          updateSuccess={handleUpdateSuccess}
          fetchFeedbacks={fetchFeedbacks}
        />
      )}

      {selectedFeedback && (
        <DeleteFeedbackModal
          visible={deleteModalVisible}
          feedback={selectedFeedback}
          onCancel={handleDeleteCancel}
          onDeleteSuccess={handleDeleteSuccess}
          fetchFeedBacks={fetchFeedbacks}
        />
      )}

    </>
  );
};

export default FeedbackTable;
