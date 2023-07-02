import React from 'react'
import { Modal} from "antd";


const ChangeDetailModal = ({ selectedChange, modalVisible, handleModalClose }) => {
    return (
        <>
        <Modal
          title="Thông tin thay đổi"
          visible={modalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={800}
        > 
        {selectedChange && (
          <div>
            <p>ID: {selectedChange.id}</p>
            <p>Mã hộ khẩu: {selectedChange.resident_id}</p>
            <p>Loại thay đổi: {selectedChange.change_type}</p>
            <p>Ngày thay đổi: {selectedChange.change_date}</p>
            <p>Thông tin mới: {selectedChange.new_value}</p>
            <p>Ghi chú: {selectedChange.notes}</p>
          </div>
        )}


        </Modal>
  
      </>
    )
    
}


export default ChangeDetailModal;