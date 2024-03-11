import { useState, useEffect } from 'react';
import ImageNotAvailable from '../assets/ImageNotAvailable.png';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import { MovieItemProps } from '../types/types';

const MovieItem: React.FC<MovieItemProps> = ({ movie, onLikeClick }: MovieItemProps) => {
    const [showAllText, setShowAllText] = useState(false);
    const [showScroll, setShowScroll] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=9ea85f65692e5fcd2ab4410e1ef9ffb5`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response wasn't ok");
                }
                return response.json();
            })
            .then(res => {
                const backdrops: string[] = res.backdrops.map((value: { file_path: string }) => value.file_path);
                const firstBackdropPath: string | null = backdrops.length > 0 ? backdrops[0] : null;
                setImagePath(firstBackdropPath);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });

    }, [movie.id]);

    const handleShowLessClick = () => {
        setShowAllText(false);
        setShowScroll(false);
    };

    const handleShowMoreClick = () => {
        setShowAllText(true);
        setShowScroll(true);
    };

    const handleLikeClick = () => {
        setIsLiked(prevIsLiked => {
            const newIsLiked = !prevIsLiked;
            onLikeClick(newIsLiked);
            return newIsLiked;
        });
    };

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && console.error(error)}
            {!movie && <div>didn't fing any movies</div>}
            <figure className="cardItem" key={movie.id}>
                {imagePath ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${imagePath}`}
                        alt="movie-img"
                        className={'movieImage'}
                    />
                ) : (
                    <img src={ImageNotAvailable} className={'noImage'} alt={'not found'} />
                )}
                <button className={'likeButton'} onClick={handleLikeClick}>
                    <span>
                        {isLiked ? (
                            <FavoriteSharpIcon style={{ color: 'red', fontSize: 25 }} />
                        ) : (
                            <FavoriteIcon style={{ color: 'red', fontSize: 25 }} />
                        )}
                    </span>
                </button>
                <figcaption className="content">
                    <p className={'title'}>{movie.original_title}</p>
                    <p className="language">
                        Original language:
                        <span>{movie.original_language}</span>
                    </p>
                    <p className="releaseDate">
                        Release date:<span> {movie.release_date}</span>
                    </p>
                    <p
                        className="descriptionPanel"
                        style={{
                            overflowY: showScroll ? 'scroll' : 'hidden',
                            overflowX: 'hidden',
                            maxWidth: 350,
                            width: '100%',
                            maxHeight: 250,
                        }}
                    >
                        <span className={'description'}>
                            <span>
                                {movie.overview.length > 150 && !showAllText
                                    ? `${movie.overview.slice(0, 50)}...`
                                    : movie.overview}
                            </span>
                            {!showAllText ? (
                                <button onClick={handleShowMoreClick} className={'showMoreButton'}>
                                    Show more
                                </button>
                            ) : (
                                <button onClick={handleShowLessClick} className={'showLessButton'}>
                                    Show less
                                </button>
                            )}
                        </span>
                    </p>
                </figcaption>
            </figure>
        </>
    );
};

export default MovieItem;
