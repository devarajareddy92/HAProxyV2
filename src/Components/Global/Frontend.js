import React, { useState, useEffect } from 'react';
import { Select, Input, Form, Checkbox, Divider, Tooltip, Button } from 'antd';
import { PlusCircleFilled, MinusCircleFilled, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import IpAddress from '../../IPConfig';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const { Option } = Select;

const FrontendConfig = (props) => {
    const IP = IpAddress();
    const [selectedFrontend, setSelectedFrontend] = useState({});
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [compression, setCompression] = useState('Select Option');
    const [Addfrontendplusbutton, setAddFrontendPlusButton] = useState(1);

    const [compressionAlgo, setCompressionAlgo] = useState('');
    const [compressionTypes, setCompressionTypes] = useState(new Set());
    const [form] = Form.useForm();
    const [Jsondata, setJsonData] = useState({});
    const [LoadingFlag, setLoadingFlag] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const [frontendConfigurations, setFrontendConfigurations] = useState([

        {
            frontendName: '',
            defaultBackend: 'Select',
            compression: '',
            compressionAlgo: '',
            mode: '',
            httpRedirect: '',
            compressionTypes: new Set(),
            binds: [{ address: '', name: '', port: '', ssl_certificate: '', ssl: false }] // Default bind field
        }
    ]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleClickOnPlusButton = (frontendIndex) => {
        // setAddFrontendPlusButton(Addfrontendplusbutton + 1)

        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends[frontendIndex].binds.push({
            address: "",
            name: "",
            port: "",
            ssl_certificate: "",
            ssl: false,
        });
        setFrontendConfigurations(updatedFrontends);
    };

    const handleClickOnMinusOfButton = (frontendIndex, bindIndex) => {
        // setAddFrontendPlusButton(Addfrontendplusbutton - 1)
        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends[frontendIndex].binds = updatedFrontends[frontendIndex].binds.filter(
            (_, i) => i !== bindIndex
        );
        setFrontendConfigurations(updatedFrontends);

    };
    const handleAddFrontend = () => {
        setFrontendConfigurations([
            ...frontendConfigurations,
            {
                frontendName: "",
                defaultBackend: "Select",
                compression: "",
                compressionAlgo: "",
                mode: "",
                httpRedirect: "",
                compressionTypes: new Set(),
                binds: [
                    { address: "", name: "", port: "", ssl_certificate: "", ssl: false },
                ],
            },
        ]);
    };

    const handleDeleteFrontend = (index) => {
        const updatedFrontends = frontendConfigurations.filter(
            (_, i) => i !== index
        );
        setFrontendConfigurations(updatedFrontends);
    };
    var protokenbackend;

    try {
        protokenbackend = props.protoken
    } catch (exception) {
        navigate("/")
    }
    useEffect(() => {
        setLoadingFlag(true)
        fetch(IP + "frontend", {
            headers: {
                "Authorization": protokenbackend
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Jsondata", Jsondata?.data);
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
                setLoadingFlag(false);
            });
    }, [form]);
    console.log("Jsondata?.data?.data?.maxconn", Jsondata?.frontend_data?.frontend);

    useEffect(() => {
        Jsondata?.frontend_data?.forEach((frontendData, i) => {
            console.log("the length is", Jsondata.frontend_data.length);
            const backendNames = Jsondata.backend_names;
            console.log("backend", backendNames);

            if (frontendData?.frontend) {
                frontendData?.bind?.data.forEach((bind, j) => {
                    console.log("serversserversservers", bind);

                    form.setFieldsValue({
                        [`frontendname${i}`]: frontendData.frontend?.name,
                        [`mode${i}`]: frontendData.frontend?.mode,
                        [`httpredirect${i}`]: frontendData.frontend?.http_redirect,

                        [`bindname${j}`]: bind.name,
                        [`address${j}`]: bind.address,
                        [`port${j}`]: bind.port,
                 

                      

                    });
                });

            }
        });
    }, [Jsondata]
);
console.log("the data is this",Jsondata);


    const handleButtonClick = () => {
        setFrontendConfigurations([...frontendConfigurations, {
            frontendName: '',
            defaultBackend: 'Select',
            compression: '',
            compressionAlgo: '',
            mode: '',
            httpRedirect: '',
            compressionTypes: new Set(),
            binds: [{ address: '', name: '', port: '', ssl_certificate: '', ssl: false }] // Default bind field
        }]);
    };

    const handleAddBind = (index) => {
        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends[index].binds.push({ address: '', name: '', port: '', ssl_certificate: '', ssl: false });
        setFrontendConfigurations(updatedFrontends);
    };
    const handleCompressionChange = (value, index) => {
        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends[index].compression = value;
        if (value === "No") {
            updatedFrontends[index].compressionAlgo = "";
            updatedFrontends[index].compressionTypes = new Set();
        }
        setFrontendConfigurations(updatedFrontends);
    };

    const handleCompressionTypeChange = (type, checked, index) => {
        const updatedFrontends = [...frontendConfigurations];
        const newTypes = new Set(updatedFrontends[index].compressionTypes);
        if (checked) {
            newTypes.add(type);
        } else {
            newTypes.delete(type);
        }
        updatedFrontends[index].compressionTypes = newTypes;
        setFrontendConfigurations(updatedFrontends);
    };

    const handleCompressionAlgoChange = (index, value) => {
        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends[index].compressionAlgo = value;
        setFrontendConfigurations(updatedFrontends);
    };
    const handleFrontendChange = (index, field, value) => {
        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends[index][field] = value;
        setFrontendConfigurations(updatedFrontends);
    };

    const handleBindChange = (frontendIndex, bindIndex, field, value) => {
        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends[frontendIndex].binds[bindIndex][field] = value;
        setFrontendConfigurations(updatedFrontends);
    };

    const handleDeleteBind = (index) => {
        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends.forEach((frontend) => {
            frontend.binds.splice(index, 1); // Remove the bind at the specified index
        });
        setFrontendConfigurations(updatedFrontends);
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

    return (
        <div style={styles.container}>
            <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "0 auto" }}>
                <div style={{ width: "100%" }}>
                    {frontendConfigurations.map((frontend, index) => (
                        <div key={index} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #d9d9d9", borderRadius: "4px", backgroundColor: "#fff" }}>
                            <Divider />
                            <div style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "18px", textAlign: "center" }}>
                                Frontend {index + 1}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ flex: 1, padding: '0 10px' }}>
                                    <label name="frontendname">
                                        Frontend Name:</label>
                                    <Input
                                        value={frontend.frontendName}
                                        onChange={(e) => handleFrontendChange(index, "frontendName", e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                </div>
                                <div style={{ flex: 1, padding: '0 10px' }}>
                                    <label>Default Backend:</label>
                                    <Select
                                        // value={Jsondata.backend_names}
                                        onChange={(value) => handleFrontendChange(index, "defaultBackend", value)}
                                        style={{ width: "100%" }}
                                        placeholder="Select option"
                                    >
                                        {/* <Option value="Select">Select</Option> */}
                                        {Jsondata.backend_names &&
                                            Jsondata.backend_names.map((optionData, idx) => (
                                                <Option key={idx} value={optionData}>
                                                    {optionData}
                                                </Option>
                                            ))}
                                    </Select>
                                </div>
                            </div>

                            <Divider />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ flex: 1, padding: '0 10px' }}>
                                    <Tooltip title="Enables compression for responses sent to clients, reducing bandwidth usage. Note: Applicable only for HTTP">
                                        <label>Compression:</label>
                                    </Tooltip>
                                    <Select
                                        value={compression}
                                        onChange={(value) => handleCompressionChange(value, index)}
                                        style={{ width: "100%" }}

                                    >
                                        <Option value="Select Option">Select Option</Option>
                                        <Option value="Yes">Yes</Option>
                                        <Option value="No">No</Option>
                                    </Select>
                                </div>
                                {compression === 'Yes' && (
                                    <>
                                        {/* // <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}> */}
                                        <div style={{ flex: 1, padding: '0 10px' }}>
                                            <Tooltip title="Enables the specified compression algorithm for this bind.">
                                                <label>Compression Algo:</label>
                                            </Tooltip>
                                            <Select
                                                value={compressionAlgo}
                                                onChange={(value) => handleCompressionAlgoChange(value, index)}
                                                style={{ width: "100%" }}
                                            >
                                                <Option value="">Select Option</Option>
                                                <Option value="gzip">gzip</Option>
                                                <Option value="deflate">deflate</Option>
                                                <Option value="raw-deflate">raw-deflate</Option>
                                            </Select>
                                        </div>
                                    </>
                                )}

                                {compression === 'Yes' && (
                                    <div style={{ marginBottom: '20px', textAlign: '' }}>
                                        <Tooltip title="Enables compression for the specified types.">
                                            <label>Compression Types:</label>
                                        </Tooltip>                                        <div>
                                            {['text/css', 'text/html', 'text/javascript', 'application/javascript', 'text/plain', 'text/xml', 'application/json'].map((type) => (
                                                <Checkbox
                                                    key={type}
                                                    checked={frontend.compressionTypes.has(type)}
                                                    onChange={(e) => handleCompressionTypeChange(type, e.target.checked)}


                                                    style={{ marginRight: '8px' }}
                                                >
                                                    {type}
                                                </Checkbox>
                                            ))}
                                        </div>

                                    </div>
                                )}
                            </div>


                            <Divider />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ flex: 1, padding: '0 10px' }}>
                                    <label name="mode">Mode:</label>
                                    <Select
                                        value={frontend.mode}
                                        onChange={(value) => {
                                            const updatedFrontends = [...frontendConfigurations];
                                            updatedFrontends[index].mode = value;
                                            setFrontendConfigurations(updatedFrontends);
                                        }}
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="HTTP">HTTP</Option>
                                        <Option value="TCP">TCP</Option>
                                    </Select>
                                </div>
                                <div style={{ flex: 1, padding: '0 10px' }}>
                                    <div className="https-label">
                                        <Tooltip title="HTTP to HTTPS redirection">
                                            <label name='httpredirect' className="frontendLabel">HTTPS Redirection:</label>
                                        </Tooltip>
                                    </div>
                                    <Select
                                        value={frontend.httpRedirect}
                                        onChange={(value) => {
                                            const updatedFrontends = [...frontendConfigurations];
                                            updatedFrontends[index].httpRedirect = value;
                                            setFrontendConfigurations(updatedFrontends);
                                        }}
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="">Select Option</Option>
                                        <Option value={true}>True</Option>
                                        <Option value={false}>False</Option>
                                    </Select>
                                </div>
                            </div>

                            <Divider />
                            <div>
                                <label>Binds:</label>

                                {frontend.binds.map((bind, bindIndex) => (
                                    <div key={bindIndex} style={{ display: "flex", marginBottom: "10px" }}>
                                      
                                        <div style={{ flex: 1, padding: "0 10px" }}>
                                            <label name="address">Bind Address:</label>
                                            <Input
                                                value={bind.address}
                                                onChange={(e) => handleBindChange(index, bindIndex, "address", e.target.value)}
                                            />
                                        </div>
                                        <div style={{ flex: 1, padding: "0 10px" }}>
                                            <label name="bindname">Bind Name:</label>
                                            <Input
                                                value={bind.name}
                                                onChange={(e) => handleBindChange(index, bindIndex, "address", e.target.value)}
                                            />
                                        </div>
                                        <div style={{ flex: 1, padding: "0 10px" }}>
                                            <label name="port">Bind Port:</label>
                                            <Input
                                                value={bind.port}
                                                onChange={(e) => handleBindChange(index, bindIndex, "port", e.target.value)}
                                            />
                                        </div>
                                        <div style={{ flex: 1, padding: "0 10px" }}>
                                            <label>SSL Certificate:</label>
                                            <Input
                                                value={bind.ssl_certificate}
                                                onChange={(e) => handleBindChange(index, bindIndex, "ssl_certificate", e.target.value)}
                                            />
                                        </div>
                                        {/* <div style={{ flex: 1, padding: "0 10px" }}>
                                            <Checkbox
                                                checked={bind.ssl}
                                                onChange={(e) => handleBindChange(index, bindIndex, "ssl", e.target.checked)}
                                            >
                                                SSL
                                            </Checkbox>
                                        </div> */}
                                        <div style={{ flex: "none", padding: "0 10px" }}>
                                            <Button
                                                type="danger"
                                                icon={<MinusCircleFilled />}
                                                onClick={() => handleClickOnMinusOfButton(index, bindIndex)}
                                            />
                                        </div>
                                    </div>
                                ))
                                }
                                < Button
                                    type="dashed"
                                    icon={< PlusCircleFilled />}
                                    onClick={() => handleClickOnPlusButton(index)}
                                >
                                    Add Bind
                                </Button>
                            </div>

                            <Divider />
                            <Button type="danger" onClick={() => handleDeleteFrontend(index)}>
                                Delete Frontend
                            </Button>
                        </div>

                    ))
                    }
                    <Button type="primary" onClick={handleAddFrontend}>
                        Add Frontend
                    </Button>
                </div >
            </div >
        </div >





    );
};

export default FrontendConfig;