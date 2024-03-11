import { useState, useEffect, useCallback } from 'react';
import { allMovies } from "../API/Api";
import MovieItem from "./MovieItem";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import { MovieListProps, Movie } from '../types/types';
import { CircularProgress } from '@mui/material';

const MovieList = ({ searchText }: MovieListProps) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [likedMovies, setLikedMovies] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        allMovies()
            .then(res => res.json())
            .then(data => {
                setMovies(data.results);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(true);
                console.error(error);
            })

        setIsLoading(false);
    }, []);

    const filterMovies = useCallback(() => {
        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchText.toLowerCase())
            || movie.overview.toLowerCase().includes(searchText.toLowerCase())
            || movie.original_language.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredMovies(filteredMovies);
    }, [movies, searchText]);

    useEffect(() => {
        setIsLoading(true);
        filterMovies();
        // setIsLoading(false);
    }, [searchText, movies, filterMovies]);

    const handleLikeClick = (isLiked: boolean) => {
        setLikedMovies(prevLikedMovies => isLiked ? prevLikedMovies + 1 : prevLikedMovies - 1);
    };

    return (
        <div className={'cardList'}>
            <div className="about">
                {filteredMovies.length ? (
                    <div className="foundMovies">
                        Similar movies: <span> {filteredMovies.slice(0, 10).length}</span>
                    </div>
                ) : null}
                <div className={'likesCount'}>
                    <FavoriteSharpIcon style={{ color: 'red', fontSize: 25 }} />
                    <span>{likedMovies}</span>
                </div>
            </div>
            <div>
                {isLoading
                    ? <CircularProgress />
                    : (
                        <div>
                            {filteredMovies.length > 0 && (
                                filteredMovies
                                    .slice(0, 10)
                                    .map((movie) => (
                                        <MovieItem
                                            key={movie.id}
                                            movie={movie}
                                            onLikeClick={handleLikeClick}
                                        />
                                    ))
                            )
                            //  : (
                            //     <div className={'noData'}>
                            //         <p>No data...</p>
                            //     </div>
                            // )
                        }
                        </div>
                    )}
            </div>
        </div>
    );
};

export default MovieList;
