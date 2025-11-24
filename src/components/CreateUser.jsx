import { useState } from "react";
import { Form, Input, Button, Typography, Alert, Space } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { toast } from "react-toastify";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    UserOutlined,
    MailOutlined,
    LockOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const CreateUser = ({ onCreated }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [errorMsg, setErrorMsg] = useState("");

    const TOAST_ID_SUCCESS = "create-success";
    const TOAST_ID_ERROR = "create-error";

    const handleCreate = async (values) => {
        setErrorMsg("");
        setLoading(true);
        const { name, email, password } = values;
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password,
            );
            if (name.trim()) {
                await updateProfile(res.user, { displayName: name.trim() });
            }
            toast.success("Account created successfully", {
                toastId: TOAST_ID_SUCCESS,
            });
            form.resetFields();
            if (onCreated) onCreated(res.user);
        } catch (error) {
            const msg =
                error?.code === "auth/email-already-in-use"
                    ? "This email is already registered. Try signing in."
                    : error?.message || "Failed to create account. Try again.";
            toast.error(msg, { toastId: TOAST_ID_ERROR });
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Space direction="vertical" size={3} className="w-full">
                <div className="mb-3">
                    {errorMsg && (
                        <Alert
                            message={errorMsg}
                            type="error"
                            showIcon
                            closable
                            onClose={() => setErrorMsg("")}
                        />
                    )}
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreate}
                    requiredMark={false}
                >
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your full name",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            size="large"
                            placeholder="e.g. Aayush Ranjan"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email address",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            size="large"
                            placeholder="you@example.com"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password",
                            },
                            {
                                min: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            size="large"
                            placeholder="Choose a strong password"
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                        />
                    </Form.Item>

                    <div className="mb-3">
                        <Text type="secondary" className="text-xs">
                            By creating an account you agree to our{" "}
                            <a href="#" className="text-indigo-600">
                                Terms
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-indigo-600">
                                Privacy Policy
                            </a>
                            .
                        </Text>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </Button>
                    </Form.Item>
                </Form>
            </Space>
        </div>
    );
};

export default CreateUser;
