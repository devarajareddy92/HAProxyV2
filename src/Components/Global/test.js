// import React, { useState, useEffect } from 'react';
// import { Select, Input, Checkbox, Divider, Tooltip, Button } from 'antd';
// // import './App.css'; 

// const { Option } = Select;

// const FrontendConfig = ({ jsonData, jsonData1, secondnewJsonData }) => {
//     const [selectedFrontend, setSelectedFrontend] = useState({});
//     const [compressionTypes, setCompressionTypes] = useState(new Set());
//     const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//     useEffect(() => {
//         // Update the screen width whenever the window is resized
//         const handleResize = () => {
//             setScreenWidth(window.innerWidth);
//         };
//         window.addEventListener('resize', handleResize);
//         // Clean up the event listener when the component unmounts
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     //   useEffect(() => {
//     //     const frontend = jsonData.find((x) => x.frontend.name === 'f_new');
//     //     if (frontend) {
//     //       setSelectedFrontend(frontend.frontend);
//     //     }
//     //   }, [jsonData]);

//     //   const handleNameChange = (event) => {
//     //     const { value } = event.target;
//     //     setSelectedFrontend((prev) => ({ ...prev, name: value }));
//     //     const index = jsonData.findIndex((x) => x.frontend.name === 'f_new');
//     //     if (index !== -1) {
//     //       secondnewJsonData[index].data.name = value;
//     //     }
//     //   };

//     //   const handleBackendChange = (value) => {
//     //     setSelectedFrontend((prev) => ({ ...prev, default_backend: value }));
//     //     const index = jsonData.findIndex((x) => x.frontend.name === 'f_new');
//     //     if (index !== -1) {
//     //       secondnewJsonData[index].data.default_backend = value;
//     //     }
//     //   };

//     //   const handleCompressionChange = (value) => {
//     //     const index = jsonData.findIndex((x) => x.frontend.name === 'f_new');
//     //     if (index !== -1) {
//     //       if (value === 'Yes') {
//     //         secondnewJsonData[index].data.compression = { algorithms: [], types: [] };
//     //       } else {
//     //         delete secondnewJsonData[index].data.compression;
//     //       }
//     //     }
//     //   };

//     //   const handleCompressionAlgoChange = (value) => {
//     //     const index = jsonData.findIndex((x) => x.frontend.name === 'f_new');
//     //     if (index !== -1) {
//     //       if (!secondnewJsonData[index].data.compression) {
//     //         secondnewJsonData[index].data.compression = { algorithms: [], types: [] };
//     //       }
//     //       secondnewJsonData[index].data.compression.algorithms[0] = value;
//     //     }
//     //   };

//     //   const handleCompressionTypeChange = (type, checked) => {
//     //     const index = jsonData.findIndex((x) => x.frontend.name === 'f_new');
//     //     if (index !== -1) {
//     //       const newTypes = new Set(compressionTypes);
//     //       if (checked) {
//     //         newTypes.add(type);
//     //       } else {
//     //         newTypes.delete(type);
//     //       }
//     //       setCompressionTypes(newTypes);
//     //       secondnewJsonData[index].data.compression.types = Array.from(newTypes);
//     //     }
//     //   };
//     const columns = [
//         {
//             title: 'Bind Address',
//             dataIndex: 'address',
//             render: (text, record, index) => (
//                 <Input
//                     value={text}
//                     onChange={e => handleInputChange(e.target.value, record.i, index, 'address')}
//                     className="aclnewInput"
//                 />
//             )
//         },
//         {
//             title: 'Bind Name',
//             dataIndex: 'name',
//             render: (text, record, index) => (
//                 <Input
//                     value={text}
//                     onChange={e => handleInputChange(e.target.value, record.i, index, 'name')}
//                     className="aclnewInput"
//                 />
//             )
//         },
//         {
//             title: 'Bind Port',
//             dataIndex: 'port',
//             render: (text, record, index) => (
//                 <Input
//                     value={text}
//                     onChange={e => handleInputChange(e.target.value, record.i, index, 'port')}
//                     className="aclnewInput"
//                 />
//             )
//         },
//         {
//             title: 'SSL Certificate Details',
//             dataIndex: 'ssl_certificate',
//             render: (text, record, index) => (
//                 <>
//                     <Checkbox
//                         checked={record.ssl}
//                         onChange={e => handleCheckboxChange(e.target.checked, record.i, index)}
//                         disabled={record.protocol !== 'http'}
//                     />
//                     <Input
//                         value={text}
//                         onChange={e => handleCertificateChange(e.target.value, record.i, index)}
//                         className="ssl-certificate-input"
//                         disabled={!record.ssl}
//                         placeholder="Enter the path"
//                     />
//                 </>
//             )
//         },
//         {
//             title: 'Action',
//             render: (text, record, index) => (
//                 <Button
//                     type="danger"
//                     icon={<DeleteOutlined />}
//                     onClick={() => handleDelete(record.i, index)}
//                 />
//             )
//         }
//     ];
//     return (
//         <div>
//             <Divider />
//             <div style={{ display: 'flex', marginBottom: '20px' }}>
//                 <div style={{ flex: 1 }}>
//                     <label>Frontend Name:</label>
//                     <Input
//                         value={selectedFrontend.name || ''}
//                         // onChange={handleNameChange}
//                         disabled
//                     />
//                 </div>
//                 <div style={{ flex: 1, marginLeft: '20px' }}>
//                     <label>Default Backend:</label>
//                     <Select
//                         value={selectedFrontend.default_backend || 'Select'}
//                         // onChange={handleBackendChange}
//                         style={{ width: '100%' }}
//                     >
//                         <Option value="Select">Select</Option>
//                         {/* {jsonData1.map((optionData, index) => (
//               <Option key={index} value={optionData}>
//                 {optionData}
//               </Option>
//             ))} */}
//                     </Select>
//                 </div>
//             </div>

