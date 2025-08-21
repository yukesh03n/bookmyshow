import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useEffect } from "react";
import { Col, message, Row } from "antd";
import { useState } from "react";
import { getAllBookings } from "../../api/booking";

function Bookings() {

    const [bookings, setBookings] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                dispatch(showLoading());
                const response = await getAllBookings();
                if (response.success) {
                    setBookings(response.data);
                } else {
                    message.error(response.message);
                }
                dispatch(hideLoading());
            }
            catch (e) {
                console.log(e);
                message.error(e);
            }
        };

        fetchBookings();
    }, []);
    return (
        <Row
            className="justify-content-center"
            gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }}
        >
            {bookings.length &&
                bookings
                   .map((data) => (
                        <Col
                            className="gutter-row mb-5"
                            key={data.show.movie._id}
                            span={{
                                xs: 24,
                                sm: 24,
                                md: 12,
                                lg: 10,
                            }}
                        >
                            <div className="">
                                <img
                                    className="cursor-pointer"
                                    src={data.show.movie.poster}
                                    alt="Movie Poster"
                                    width={200}
                                    style={{ borderRadius: "8px" }}
                                />
                                <h3
                                    className="cursor-pointer"
                                >
                                    {data.show.movie.title}
                                </h3>
                                <h4
                                    className="cursor-pointer"
                                >
                                    Booked Seats : {data.seats.toString()}
                                </h4>
                                <h4
                                    className="cursor-pointer"
                                >
                                    Time : {data.show.time}
                                </h4>
                                <h4
                                    className="cursor-pointer"
                                >
                                    Date : {data.show.date}
                                </h4>
                            </div>
                        </Col>
                    ))}
        </Row>
    );
}

export default Bookings;