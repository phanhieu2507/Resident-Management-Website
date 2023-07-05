import React, { useEffect, useState } from 'react';
import { Table, Space, message, Button, Tooltip, Select, Input} from 'antd';
import { EditOutlined, DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import axios from "../../api/axios";
import DetailResponseModal from './DetailResponseModal';
import UpdateResponseModal from './UpdateResponseModal';
import DeleteResponseModal from './DeleteResponseModal';

const {Option} = Select;
 
const ResponseTable = () => {
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchResponses = async () => {
    try {
      const res = await axios.get('/feedback_responses'); // Điều chỉnh endpoint API tương ứng
      setResponses(res.data);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };
  useEffect(() => {
   

    fetchResponses();
  }, []);

  const handleEdit = (record) => {
    setSelectedResponse(record);
    setUpdateModalVisible(true);
  };

  const handleDelete = (response) => {
    setSelectedResponse(response);
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setSelectedResponse(null);
    setDeleteModalVisible(false);
  };

  const handleDeleteSuccess = () => {
    // Xử lý cập nhật lại giao diện sau khi xóa thành công
    // Thí dụ: Gọi hàm để tải lại dữ liệu phản hồi
    // loadData();
    setDeleteModalVisible(false);
  };

  const handleEditClick = (record) => {
    setSelectedResponse(record);
    setModalVisible(true);
  };
  
  const handleUpdateSuccess = (updatedResponse) => {
    const updatedResponses = responses.map((response) => {
      if (response.id === updatedResponse.id) {
        return updatedResponse;
      }
      return response;
    });

    setResponses(updatedResponse);
    // setModalVisible(false);
    setSelectedResponse(updatedResponse);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  }

  const filteredResponses = responses.filter((response) =>
    Object.values(response).some((fieldValue) =>
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
      title: 'Feedback ID',
      dataIndex: 'feedback_id',
      key: 'feedback_id',
    },
    {
      title: 'Người phản hồi',
      dataIndex: 'responder',
      key: 'responder',
    },
    {
      title: 'Nội dung phản hồi',
      dataIndex: 'response_content',
      key: 'response_content',
    },
    {
      title: 'Ngày phản hồi',
      dataIndex: 'response_date',
      key: 'response_date',
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
        dataSource={filteredResponses}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleEditClick(record),
        })}

      />
      <DetailResponseModal
        visible={modalVisible}
        response={selectedResponse}
        feedbackId={selectedResponse?.feedback_id}
        onClose={() => setModalVisible(false)}
      />

      {selectedResponse && (
        <UpdateResponseModal
          visible={updateModalVisible}
          response={selectedResponse}
          onClose={() => setUpdateModalVisible(false)}
          updateSuccess={handleUpdateSuccess}
          fetchResponses={fetchResponses}
        />
      )}

      {selectedResponse && (
        <DeleteResponseModal
          visible={deleteModalVisible}
          response={selectedResponse}
          onCancel={handleDeleteCancel}
          onDeleteSuccess={handleDeleteSuccess}
          fetchResponses={fetchResponses}
        />
      )}

    </>
  );
};

export default ResponseTable;
