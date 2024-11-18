import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons'
import { GetCurrentUser } from '../api/user';
import { setUser } from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/loaderSlice';
import { Layout, Menu, message, Flex } from 'antd';

function ProtectedRoute({ children }) {

  const {user} = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { Header } = Layout;

  useEffect(() => {

    const getValidUser = async () => {
      try {

        dispatch(showLoading());
        const response = await GetCurrentUser();
       
        if(!response.success) {
          throw response;
        }

        dispatch(setUser(response.data));
        dispatch(hideLoading());

      } catch (error) {

        console.log(error);
        message.error(error.message);
        dispatch(hideLoading());
        navigate("/login");
      }
    };

    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }

  }, [navigate, dispatch]);

  console.log(user);

  const navItems = [
    { key: "1", label: "Home", icon: <HomeOutlined /> },
    {
      key: "2", label: `${user ? user.name : ""}`, icon: <UserOutlined />, children: [
        {
          label: (
            < span onClick={() => {
              if (user.role === "admin") {
                navigate("/admin");
              }
              else if (user.role === "partner") {
                navigate("/partner");
              }
              else {
                navigate("/profile");
              }
            }
            }> My Profile</span >)
          , icon: <ProfileOutlined />
        },
        { label: (<Link to={"/login"} onClick={() => { localStorage.removeItem("token") }}>Logout</Link>), icon: <LogoutOutlined /> },
      ]
    }
  ];

  return (
    user && (
      <Flex gap="middle" wrap>
        <Layout>
          <Header style={{
            justifyContent: "space-between",
            display: "flex",
            position: "sticky",
            top: 0, 
            zIndex: 1,
            width:"100%",
            alignItems: "center",
          }}>
            <h3 style={{ color: "#fff", margin: 0 }}>Book My Show</h3>
            <Menu items={navItems} theme='dark' mode='horizontal' />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </Flex>)
  )
}

export default ProtectedRoute