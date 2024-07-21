import React, { useState, useEffect } from 'react';
import { Input, Select, Card, List, Spin, Tooltip, Button, Form, Row, Col, Radio } from 'antd';
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

import IpAddress from '../../IPConfig';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const { Option } = Select;

const Backend = (props) => {
    const IP = IpAddress();
    const [newJsonData, setNewJsonData] = useState([{ type: "new", server: [], data: { name: '', mode: '', balance: { algorithm: "" } } }]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [backendIndexplus, setBackendIndexPlus] = useState(1);
    const [ServerIndexplus, setServerIndexplus] = useState(1);
    const [contactPersonDeatilsIsOpen, setContactPersonDetailsIsOpen] = useState(false);
    const [form] = Form.useForm();
    const [JsonData, setJsonData] = useState({});
    const [LoadingFlag, setLoadingFlag] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    // jsonData[backendindex] =[//jsonData[backendindex].server.data.length
    //     {
    //         "backend": {
    //             "balance": {
    //                 "algorithm": "roundrobin"
    //             },
    //             "mode": "http",
    //             "name": "NPS_Backend"
    //         },
    //         "server": {
    //             "_version": 411,
    //             "data": [
    //                 {
    //                     "address": "10.101.104.91",
    //                     "check": "enabled",
    //                     "name": "NPS_Server_91",
    //                     "port": 8083
    //                 },
    //                 {
    //                     "address": "10.101.104.140",
    //                     "check": "enabled",
    //                     "name": "NPS_Server_140",
    //                     "port": 8083
    //                 }
    //             ]
    //         }
    //     },
    

    // ]


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    var protokenbackend;

    try {
        protokenbackend = props.protoken
    } catch (exception) {
        navigate("/")
    }

    useEffect(() => {
        setLoadingFlag(true)
        fetch(IP + "backend", {
            headers: {
                "Authorization": protokenbackend
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Jsondata", JSON.parse(data.data))
                if (data.error === 0) {
                    setJsonData(JSON.parse(data.data))
                    console.log("The data is", data);
                    setLoadingFlag(false)
                } else if (data.error === 1) {
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoadingFlag(false);
            });
    }, [form]);

    // console.log("Jsondata?.data?.data?.maxconn", Jsondata)



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
        const updatedData = [...JsonData];
        console.log("JsonData:", JsonData);
        console.log("updatedData[index]:", updatedData[index]);
        
        // Check if `server` exists and is an array
        if (Array.isArray(updatedData[index].server)) {
            updatedData[index].server=[];
        } 
        updatedData[index].server.push({ name: '', ip: '', port: '', check: 'disabled' });
        setJsonData(updatedData);
    };

    const handleClickOnMinusOfButton = (backendIndex, serverIndex) => {
        const updatedData = [...JsonData];
        updatedData[backendIndex].server = updatedData[backendIndex].server.filter((_, i) => i !== serverIndex);
        setJsonData(updatedData);
    };

    const handleServerChange = (backendIndex, serverIndex, key, value) => {
        const updatedData = [...newJsonData];
        updatedData[backendIndex].server[serverIndex][key] = value;
        setNewJsonData(updatedData);
    };
    const styles = {
        container: {
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            padding: "20px",
            backgroundColor: "#dee2e6",
        },
        heading: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
        },
        buttonRow: {
            marginBottom: "20px",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "1300px",
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "5px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
        row: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
        },
        formItem: {
            display: "flex",
            flexDirection: "column",
            width: "48%",
        },
        labelSpan: {
            fontWeight: "500",
            display: "inline-block",
            textAlign: "left",
            fontSize: "12px",
        },
        input: {
            fontWeight: "500",
            textAlign: "left",
            fontSize: "12px",
            width: "100%",
            marginTop: "5px",
        },
        buttonItem: {
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
        },
        button: {
            fontWeight: "500",
            fontSize: "12px",
        },
        card: {
            marginTop: "0.5cm",
            backgroundColor: "#f0f2f2",
            width: "100%",
        },
        table: {
            minWidth: 650,
            size: "smaller",
        },
        tableHeader: {
            padding: "0",
            height: "0.5cm",
        },
        tableCell: {
            padding: "0",
            height: "0.5cm",
        },
        formItemSmall: {
            marginBottom: "5px",
        },
    };

    const handleSave = () => {
        form.validateFields()
            .then(values => {
                setLoadingFlag(true);
                console.log('Saved values:', values);

                // Make a POST request to save the form data
                axios.post(IP + "save_backend", values, {
                    headers: {
                        'Authorization': protokenbackend,
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
    useEffect(() => {
        for (let i = 0; i < JsonData.length; i++) {
            console.log("the length is", JsonData.length);
            const backend = JsonData[i].backend;
            console.log("backend", backend)
            if (JsonData[i].server?.data) {
                for (let j = 0; j < JsonData[i].server.data.length; j++) {
                    const server = JsonData[i].server?.data[j];
                    console.log("servers", server)

                    form.setFieldsValue({

                        [`Backendname_${i}`]: backend.name,
                        [`Balance_${i}`]: backend.balance.algorithm,
                        [`mode_${i}`]: backend.mode,
                        [`servername_${i}_${j}`]: server.name,
                        [`ipFQDN_${i}_${j}`]: server.address,
                        [`portNumber_${i}_${j}`]: server.port,
                        [`check_${i}_${j}`]: server.check,

                    });
                }
            }
        }

    }, [JsonData]);

    console.log("Jsondata", JsonData);
    return (
        <div style={styles.container}>
            <Form layout="vertical" style={styles.form}
                form={form}
            >

                <h3 >Backend</h3>
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <Row justify="start" style={{ marginBottom: '20px' }}>
                    <Button
                        type="primary"
                        icon={<PlusCircleFilled />}
                        onClick={addBackend}
                    >
                        Add Backend
                    </Button>
                </Row>
                {/* {Array.from({ length: backendIndexplus }, (_, index) => ( */}
                {Array.from({ length: JsonData.length }, (_, backendIndex) => (

                    <div key={backendIndex}>
                        <Row gutter={16} style={{ marginBottom: '20px' }}>
                            <Col span={8}>
                                <Form.Item  name={`Backendname_${backendIndex}`} label="Backend Name" required>
                                    <Input
                                    
                                        placeholder="Enter the backend value"
                                        // value={backend.data.name}
                                        // onChange={(e) => handleNameChange(e.target.value, backendIndex)}
                                        required
                                        style={styles.input}
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
                                    name={`Balance_${backendIndex}`}
                                    required
                                >
                                    <Select
                                        placeholder="Select"
                                        
                                        // value={backend.data.balance.algorithm}
                                        onChange={(value) => handleAlgorithmChange(value, backendIndex)}
                                        required
                                        style={styles.input}
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
                                <Form.Item name={`mode_${backendIndex}`} label="Mode" required>
                                    <Select
                                        placeholder="Select"
                                        
                                        // value={backend.data.mode}
                                        onChange={(value) => handleModeChange(value, backendIndex)}
                                        required
                                        style={styles.input}
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
                                    onClick={() => removeBackend(backendIndex)}
                                />
                            </Col>
                        </Row>
                        <Card style={styles.card}>
                            {/* style={{ marginTop: "0.5cm", backgroundColor: "#f0f2f2", width: "100%" }} */}

                            <div
                                style={{ width: "100%", cursor: "pointer" }} onClick={() => setContactPersonDetailsIsOpen(!contactPersonDeatilsIsOpen)}>
                                <a style={{ fontSize: "small", fontWeight: "500", color: "black", marginLeft: "0.2cm" }}>
                                    {contactPersonDeatilsIsOpen ? <UpOutlined onClick={() => setContactPersonDetailsIsOpen(false)} /> : <DownOutlined onClick={() => setContactPersonDetailsIsOpen(true)} />} Server Details</a>
                            </div>
                            {contactPersonDeatilsIsOpen && (
                                <div>

                                    <TableContainer>
                                        <Table sx={styles.table} aria-label="a dense table">
                                            <TableHead sx={styles.tableHeader}>
                                                <TableRow sx={styles.tableHeader}>
                                                    <TableCell sx={styles.tableCell}>
                                                        <label
                                                            name="servername"
                                                            style={{
                                                                marginLeft: "0.2cm",
                                                                fontSize: "smaller",
                                                            }}
                                                        >
                                                            Server Name
                                                        </label>
                                                    </TableCell>
                                                    <TableCell sx={styles.tableCell}>
                                                        <label name="ip/fqdn" style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                            IP/FQDN
                                                        </label>
                                                    </TableCell>
                                                    <TableCell sx={styles.tableCell}>
                                                        <label name="portnumber" style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                            Port Number
                                                        </label>
                                                    </TableCell>
                                                    <TableCell sx={styles.tableCell}>
                                                        <label name="check" style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                            Check
                                                        </label>
                                                    </TableCell>
                                                    <TableCell sx={styles.tableCell}>
                                                        <label style={{ fontSize: "smaller" }}>Add/Delete</label>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Array.from({ length: JsonData[backendIndex].server.data.length }, (_, index) => (

                                                    < TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0, marginTop: "0.5cm" }, height: "1rem" }}>
                                                        <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                                            <Form.Item
                                                                name={`servername_${backendIndex}_${index}`}
                                                                style={styles.formItemSmall}
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
                                                                name={`ipFQDN_${backendIndex}_${index}`}
                                                                style={styles.formItemSmall}
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
                                                                name={`portNumber_${backendIndex}_${index}`}
                                                                style={styles.formItemSmall}
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
                                                                name={`check_${backendIndex}_${index}`}
                                                                style={styles.formItemSmall}
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
                                                            <Form.Item style={styles.formItemSmall}>
                                                                <PlusCircleOutlined onClick={() => handleClickOnPlusButton(backendIndex)} style={{ fontSize: "20px" }} />
                                                                &nbsp;&nbsp;&nbsp;
                                                                <MinusCircleOutlined onClick={() => handleClickOnMinusOfButton(backendIndex,index)} style={{ fontSize: "20px" }} />
                                                            </Form.Item>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>

                            )}
                        </Card>

                    </div>

                ))}
                <Form.Item style={{ alignContent: 'center' }}>
                    <Button type="default" onClick={handleSave} style={{ alignContent: 'center', marginLeft: '10px' }}>
                        Save
                    </Button>
                    <Button style={{ alignContent: 'center' }} type="primary" htmlType="submit">
                        Final Submit
                    </Button>
                </Form.Item>

            </Form >
        </div >

    );
};

export default Backend;
