import React, { useState, useEffect } from 'react';
import { Layout, Typography, Collapse, Card, Alert } from 'antd';
import axios from 'axios';
// import './YourStyles.css'; 

const { Title } = Typography;
const { Panel } = Collapse;
const { Content } = Layout;

const StatusPage = () => {
    const [activeStatus, setActiveStatus] = useState('');
    const [runningSince, setRunningSince] = useState('');
    const [logsText, setLogsText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch data for activeStatus, runningSince, logsText, and messages
        axios.get('/api/status') // Replace with your API endpoint
            .then(response => {
                setActiveStatus(response.data.active_status);
                setRunningSince(response.data.running_since);
                setLogsText(response.data.logs_text);
                setMessages(response.data.messages);
            })
            .catch(error => console.error('Error fetching status data:', error));
    }, []);

    return (
        <Layout>
            <Content style={{ padding: '50px' }}>
                <div className="status-container">
                    <div className="status">
                        <span className="status-label">Status:</span>
                        <span className="status-value" id="activeStatus">{activeStatus}</span>
                        <span className="status-value1">{runningSince}</span>
                        <br />
                        <br />
                        <hr />
                        <Collapse accordion>
                            <Panel header="Service-Logs >>>" key="1">
                                <Card>
                                    <pre><code>{logsText}</code></pre>
                                </Card>
                            </Panel>
                        </Collapse>
                        <br />
                        <div>
                            <Title level={5}>NOTE:</Title>
                            <Typography.Paragraph>
                                1. All the configuration changes to HAProxy are based on the current running version
                                of the HAProxy configuration file located at /etc/haproxy/haproxy.cfg.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                2. Please explicitly commit the changes by pressing the Final Submit button during
                                configuration changes.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                3. Temporary uncommitted changes will be lost post re-login.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                4. Changes can be carried out with an OS user with sudo privileges.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                5. The portal provides a feature to view the error logs in case of any
                                misconfiguration in HAProxy. The feature is available in the menu options.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                6. Refer to the SOP in the help section for configuring HAProxy from GUI. Click here to
                                view.
                            </Typography.Paragraph>
                        </div>
                    </div>
                </div>
                {messages.length > 0 && messages.map((message, index) => (
                    <Alert key={index} message={message} type="info" showIcon />
                ))}
            </Content>
        </Layout>
    );
};

export default StatusPage;
