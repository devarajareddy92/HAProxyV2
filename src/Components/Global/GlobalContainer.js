import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Tooltip, Row, Col } from 'antd';
import '../CssFolder/StyleCss.css';
// import 'antd/dist/antd.css';


const { Option } = Select;

const GlobalContainer = () => {
    const [newJsonData, setNewJsonData] = useState({});
    const [tlsSecurity, setTlsSecurity] = useState('');
    const [showMaxMinVersions, setShowMaxMinVersions] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleSubmit = (values) => {
        console.log('Form values: ', values);
        alert('Form submitted');
    };

    const handleSave = () => {
        alert('Data Saved');
    };

    useEffect(() => {
        // Update the screen width whenever the window is resized
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const decodeEntities = (encodedString) => {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = encodedString;
        return textArea.value;
    };
    const handleTlsSecurityChange = (value) => {
        setTlsSecurity(value);
        if (value === 'Allow') {
            setShowMaxMinVersions(true);
        } else {
            setShowMaxMinVersions(false);
        }
    };

    return (
        <>
            <div className="globalContainer">
                <Form
                    onFinish={handleSubmit}
                    initialValues={newJsonData}
                    layout="horizontal"
                >
                    <div className="content-box1">
                        <hr />
                        <Form.Item
                            name="maxconn"
                            className='inline-form-item'
                            label={
                                <Tooltip title="The maximum allowed concurrent connections for this server. Once reached, additional connection attempts may be rejected or queued, depending on configuration.">
                                    Max Connection
                                </Tooltip>

                            }
                        >
                            <Input style={{ fontWeight: '500', display: 'inline-block', marginLeft: screenWidth > 1000 ? '2.5%' : '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%", }}
                                type="number" placeholder="Enter Max-conn number" />
                        </Form.Item>

                        <Form.Item
                            name="tlsSecurity"
                            label="TLS Security:"

                        >
                            <Select style={{ fontWeight: '500', display: 'inline-block', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%", }}
                                placeholder="Select TLS Security"
                                onChange={handleTlsSecurityChange}
                            >
                                <Option value="No Action">No Action</Option>
                                <Option value="Allow">Allow</Option>
                                <Option value="Block">Block</Option>
                            </Select>
                        </Form.Item>
                        {/* {tlsSecurity === 'Allow' && ( */}
                        {showMaxMinVersions && (
                            <>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="maxVersion"
                                            label="Max-Versions:"
                                        >
                                            <Select style={{ fontWeight: '500', display: 'inline-block', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%", }}
                                                placeholder="Select Max Version">
                                                <Option value="SSLv3">SSLv3</Option>
                                                <Option value="TLSv1.0">TLSv1.0</Option>
                                                <Option value="TLSv1.1">TLSv1.1</Option>
                                                <Option value="TLSv1.2">TLSv1.2</Option>
                                                <Option value="TLSv1.3">TLSv1.3</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="minVersion"
                                            label="Min-Versions:"
                                        >
                                            <Select style={{ fontWeight: '500', display: 'inline-block', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%", }}
                                                placeholder="Select Min Version">
                                                <Option value="SSLv3">SSLv3</Option>
                                                <Option value="TLSv1.0">TLSv1.0</Option>
                                                <Option value="TLSv1.1">TLSv1.1</Option>
                                                <Option value="TLSv1.2">TLSv1.2</Option>
                                                <Option value="TLSv1.3">TLSv1.3</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        )}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="ciphers"
                                    label="Cipher:"
                                >
                                    <Input style={{ fontWeight: '500', display: 'inline-block', marginLeft: '12.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%", }}
                                        placeholder="Enter ciphers" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="IP Address"
                                    label="IP Address/Port:"
                                >
                                    <Input style={{ fontWeight: '500', display: 'inline-block', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%", }}
                                        placeholder="Enter IP Address/Port" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    <Form.Item>
                        <Button style={{alignContent:'center'}} type="primary" htmlType="submit">
                            Final Submit
                        </Button>
                        <Button type="default" onClick={handleSave} style={{ marginLeft: '10px' }}>
                            Save
                        </Button>
                    </Form.Item>
                </Form >
            </div >
        </>
    );
};

export default GlobalContainer;
