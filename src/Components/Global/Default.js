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
    <div>
      <h1>Default Section</h1>

      <Form layout="horizontal">
        <Form.Item label="Timeout Connect" className="first">
          <InputNumber style={{ fontWeight: '500', display: 'inline-block',marginLeft:'3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "10%" : "30%",}} min={0} suffix="sec" />
        </Form.Item>

        <Form.Item label="Timeout Client" className="first">
          <InputNumber style={{ fontWeight: '500', display: 'inline-block',marginLeft:'3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "10%" : "30%",}} min={0} suffix="sec" />
        </Form.Item>

        <Form.Item label="Timeout Server" className="first">
          <InputNumber style={{ fontWeight: '500', display: 'inline-block',marginLeft:'3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "10%" : "30%",}} min={0} suffix="sec" />
        </Form.Item>

        <Form.Item label="HTTP Log" className="first">
        <Select style={{ fontWeight: '500', display: 'inline-block',marginLeft:'3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "10%" : "30%",}}  >
                  <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>

        <Form.Item className="bt">
          <Button type="default">Previous</Button>
          <Button type="primary">Save</Button>
          <Button type="default">Next</Button>
        </Form.Item>
      </Form>

      <Button type="primary" className="submit">
        Final Submit
      </Button>
    </div>
  );
};

export default Default;
