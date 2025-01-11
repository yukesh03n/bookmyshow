import React, { useEffect, useState } from 'react'
import { Col, Input, message, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllMovies } from '../../api/movie';
import { hideLoading, showLoading } from '../../redux/loaderSlice';
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUser = async () => {
      try {
        dispatch(showLoading());
        const response = await getAllMovies();
        if (response.success) {
          setMovies(response.data);
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

    fetchUser();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            placeholder="Type here to search for movies"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row
        className="justify-content-center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {movies &&
          movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((movie) => (
              <Col
                className="gutter-row mb-5"
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div className="text-center">
                  <img
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                    src={movie.poster}
                    alt="Movie Poster"
                    width={200}
                    style={{ borderRadius: "8px" }}
                  />
                  <h3
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                  >
                    {movie.title}
                  </h3>
                </div>
              </Col>
            ))}
      </Row>
    </>

  )
}
