import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import ChangeTable from "../../components/change/ChangeTable";

const Change = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/changes"); // Thay đổi đường dẫn API tương ứng
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Danh sách thay đổi</h1>
        </div>
        <ChangeTable data={data} fetchData={fetchData} />
      </div>
    </>
  );
};

export default Change;
