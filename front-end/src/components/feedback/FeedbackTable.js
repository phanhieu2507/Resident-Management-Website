import React, { useEffect, useState } from 'react';
import { Table, Space, message, Button, Tooltip, Select, Checkbox, Input} from 'antd';
import { EditOutlined, DeleteOutlined, CommentOutlined, SearchOutlined } from '@ant-design/icons';
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
  const [searchText, setSearchText] = useState('');

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

  const handleReplySubmit = async () => {
    console.log("Phản hồi cho phản ánh có ID:", selectedFeedback.id);
    console.log("Nội dung phản hồi:", replyContent);
    
    try {
      // Gọi API PUT để cập nhật trạng thái thành "Đã xử lý"
      await axios.put(`/feedbacks/${selectedFeedback.id}`, { status: 'Đã xử lý' });
      
      setReplyVisible(false);
      setReplyContent('');
      // Cập nhật lại danh sách phản hồi
      fetchFeedbacks();
      
      
    } catch (error) {
      console.error('Error updating feedback status:', error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  }

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    Object.values(feedback).some((fieldValue) =>
      String(fieldValue).toLowerCase().includes(searchText.toLowerCase())
    )
  );
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
      defaultFilteredValue: ['Đang xử lý'],
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <div className="p-4">
          <Checkbox.Group
            className="flex flex-col"
            options={[
              { label: 'Đã xử lý', value: 'Đã xử lý' },
              { label: 'Đang xử lý', value: 'Đang xử lý' },
              { label: 'Đã tiếp nhận', value: 'Đã tiếp nhận' },
            ]}
            defaultValue={['Đang xử lý']}
            onChange={(checkedValues) => {
              setSelectedKeys(checkedValues);
              confirm();
            }}
          />
        </div>
      ),
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
        <Input.Search
          placeholder="Tìm kiếm"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
          style={{ marginBottom: 16}}
        />
        
        <Table
        dataSource={filteredFeedbacks}
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
