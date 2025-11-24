import { useState } from 'react';
import { Card, Typography, Space, Tag, Segmented } from 'antd';
import CreateUser from '../components/CreateUser';
import Login from '../components/Login'

const { Title, Text } = Typography;

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState('signin');

  return (
    <div className="min-h-screen flex lg:items-center justify-center lg:p-5">
      <div className="w-full max-w-3xl">
        <div className="lg:rounded-xl overflow-hidden lg:border lg:border-gray-100 lg:shadow-md">

          <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xl mb-4 md:mb-0">
                UM
              </div>
              <div className="flex-1">
                <Title level={4} className="text-white m-0">Ultra-Pro Mailer</Title>
                <Text className="text-white/90 text-sm md:text-base">
                  You can send bulk emails with the same subject and body — fast, secure, and personalized.
                </Text>
                <Space size={2} wrap className="mt-2">
                  <Tag color="processing">Realtime streaming</Tag>
                  <Tag color="success">Secure delivery</Tag>
                  <Tag color="default">User-friendly UI</Tag>
                </Space>
              </div>
              <div className="hidden sm:flex flex-col gap-1.5 items-end">
                <Tag>Trusted</Tag>
                <Tag>Rate-limit friendly</Tag>
              </div>
            </div>
          </div>

          <div className="py-4 md:p-6 mx-2">
            <div className="max-w-md mx-auto">
              <Space direction="vertical" size={3} className="w-full">
          <div className="flex justify-center mb-4">
  <Segmented
    options={[
      { label: 'Sign in', value: 'signin' },
      { label: 'Create account', value: 'create' }
    ]}
    value={mode}
    onChange={setMode}
    className="cursor-pointer w-auto min-w-[182px] rounded-lg shadow-sm"
  />
</div>
                <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-6 shadow-sm my-2">
                  {mode === 'signin' && <Login onAuth={onAuth} onSwitch={setMode} />}
                  {mode === 'create' && <CreateUser onCreated={onAuth} />}
                </div>

                <div className="text-center text-gray-500 text-xs md:text-sm">
                  Need help? <a href="mailto:aayushranjan200231@gmail.com" className="underline">aayushranjan200231@gmail.com</a>
                </div>

                <div className="text-center mt-2 text-gray-400 text-xs md:text-[12px]">
                  Built with ♥ using React & Firebase — © {new Date().getFullYear()} <b className="text-gray-600">Aayush Ranjan</b>
                </div>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
