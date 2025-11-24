import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Button, Typography } from "antd";

const { Text } = Typography;

const Navbar = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    const menu = (
        <Menu>
            <Menu.Item key="user-info" disabled>
                <div className="flex flex-col">
                    <Text strong>{user?.displayName || "Unnamed User"}</Text>
                    <Text type="secondary" className="text-xs">
                        {user?.email}
                    </Text>
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="signout">
                <Button
                    type="text"
                    className="w-full text-left px-0"
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <header className="flex items-center justify-between mb-8 border-b border-gray-300 shadow-lg p-3 px-5 bg-white rounded-xl">
            {/* Left section (custom avatar remains unchanged) */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-md">
                    UM
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold">
                        Ultra-Pro Mailer
                    </h1>
                    <p className="text-sm text-slate-500">
                        Fast • Secure • Beautiful UI
                    </p>
                </div>
            </div>

            {user && (
                <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottomRight"
                    onVisibleChange={(visible) => setMenuOpen(visible)}
                    visible={menuOpen}
                >
                    <Button
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition"
                        icon={<UserOutlined />}
                    >
                        <span className="text-sm font-medium hidden sm:inline">
                            {user.displayName || "User"}
                        </span>
                    </Button>
                </Dropdown>
            )}
        </header>
    );
};

export default Navbar;
