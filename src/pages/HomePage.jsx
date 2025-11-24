// src/pages/HomePage.jsx
import MailForm from '../components/MailForm';
import { Typography, Divider, Row, Col, Avatar,} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function HomePage({ user }) {
  return (
    <div className="max-w-5xl mx-auto p-3 lg:p-6 bg-white lg:rounded-xl lg:shadow-lg">
      <Row gutter={[16, 16]} align="middle" className="mb-6">
       <Col>
    <Avatar 
      size={64} 
      src={user?.photoURL || null} 
      icon = {<UserOutlined /> }
    />
  </Col>
        <Col flex="auto">
          <Title level={2} className="mb-1">
            Welcome, {user?.name || 'User'}!
          </Title>
          <Paragraph type="secondary">
            This is your dashboard. You can manage and send bulk emails below.
          </Paragraph>
        </Col>
      </Row>

      <Divider />

      <div>   
        <Title level={3}>Compose Email</Title>
        <Divider/>
        <MailForm user={user} />
      </div>
    </div>
  );
}
