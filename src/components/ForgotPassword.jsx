import React, { useState } from "react";
import { Form, Input, Button, Alert, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { toast } from "react-toastify";

const ForgotPassword = ({ onBack }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleReset = async (values) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await sendPasswordResetEmail(auth, values.email.trim());
            setSuccess("Password reset email sent! Check your inbox.");
            toast.success("Password reset email sent!");
        } catch (err) {
            setError(err?.message || "Failed to send reset email.");
            toast.error(err?.message || "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Space direction="vertical" size={3} className="w-full">
                <div className="mb-3">
                    {error && (
                        <Alert
                            message={error}
                            type="error"
                            showIcon
                            closable
                            onClose={() => setError("")}
                        />
                    )}
                    {success && (
                        <Alert
                            message={success}
                            type="success"
                            showIcon
                            closable
                            onClose={() => setSuccess("")}
                        />
                    )}
                </div>
                <Form
                    layout="vertical"
                    onFinish={handleReset}
                    requiredMark={false}
                >
                    <Form.Item
                        name="email"
                        label="Enter your email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email",
                            },
                            { type: "email", message: "Enter a valid email" },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            size="large"
                            placeholder="you@example.com"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                        >
                            {loading ? "Sending..." : "Send Reset Email"}
                        </Button>
                    </Form.Item>

                    <Button
                        type="link"
                        onClick={onBack}
                        className="text-indigo-600 hover:underline p-0"
                    >
                        Back to Sign in
                    </Button>
                </Form>
            </Space>
        </div>
    );
};

export default ForgotPassword;
