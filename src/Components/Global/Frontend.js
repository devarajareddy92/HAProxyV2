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

const { Option } = Select;

const FrontendConfig = ({ jsonData, jsonData1, secondnewJsonData }) => {
    const [selectedFrontend, setSelectedFrontend] = useState({});
    const [compressionTypes, setCompressionTypes] = useState(new Set());
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
            <Divider />
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                    <label>Frontend Name:</label>
                    <Input
                        value={selectedFrontend.name || ''}
                        // onChange={handleNameChange}
                        disabled
                    />
                </div>
                <div style={{ flex: 1, marginLeft: '20px' }}>
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
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                    <Tooltip title="Enables compression for responses sent to clients, reducing bandwidth usage. Note: Applicable only for HTTP">
                        <label>Compression:</label>
                    </Tooltip>
                    <Select
                        // value={selectedFrontend.compression ? 'Yes' : 'No'}
                        // onChange={handleCompressionChange}
                        style={{ width: '100%' }}
                    >
                        <Option value="Select Option">Select Option</Option>
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                    </Select>
                </div>
                <div style={{ flex: 1, marginLeft: '20px' }}>
                    <label>Compression Algo:</label>
                    <Select
                        value={selectedFrontend.compression?.algorithms[0] || ''}
                        // onChange={handleCompressionAlgoChange}
                        style={{ fontWeight: '500', display: 'inline-block', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%" }}
                    >
                        <Option value="">Select Option</Option>
                        <Option value="gzip">gzip</Option>
                        <Option value="deflate">deflate</Option>
                        <Option value="raw-deflate">raw-deflate</Option>
                    </Select>
                </div>
            </div>

            <Divider />
            <div style={{ marginBottom: '20px' }}>
                <label>Compression Type:</label>
                {['text/css', 'text/html', 'text/javascript', 'application/javascript', 'text/plain', 'text/xml', 'application/json'].map((type) => (
                    <Checkbox
                        key={type}
                        checked={compressionTypes.has(type)}
                        // onChange={(e) => handleCompressionTypeChange(type, e.target.checked)}
                    >
                        {type}
                    </Checkbox>
                ))}
            </div>

            <Divider />
            <div style={{ fontWeight: '500', display: 'inline-block', marginLeft: '3.5%', textAlign: 'left', fontSize: "12px", width: screenWidth > 1000 ? "20%" : "30%" }}>
                <div style={{ flex: 1 }}>
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
                {/* Placeholder for data iteration */}
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', marginTop: '2%', marginLeft: '11%' }}>
                        <div className="https-label">
                            <Tooltip title="HTTP to HTTPS redirection">
                                <label className="frontendLabel showInfo">HTTPS Redirection:</label>
                            </Tooltip>
                        </div>
                        <div>
                            <Select
                                // value={item.http_redirect}
                                // onChange={value => handleRedirectChange(value, i)}
                                className="sslnewInput"
                            >
                                <Option value="">Select Option</Option>
                                <Option value={true}>True</Option>
                                <Option value={false}>False</Option>
                            </Select>
                        </div>
                    </div>
                    <Table
                        dataSource={[] /* Placeholder for item.bind */}
                        columns={columns}
                        rowKey="address"
                        pagination={false}
                        className="table"
                    />
                </div>
            </div>
        </div>
    );
};

export default FrontendConfig;

