import { useEffect, useState } from "react";
import { getAllTheatreForAdmin, updateTheatre } from "../../api/theatre";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { Button, message, Table } from "antd";

function TheatreTable() {

  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  const handleStatusChange = async (data) => {
    try {
      dispatch(showLoading());

      let response = await updateTheatre({ ...data, theatreId: data._id, isActive: !data.isActive });

      if (response.success) {
          getData();
          message.success(response.message);
      } else {
          message.error(response.message);
      }
      dispatch(hideLoading());
  } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
  }
  };

  const tableHeadings = [
    { title: "Name", dataIndex: "name" },
    { title: "Address", dataIndex: "address" },
    { title: "Phone Number", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Owner", dataIndex: "owner", render: (text, data) => {
        return data.owner && data.owner.name;
      }
    },
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
            {
              data.isActive ? (
                <Button onClick={() => handleStatusChange(data)}>Block</Button>
              ) : (
                <Button onClick={() => handleStatusChange(data)}>Approve</Button>
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

      const response = await getAllTheatreForAdmin();

      dispatch(hideLoading());

      if (response.success) {
        const allData = response.data.map((v, key) => { return { ...v, key: v._id } });
        setTheatres(allData);
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
      {
        theatres && theatres.length > 0 && (
          <Table dataSource={theatres} columns={tableHeadings} />
        )
      }

    </div>
  )
}

export default TheatreTable