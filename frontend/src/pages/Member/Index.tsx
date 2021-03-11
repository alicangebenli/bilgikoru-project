import React, {useEffect, useState} from "react";
import * as api from "../../api/index";
import {Layout} from "../../components/Layout";
import {Table, Button, Modal, Form} from "react-bootstrap";
import {PaginationComponent} from "../../components/PaginationComponent";
import {Redirect} from "react-router-dom";
import {Member} from "../../models/Member";

export const MemberIndex = () => {
    const [members, setMembers] = useState([]);
    const [pageData, setPageData] = useState({total: 1});
    const [redirect, setRedirect] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<Member>({
        id: 0,
        first_name: '',
        last_name: '',
        phone: '',
        tc_number: '',
        addresses: [],
        created_at: "",
        updated_at: ""
    });
    const getMembers = async () => {
        let data = await api.members(1);
        await setMembers(data.data);

        await setPageData({
            total: data.last_page
        });
    }

    useEffect(() => {
        (async () => {
            try {
                await getMembers()
            } catch (e) {
                await setRedirect(true);
            }
        })();
    }, []);

    const handleChangePage = (i: any) => {
        (async () => {
            let data = await api.members(i + 1);
            await setMembers(data.data);
        })();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleUpdateMember = async () => {
        await api.updateMember(modalData);
        await getMembers();
    }

    const handleDeleteMember = async (id:number) => {
        await api.deleteMember(id);
        await getMembers();
    }

    const handleOpenModal = (member: any) => {
        setModalData(member);
        setShowModal(true);
    }

    if (redirect) {
        return <Redirect to={"/login"}/>
    }

    return (
        <Layout>
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map((member: Member) => {
                        return (
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.first_name}</td>
                                <td>{member.last_name}</td>
                                <td>{member.phone}</td>
                                <td>
                                    {member.addresses.map((address: any) => {
                                        return (
                                            <span>
                                                {address.address}
                                                <br/>
                                            </span>
                                        )
                                    })}
                                </td>
                                <td className={"d-flex"}>
                                    <Button size="sm" onClick={() => {
                                        handleOpenModal(member)
                                    }}>Edit</Button>
                                    <Button size="sm" onClick={() => {
                                        handleDeleteMember(member.id)
                                    }}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <PaginationComponent data={pageData} changePage={handleChangePage}/>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="first_name" type="text" onChange={(event) => {
                                    setModalData({
                                        ...modalData,
                                        first_name: event.target.value
                                    })
                                }} value={modalData.first_name}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="last_name" type="text" onChange={(event) => {
                                    setModalData({
                                        ...modalData,
                                        last_name: event.target.value
                                    })
                                }} value={modalData.last_name}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control name="phone" type="text" onChange={(event) => {
                                    setModalData({
                                        ...modalData,
                                        phone: event.target.value
                                    })
                                }} value={modalData.phone}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tc Number</Form.Label>
                                <Form.Control name="tc_number" type="text" onChange={(event) => {
                                    setModalData({
                                        ...modalData,
                                        tc_number: event.target.value
                                    })
                                }} value={modalData.tc_number}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdateMember}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Layout>
    )
}