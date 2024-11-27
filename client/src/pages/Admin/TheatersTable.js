import { useEffect, useState } from "react";
import { getAllTheatreForAdmin } from "../../api/theatre";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { Button, Table } from "antd";

function TheatreTable() {

  const [theatres, setTheatres] = useState([]);
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
          <>

          </>
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