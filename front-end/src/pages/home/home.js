import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
// import "antd/dist/antd.css";
import {
  Button,
} from "antd";
import Navbar from "../../components/navbar";
import HouseholdTable from "../../components/home/HouseholdTable";
import { useNavigate } from "react-router-dom";
const Home = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("/households"); // Thay đổi đường dẫn API tương ứng
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
      {/* <Navbar /> */}
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Danh sách hộ khẩu</h1>
          <Button
            className="bg-blue-500"
            type="primary"
            onClick={() => navigate('/create') }
          >
            Tạo mới hộ khẩu
          </Button>
        </div>
        <HouseholdTable data={data} fetchData={fetchData} />

      </div>
    </>
  );
};

export default Home;
