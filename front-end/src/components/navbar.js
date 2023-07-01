import { Layout, Menu } from 'antd';
import { UserOutlined, FormOutlined, CommentOutlined, MessageOutlined, BarChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const Navbar = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/">Hộ khẩu</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Nhân khẩu
        </Menu.Item>
        <Menu.Item key="3" icon={<FormOutlined />}>
          Thay đổi
        </Menu.Item>
        <Menu.Item key="4" icon={<CommentOutlined />}>
        <Link to="/feedback">Ý kiến</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<MessageOutlined />}>
          Phản hồi
        </Menu.Item>
        <Menu.Item key="6" icon={<BarChartOutlined />}>
          Thống kê
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
