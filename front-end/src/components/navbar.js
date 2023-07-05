import { Layout, Menu } from 'antd';
import { UserOutlined, FormOutlined, CommentOutlined, MessageOutlined, BarChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { notification } from 'antd';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = () => {
    // Đoạn mã xử lý đăng xuất
    // ...
    navigate('/login');
    notification.success({
      message: "Bạn đã đăng xuất",
    });
  };

  const getKeyFromPathname = (pathname) => {
    if (pathname === '/home') {
      return '1';
    } else if (pathname === '/residents' || pathname === '/residents/create') {
      return '2';
    } else if (pathname === '/changes') {
      return '3';
    } else if (pathname === '/feedback' || pathname === '/create_feedback') {
      return '4';
    } else if (pathname === '/feedback_responses') {
      return '5';
    } else if (pathname === '/dashboard') {
      return '6';
    }
    return '1'; // Default selected key
  };

  const selectedKey = getKeyFromPathname(pathname);

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} style={{ display: 'flex' }}>
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
        <Menu.Item key="7" icon={<LogoutOutlined />} onClick={handleLogout} style={{ marginLeft: 'auto' }}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
