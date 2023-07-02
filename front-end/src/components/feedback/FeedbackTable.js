import React, { useEffect, useState } from 'react';
import { Table, Space, message, Button, Tooltip, Select} from 'antd';
import { EditOutlined, DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import axios from "../../api/axios";
import DetailModal from './DetailFeedback'
import UpdateFeedbackModal from './UpdateFeedbackModal';
import DeleteFeedbackModal from './DeleteFeedbackModal';
import ReplyInput from './ReplyInput';

const {Option} = Select;
 
const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [replyContent, setReplyContent] = useState('');


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

   const handleReply = (record) => {
    setSelectedFeedback(record);
    setReplyVisible(true);
  };

  const handleReplyCancel = () => {
    setSelectedFeedback(null);
    setReplyVisible(false);
    setReplyContent('');
  };

  const handleReplySubmit = () => {
    console.log("Phản hồi cho phản ánh có ID:", selectedFeedback.id);
    console.log("Nội dung phản hồi:", replyContent);
    // Gửi phản hồi đến API tại đây (sử dụng axios.post hoặc phương thức tương tự)
    setReplyVisible(false);
    setReplyContent('');
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
      filters: [
        { text: 'Đã xử lý', value: 'Đã xử lý' },
        { text: 'Đang xử lý', value: 'Đang xử lý' },
        { text: 'Đã tiếp nhận', value: 'Đã tiếp nhận' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <div>
          <Space>
            <Tooltip title="Chỉnh sửa">
              <EditOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(record);
                }}
                style={{ marginRight: 8 }}
              />
            </Tooltip>
            {record.status !== 'Đã xử lý' && (
              <Tooltip title="Phản hồi">
                <CommentOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReply(record);
                  }}
                />
              </Tooltip>
            )}
            <Tooltip title="Xóa">
              <DeleteOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(record);
                }}
                style={{ color: 'red' }}
              />
            </Tooltip>
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

      {replyVisible && (
        <ReplyInput
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          feedbackId={selectedFeedback.id}
          visible={replyVisible}
          onSubmit={handleReplySubmit}
          onCancel={handleReplyCancel}
        />
      )}

    </>
  );
};

export default FeedbackTable;
