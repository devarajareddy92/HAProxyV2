import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Select, Button } from "antd";
// import "./Default.css";

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
    return (
        <div className="default-container">
            <h3>Default Section</h3>
            &nbsp;&nbsp;&nbsp;
            <Form layout="horizontal" className="default-form">
                <div className="form-row">
                    <Form.Item
                        label={<span style={{ fontWeight: '500', display: 'inline-block', width: "5cm", textAlign: 'left', fontSize: "12px" }}>Timeout Connect <a style={{ color: "red" }}>*</a></span>}

                        className="formItem">
                        <InputNumber style={{ fontWeight: '500', display: 'inline-block', textAlign: 'left', fontSize: "12px", width: 150 }} min={0} suffix="sec" />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontWeight: '500', display: 'inline-block', width: "5cm", textAlign: 'left', fontSize: "12px" }}>Timeout Client <a style={{ color: "red" }}>*</a></span>}

                        className="formItem">
                        <InputNumber style={{ fontWeight: '500', display: 'inline-block', textAlign: 'left', fontSize: "12px", width: 150 }} min={0} suffix="sec" />
                    </Form.Item>
                </div>
                <div className="form-row">
                    <Form.Item
                        label={<span style={{ fontWeight: '500', display: 'inline-block', width: "5cm", textAlign: 'left', fontSize: "12px" }}>Timeout Server <a style={{ color: "red" }}>*</a></span>}

                        className="formItem">
                        <InputNumber style={{ fontWeight: '500', display: 'inline-block', textAlign: 'left', fontSize: "12px", width: 150 }} min={0} suffix="sec" />
                    </Form.Item>
                    <Form.Item
                        label={<span style={{ fontWeight: '500', display: 'inline-block', width: "5cm", textAlign: 'left', fontSize: "12px" }}>HTTP Log  <a style={{ color: "red" }}>*</a></span>}
                        className="formItem">
                        <Select style={{ fontWeight: '500', display: 'inline-block', textAlign: 'left', fontSize: "12px", width: 150 }}  >
                            <Option value="Yes">Yes</Option>
                            <Option value="No">No</Option>
                        </Select>
                    </Form.Item>
                </div>
                <Form.Item className="button-group">
                    <Button type="default">Previous</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary">Save</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="default">Next</Button>
                </Form.Item>
            </Form>

            <div className="submit-container">
                <Button type="primary" className="submit-button">
                    Final Submit
                </Button>
            </div>
        </div>
    );
};

export default Default;
