import {Layout} from "../../components/Layout";
import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import * as api from "../../api";
import {Redirect} from "react-router-dom";

export const MemberCreate = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [memberData, setMemberData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        tc_number: ""
    });
    const [addressData, setAddressData] = useState([
        ''
    ]);

    useEffect(() => {
        (async () => {
            try {
                await api.user();
                await setIsLogin(true);
            } catch (e) {
                await setIsLogin(false);
            }
        })();
    }, []);

    const handleSubmit = async (data: object) => {
        await api.createMember(data);
    }

    const handleOnChange = (text: string, index: number) => {
        const list = [...addressData];
        list[index] = text;
        setAddressData(list);
    }
    const addAddressInput = () => {
        setAddressData([...addressData, ""]);
    }

    const removeAddressInput = (i: number) => {
        if (i !== 0) {
            setAddressData(addressData.filter((item, index) => {
                return index !== i
            }));
        }
    }

    if (!isLogin) {
        return <Redirect to={"/login"}/>
    }

    return (
        <Layout>
            <div className="memberCreate">
                <Form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="first_name" onChange={(e) => {
                            setMemberData({
                                ...memberData,
                                first_name: e.target.value
                            });
                        }} type="text"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="last_name" onChange={(e) => {
                            setMemberData({
                                ...memberData,
                                last_name: e.target.value
                            });
                        }} type="text"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control name="phone" onChange={(e) => {
                            setMemberData({
                                ...memberData,
                                phone: e.target.value
                            });
                        }} type="text"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tc Number</Form.Label>
                        <Form.Control name="tc_number" onChange={(e) => {
                            setMemberData({
                                ...memberData,
                                tc_number: e.target.value
                            });
                        }} type="text"/>
                    </Form.Group>
                    <Button onClick={addAddressInput} size="sm"> + </Button>
                    Address
                    {addressData.map((item, index) => {
                        return (
                            <Form.Group className="d-flex mt-1">
                                <Button className="mr-1" onClick={() => {
                                    removeAddressInput(index)
                                }} size="sm"> - </Button>
                                <Form.Control name="addresses" onChange={(e) => {
                                    handleOnChange(e.target.value, index)
                                }} type="text"/>
                            </Form.Group>
                        )
                    })}
                    <Button onClick={() => {
                        handleSubmit({...memberData, "addresses": addressData})
                        console.log('asd')
                    }} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Layout>
    )
}