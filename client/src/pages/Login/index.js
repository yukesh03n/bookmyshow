import React from 'react';
import { Button, Form, Input, message } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../api/user';


const Login = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {

        try {
            const response = await LoginUser(values);
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.token);
                navigate("/home");
            } else {
                message.error(response.message);
            }
        }
        catch (e) {
            console.log(e);
            message.error(e);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <main className='App-header'>
            <Title style={{ paddingBottom: "20px" }} level={3} p={2} >Login to Book My Show</Title>
            <Form
                style={{ textAlign: "center" }}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: "email",
                            message: "Enter a valid email!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                <div>
                    <p>New User ? <Link to={"/register"}>Register Here</Link></p>
                    <p>
                        Forgot Password? <Link to="/forget">Click Here</Link>
                    </p>
                </div>
            </Form>
        </main>
    );
};
export default Login;