import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Tooltip, Row, Col, Spin } from 'antd';
import '../CssFolder/StyleCss.css';
import IpAddress from '../../IPConfig';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;

const GlobalContainer = (props) => {
    const IP = IpAddress();
    const [tlsSecurity, setTlsSecurity] = useState('');
    const [showMaxMinVersions, setShowMaxMinVersions] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const [Jsondata, setJsonData] = useState({});
    const [LoadingFlag, setLoadingFlag] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    console.log('protokenis this',props.protoken);

    const location = useLocation();
    const navigate = useNavigate();

    const inputStyle = {
        fontWeight: '500',
        textAlign: 'left',
        fontSize: "12px",
        width: '100%',
        maxWidth: '200px',
    };
    const formItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',  // Align items to the left
        width: '100%',
        marginBottom: '20px',
    };
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1300px',
        backgroundColor: '#fff',

    };

    const containerStyle = {
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#dee2e6',
        padding: '20px'
    };
    const headerStyle = {
        position: 'relative',
        marginBottom: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
    };

    const buttonGroupStyle = {
        textAlign: 'left',
        marginTop: '20px',
    };

    const handleSubmit = (values) => {
        console.log('Form values: ', values);
        alert('Form submitted');
    };


    var protokenGlobal;

    try {
        protokenGlobal = props.protoken
        
    } catch (exception) {
        navigate("/")
    }
    console.log("the token is ",protokenGlobal)
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
        // if (tlsSecurity !== 'Allow') {
        setTlsSecurity(value);
        if (value === 'Allow') {
            setShowMaxMinVersions(true);
        } else {
            setShowMaxMinVersions(false);
        }
        // }
    };
    // console.log("Jsondata is this",Jsondata.data.data)
    useEffect(() => {
        setLoadingFlag(true)
        fetch(IP + "global", {
            headers: {
                "Authorization": protokenGlobal
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Jsondata", data)
                if (data.error === 0) {
                    setJsonData(data)
                    console.log("The data is", data);
                    setLoadingFlag(false)

                } else if (data.error === 1) {
                    // navigate('/');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [form]);

    useEffect(() => {
        form.setFieldsValue({ [`maxconn`]: Jsondata?.data?.data?.maxconn })
        form.setFieldValue({ [`tlsSecurity`]: "Allow" })
        form.setFieldsValue({ [`maxVersion`]: Jsondata?.data?.data?.runtime_apis[0]?.ssl_max_ver })
        form.setFieldsValue({ [`minVersion`]: Jsondata?.data?.data?.runtime_apis[0]?.ssl_min_ver })
        form.setFieldsValue({ [`ciphers`]: Jsondata?.data?.data?.runtime_apis[0]?.ciphers })
        form.setFieldsValue({ [`IP Address`]: Jsondata?.data?.data?.runtime_apis[0]?.address })


    }, [Jsondata]);

    const handleSave = () => {
        form.validateFields()
            .then(values => {
                setLoadingFlag(true);
                console.log('Saved values:', values);

                // Make a POST request to save the form data
                axios.post(IP + "save_global", values, {
                    headers: {
                        'Authorization': protokenGlobal,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        console.log('Save response:', response);
                        setLoadingFlag(false);
                        if (response.status === 200 && response.data.error === 0) {
                            alert('Saved successfully!');
                        } else {
                            alert('Save failed: ' + response.data.msg);
                        }
                    })
                    .catch(error => {
                        console.error('Save error:', error);
                        setLoadingFlag(false);
                        alert('An error occurred while saving.');
                    });
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    // console.log("Jsondata?.data?.data?.maxconn", Jsondata?.data?.data && Jsondata?.runtime_apis?.data)

    return (

        <div
            style={{
                padding: "20px",
                backgroundColor: "#dee2e6",
                minHeight: "100vh",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: "100vh",
                    maxHeight: "100vh",
                }}
            >
                <div
                    style={{
                        marginBottom: "20px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                        padding: "20px",
                    }}
                >
                    <div
                        style={{
                            marginBottom: "20px",
                            fontSize: "18px",
                            fontWeight: "bold",
                        }}
                    >
                        Global Section
                    </div>
                    {/* {fetchLoading ? (
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        ) : ( */}
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical"
                        style={{ maxWidth: "600px", width: "100%" }}
                    >
                        <Form.Item
                            name="maxconn"
                            className='inline-form-item'
                            label={<span style={{ marginBottom: "20px" }}>Max Connection <a style={{ color: "red" }}>*</a></span>}
                        >
                            <Input

                                style={{
                                    fontWeight: "500",
                                    textAlign: "left",
                                    fontSize: "12px",
                                    width: "100%",
                                    maxWidth: screenWidth > 1000 ? "400px" : "300px",
                                }}

                                type="number" />

                        </Form.Item>

                        <Form.Item
                            name="tlsSecurity"
                            label="TLS Security:"
                            style={{ marginBottom: "20px" }}
                        >
                            <Select
                                style={{
                                    fontWeight: "500",
                                    textAlign: "left",
                                    fontSize: "12px",
                                    width: "100%",
                                    maxWidth: screenWidth > 1000 ? "400px" : "300px",
                                }}
                                placeholder="Select TLS Security"
                                onChange={handleTlsSecurityChange}
                                defaultValue={"Allow"}
                            >
                                <Option value="No Action">No Action</Option>
                                <Option value="Allow">Allow</Option>
                                <Option value="Block">Block</Option>
                            </Select>
                        </Form.Item>
                        {/* {tlsSecurity === 'Allow' && ( */}
                        {showMaxMinVersions && (

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="maxVersion"
                                        label="Max Version:"
                                        style={{
                                            marginBottom: "20px",
                                            width: "100%",
                                            maxWidth: "300px",
                                        }}
                                    >
                                        <Select
                                            style={{
                                                fontWeight: "500",
                                                textAlign: "left",
                                                fontSize: "12px",
                                                width: "100%",
                                            }}
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
                                        label="Min Version:"
                                        style={{
                                            marginBottom: "20px",
                                            width: "100%",
                                            maxWidth: "300px",
                                        }}
                                    >
                                        <Select
                                            style={{
                                                fontWeight: "500",
                                                textAlign: "left",
                                                fontSize: "12px",
                                                width: "100%",
                                            }}
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

                        )}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="ciphers"
                                    label="Cipher:"
                                    style={{
                                        marginBottom: "20px",
                                        width: "100%",
                                        maxWidth: "300px",
                                    }}
                                >
                                    <Input
                                        style={{
                                            fontWeight: "500",
                                            textAlign: "left",
                                            fontSize: "12px",
                                            width: "100%",
                                        }}
                                        /* <Input style={{ fontWeight: '500', display: 'inline-block', marginLeft: '12.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%", }} */
                                        placeholder="Enter ciphers" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="IP Address"
                                    label="IP Address/Port:"
                                    style={{
                                        marginBottom: "20px",
                                        width: "100%",
                                        maxWidth: "300px",
                                    }}

                                >
                                    <Input
                                        style={{
                                            fontWeight: "500",
                                            textAlign: "left",
                                            fontSize: "12px",
                                            width: "100%",
                                        }} placeholder="Enter IP Address/Port" />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Form.Item style={{ marginTop: "20px" }}>
                            <Button type="primary" htmlType="submit">
                                Final Submit
                            </Button>
                            <Button
                                type="default"
                                onClick={handleSave}
                                style={{ marginLeft: "10px" }}
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Form >
                </div>
            </div >
        </div>

    );
};

export default GlobalContainer;
