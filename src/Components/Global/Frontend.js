import React, { useState, useEffect } from 'react';
import { Select, Input, Checkbox, Divider, Tooltip, Button, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const FrontendConfig = ({ jsonData, jsonData1, secondnewJsonData }) => {
    const [selectedFrontend, setSelectedFrontend] = useState({});
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [frontendConfigurations, setFrontendConfigurations] = useState([
        {
            frontendName: '',
            defaultBackend: 'Select',
            compression: '',
            compressionAlgo: '',
            mode: '',
            httpRedirect: '',
            compressionTypes: new Set(),
            binds: []
        }
    ]);

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

    const columns = [
        {
            title: 'Bind Address',
            dataIndex: 'address',
            render: (text, record, index) => (
                <Input
                    value={text}
                    className="aclnewInput"
                    style={{ width: '100%' }}
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
                />
            )
        },
        {
            title: 'SSL Certificate Details',
            dataIndex: 'ssl_certificate',
            render: (text, record, index) => (
                <>
                    <Checkbox
                        checked={record.ssl}
                        disabled={record.protocol !== 'http'}
                    />
                    <Input
                        value={text}
                        className="ssl-certificate-input"
                        disabled={!record.ssl}
                        placeholder="Enter the path"
                        style={{ width: '100%' }}
                    />
                </>
            )
        },
        {
            title: 'Action',
            render: (text, record, index) => (
                <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    // onClick={() => handleDelete(record.i, index)}
                />
            )
        }
    ];

    const handleButtonClick = () => {
        // Add a new frontend configuration object to the state array
        setFrontendConfigurations([...frontendConfigurations, {
            frontendName: '',
            defaultBackend: 'Select',
            compression: '',
            compressionAlgo: '',
            mode: '',
            httpRedirect: '',
            compressionTypes: new Set(),
            binds: []
        }]);
    };

    const handleAddBind = (index) => {
        // Add a new bind to the specified frontend configuration
        const updatedFrontends = [...frontendConfigurations];
        updatedFrontends[index].binds.push({ address: '', name: '', port: '', ssl_certificate: '', ssl: false });
        setFrontendConfigurations(updatedFrontends);
    };

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
            {/* Button in top-right corner */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}>
                <Button type="primary" onClick={handleButtonClick}>
                    Add Frontend +
                </Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '70%', margin: '0 auto' }}>
                <div style={{ width: '100%' }}>
                    {/* Render each frontend configuration dynamically */}
                    {frontendConfigurations.map((frontend, index) => (
                        <div key={index}>
                            <Divider />
                            {/* Display the index of the frontend configuration */}
                            <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize:'25px' }}>
                                Frontend {index + 1}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <div style={{ flex: 1 }}>
                                    <label>Frontend Name:</label>
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
                                <div style={{ flex: 1, marginLeft: '20px' }}>
                                    <label>Default Backend:</label>
                                    <Select
                                        value={frontend.defaultBackend}
                                        onChange={(value) => {
                                            const updatedFrontends = [...frontendConfigurations];
                                            updatedFrontends[index].defaultBackend = value;
                                            setFrontendConfigurations(updatedFrontends);
                                        }}
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="Select">Select</Option>
                                        {/* {jsonData1.map((optionData, index) => (
                                            <Option key={index} value={optionData}>
                                                {optionData}
                                            </Option>
                                        ))} */}
                                    </Select>
                                </div>
                            </div>

                            <Divider />
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <div style={{ flex: 1 }}>
                                    <Tooltip title="Enables compression for responses sent to clients, reducing bandwidth usage. Note: Applicable only for HTTP">
                                        <label>Compression:</label>
                                    </Tooltip>
                                    <Select
                                        value={frontend.compression}
                                        onChange={(value) => {
                                            const updatedFrontends = [...frontendConfigurations];
                                            updatedFrontends[index].compression = value;
                                            setFrontendConfigurations(updatedFrontends);
                                        }}
                                        style={{ width: '100%' }}
                                    >
                                        <Option value="Select Option">Select Option</Option>
                                        <Option value="Yes">Yes</Option>
                                        <Option value="No">No</Option>
                                    </Select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ marginLeft: '20px' }}>Compression Algo:</label>
                                    <Select
                                        value={frontend.compressionAlgo}
                                        onChange={(value) => {
                                            const updatedFrontends = [...frontendConfigurations];
                                            updatedFrontends[index].compressionAlgo = value;
                                            setFrontendConfigurations(updatedFrontends);
                                        }}
                                        style={{ fontWeight: '500', display: 'inline-block', marginLeft: '20px', textAlign: 'left', width: '96%' }}
                                    >
                                        <Option value="">Select Option</Option>
                                        <Option value="gzip">gzip</Option>
                                        <Option value="deflate">deflate</Option>
                                        <Option value="raw-deflate">raw-deflate</Option>
                                    </Select>
                                </div>
                            </div>

                            <Divider />
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <div style={{ flex: 1, marginLeft: '20px' }}>
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
                                <div style={{ flex: 1, marginLeft: '20px' }}>
                                    <div className="https-label">
                                        <Tooltip title="HTTP to HTTPS redirection">
                                            <label className="frontendLabel showInfo">HTTPS Redirection:</label>
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
                            <div style={{ marginBottom: '20px' }}>
                                <label>Compression Type:</label>
                                {['text/css', 'text/html', 'text/javascript', 'application/javascript', 'text/plain', 'text/xml', 'application/json'].map((type) => (
                                    <Checkbox
                                        key={type}
                                        checked={frontend.compressionTypes.has(type)}
                                        onChange={(e) => {
                                            const updatedFrontends = [...frontendConfigurations];
                                            const currentTypes = updatedFrontends[index].compressionTypes;
                                            if (e.target.checked) {
                                                currentTypes.add(type);
                                            } else {
                                                currentTypes.delete(type);
                                            }
                                            updatedFrontends[index].compressionTypes = currentTypes;
                                            setFrontendConfigurations(updatedFrontends);
                                        }}
                                    >
                                        {type}
                                    </Checkbox>
                                ))}
                            </div>

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
