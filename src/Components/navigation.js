// import {
//     HomeOutlined,
//     SettingOutlined,
//     DatabaseOutlined,
//     CodeOutlined,
//     SafetyOutlined,
//     RetweetOutlined,
//     BarChartOutlined,
//     LogoutOutlined,
//     UserOutlined
// } from '@ant-design/icons';
// import { Layout, Menu, Dropdown } from 'antd';
// import React, { useEffect, useState } from "react";
// // import BrandImage from 'Images/Brand_Image_icon.jpg';
// // import ProteanLogo from '/Protean_logo.jpg';
// // import BrandImage from '../../public/Brand_Image_icon.jpg';

// // import IpAddress from '../../ipConfig';

// const { Header, Content, Sider } = Layout;

// const NavigationBar = () => {
//     // const IP = IpAddress();
//     const [collapsed, setCollapsed] = useState(false);
//     const [clickedOnSearchByCustomer, setClickedSearchByCustomer] = useState(false);
//     const [flag, setFlag] = useState(null);
//     const [clickedCount, setClickedCount] = useState(0);
//     const [currentUserDetails, setCurrentUserDetails] = useState(null);

//     const searchCustomer = (flag) => {
//         setClickedSearchByCustomer(true);
//         setClickedCount(clickedCount + 1);
//         setFlag(flag);
//     }

//     useEffect(() => {
//         window.addEventListener('curretUserUpdated', function (event) {
//             var updatedCustomerNames = JSON.parse(sessionStorage.getItem('current_user'));
//             console.log('Customer data updated:', updatedCustomerNames);
//             setCurrentUserDetails(updatedCustomerNames);
//         });
//     }, [])

//     const items = [
//         {
//             key: '1',
//             label: "Global",
//             icon: React.createElement(HomeOutlined),
//             // onClick: () => {
//             //     window.location.assign(IP + "recent_orders/")
//             // },
//         },
//         {
//             key: '2',
//             label: 'Default',
//             icon: React.createElement(SettingOutlined),
//             // onClick: () => {
//             //     window.location.assign(IP + "new_customer/")
//             // },
//         },
//         {
//             key: '3',
//             label: 'Backend',
//             icon: React.createElement(DatabaseOutlined),
//             // onClick: () => {
//             //     window.location.assign(IP + "new_order/")
//             // }
//         },
//         {
//             key: '4',
//             label: 'FrontEnd',
//             icon: React.createElement(CodeOutlined),
//             // onClick: () => {
//             //     window.location.assign(IP + "product_master/")
//             // },
//         },
//         {
//             key: '5',
//             label: 'ACL',
//             icon: React.createElement(SafetyOutlined),
//             // children: [
//             //     { key: '51', label: 'Search Customer', icon: React.createElement(UserOutlined), onClick: () => searchCustomer('C') },
//             //     { key: '52', label: 'Search Order', icon: React.createElement(SecurityScanOutlined), onClick: () => searchCustomer('O') },
//             // ]
//         },
//         {
//             key: '6',
//             label: 'Switching Rules',
//             icon: React.createElement(RetweetOutlined),
//             // onClick: () => {
//             //     window.location.assign(IP + "my_workItems/")
//             // // },
//         },
//         {
//             key: '7',
//             label: "Stats",
//             icon: React.createElement(BarChartOutlined),
//             // onClick: () => {
//             //     window.location.assign(IP)
//             // },
//         }
//     ];

//     const handleCollapse = (collapsed) => {
//         setCollapsed(collapsed);
//     };


//     // const menu = (
//     //     <Menu>
//     //         <Menu.Item key="1">
//     //             <a href="#status">Status</a>
//     //         </Menu.Item>
//     //         <Menu.Item key="2">
//     //             <a href="#home">Home</a>
//     //         </Menu.Item>
//     //         <Menu.Item key="3">
//     //             <a href="#profile">User Profile</a>
//     //         </Menu.Item>
//     //         <Menu.Item key="4" icon={<LogoutOutlined />}>
//     //             Logout
//     //         </Menu.Item>
//     //     </Menu>
//     // );

//     return (
//         <Layout>
//             <Sider
//                 collapsible
//                 onCollapse={handleCollapse}
//                 width={200}
//                 style={{ background: '#d5dee0', position: 'fixed', height: '100vh', overflow: 'auto' }}
//                 collapsed={collapsed}
//             >
//                 {!collapsed ? (
//                     <span>
//                         <img src="/Protean_logo.jpg" style={{ width: "4cm", marginTop: "0.5cm", marginLeft: "0.3cm", marginTop: "0.2cm" }} />
//                 </span>
//                 ) : (
//                 <img src="/Brand_Image_icon.jpg" style={{ width: "1.2cm", height: "1.2cm", marginTop: "0.2cm", marginLeft: "0.5cm" }} />
//                 )}

//                 <Menu
//                     mode="inline"
//                     style={{ height: "100vh", borderRight: 0, backgroundColor: "#d3e0e0" }}
//                     items={items}
//                 />
//             </Sider>

//             <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
//                 < Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <div style={{ marginLeft: '20px' }}>
//                        <p>HAPROXY CONFIG MANAGER</p>
//                     </div>
//                     <Menu mode="horizontal" style={{ marginRight: '20px' }}>
//                     <Menu.Item key="1">
//                             <a href="#home">Home</a>
//                         </Menu.Item>
//                         <Menu.Item key="2">
//                             <a href="#status">Status</a>
//                         </Menu.Item>
                       
//                         <Menu.Item key="3" icon={<UserOutlined />}>
//                             <a href="#profile">User Profile</a>
//                         </Menu.Item>
//                         <Menu.Item key="4" icon={<LogoutOutlined />}>
//                             Logout
//                         </Menu.Item>
//                     </Menu>
//                 </Header>
//                 <Content style={{ padding: 10, background: '#fff', height: "100vh" }}>
//                     {/* Add your main content here */}
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// }

// export default NavigationBar;