import { Layout, Menu } from 'antd';
import { UserOutlined, FormOutlined, CommentOutlined, MessageOutlined, BarChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/home">Hộ khẩu</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/residents">Nhân khẩu</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FormOutlined />}>
        <Link to="/changes">Thay đổi</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<CommentOutlined />}>
        <Link to="/feedback">Ý kiến</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<MessageOutlined />} onClick={() => navigate('/feedback_responses')}>
          Phản hồi
        </Menu.Item>
        <Menu.Item key="6" icon={<BarChartOutlined />}>
        <Link to="/dashboard">Thống kê</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
