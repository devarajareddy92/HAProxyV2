// import React from 'react';
// import './login.css';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, Checkbox, Form, Input } from 'antd';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const navigate = useNavigate();

//     const onFinish = (values) => {
//         console.log('Received values of form: ', values);
//         // Store user details in localStorage
//         localStorage.setItem('user', JSON.stringify(values));
//         // Navigate to the sidebar page
//         navigate('/global');
//     };

//     return (
//         <Form
//             name="normal_login"
//             className="login-form"
//             initialValues={{ remember: true }}
//             onFinish={onFinish}
//         >
//             <Form.Item
//                 name="username"
//                 rules={[{ required: true, message: 'Please input your Username!' }]}
//             >
//                 <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
//             </Form.Item>
//             <Form.Item
//                 name="password"
//                 rules={[{ required: true, message: 'Please input your Password!' }]}
//             >
//                 <Input
//                     prefix={<LockOutlined className="site-form-item-icon" />}
//                     type="password"
//                     placeholder="Password"
//                 />
//             </Form.Item>
//             <Form.Item>
//                 <Form.Item name="remember" valuePropName="checked" noStyle>
//                     <Checkbox>Remember me</Checkbox>
//                 </Form.Item>

//                 <a className="login-form-forgot" href="">
//                     Forgot password
//                 </a>
//             </Form.Item>

//             <Form.Item>
//                 <Button type="primary" htmlType="submit" className="login-form-button">
//                     Log in
//                 </Button>
//                 Or <a href="">register now!</a>
//             </Form.Item>
//         </Form>
//     );
// }

// export default Login;


import React from 'react';
import { Form, Input, Button, Alert, Typography, Row, Col, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import ProteanLogo from '/LoginPageLogo.png'
import { useState } from 'react';
// import logo from '../path_to_your_image/Protean_logo.png'; 
import IpAddress from '../../IPConfig'
import axios from 'axios'
import Password from 'antd/es/input/Password';
const { Title } = Typography;
const { Content } = Layout;
const LoginForm = () => {
    const IP = IpAddress();
    const [LoginPostData, setLoginPostData] = useState({});
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [jwtToken, setJwtToken] = useState(null);
    const [error, setError] = useState(null);

    const Data = {
        username: username,
        password: password
    }
    const onFinish = values => {
        console.log('Received values of form: ', values);

        axios.post(IP + `login_logic`, { Data: Data }, {
            username: values.username,
            password: values.password
            // headers: {
            //     'Authorization': "Bearer " + jwtToken
            // }
        })
        .then(response => {
            console.log("response", response);
            if (response.status === 200) {
                setJwtToken(response.data.token);
                window.location.assign(`${IP}/global`);
            } else {
                setError("Invalid Credentials");
            }
        })
            .catch((error) => {
                console.error("Login error: ", error);
                setError("An error occurred during login.");
            })

    };

    return (
        <Layout className="layout">
            <Content className="content-container">
                <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    {/* <Col xs={24} sm={16} md={12} lg={8}> */}
                    <div>
                        <div className="logo-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <img src="LoginPageLogo.png" alt="Protean Logo" style={{ width: '150px' }} />
                            <Title level={3} id="logoname">HA-PROXY APPLICATION CONFIGURATOR</Title>
                        </div>
                        <div className="panel border bg-white" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Title level={3} className="font-weight-bold" style={{ textAlign: 'center' }}>Login</Title>
                            <Form
                                name="login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please enter your Username!' }]}
                                >
                                    <Input 
                                    prefix={<UserOutlined />} placeholder="Enter your Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please enter your Password!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Enter your Password" />
                                </Form.Item>
                                {/* <Form.Item name="csrf_token" initialValue={csrfToken} hidden>
                  <Input type="hidden" />
                </Form.Item> */}
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                            {/* {messages && messages.length > 0 && (
                <Alert
                  message="Information"
                  description={
                    <ul>
                      {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                      ))}
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              )}
              {msg && (
                <Alert
                  message="Information"
                  description={<h6>{msg}</h6>}
                  type="info"
                  showIcon
                />
              )} */}
                        </div>
                    </div>
                    {/* </Col> */}
                </Row>
            </Content>
        </Layout>
    );
};

export default LoginForm;
