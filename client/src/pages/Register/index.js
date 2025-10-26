import React from 'react';
import { Button, Form, Input, message, Radio } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../api/user';

const Register = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {

        try {
            const response = await RegisterUser(values);
            if (response.success) {
                message.success(response.message);
                navigate('/login');
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
            <Title style={{ paddingBottom: "20px" }} level={3} p={2} >Register to Book My Show</Title>
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
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
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

                <Form.Item
                    label="Register has a partner"
                    htmlFor='role'
                    name={"role"}
                    initialValue={false}
                    rules={[
                        {
                            required: true,
                            message: 'Please select an option!',
                        },
                    ]}
                >
                    <Radio.Group name="radiogroup" >
                        <Radio value={"partner"}>Yes</Radio>
                        <Radio value={"user"}>No</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                <div>
                    <p>Already registered ? <Link to={"/login"}>Login</Link></p>
                </div>
            </Form>
        </main>
    )

};
export default Register;