import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, Tooltip, message } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined ,PlusCircleFilled,MinusCircleFilled} from '@ant-design/icons';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IpAddress from '../../IPConfig';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const { Option } = Select;

const SwitchingRules = (props) => {
    // const [dataSource, setDataSource] = useState([
    //     {
    //         key: 0,
    //         backendName: "",
    //         condition: "",
    //         aclName: "",
    //         index: 0,
    //     },
    // ]);
    const IP = IpAddress();
    const [aclData, setAclData] = useState([]);
    const [selectedrule, setSelectedRule] = useState(null);
    const [index, setIndex] = useState(0);
    const [count, setCount] = useState(1);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [Jsondata, setJsonData] = useState({});
    const [LoadingFlag, setLoadingFlag] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [frontendNames, setFrontendNames] = useState([]);
    const [selectedfrontend, setSelectedFrontend] = useState(null);
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const [rulesData, setRulesData] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const localStoragekey = localStorage.getItem('proToken');



    const handleClickOnPlusButton = (frontendIndex) => {
        const newBindData = [...rulesData, { cond: null, cond_test: null, index: frontendIndex + 1, name: null }];
        setRulesData(newBindData);
    };

    console.log("RUlesData", rulesData)


    const handleDelete = (index) => {
        var tempData = [...rulesData];
        tempData.splice(index, 1);
        setRulesData(tempData)
    };



    const handleRemoveAcl = (index) => {
        const updatedData = aclData.filter(acl => acl.index !== index);
        setAclData(updatedData);
        message.success('ACL deleted successfully');
    };

    useEffect(() => {
        setLoadingFlag(true);
        fetch(IP + "backend_switching_rule", {
            headers: {
                "Authorization": localStoragekey
            },
        })
            .then(response => response.json())
            .then(responseData => {
                try {
                    // Parse the stringified JSON fields
                    const backendNames = JSON.parse(responseData.backend_names);
                    const data = JSON.parse(responseData.data);
                    console.log("backendNamesbackendNames==>", data);
                    if (responseData.error === 0) {
                        // Set the state with the parsed data
                        setJsonData({
                            backendNames: backendNames,
                            data: data
                        });
                        var dummyfrontends = [];
                        for (let i = 0; i < data.length; i++) {
                            console.log("datalength", data[i]?.frontend.name)
                            var AllFrontendNames = data[i]?.frontend?.name
                            if (AllFrontendNames) {
                                if (i === 0) {
                                    setSelectedFrontend(AllFrontendNames)
                                }
                                var temp = {}
                                temp.label = AllFrontendNames;
                                temp.value = AllFrontendNames
                                dummyfrontends.push(temp)

                            }
                        }
                        setFrontendNames(dummyfrontends)

                        console.log("The data isbackendNamesbackendNames", { backendNames, data });
                    } else if (responseData.error === 1) {
                        navigate('/');
                    }
                } catch (error) {
                    console.error('Error parsing JSON data:', error);
                } finally {
                    setLoadingFlag(false);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoadingFlag(false);
            });
    }, []);


    useEffect(() => {
        console.log("JsonDataINUseEffect", Jsondata);
        if (Jsondata) {
            for (let i = 0; i < Jsondata?.data?.length; i++) {
                if (Jsondata?.data[i]?.frontend?.name === selectedfrontend) {
                    setRulesData(Jsondata?.data[i]?.rule.data);
                    break;
                }
            }
        }

    }, [Jsondata, selectedfrontend])

    useEffect(() => {

        if (rulesData?.length === 0) {
            form.resetFields(["condition_0", "aclName_0", "backendname_0"]);
        }
        var dummyrulesacl = [];
        for (let i = 0; i < rulesData?.length; i++) {
            console.log("InForloop", i, rulesData[i].cond_test);
            var ruleaclname = rulesData[i]?.cond_test
            if (ruleaclname) {
                if (i === 0) {
                    setSelectedRule(ruleaclname)
                }
                var temp = {}
                temp.label = ruleaclname;
                temp.value = ruleaclname
                dummyrulesacl.push(temp)
            }
            form.setFieldsValue({
                [`condition_${i}`]: rulesData[i]?.cond,
                [`aclName_${i}`]: rulesData[i]?.cond_test,
                [`index_${i}`]: i,
                [`backendname_${i}`]: rulesData[i]?.name,
            })
        }
        setAclData(dummyrulesacl)
    }, [rulesData]);

    const onFinish = (values) => {
        console.log('Received values:', values);
        var MainSavejsondata = []
        for (let i = 0; i < rulesData?.length; i++) {

            var rulesvalues = {
                frontend: selectedfrontend,
                data: {
                    cond: form.getFieldValue(`condition_${i}`),
                    cond_test: form.getFieldValue(`aclName_${i}`),
                    name: form.getFieldValue(`backendname_${i}`),
                    index: form.getFieldValue(`index_${i}`),
                }
            };
            console.log("backendnamebackendname", rulesvalues);
            MainSavejsondata.push(rulesvalues);
            console.log('MainSavejsondata:', MainSavejsondata);

        }
        axios.post(IP + "save_switching_rule", MainSavejsondata, {
            headers: {
                'Authorization': localStoragekey,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Save response:', response);
                setLoadingFlag(false);
                if (response.status === 200) {
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

    }
    const styles = {
        container: {
            // display: "flex",
            // flexDirection: "column",
            position: "relative",
            padding: "20px",
            backgroundColor: "#f0f2f5",
            borderRadius: "5px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            margin: "20px",
        },
        heading: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
        },
        buttonRow: {
            // display: "flex",
            // justifyContent: "flex-end",
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
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
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

    console.log("Jsondata?.backend_names", Jsondata?.backendNames);

    return (
        <div style={styles.container}>
            <div style={styles.heading}>Switching Rules</div>
            <Form layout="vertical" style={styles.formItem}
                form={form}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label="Frontend Name" required>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="Select frontend"
                                options={frontendNames}
                                value={selectedfrontend}
                                onChange={(value) => setSelectedFrontend(value)}
                                defaultValue={selectedfrontend}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <div>
                    <TableContainer style={{ width: "200%" }}>
                        <Table sx={styles.table} aria-label="a dense table">
                            <TableHead sx={styles.tableHeader}>
                                <TableRow sx={styles.tableHeader}>
                                    <TableCell sx={styles.tableCell}>
                                        <label name="backend Names:"
                                            style={{
                                                marginLeft: "0.2cm",
                                                fontSize: "smaller",
                                            }}
                                        >Backend Names
                                        </label>
                                    </TableCell>
                                    <TableCell sx={styles.tableCell}>
                                        <label name="Condition:"
                                            style={{
                                                marginLeft: "0.2cm",
                                                fontSize: "smaller",
                                            }}
                                        >Condition
                                        </label>
                                    </TableCell>
                                    <TableCell sx={styles.tableCell}>
                                        <label name="ACL Names:"
                                            style={{
                                                marginLeft: "0.2cm",
                                                fontSize: "smaller",
                                            }}
                                        >ACL Names
                                        </label>
                                    </TableCell>
                                    <TableCell sx={styles.tableCell}>
                                        <label name="Index:"
                                            style={{
                                                marginLeft: "0.2cm",
                                                fontSize: "smaller",
                                            }}
                                        >Index
                                        </label>
                                    </TableCell>
                                    <TableCell sx={styles.tableCell}>
                                        <label style={{ fontSize: "smaller" }}>Add/Delete</label>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {/* {dataSource.map((record, index) => ( */}
                                {Array.from({ length: rulesData?.length !== 0 ? rulesData?.length : 1 }, (_, index) => (
                                    < TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0, marginTop: "0.5cm" }, height: "1rem" }}>
                                        <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                            <Form.Item
                                                name={`backendname_${index}`}
                                                style={styles.formItemSmall}
                                            >
                                                <Select
                                                    placeholder="Select option"
                                                    style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm", }}
                                                // onChange={(value) => handleSelectChange(value, record.key, "backendName")}
                                                >
                                                    {Jsondata?.backendNames &&
                                                        Jsondata?.backendNames.map((optionData, idx) => (
                                                            <Option key={idx} value={optionData}>
                                                                {optionData}
                                                            </Option>
                                                        ))}
                                                </Select>
                                            </Form.Item>
                                        </TableCell>
                                        <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                            <Form.Item
                                                name={`condition_${index}`}
                                                style={styles.formItemSmall}
                                            >
                                                <Select
                                                    placeholder="Select"
                                                    style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm", }}
                                                // onChange={(value) => handlePrimaryContactChange(index, value)}
                                                >
                                                    <Option key='if' value="if">IF</Option>
                                                    <Option key='unless' value="unless">Unless</Option>
                                                </Select>
                                            </Form.Item>
                                        </TableCell>
                                        <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                            <Form.Item
                                                name={`aclName_${index}`}
                                                style={styles.formItemSmall}
                                                rules={[{ required: true, message: 'Please select an option' }]}
                                            > <Select
                                                placeholder="Select ACLNames"
                                                style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm", }}
                                                options={aclData}
                                                value={selectedrule}
                                                onChange={(value) => setSelectedRule(value)}
                                                defaultValue={selectedrule}
                                            // onChange={(value) => handlePrimaryContactChange(index, value)}
                                            >
                                                    {/* <Option >Select</Option> */}
                                                </Select>
                                            </Form.Item>
                                        </TableCell>
                                        <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                            <Form.Item
                                                name={`index_${index}`}
                                                style={styles.formItemSmall}
                                            >
                                                <Input
                                                    type="number"
                                                    disabled
                                                    // value={record.index}
                                                    // onChange={(e) => handleSelectChange(e.target.value, "index")}
                                                    style={{ width: "4cm", marginTop: "0.2cm", marginLeft: "0.1cm", }}
                                                />
                                            </Form.Item>
                                        </TableCell>
                                        <TableCell sx={{ padding: "0", borderBottom: "none", width: "5cm" }}>
                                            <Form.Item style={styles.formItemSmall}>
                                                &nbsp;&nbsp;
                                                <PlusCircleFilled onClick={() => handleClickOnPlusButton(index)} style={{ fontSize: "20px", cursor: "pointer" ,color: "#1677ff" }} />
                                                &nbsp;&nbsp;
                                                <MinusCircleFilled onClick={() => handleDelete(index)} style={{ fontSize: "20px",color: "rgb(255 22 22)", cursor: "pointer" }} />
                                            </Form.Item>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <Form.Item style={styles.buttonContainer} >
                    <Button type="default" onClick={() => {
                        form
                            .validateFields()
                            .then(values => {
                                onFinish(values);
                            })
                            .catch(info => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                        style={{ alignContent: 'center', marginLeft: '10px' }}>
                        Save
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button style={{ alignContent: 'center' }} type="primary"
                        onClick={() => {
                            fetch(IP + 'deploy_config', {
                                headers: {
                                    'Authorization': localStoragekey,
                                }
                            })
                                .then(response => {
                                    console.log("responseresponse", response);
                                    if (response.status === 200) {
                                        message.success('Transaction Successful!');
                                        fetch(IP + 'regenerate', {
                                            headers: {
                                                'Authorization': localStoragekey,
                                            }
                                        })
                                        .then(response => {
                                            console.log("Regenerate response:", response);
                                            return response.json();
                                        })
                                            .then(data => {
                                                console.log("responseresponse", data);
                                                if (data.error === 0) {
                                                    const proToken = data.pro_token;
                                                    localStorage.setItem("proToken", proToken)
                                                    navigate("/home",);
                                                    console.log('regenerate Successful!');
                                                } else if (data.error === 1) {
                                                    console.log("Unauthorized");
                                                }
                                            })
                                            .catch(error => {
                                                console.error('Error:', error);
                                            });
                                    } else if (response.status === 401) {
                                        message.info("Unauthorized");
                                    } else if (response.status === 204) {
                                        console.error('Transaction not found or Dataplane is down.');
                                    } else {
                                        console.error('Unexpected response status:', response.status);
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });

                           
                        }}
                    >
                        Final Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SwitchingRules;
