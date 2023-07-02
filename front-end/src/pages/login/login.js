import React from "react";
import { Layout, Form, Input, Button, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    if (values.email ==="admin@gmail.com" && values.password === "123456") {
        navigate('/home');
    
  }else (navigate('/login'))
}

  return (
    <Layout>
      <Content className="flex items-center justify-center h-screen">
        <div className="w-80 p-6 bg-white rounded-lg shadow-md">
          <Title level={2} className="mb-4">
            Login
          </Title>
          <Text className="mb-4 block text-gray-500">
            Please enter your login details to sign in
          </Text>
          <Form onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
             
            </Form.Item>
            <Text type="danger" className="block">
                Forgot Password?
              </Text>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-500"
                onClick={onFinish}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <Text className="block mt-4 mb-2 text-center">
            Don’t have an account? <a href="#">Create an account</a>
          </Text>
          <Text className="text-center mt-4 block">or continue with</Text>
          <div className="flex justify-center mt-4 mb-4">
            <Button type="link" className="mr-2 text-gray-500 text-3xl">
              <GoogleOutlined />
            </Button>
            <Button type="link" className="mr-2 text-gray-500 text-3xl">
              <FacebookOutlined />
            </Button>
            <Button type="link" className="text-gray-500 text-3xl">
              <TwitterOutlined />
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
