import { useCallback, useState } from 'react';
import MovieList from "../components/MovieList";
import SearchPanel from "../components/SearchPanel";

export default function Home() {
    const [searchText, setSearchText] = useState('');

    const handleSearch = useCallback((value: string) => {
        setSearchText(value);
    }, []);

    return (
        <div className={'container'}>
            <SearchPanel onSearch={handleSearch} />
            <MovieList searchText={searchText} />
        </div>
    )
}
