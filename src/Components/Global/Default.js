import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Select, Button, Divider } from "antd";

const { Option } = Select;

const Default = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
        padding: '40px',
        backgroundColor: '#dee2e6',
        padding:'20px'
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

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', justifyContent: 'left', width: '100%'}}>
                <div style={{ width: '100%' }}>
                    <div style={{ marginBottom: '20px', border: '1px solid #d9d9d9', borderRadius: '4px', backgroundColor: '#fff', textAlign: 'left',paddingLeft:'40px'  }}>
                        <br/>
                        <div style={headerStyle}>
                            Default Section
                        </div>
                        <br />
                        <Form layout="vertical" style={formStyle}>
                            <Form.Item label="Timeout Connect" style={formItemStyle}>
                                <InputNumber style={inputStyle} min={0} />
                            </Form.Item>

                            <Form.Item label="Timeout Client" style={formItemStyle}>
                                <InputNumber style={inputStyle} min={0} />
                            </Form.Item>

                            <Form.Item label="Timeout Server" style={formItemStyle}>
                                <InputNumber style={inputStyle} min={0} />
                            </Form.Item>

                            <Form.Item label="HTTP Log" style={formItemStyle}>
                                <Select style={inputStyle}>
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item style={buttonGroupStyle}>
                                <Button type="default" style={{ marginRight: '10px' }}>Previous</Button>
                                <Button type="primary" style={{ marginRight: '10px' }}>Save</Button>
                                <Button type="default">Next</Button>
                            </Form.Item>
                        </Form>

                        <Divider />
                        <div style={{ textAlign: 'left', paddingBottom: '20px' }}>
                            <Button type="primary" style={{ marginTop: '20px' }}>
                                Final Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Default;