//             <Divider />
//             <div style={{ display: 'flex', marginBottom: '20px' }}>
//                 <div style={{ flex: 1 }}>
//                     <Tooltip title="Enables compression for responses sent to clients, reducing bandwidth usage. Note: Applicable only for HTTP">
//                         <label>Compression:</label>
//                     </Tooltip>
//                     <Select
//                         // value={selectedFrontend.compression ? 'Yes' : 'No'}
//                         // onChange={handleCompressionChange}
//                         style={{ width: '100%' }}
//                     >
//                         <Option value="Select Option">Select Option</Option>
//                         <Option value="Yes">Yes</Option>
//                         <Option value="No">No</Option>
//                     </Select>
//                 </div>
//                 <div style={{ flex: 1, marginLeft: '20px' }}>
//                     <label>Compression Algo:</label>
//                     <Select
//                         value={selectedFrontend.compression?.algorithms[0] || ''}
//                         // onChange={handleCompressionAlgoChange}
//                         // style={{ width: '100%' }}
//                         style={{ fontWeight: '500', display: 'inline-block', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%", }}
//                     >
//                         <Option value="">Select Option</Option>
//                         <Option value="gzip">gzip</Option>
//                         <Option value="deflate">deflate</Option>
//                         <Option value="raw-deflate">raw-deflate</Option>
//                     </Select>
//                 </div>
//             </div>

//             <Divider />
//             <div style={{ marginBottom: '20px' }}>
//                 <label>Compression Type:</label>
//                 {['text/css', 'text/html', 'text/javascript', 'application/javascript', 'text/plain', 'text/xml', 'application/json'].map((type) => (
//                     <Checkbox
//                         key={type}
//                         checked={compressionTypes.has(type)}
//                     // onChange={(e) => handleCompressionTypeChange(type, e.target.checked)}
//                     >
//                         {type}
//                     </Checkbox>
//                 ))}
//             </div>

//             <Divider />
//             <div style={{ fontWeight: '500', display: 'inline-block', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%", }}  >
//                 <div style={{ flex: 1 }}>
//                     <label>Mode:</label>
//                     <Select
//                         value={selectedFrontend.mode || ''}
//                         onChange={(value) => setSelectedFrontend((prev) => ({ ...prev, mode: value }))}
//                         style={{ width: '100%' }}
//                     >
//                         <Option value="HTTP">HTTP</Option>
//                         <Option value="TCP">TCP</Option>
//                     </Select>
//                 </div>
//             </div>
//             <div>
//       {/* {data.map((item, i) => ( */}
//         <div key={i} style={{ marginBottom: '20px' }}>
//           <div style={{ display: 'flex', marginTop: '2%', marginLeft: '11%' }}>
//             <div className="https-label">
//               <Tooltip title="HTTP to HTTPS redirection">
//                 <label className="frontendLabel showInfo">HTTPS Redirection:</label>
//               </Tooltip>
//             </div>
//             <div>
//               <Select
//                 // value={item.http_redirect}
//                 // onChange={value => handleRedirectChange(value, i)}
//                 className="sslnewInput"
//               >
//                 <Option value="">Select Option</Option>
//                 <Option value={true}>True</Option>
//                 <Option value={false}>False</Option>
//               </Select>
//             </div>
//           </div>
//           <Table
//             dataSource={item.bind}
//             columns={columns}
//             rowKey="address"
//             pagination={false}
//             className="table"
//           />
//         </div>
//       ))}
//     </div>


