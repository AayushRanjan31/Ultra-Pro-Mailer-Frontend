import { Card, Progress, List, Typography, Tag, Divider } from 'antd';

const { Text } = Typography;

export default function ProgressPanel({ summary, recentResults = [], currentBatchIndex = 0, totalBatches = 0 }) {
  const percent = summary && summary.total ? Math.round((summary.success / summary.total) * 100) : 0;

  console.log(summary)

  return (
    <Card
      title="Send Progress"
      bordered
      style={{ width: '100%' }}
      headStyle={{ fontWeight: 'bold' }}
      bodyStyle={{ padding: '16px' }}
    >

      <div className="flex justify-between mb-3">
        <div>
          <Text type="secondary">Progress</Text>
          <div style={{ fontSize: 16, fontWeight: 500 }}>
            {summary ? `${summary.success || 0} / ${summary.total || 0}` : 'Preparing...'}
          </div>
        </div>
        <div>
          <Text type="secondary">{currentBatchIndex}/{totalBatches} batches</Text>
        </div>
      </div>

      <Progress
        percent={percent}
        status={percent === 100 ? 'success' : 'active'}
        showInfo={false}
        strokeColor={{ '0%': '#34D399', '100%': '#059669' }}
        style={{ marginBottom: 12 }}
      />

      <div style={{ marginBottom: 12 }}>
        <Text type="success">Success: {summary?.success ?? 0}</Text> •{' '}
        <Text type="danger">Failed: {summary?.failed ?? 0}</Text>
      </div>

      <Divider style={{ margin: '12px 0' }} />

      <List
        size="small"
        bordered
        style={{ maxHeight: 250, overflowY: 'auto' }}
        dataSource={recentResults.slice().reverse()}
        renderItem={(r) => (
          <List.Item
            style={{
              backgroundColor: r.success ? '#ECFDF5' : '#FEF2F2',
              borderRadius: 6,
              marginBottom: 4,
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <Text strong ellipsis>{r.to}</Text>
              {!r.success && (
                <div>
                  <Text type="danger" style={{ fontSize: 12 }} ellipsis>
                    {r.error}
                  </Text>
                </div>
              )}
            </div>
            <Tag color={r.success ? 'green' : 'red'}>{r.success ? 'Sent' : 'Failed'}</Tag>
          </List.Item>
        )}
      />
    </Card>
  );
}
