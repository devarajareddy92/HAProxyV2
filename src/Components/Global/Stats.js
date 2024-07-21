import React, { useState, useEffect } from "react";
import { Dropdown } from "antd";
import { Button, Form, Input, Select, Divider ,message} from "antd";
import { UserOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';

// import '../CssFolder/StyleCss.css';
import IpAddress from '../../IPConfig';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Stats = (props) => {
    const IP = IpAddress();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [JsonData, setJsonData] = useState({});
    const [LoadingFlag, setLoadingFlag] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [form] = Form.useForm();
    const [statsEnabled, setStatsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    var protokenstats;

  try {
    protokenstats = props.protoken
  } catch (exception) {
    navigate("/")
  }
  useEffect(() => {
    fetchStats();
  }, []);
  const fetchStats = async () => {
    try {
      const response = await axios.get(IP+"stats",{
      headers: {
        'Authorization': protokenstats,
        'Content-Type': 'application/json'
    },
});
      const data = response.data;

      if (data.length > 0) {
        const stats = data[0];
        form.setFieldsValue({
          bindaddress: stats.bind[0].address,
          bindport: stats.bind[0].port,
          refreshrate: parseInt(stats.frontend.stats_options.stats_refresh_delay) / 1000,
          urll: stats.frontend.stats_options.stats_uri_prefix.substring(1),
          username: stats.frontend.stats_options.stats_auths[0].user,
          password: stats.frontend.stats_options.stats_auths[0].passwd,
        });
        setStatsEnabled(true);
      } else {
        setStatsEnabled(false);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      message.error('Failed to fetch stats.');
    }
  };
  const onFinish = async (values) => {
    setLoading(true);
    const data = statsEnabled ? {
      bindaddress: values.bindaddress,
      bindport: values.bindport,
      refreshrate: parseInt(values.refreshrate) * 1000,
      urll: `/${values.urll}`,
      username: values.username,
      password: values.password,
    } : { stats_action: false };

    try {
      const response = await axios.post('/save_stats', data,{
        headers: {
            'Authorization': protokenstats,
            'Content-Type': 'application/json',
        },
    });
      if (response.data.error === 0) {
        message.success('Data saved successfully. Final submit required.');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Error saving stats:', error);
      message.error('Failed to save stats.');
    } finally {
      setLoading(false);
    }
  };


    const styles = {
        container: {
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            padding: "20px",
            backgroundColor: "#dee2e6",
        },
        header: {
            position: "relative",
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "bold",
        },
        label: {
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
        },
        select: {
            marginLeft: "10px",
            marginRight: "10px",
        },
        link: {
            marginLeft: "10px",
            color: "#1890ff",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "1300px",
            backgroundColor: "#fff",
            padding: "20px",
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
        required: {
            color: "red",
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
    };
    return (
        <div style={styles.container}>
            <div style={{ display: "flex", justifyContent: "left", width: "100%" }}>
                <div style={{ width: "100%" }}>
                    <div
                        style={{
                            marginBottom: "20px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "4px",
                            backgroundColor: "#fff",
                            textAlign: "left",
                            padding: "40px",
                        }}
                    >
                        <h3> Stats Action</h3>
                        <br />
                        <label style={styles.label}>
                            Stats Action
                            <select name="YESorNO" id="pref" style={styles.select}>
                                <option value="Enable">Enable</option>
                                <option value="Disable">Disable</option>
                            </select>

                            <a href="" style={styles.link}>
                                Go to Dashboard
                            </a>
                        </label>

                        <Form  form={form}  layout="horizontal" style={styles.form} onFinish={onFinish}>
                            <div style={styles.row}>

                                <Form.Item
                                 name="bindaddress"
                                    label={
                                        <span style={styles.labelSpan}>
                                            Bind Address <span style={styles.required}>*</span>
                                        </span>
                                    }
                                    style={styles.formItem}
                                >
                                    <Input
                                        style={styles.input}
                                        placeholder="Enter Bind Address"
                                    />
                                </Form.Item>
                                <Form.Item
                                 name="bindaddress"
                                    label={
                                        <span style={styles.labelSpan}>
                                            Bind Port <span style={styles.required}>*</span>
                                        </span>
                                    }
                                    style={styles.formItem}
                                >
                                    <Input placeholder="Enter Bind Port" style={styles.input} />

                                </Form.Item>
                            </div>
                            <div style={styles.row}>
                                <Form.Item
                                 name="refreshrate"
                                    label={
                                        <span style={styles.labelSpan}>
                                            Refresh Rate <span style={styles.required}>*</span>
                                        </span>
                                    }
                                    style={styles.formItem}
                                >
                                    <Input
                                        placeholder="Enter Refresh Rate"
                                        style={styles.input}
                                    />
                                </Form.Item>
                                <Form.Item
                                name="urll"
                                    label={
                                        <span style={styles.labelSpan}>
                                            URL <span style={styles.required}>*</span>
                                        </span>
                                    }
                                    style={styles.formItem}
                                >
                                    <Input placeholder="Enter URL" style={styles.input} />
                                </Form.Item>
                            </div>
                            <div style={styles.row}>
                                <Form.Item
                                 name="username"
                                    label={
                                        <span style={styles.labelSpan}>
                                            Username <span style={styles.required}>*</span>
                                        </span>
                                    }
                                    style={styles.formItem}
                                >
                                    <Input placeholder="Enter Username" style={styles.input} />
                                </Form.Item>

                                <Form.Item
                                name="password"
                                    label={
                                        <span style={styles.labelSpan}>
                                            Password <span style={styles.required}>*</span>
                                        </span>
                                    }
                                    style={styles.formItem}
                                >
                                    <Input
                                        placeholder="Enter Password"
                                        type="password"
                                        style={styles.input}
                                    />
                                </Form.Item>
                            </div>
                            <Form.Item style={styles.buttonItem}>
                                <Button type="primary" htmlType="submit" style={styles.button }>
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>
                        <Divider />
                        <div style={{ textAlign: "left", paddingBottom: "20px" }}>
                            <Button type="primary" style={{ marginTop: "20px" }}>
                                Final Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Stats;

