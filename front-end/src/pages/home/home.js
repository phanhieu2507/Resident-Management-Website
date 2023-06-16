import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
// import "antd/dist/antd.css";
import { Table, Select } from "antd";
import Navbar from "../../components/navbar";

const Home = () => {
    const [data, setData] = useState([]);
    useEffect( () => {
        const getData = async () => {
        await axios.get('households').then((res) => {
          setData(res.data);
          console.log(res.data);
        })}
        getData();
        
      }, []);
    const columns = [
    {
      title: "Chủ hộ",
      dataIndex: "head_of_household",
     
    },
    {
      title: "Số nhà",
      dataIndex: "house_number",
      
    },
    {
        title: "Đường",
        dataIndex: "street",
        
      },
      {
        title: "Phường",
        dataIndex: "ward",
        
      },
      {
        title: "Quận",
        dataIndex: "district",
        
      },
      {
        title: "Ngày đăng kí",
        dataIndex: "date_of_registration",
        
      },
]
      
   return (<>
    <Navbar/>
   <Table columns={columns}
   dataSource={data}
   />
   </>
   )
    
}

export default Home;