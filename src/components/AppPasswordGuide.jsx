import { Modal, Typography, Steps, Space } from 'antd';
import { GoogleOutlined, WindowsOutlined, YahooOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;
const { Step } = Steps;

const AppPasswordGuide = ({ open, onClose }) => {
  const steps = [
    {
      title: 'Gmail / Google',
      icon: <GoogleOutlined style={{ color: '#DB4437' }} />,
      description: (
        <>
          Go to <a href="https://myaccount.google.com/security" target="_blank" rel="noreferrer">Google Security</a> → App passwords → Generate → Copy password.
        </>
      ),
    },
    {
      title: 'Outlook / Hotmail',
      icon: <WindowsOutlined style={{ color: '#0078D4' }} />,
      description: (
        <>
          Go to <a href="https://account.live.com/proofs/manage" target="_blank" rel="noreferrer">Microsoft Security</a> → App passwords → Generate → Copy password.
        </>
      ),
    },
    {
      title: 'Yahoo',
      icon: <YahooOutlined style={{ color: '#6001D2' }} />,
      description: (
        <>
          Go to <a href="https://login.yahoo.com/account/security" target="_blank" rel="noreferrer">Yahoo Security</a> → App passwords → Generate → Copy password.
        </>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      title="How to create App/SMTP Password"
      onCancel={onClose}
      footer={null}
    >
      <Paragraph>
        Some email providers require an App/SMTP Password instead of your main password. Follow these steps to generate one:
      </Paragraph>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Steps
          direction="vertical"
          current={-1}
          items={steps.map(step => ({
            title: step.title,
            icon: step.icon,
            description: step.description,
          }))}
        />
      </Space>
    </Modal>
  );
}

export default AppPasswordGuide;
