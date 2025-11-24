import { Modal, Typography } from 'antd';

const { Paragraph } = Typography;

export default function EmailBodyExampleModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      title="Email Body Example"
      onCancel={onClose}
      footer={null}
    >
      <Paragraph>
        You can write HTML here. Example:
      </Paragraph>
      <pre style={{
        background: '#f5f5f5',
        padding: 12,
        borderRadius: 4,
        overflowX: 'auto'
      }}>
{`<h1>Hello {{name}},</h1>
<p>This is a sample email body.</p>
<p><b>Best regards,</b><br>Your Name</p>`}
      </pre>
    </Modal>
  );
}
