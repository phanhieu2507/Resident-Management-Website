import React, { useState, useEffect } from "react";
import { Table, notification, Modal,Button } from "antd";

import http from "../../http";
const FeedbackResponse = ({ }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const dataFetch = await http.get("/api/feedback_responses");
      console.log(dataFetch.data);
      setData(dataFetch.data);
    };
    fetch();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Feedback ID",
      dataIndex: "feedback_id",
      key: "feedback_id",
    },
    {
      title: "Responder",
      dataIndex: "responder",
      key: "responder",
    },
    {
        title: "Content",
        dataIndex: "response_content",
        key: "response_content",
      },
    {
      title: "Date",
      dataIndex: "response_date",
      key: "response_date",
    },
  
    
  ];
 
  

  
  return (
    <>
      <Table
        dataSource={data} columns={columns}
      /> 
    </>
  );
};

export default FeedbackResponse;
