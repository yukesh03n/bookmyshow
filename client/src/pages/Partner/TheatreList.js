import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTheatre } from '../../api/theatre';
import { hideLoading, showLoading } from '../../redux/loaderSlice';
import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import TheatreFormModal from './TheatreFormModal';
import DeleteTheatreModal from './DeleteTheatreModal';
import ShowModal from './ShowModal';

function TheatreList() {

    const { user } = useSelector(state => state.users);
    console.log(user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [theatre, setTheatre] = useState([]);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [formType, setFormType] = useState("add");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);

    const dispatch = useDispatch();

    const tableHeadings = [
        { title: "Name", dataIndex: "name" },
        { title: "Address", dataIndex: "address" },
        { title: "Phone Number", dataIndex: "phone" },
        { title: "Email", dataIndex: "email" },
        {
            title: "Status", dataIndex: "status", render: (text, data) => {
                if (data.isActive) {
                    return "Approved"
                } else {
                    return "Pending/ Blocked"
                }
            }
        },
        {
            title: "Actions", render: (text, data) => {
                return (
                    <div className="d-flex align-items-center gap-10">
                        <Button>
                            <EditOutlined onClick={() => {
                                setIsModalOpen(true);
                                setSelectedTheatre(data);
                                setFormType("edit");
                            }} />
                        </Button>
                        <Button >
                            <DeleteOutlined onClick={() => {
                                setIsDeleteModalOpen(true);
                                setSelectedTheatre(data);
                            }} />
                        </Button>
                        {
                            data.isActive && (
                                <Button onClick={() => {
                                    setIsShowModalOpen(true);
                                    setSelectedTheatre(data);
                                }}>
                                    + Shows
                                </Button>
                            )
                        }
                    </div>
                )
            }
        },
    ];

    const getData = async () => {

        dispatch(showLoading());

        try {

            const response = await getAllTheatre(user._id);

            dispatch(hideLoading());

            if (response.success) {
                const allData = response.data.map((v, key) => { return { ...v, key: v._id } });
                setTheatre(allData);
            } else {
                console.log(response.message);
            }
        }
        catch (e) {
            dispatch(hideLoading());
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Button onClick={() => {
                setIsModalOpen(true);
                setFormType("add");
            }}
            >Add Theatre</Button>
            <Table dataSource={theatre} columns={tableHeadings} />
            {isModalOpen && (
                <TheatreFormModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedTheatre={selectedTheatre}
                    formType={formType}
                    setSelectedTheatre={setSelectedTheatre}
                    getData={getData}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteTheatreModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    selectedTheatre={selectedTheatre}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setSelectedTheatre={setSelectedTheatre}
                    getData={getData}
                />
            )}

            {isShowModalOpen && (
                <ShowModal
                    isShowModalOpen={isShowModalOpen}
                    setIsShowModalOpen={setIsShowModalOpen}
                    selectedTheatre={selectedTheatre}
                />
            )}


        </div>
    )
}

export default TheatreList