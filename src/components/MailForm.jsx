import { useState } from "react";
import { Form, Input, Button, Modal, Typography, Row, Col } from "antd";
import { toast, ToastContainer } from "react-toastify";
import ProgressPanel from "./ProgressPanel";
import AppPasswordGuide from "./AppPasswordGuide";
import EmailBodyExampleModal from "./EmailBodyExampleModal";
import "react-toastify/dist/ReactToastify.css";
import { sendBatchToServer } from "../utils/api";

const { Text } = Typography;

export default function MailForm({ user }) {
    const [form] = Form.useForm();
    const [sending, setSending] = useState(false);
    const [summary, setSummary] = useState(null);
    const [recentResults, setRecentResults] = useState([]);
    const [showAppPasswordGuide, setShowAppPasswordGuide] = useState(false);
    const [showBodyExample, setShowBodyExample] = useState(false);
    const [toastShown, setToastShown] = useState(false);

    const START_TOAST_ID = "sending-start-toast";

    const parseRecipientsText = (txt) =>
        txt
            .split(/\r?\n|[,;]+/)
            .map((s) => s.trim())
            .filter(Boolean);

    const chunk = (arr, size) => {
        const out = [];
        for (let i = 0; i < arr.length; i += size)
            out.push(arr.slice(i, i + size));
        return out;
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    const handleSend = async (values) => {
        try {
            toast.dismiss();

            setSummary(null);
            setRecentResults([]);
            setSending(true);
            setToastShown(false);

            toast.info("Preparing to send...", {
                toastId: START_TOAST_ID,
                autoClose: 2000,
            });
            setToastShown(true);

            const senderEmail = values.senderEmail?.trim();
            const senderPass = values.senderPass?.trim();
            const fromName = values.fromName?.trim();
            const subject = values.subject?.trim();
            const body = values.body?.trim();
            const recipientsText = values.recipientsText?.trim();

            if (!senderEmail || !senderPass)
                throw new Error("Sender email and app password required");
            if (!subject) throw new Error("Subject is required");

            const recipients = parseRecipientsText(recipientsText);
            if (!recipients.length)
                throw new Error("Please provide at least one recipient");

            const invalidEmails = recipients.filter(
                (email) => !isValidEmail(email),
            );
            if (invalidEmails.length > 0)
                throw new Error(
                    `Invalid email(s): ${invalidEmails.join(", ")}`,
                );

            const payload = {
                senderEmail,
                senderPass,
                fromName,
                subject,
                body,
                recipientsArray: recipients,
                concurrency: 6,
            };

            const resp = await sendBatchToServer(payload);
            setSummary(resp.summary);
            setRecentResults(resp.results);

            setSending(false);
            toast.dismiss(START_TOAST_ID);

            if (resp.summary.failed > 0) {
                toast.error(
                    `Completed with errors — Sent: ${resp.summary.success}, Failed: ${resp.summary.failed}`,
                    { autoClose: 5000 },
                );
            } else {
                toast.success(
                    `All done — Sent: ${resp.summary.success}, Failed: ${resp.summary.failed}`,
                    { autoClose: 5000 },
                );
            }
        } catch (err) {
            setSending(false);
            setSummary(null);
            setRecentResults([]);
            toast.dismiss(START_TOAST_ID);
            toast.error(err?.message || String(err), { autoClose: 6000 });
        } finally {
            setToastShown(false);
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" newestOnTop />

            <Form
                form={form}
                layout="vertical"
                initialValues={{ senderEmail: user?.email || "" }}
                onFinish={handleSend}
            >
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="senderEmail"
                            label="Sender Email"
                            rules={[
                                {
                                    required: true,
                                    message: "Sender email is required",
                                },
                                {
                                    type: "email",
                                    message: "Enter a valid email",
                                },
                            ]}
                        >
                            <Input placeholder="Sender email" size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="senderPass"
                            label={
                                <>
                                    App/SMTP Password{" "}
                                    <Text
                                        type="secondary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            setShowAppPasswordGuide(true)
                                        }
                                    >
                                        (How to create?)
                                    </Text>
                                </>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: "App password is required",
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="App password / SMTP pass"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="fromName" label="From Name (optional)">
                    <Input placeholder="From name" size="large" />
                </Form.Item>

                <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[
                        {
                            required: true,
                            message: "Subject is required",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input placeholder="Subject" size="large" />
                </Form.Item>

                <Form.Item name="body" label="Body (HTML or plain text)">
                    <Input.TextArea
                        rows={6}
                        placeholder="Write your email body (HTML or plain text)..."
                    />
                    <Button
                        type="link"
                        style={{ padding: 0 }}
                        onClick={() => setShowBodyExample(true)}
                    >
                        <Text
                            type="secondary"
                            style={{
                                cursor: "pointer",
                                display: "block",
                                marginTop: 4,
                            }}
                        >
                            Click here to see an example
                        </Text>
                    </Button>
                </Form.Item>

                <Form.Item
                    name="recipientsText"
                    label="Recipients"
                    extra="Tip: One email per line or comma/semicolon separated."
                    rules={[
                        {
                            required: true,
                            message: "Recipients are required",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input.TextArea
                        rows={6}
                        placeholder="alice@example.com\nbob@example.com"
                    />
                </Form.Item>

                <div style={{ textAlign: "right", marginTop: 12 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={sending}
                    >
                        {sending ? "Sending..." : "Send"}
                    </Button>
                </div>
            </Form>

            {summary && (
                <div className="mt-6">
                    <ProgressPanel
                        summary={summary}
                        recentResults={recentResults}
                        currentBatchIndex={1}
                        totalBatches={1}
                    />
                </div>
            )}

            <AppPasswordGuide
                open={showAppPasswordGuide}
                onClose={() => setShowAppPasswordGuide(false)}
            />
            <EmailBodyExampleModal
                open={showBodyExample}
                onClose={() => setShowBodyExample(false)}
            />
        </div>
    );
}
