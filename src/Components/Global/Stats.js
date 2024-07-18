import React, { useState } from "react";
import { Dropdown } from "antd";
import { Button, Form, Input, Radio } from "antd";
import '../CssFolder/StyleCss.css';

const Stats = () => {
    return (
        <div className="stats-container">
            <h3> Stats Action</h3>
            <label className="stats-label">
                Stats Action

                <select name="YESorNO" id="pref">
                    <option value="Enable">Enable</option>
                    <option value="Disable">Disable</option>
                </select>

                <a href=""> Go to Dashboard</a>
            </label>

            <Form layout="horizontal" className="stats-form">
                <div className="form-row">
                    <Form.Item className="formItem"
                        label={<span style={{ fontWeight: '500', display: 'inline-block', width: "5cm", textAlign: 'left', fontSize: "12px" }}>Bind Address <a style={{ color: "red" }}>*</a></span>}
                    >
                        <Input style={{ fontWeight: '500', display: 'inline-block', textAlign: 'left', fontSize: "12px", width: 300, marginLeft: "0.2cm" }}
                            placeholder="Enter Bind Address"
                        />
                    </Form.Item>
                    <Form.Item className="formItem"
                        label={<span style={{ fontWeight: '500', display: 'inline-block', width: "5cm", textAlign: 'left', fontSize: "12px" }}>Bind Port <a style={{ color: "red" }}>*</a></span>}
                    >
                        <Input style={{ fontWeight: '500', display: 'inline-block', textAlign: 'left', fontSize: "12px", width: 300, marginLeft: "0.2cm" }}
                            placeholder="Enter Bind Port"
                        />
                    </Form.Item>
                </div>
                <div className="form-row">
                    <Form.Item className="formItem"
                        label={<span style={{ fontWeight: '500', display: 'inline-block', width: "5cm", textAlign: 'left', fontSize: "12px" }}>Refresh Rate <a style={{ color: "red" }}>*</a></span>}
                    >
                        <Input style={{ fontWeight: '500', display: 'inline-block', textAlign: 'left', fontSize: "12px", width: 300, marginLeft: "0.2cm" }}
                            placeholder="Enter Refresh Rate"
                        />
                    </Form.Item>
                    <Form.Item className="formItem"
                        label={<span style={{ fontWeight: '500', display: 'inline-block', width: "5cm", textAlign: 'left', fontSize: "12px" }}>URL <a style={{ color: "red" }}>*</a></span>}
                    >
                        <Input style={{ fontWeight: '500', display: 'inline-block', textAlign: 'left', fontSize: "12px", width: 300, marginLeft: "0.2cm" }}
                            placeholder="Enter URL"
                        />
                    </Form.Item>
                </div>
                <div className="form-row">
                    <Form.Item className="formItem"
                        label={<span style={{ fontWeight: '500', display: 'inline-block', width: "5cm", textAlign: 'left', fontSize: "12px" }}>Username <a style={{ color: "red" }}>*</a></span>}
                    >
                        <Input style={{ fontWeight: '500', display: 'inline-block', textAlign: 'left', fontSize: "12px", width: 300, marginLeft: "0.2cm" }}
                            placeholder="Enter Username"
                        />
                    </Form.Item>
                    <Form.Item className="formItem"
                        label={<span style={{ fontWeight: '500', display: 'inline-block', width: "5cm", textAlign: 'left', fontSize: "12px" }}>Password <a style={{ color: "red" }}>*</a></span>}
                    >
                        <Input style={{ fontWeight: '500', display: 'inline-block', textAlign: 'left', fontSize: "12px", width: 300, marginLeft: "0.2cm" }}
                            placeholder="Enter password"
                            type="password"
                        />
                    </Form.Item>
                </div>
                <Form.Item >
                    <Button type="primary">Save</Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Stats;

