import React from 'react'
import { useState} from 'react';
import { Table} from "antd";
import ChangeDetailModal from './ChangeDetailModal';

const ChangeTable = ({ data,fetchData }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChange, setSelectedChange] = useState(null);
   

  const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
      title: "Mã hộ khẩu",
      dataIndex: "household_id",
      key: "household_id",
  },
    {
        title: "Mã nhân khẩu",
        dataIndex: "resident_id",
        key: "resident_id",
    },
    {
        title: "Loại thay đổi",
        dataIndex: "change_type",
        key: "change_type",
    },
    {
        title: "Ngày thay đổi",
        dataIndex: "change_date",
        key: "change_date",
    },
    {
        title: "Thông tin mới",
        dataIndex: "new_value",
        key: "new_value",
    },
    {
        title: "Ghi chú",
        dataIndex: "notes",
        key: "notes",
    },
 
  ];  

   
    
    const handleRowClick = (record) => {
        fetchData()
        setSelectedChange(record);
        setModalVisible(true);
      };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        
      />
      <ChangeDetailModal
        selectedChange={selectedChange}
        modalVisible={modalVisible}
        handleModalClose={() => setModalVisible(false)}
      />

    </>
  )
}

export default ChangeTable;