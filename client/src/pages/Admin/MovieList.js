import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/loaderSlice';
import { getAllMovies } from '../../api/movie';
import MovieForm from './MovieForm';
import DeleteMovieModal from './DeleteMovieModal';

function MovieList() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const dispatch = useDispatch();

    const fakeMovies = [
        {
            key: "1",
            poster: "Image 1",
            title: "Wolf of wall street",
            descriptions: "Stock market",
            duration: 120,
            genre: "comedy",
            language: "English",
            realeaseDate: "2024-08-01"
        },
        {
            key: "2",
            poster: "Image 2",
            title: "Wolf of wall street 2",
            descriptions: "Stock market",
            duration: 120,
            genre: "comedy",
            language: "English",
            realeaseDate: "2024-08-01"
        }
    ];

    const tableHeadings = [
        {
            title: "Poster", dataIndex: "poster", render: (text, data) => {
                return (
                    <img width={"75"} height={"115"} style={{ objectFit: "cover" }} src={data.poster} />
                );
            }
        },
        {
            title: "Movie Name", dataIndex: "title"
        },
        { title: "Descriptions", dataIndex: "description" },
        { title: "Duration", dataIndex: "duration", render: (text) => `${text} min` },
        { title: "Genre", dataIndex: "genre" },
        { title: "Language", dataIndex: "language" },
        {
            title: "Realease Date", dataIndex: "realeaseDate", render: (text, data) => {
                return moment(data.realeaseDate).format("MM-DD-YYYY")
            }
        },
        {
            title: "Actions", render: (text, data) => {
                return (
                    <>
                        <Button>
                            <EditOutlined onClick={() => {
                                setIsModalOpen(true);
                                setSelectedMovie(data);
                                setFormType("edit");
                            }} />
                        </Button>
                        <Button>
                            <DeleteOutlined onClick={() => {
                                setIsDeleteModalOpen(true);
                                setSelectedMovie(data);
                            }} />
                        </Button>
                    </>
                )
            }
        },
    ];

    const getData = async () => {

        dispatch(showLoading());

        try {

            const response = await getAllMovies();

            dispatch(hideLoading());

            if (response.success) {
                const allMovies = response.data.map((v, key) => { return { ...v, key: v._id } });
                setMovies(allMovies);
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
            >Add movies</Button>
            <Table dataSource={movies} columns={tableHeadings} />
            {isModalOpen && (
                <MovieForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedMovie={selectedMovie}
                    formType={formType}
                    setSelectedMovie={setSelectedMovie}
                    getData={getData}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteMovieModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    selectedMovie={selectedMovie}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setSelectedMovie={setSelectedMovie}
                    getData={getData}
                />
            )}

        </div>
    )
}

export default MovieList