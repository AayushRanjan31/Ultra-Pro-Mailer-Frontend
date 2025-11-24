import { useState } from "react";
import { Form, Input, Button, Typography, Alert, Space, Divider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { auth } from "../utils/firebaseConfig";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import ForgotPassword from "./ForgotPassword";

const { Title, Text } = Typography;

const GoogleSVG = (
    <svg
        width="18"
        height="18"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <path
            fill="#4285f4"
            d="M533.5 278.4c0-17.4-1.6-34.2-4.6-50.4H272v95.4h147.4c-6.3 34-25 62.8-53.3 82.2v68.2h86.1c50.4-46.5 81.3-114.9 81.3-195.4z"
        />
        <path
            fill="#34a853"
            d="M272 544.3c72.6 0 133.6-24.1 178.2-65.6l-86.1-68.2c-24.5 16.5-55.8 26.2-92.1 26.2-70.8 0-130.8-47.8-152.2-112.1H33.5v70.6C77.9 495.8 168.6 544.3 272 544.3z"
        />
        <path
            fill="#fbbc04"
            d="M119.8 323.6c-10.8-32.2-10.8-66.6 0-98.8V154.2H33.5c-39.2 76.4-39.2 166.9 0 243.3l86.3-74z"
        />
        <path
            fill="#ea4335"
            d="M272 109.7c39.4 0 74.9 13.6 102.8 40.4l77.1-77.1C407.6 24.1 346.6 0 272 0 168.6 0 77.9 48.5 33.5 154.2l86.3 70.6C141.2 157.5 201.2 109.7 272 109.7z"
        />
    </svg>
);

const FacebookSVG = (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <path
            fill="#1877F2"
            d="M22.675 0h-21.35C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24H12.81v-9.294H9.692V11.41h3.118V8.797c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.311h3.588l-.467 3.296h-3.121V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"
        />
    </svg>
);

const Login = ({}) => {
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);
    const [error, setError] = useState("");
    const [forgot, setForgot] = useState(false);

    const TOAST_SUCCESS = "login-success";
    const TOAST_ERROR = "login-error";
    const TOAST_SOCIAL = "login-social";

    const onFinish = async (values) => {
        setError("");
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(
                auth,
                values.email.trim(),
                values.password,
            );
            toast.success("Signed in", { toastId: TOAST_SUCCESS });
        } catch (err) {
            const code = err?.code;
            if (code === "auth/wrong-password")
                setError("Incorrect password. Try again.");
            else if (code === "auth/user-not-found")
                setError("No account found for this email.");
            else if (code === "auth/invalid-email")
                setError("Please enter a valid email.");
            else setError("Sign-in failed. Check credentials.");
            toast.error(err?.message || "Sign-in failed", {
                toastId: TOAST_ERROR,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSocial = async (providerName) => {
        setError("");
        setSocialLoading(true);
        try {
            let provider;
            if (providerName === "google") provider = new GoogleAuthProvider();
            else provider = new FacebookAuthProvider();
            const res = await signInWithPopup(auth, provider);
            toast.success("Signed in", { toastId: TOAST_SUCCESS });
        } catch (err) {
            setError("Social sign-in failed.");
            toast.error(err?.message || "Social sign-in failed", {
                toastId: TOAST_SOCIAL,
            });
        } finally {
            setSocialLoading(false);
        }
    };

    if (forgot) {
        return <ForgotPassword onBack={() => setForgot(false)} />;
    }

    return (
        <div className="w-full">
            <Space direction="vertical" size={3} className="w-full">
                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError("")}
                    />
                )}

                <Button
                    onClick={() => handleSocial("google")}
                    loading={socialLoading}
                    block
                    size="large"
                    className="flex items-center justify-center gap-2 mb-2 mt-3"
                >
                    {GoogleSVG} <span>Continue with Google</span>
                </Button>

                <Button
                    onClick={() => handleSocial("facebook")}
                    loading={socialLoading}
                    block
                    size="large"
                    className="flex items-center justify-center gap-2"
                >
                    {FacebookSVG} <span>Continue with Facebook</span>
                </Button>

                <Divider plain>or sign in with email</Divider>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                >
                    <Form.Item
                        name="email"
                        label="Email"
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

                    <Form.Item
                        name="password"
                        label={
                            <div className="flex justify-between items-center w-100">
                                <span>Password</span>
                                <button
                                    type="button"
                                    onClick={() => setForgot(true)}
                                    className="text-indigo-600 text-sm hover:underline cursor-pointer"
                                >
                                    Forgot?
                                </button>
                            </div>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            size="large"
                            placeholder="Enter password"
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
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </Form.Item>
                </Form>
            </Space>
        </div>
    );
};

export default Login;
