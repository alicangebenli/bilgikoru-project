import {Form, Button} from "react-bootstrap";
import {Layout} from "../../components/Layout";
import React, {useEffect, useState} from "react";
import * as api from "../../api";
import {Redirect} from "react-router-dom";

export const Login = () => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await api.user();
                await setIsLogin(true);
            }catch (e) {
                await setIsLogin(false);
            }
        })();
    }, []);

    const handleLogin = async (e: React.SyntheticEvent) => {
        await e.preventDefault();
        const target = await e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };

        };
        const {email, password} = await target;

        try {
            let data = await api.login({
                email: email.value,
                password: password.value
            });

            localStorage.setItem('token', data.data.jwt);
            window.location.reload();
        } catch (e) {

        }
    }

    if(isLogin) {
        return <Redirect to={"/members"} />
    }

    return (
        <Layout>
            <div className="login">
                <Form onSubmit={handleLogin}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Layout>
    )
}