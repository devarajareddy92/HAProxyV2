import React, { useState, useEffect } from 'react';
import { Select, Input, Form, Checkbox, Divider, Tooltip, Button, Table } from 'antd';
import { PlusCircleFilled, MinusCircleFilled, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
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
    const handleClickOnPlusButton = (index) => {
        setAddFrontendPlusButton(Addfrontendplusbutton + 1)

    };
    const handleClickOnMinusOfButton = (backendIndex, serverIndex) => {
        setAddFrontendPlusButton(Addfrontendplusbutton - 1)
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
                frontendData?.bind?.data.forEach((server, j) => {
                    console.log("servers", server);

                    form.setFieldsValue({

                        [`frontendname${i}`]: Jsondata.frontend_data.frontend.name,

                        [`mode${i}`]: Jsondata.frontend_data.frontend.mode,
                        [`httpredirect${j}`]: server.name,
                        [`ip/fqdn${j}`]: server.address,
                        [`portnumber${j}`]: server.port,
                        [`check${j}`]: server.check,

                    });
                });

            }
        });
    }, [Jsondata]);

    const columns = [
        {
            title: 'Bind Address',
            dataIndex: 'address',
            render: (text, record, index) => (
                <Input
                    value={text}
                    className="aclnewInput"
                    style={{ width: '100%' }}
                    onChange={(e) => handleBindChange(index, 'address', e.target.value)}
                />
            )
        },
        {
            title: 'Bind Name',
            dataIndex: 'name',
            render: (text, record, index) => (
                <Input
                    value={text}
                    className="aclnewInput"
                    style={{ width: '100%' }}
                    onChange={(e) => handleBindChange(index, 'name', e.target.value)}
                />
            )
        },
        {
            title: 'Bind Port',
            dataIndex: 'port',
            render: (text, record, index) => (
                <Input
                    value={text}
                    className="aclnewInput"
                    style={{ width: '100%' }}
                    onChange={(e) => handleBindChange(index, 'port', e.target.value)}
                />
            )
        },
        {
            title: 'SSL Certificate Details',
            dataIndex: 'ssl_certificate',
            render: (text, record, index) => (
                <Input
                    value={text}
                    className="ssl-certificate-input"
                    disabled={!record.ssl}
                    placeholder="Enter the path"
                    style={{ width: '100%' }}
                    onChange={(e) => handleBindChange(index, 'ssl_certificate', e.target.value)}
                />
            )
        },
        {
            title: 'Action',
            render: (text, record, index) => (
                // <Button
                //     type="danger"
                //     icon={<DeleteOutlined />}
                //     onClick={() => handleDeleteBind(index)}
                // />
                <Form.Item style={{ marginBottom: "5px" }}>
                    <PlusCircleOutlined onClick={() => handleClickOnPlusButton(index)} style={{ fontSize: "20px" }} />
                    &nbsp;&nbsp;&nbsp;
                    <MinusCircleOutlined onClick={() => handleClickOnMinusOfButton(index)} style={{ fontSize: "20px" }} />
                </Form.Item>
            )
        }
    ];

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
    const handleCompressionChange = (value) => {
        setCompression(value);
        if (value === 'No') {
            setCompressionAlgo('');
            setCompressionTypes(new Set());
        }
    };
    const handleCompressionTypeChange = (type, checked) => {
        setCompressionTypes((prev) => {
            const newTypes = new Set(prev);
            if (checked) {
                newTypes.add(type);
            } else {
                newTypes.delete(type);
            }
            return newTypes;
        });
    };
    const handleCompressionAlgoChange = (value) => {
        setCompressionAlgo(value);
    };
    const handleBindChange = (frontendIndex, key, value) => {
        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends[frontendIndex].binds = updatedFrontends[frontendIndex].binds.map((bind, bindIndex) => {
            if (bindIndex === key) {
                return { ...bind, [key]: value };
            }
            return bind;
        });
        setFrontendConfigurations(updatedFrontends);
    };

    const handleDeleteBind = (index) => {
        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends.forEach((frontend) => {
            frontend.binds.splice(index, 1); // Remove the bind at the specified index
        });
        setFrontendConfigurations(updatedFrontends);
    };

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', padding: '20px', backgroundColor: '#dee2e6' }}>
            {/* Button in top-right corner */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}>
                <Button type="primary" onClick={handleButtonClick}>
                    Add Frontend +
                </Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '0 auto' }}>
                <div style={{ width: '100%' }}>
                    {frontendConfigurations.map((frontend, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #d9d9d9', borderRadius: '4px', backgroundColor: '#fff' }}>
                            <Divider />
                            <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>
                                Frontend {index + 1}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ flex: 1, padding: '0 10px' }}>
                                    <label name="frontendname">
                                        Frontend Name:</label>
                                    <Input
                                        value={frontend.frontendName}
                                        onChange={(e) => {
                                            const updatedFrontends = [...frontendConfigurations];
                                            updatedFrontends[index].frontendName = e.target.value;
                                            setFrontendConfigurations(updatedFrontends);
                                        }}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div style={{ flex: 1, padding: '0 10px' }}>
                                    <label>Default Backend:</label>
                                    <Select
                                        value={Jsondata.backend_names}
                                        onChange={(value) => {
                                            const updatedFrontends = [...frontendConfigurations];
                                            updatedFrontends[index].defaultBackend = value;
                                            setFrontendConfigurations(updatedFrontends);
                                        }}
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="Select">Select</Option>
                                        {/* <option value="beckend">backend</option> */}
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
                                        onChange={handleCompressionChange}

                                        // onChange={(value) => {

                                        //     const updatedFrontends = [...frontendConfigurations];
                                        //     updatedFrontends[index].compression = value;
                                        //     setFrontendConfigurations(updatedFrontends);
                                        // }}
                                        style={{ width: '100%' }}
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
                                            <label>Compression Algo:</label>
                                            <Select
                                                value={compressionAlgo}
                                                onChange={handleCompressionAlgoChange}

                                                // onChange={(value) => {
                                                //     const updatedFrontends = [...frontendConfigurations];
                                                //     updatedFrontends[index].compressionAlgo = value;
                                                //     setFrontendConfigurations(updatedFrontends);
                                                // }}
                                                style={{ width: '100%' }}
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
                                        <label>Compression Type:</label>
                                        <div>
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
                                    <label>Mode:</label>
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
                                            <label name='httpredirect'className="frontendLabel">HTTPS Redirection:</label>
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


                            <Divider />
                            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                                <Button type="primary" onClick={() => handleAddBind(index)}>
                                    Add Bind +
                                </Button>
                            </div>

                            <Divider />
                            <div>
                                <Table
                                    dataSource={frontend.binds}
                                    columns={columns}
                                    rowKey="address"
                                    pagination={false}
                                    className="table"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            <Divider />
        </div>
    );
};

export default FrontendConfig;