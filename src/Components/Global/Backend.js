import React, { useState, useEffect } from 'react';
import { Input, Select, Tooltip, Button, Form, Card, Row, Col, Radio } from 'antd';
import {
    PlusCircleFilled,
    MinusCircleFilled,
    PlusCircleOutlined,
    MinusCircleOutlined,
    DownOutlined,
    UpOutlined,
    ExclamationCircleFilled,
    DownloadOutlined,
    EditOutlined

} from '@ant-design/icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const { Option } = Select;

const Backend = () => {
    const [newJsonData, setNewJsonData] = useState([{ type: "new", server: [], data: { name: '', mode: '', balance: { algorithm: "" } } }]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [backendIndexplus, setBackendIndexPlus] = useState(1);
    const [ServerIndexplus, setServerIndexplus] = useState(1);
    const [contactPersonDeatilsIsOpen, setContactPersonDetailsIsOpen] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNameChange = (value, index) => {
        const updatedData = [...newJsonData];
        updatedData[index].data.name = value;
        setNewJsonData(updatedData);
    };

    const handleAlgorithmChange = (value, index) => {
        const updatedData = [...newJsonData];
        updatedData[index].data.balance.algorithm = value;
        setNewJsonData(updatedData);
    };

    const handleModeChange = (value, index) => {
        const updatedData = [...newJsonData];
        updatedData[index].data.mode = value;
        setNewJsonData(updatedData);
    };

    const removeBackend = (index) => {
        const updatedData = newJsonData.filter((_, i) => i !== index);
        setNewJsonData(updatedData);
    };

    const addBackend = () => {
        const newBackend = { type: "new", server: [], data: { name: '', mode: '', balance: { algorithm: "" } } };
        setNewJsonData([...newJsonData, newBackend]);
    };

    const handlePrimaryContactChange = (index, value) => {
        const updatedData = [...newJsonData];
        updatedData[index].data.check = value;
        setNewJsonData(updatedData);
    };

    const handleClickOnPlusButton = (index) => {
        console.log("the plus button  is");
        setServerIndexplus(ServerIndexplus + 1)
        // const updatedData = [...newJsonData];
        // updatedData[backendIndex].server.push({ name: '', ip: '', port: '', check: 'disabled' });
        // setBackendIndex(updatedData);
    };

    const handleClickOnMinusOfButton = (backendIndex, serverIndex) => {
        setServerIndexplus(ServerIndexplus - 1)
        // const updatedData = [...newJsonData];
        // updatedData[backendIndex].server = updatedData[backendIndex].server.filter((_, i) => i !== serverIndex);
        // setNewJsonData(updatedData);
    };

    const handleServerChange = (backendIndex, serverIndex, key, value) => {
        const updatedData = [...newJsonData];
        updatedData[backendIndex].server[serverIndex][key] = value;
        setNewJsonData(updatedData);
    };

    return (
        <Form layout="vertical">
            <Row justify="start" style={{ marginBottom: '20px' }}>
                <Button
                    type="primary"
                    icon={<PlusCircleFilled />}
                    onClick={addBackend}
                >
                    Add Backend
                </Button>
            </Row>
            {/* {newJsonData.map((backend, backendIndex) => ( */}
                {Array.from({ length: backendIndexplus }, (_, index) => (
                <div key={backendIndexplus}>
                    
                    <Row gutter={16} style={{ marginBottom: '20px' }}>
                        <Col span={8}>
                            <Form.Item label="Backend Name" required>
                                <Input
                                    placeholder="Enter the backend value"
                                    // value={backend.data.name}
                                    onChange={(e) => handleNameChange(e.target.value, backendIndexplus)}
                                    required
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label={
                                    <Tooltip title="Specify the load-balancing algorithm for distributing traffic among backend servers">
                                        Balance :
                                    </Tooltip>
                                }
                                required
                            >
                                <Select
                                    placeholder="Select"
                                    // value={backend.data.balance.algorithm}
                                    onChange={(value) => handleAlgorithmChange(value, backendIndexplus)}
                                    required
                                >
                                    <Option value="roundrobin">roundrobin</Option>
                                    <Option value="static-rr">static-rr</Option>
                                    <Option value="leastconn">leastconn</Option>
                                    <Option value="first">first</Option>
                                    <Option value="source">source</Option>
                                    <Option value="uri">uri</Option>
                                    <Option value="url_param">url_param</Option>
                                    <Option value="hdr">hdr</Option>
                                    <Option value="random">random</Option>
                                    <Option value="rdp-cookie">rdp-cookie</Option>
                                    <Option value="hash">hash</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Mode" required>
                                <Select
                                    placeholder="Select"
                                    // value={backend.data.mode}
                                    onChange={(value) => handleModeChange(value, backendIndexplus)}
                                    required
                                >
                                    <Option value="TCP">TCP</Option>
                                    <Option value="HTTP">HTTP</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                type="danger"
                                icon={<MinusCircleFilled />}
                                onClick={() => removeBackend(backendIndexplus)}
                            />
                        </Col>
                    </Row>
                    <Card
                        style={{ marginTop: "0.5cm", backgroundColor: "#f0f2f2", width: "100%" }}
                    >
                        <div style={{ width: "100%", cursor: "pointer" }} onClick={() => setContactPersonDetailsIsOpen(!contactPersonDeatilsIsOpen)}>
                            <a style={{ fontSize: "small", fontWeight: "500", color: "black", marginLeft: "0.2cm" }}>{contactPersonDeatilsIsOpen ? <UpOutlined onClick={() => setContactPersonDetailsIsOpen(false)} /> : <DownOutlined onClick={() => setContactPersonDetailsIsOpen(true)} />} Server Details</a>
                        </div>
                        {contactPersonDeatilsIsOpen ?
                            <div>

                                <TableContainer>
                                    <Table sx={{ minWidth: 650 }} size="smaller" aria-label="a dense table">
                                        <TableHead sx={{ padding: "0", height: "0.5cm" }}>
                                            <TableRow sx={{ padding: "0", height: "0.5cm" }}>
                                                <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                                                    <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                        Server Name
                                                    </label>
                                                </TableCell>
                                                <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                                                    <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                        IP/FQDN
                                                    </label>
                                                </TableCell>
                                                <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                                                    <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                        Port Number
                                                    </label>
                                                </TableCell>
                                                <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                                                    <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                        Check
                                                    </label>
                                                </TableCell>
                                                <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                                                    <label style={{ fontSize: "smaller" }}>Add/Delete</label>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Array.from({ length: ServerIndexplus }, (_, index) => (
                                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0, marginTop: "0.5cm" }, height: "1rem" }}>
                                                    <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                                        <Form.Item
                                                            name={`serverName_${index}`}
                                                            style={{ marginBottom: "5px" }}
                                                            rules={[{ required: true, message: 'Please input the Server Name' }]}
                                                        >
                                                            <Input
                                                                placeholder="Server Name"
                                                                style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm", }}
                                                            />
                                                        </Form.Item>
                                                    </TableCell>
                                                    <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                                        <Form.Item
                                                            name={`ipFQDN_${index}`}
                                                            style={{ marginBottom: "5px" }}
                                                            rules={[{ required: true, message: 'Please input the IP/FQDN' }]}
                                                        >
                                                            <Input
                                                                placeholder="IP/FQDN"
                                                                style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm", }}
                                                            />
                                                        </Form.Item>
                                                    </TableCell>
                                                    <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                                        <Form.Item
                                                            name={`portNumber_${index}`}
                                                            style={{ marginBottom: "5px" }}
                                                            rules={[{ required: true, message: 'Please input the Port Number' }]}
                                                        >
                                                            <Input
                                                                placeholder="Port Number"
                                                                style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm", }}
                                                            />
                                                        </Form.Item>
                                                    </TableCell>
                                                    <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                                        <Form.Item
                                                            name={`check_${index}`}
                                                            style={{ marginBottom: "5px" }}
                                                            rules={[{ required: true, message: 'Please select an option' }]}
                                                        >
                                                            <Select
                                                                placeholder="Select"
                                                                style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm", }}
                                                                onChange={(value) => handlePrimaryContactChange(index, value)}
                                                            >
                                                                <Option value="enabled">Enabled</Option>
                                                                <Option value="disabled">Disabled</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </TableCell>

                                                    <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                                        <Form.Item style={{ marginBottom: "5px" }}>
                                                            <PlusCircleOutlined onClick={() => handleClickOnPlusButton(index)} style={{ fontSize: "20px" }} />
                                                            &nbsp;&nbsp;&nbsp;
                                                            <MinusCircleOutlined onClick={() => handleClickOnMinusOfButton(index)} style={{ fontSize: "20px" }} />
                                                        </Form.Item>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            : ""}
                    </Card>
                </div>
            ))}
        </Form>
    );
};

export default Backend;