//         </div>
//     );
// };

// export default FrontendConfig;


import React, { useState, useEffect } from 'react';
import { Select, Input, Checkbox, Divider, Tooltip, Button, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';

const { Option } = Select;

const FrontendConfig = () => {
    const [sections, setSections] = useState([{ id: 1 }]);
    const [selectedFrontend, setSelectedFrontend] = useState({});
    const [compression, setCompression] = useState('Select Option');
    const [compressionAlgo, setCompressionAlgo] = useState('');
    const [compressionTypes, setCompressionTypes] = useState(new Set());
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const addSection = () => {
        setSections([...sections, { id: sections.length + 1 }]);
    };
    const deleteSection = (id) => {
        setSections(sections.filter((section) => section.id !== id));
    };
    const handleCompressionChange = (value) => {
        setCompression(value);
        if (value === 'No') {
            setCompressionAlgo('');
            setCompressionTypes(new Set());
        }
    };
    const handleCompressionAlgoChange = (value) => {
        setCompressionAlgo(value);
    };

    const addDownButtonAction = (index, type) => {
        // Implement your logic here
        console.log(`Add action in section ${index + 1}, type: ${type}`);
    };

    const deleteButtonAction = (index, type) => {
        // Implement your logic here
        console.log(`Delete action in section ${index + 1}, type: ${type}`);
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


    const columns = [
        {
            title: 'Bind Address',
            dataIndex: 'address',
            render: (text, record, index) => (
                <Input
                    value={text}
                    // onChange={e => handleInputChange(e.target.value, record.i, index, 'address')}
                    className="aclnewInput"
                />
            )
        },
        {
            title: 'Bind Name',
            dataIndex: 'name',
            render: (text, record, index) => (
                <Input
                    value={text}
                    // onChange={e => handleInputChange(e.target.value, record.i, index, 'name')}
                    className="aclnewInput"
                />
            )
        },
        {
            title: 'Bind Port',
            dataIndex: 'port',
            render: (text, record, index) => (
                <Input
                    value={text}
                    // onChange={e => handleInputChange(e.target.value, record.i, index, 'port')}
                    className="aclnewInput"
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
                        // onChange={e => handleCheckboxChange(e.target.checked, record.i, index)}
                        disabled={record.protocol !== 'http'}
                    />
                    <Input
                        value={text}
                        // onChange={e => handleCertificateChange(e.target.value, record.i, index)}
                        className="ssl-certificate-input"
                        disabled={!record.ssl}
                        placeholder="Enter the path"
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

    return (
        <div>
            <PlusCircleFilled
                style={{ color: "#1677ff", fontSize: "25px", marginTop: "0.3cm", cursor: "pointer" }}
                onClick={addSection}
            />
            {sections.map((section, index) => (
                <div key={section.id}>
                    <Divider />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <h3>Section {index + 1}</h3>
                        <MinusCircleFilled
                            style={{ color: "Red", fontSize: "25px", cursor: "pointer" }}
                            onClick={() => deleteSection(section.id)}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                    >
                        <PlusCircleFilled
                            style={{ color: "#1677ff", fontSize: "25px", marginTop: "0.3cm", cursor: "pointer" }}
                            onClick={() => addDownButtonAction(index, 'L')}
                        />
                        <div style={{ width: '20px' }}></div>
                        <MinusCircleFilled
                            style={{ color: "Red", marginTop: "0.3cm", fontSize: "25px", cursor: "pointer" }}
                            onClick={() => deleteButtonAction(index, 'L')}
                        />
                    </div>
                </div>
            ))}
            <div className="form-row">
                <div className="form-item">
                    {/* <div style={{ display: 'flex', marginBottom: '20px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}> */}
                    <label>Frontend Name:</label>
                    <Input />
                </div>
                {/* <div style={{ flex: 1, marginLeft: '20px', minWidth: '300px' }}> */}
                <div className="form-item">
                    <label>Default Backend:</label>
                    <Select
                        value={selectedFrontend.default_backend || 'Select'}
                        // onChange={handleBackendChange}
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
            <div className="form-row">
                <div className="form-item">
                    {/* <div style={{ display: 'flex', marginBottom: '20px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}> */}
                    <Tooltip title="Enables compression for responses sent to clients, reducing bandwidth usage. Note: Applicable only for HTTP">
                        <label>Compression:</label>
                    </Tooltip>
                    <Select
                        value={compression}
                        onChange={handleCompressionChange}
                        style={{ width: '100%' }}
                    >
                        <Option value="Select Option">Select Option</Option>
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                    </Select>
                </div>
                {compression === 'Yes' && (
                    <div className="form-item">
                        {/* <div style={{ flex: 1, marginLeft: '20px', minWidth: '300px' }}> */}
                        <label>Compression Algo:</label>
                        <Select
                            value={compressionAlgo}
                            onChange={handleCompressionAlgoChange}
                            style={{ fontWeight: '500', display: 'inline-block', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%" }}
                        >
                            <Option value="">Select Option</Option>
                            <Option value="gzip">gzip</Option>
                            <Option value="deflate">deflate</Option>
                            <Option value="raw-deflate">raw-deflate</Option>
                        </Select>
                    </div>
                )}
            </div>
            {compression === 'Yes' && (
                <>
                    <Divider />
                    <div className="form-item">
                        {/* <div style={{ marginBottom: '20px' }}> */}
                        <label>Compression Type: </label>
                        {['text/css', 'text/html', 'text/javascript', 'application/javascript', 'text/plain', 'text/xml', 'application/json'].map((type) => (
                            <Checkbox
                                key={type}
                                checked={compressionTypes.has(type)}
                                onChange={(e) => handleCompressionTypeChange(type, e.target.checked)}
                            >
                                {type}
                            </Checkbox>
                        ))}
                    </div>
                </>
            )}
            <Divider />
            <div className="form-row">
                <div className="form-item">
                    {/* <div style={{ fontWeight: '500', display: 'inline-block', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%" }}>
                        <div style={{ flex: 1, minWidth: '300px' }}> */}
                    <label>Mode:</label>
                    <Select
                        value={selectedFrontend.mode || ''}
                        onChange={(value) => setSelectedFrontend((prev) => ({ ...prev, mode: value }))}
                        style={{ width: '100%' }}
                    >
                        <Option value="HTTP">HTTP</Option>
                        <Option value="TCP">TCP</Option>
                    </Select>
                </div>
            </div>

            <div>

                <div className="form-row">
                    <div className="form-item">
                        {/* <div style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', marginTop: '2%', fontWeight: '500', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "10%" : "30%" }}>
                                <div className="https-label"> */}
                        <Tooltip title="HTTP to HTTPS redirection">
                            <label className="frontendLabel showInfo">HTTPS Redirection:</label>
                        </Tooltip>
                    </div>
                    <div>
                        <Select
                            className="sslnewInput"
                        >
                            <Option value="">Select Option</Option>
                            <Option value={true}>True</Option>
                            <Option value={false}>False</Option>
                        </Select>
                        {/* </div>
                                    </div> */}
                        {/* <Table
                                        dataSource={[]}
                                        columns={columns}
                                        rowKey="address"
                                        pagination={false}
                                        className="table"
                                    /> */}
                    </div>
                </div>
            </div>
        </div>
    );

};


export default FrontendConfig;



























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
                            <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '25px' }}>
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

                                    <div style={{ flex: 1 }}>
                                        <label style={{ marginLeft: '20px' }}>Compression Algo:</label>
                                        <Select
                                            value={compressionAlgo}
                                            onChange={handleCompressionAlgoChange}

                                            // onChange={(value) => {
                                            //     const updatedFrontends = [...frontendConfigurations];
                                            //     updatedFrontends[index].compressionAlgo = value;
                                            //     setFrontendConfigurations(updatedFrontends);
                                            // }}
                                            style={{ fontWeight: '500', display: 'inline-block', marginLeft: '20px', textAlign: 'left', width: '96%' }}
                                        >
                                            <Option value="">Select Option</Option>
                                            <Option value="gzip">gzip</Option>
                                            <Option value="deflate">deflate</Option>
                                            <Option value="raw-deflate">raw-deflate</Option>
                                        </Select>
                                    </div>
                                )}
                            </div>
                            {compression === 'Yes' && (

                                <div style={{ marginBottom: '20px' }}>
                                    <label>Compression Type:</label>
                                    {['text/css', 'text/html', 'text/javascript', 'application/javascript', 'text/plain', 'text/xml', 'application/json'].map((type) => (
                                        <Checkbox
                                            key={type}
                                            checked={compressionTypes.has(type)}
                                            onChange={(e) => handleCompressionTypeChange(type, e.target.checked)}
                                            // onChange={(e) => {
                                            //     const updatedFrontends = [...frontendConfigurations];
                                            //     const currentTypes = updatedFrontends[index].compressionTypes;
                                            //     if (e.target.checked) {
                                            //         currentTypes.add(type);
                                            //     } else {
                                            //         currentTypes.delete(type);
                                            //     }
                                            //     updatedFrontends[index].compressionTypes = currentTypes;
                                            //     setFrontendConfigurations(updatedFrontends);
                                            // }}
                                        >
                                            {type}
                                        </Checkbox>
                                    ))}
                                </div>

                            )}
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

                            <TableContainer>
                                <Table sx={{ minWidth: 650 }} size="smaller" aria-label="a dense table">
                                    <TableHead sx={{ padding: "0", height: "0.5cm" }}>
                                        <TableRow sx={{ padding: "0", height: "0.5cm" }}>
                                            <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                                                <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                    Bind Address
                                                </label>
                                            </TableCell>
                                            <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                                                <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                    Bind Name
                                                </label>
                                            </TableCell>
                                            <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                                                <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                    Bind Port
                                                </label>
                                            </TableCell>
                                            <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                                                <label style={{ marginLeft: "0.2cm", fontSize: "smaller" }}>
                                                    SSL Certificate Details
                                                </label>
                                            </TableCell>
                                            <TableCell sx={{ padding: "0", height: "0.5cm" }}>
                                                <label style={{ fontSize: "smaller" }}>Add/Delete</label>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.from({ length: 1 }, (_, contactIndex) => (
                                            <TableRow key={contactIndex} sx={{ '&:last-child td, &:last-child th': { border: 0, marginTop: "0.5cm" }, height: "1rem" }}>
                                                <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                                    <Form.Item
                                                        name={`bindAddress_${contactIndex}`}
                                                        style={{ marginBottom: "5px" }}
                                                        rules={[{ required: true, message: 'Please input the Bind Address' }]}
                                                    >
                                                        <Input
                                                            placeholder="Bind Address"
                                                            style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm" }}
                                                        />
                                                    </Form.Item>
                                                </TableCell>
                                                <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                                    <Form.Item
                                                        name={`bindName_${contactIndex}`}
                                                        style={{ marginBottom: "5px" }}
                                                        rules={[{ required: true, message: 'Please input the Bind Name' }]}
                                                    >
                                                        <Input
                                                            placeholder="Bind Name"
                                                            style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm" }}
                                                        />
                                                    </Form.Item>
                                                </TableCell>
                                                <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                                    <Form.Item
                                                        name={`bindPort_${contactIndex}`}
                                                        style={{ marginBottom: "5px" }}
                                                        rules={[{ required: true, message: 'Please input the Bind Port' }]}
                                                    >
                                                        <Input
                                                            placeholder="Bind Port"
                                                            style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm" }}
                                                        />
                                                    </Form.Item>
                                                </TableCell>
                                                <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                                    <Form.Item
                                                        name={`sslCertDetails_${contactIndex}`}
                                                        style={{ marginBottom: "5px" }}
                                                        rules={[{ required: true, message: 'Please input the SSL Certificate Details' }]}
                                                    >
                                                        <Input
                                                            placeholder="SSL Certificate Details"
                                                            style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm" }}
                                                        />
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

                    ))}
                </div>
            </div>
           
        </div>




