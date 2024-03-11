/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState, KeyboardEvent, ChangeEvent } from 'react';
import { SearchPanelProps } from '../types/types';

const date = new Date();

const SearchPanel: React.FC<SearchPanelProps> = ({ onSearch }: SearchPanelProps) => {
    const [inputValue, setInputValue] = useState('');
    const [hours, setHours] = useState(date.getHours());
    const [minutes, setMinutes] = useState(date.getMinutes());
    const [seconds, setSeconds] = useState(date.getSeconds());

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            setHours(currentDate.getHours());
            setMinutes(currentDate.getMinutes());
            setSeconds(currentDate.getSeconds());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const debounce = (func: Function, delay: number): ((...args: unknown[]) => void) => {
        let timeoutId: number | undefined;
        return function (...args: unknown[]) {
            clearTimeout(timeoutId!);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const delayedSearch = debounce((searchValue: string) => {
        onSearch(searchValue.trim());
    }, 300);    

    const handleSearchClick = () => {
        onSearch(inputValue.trim());
    };

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        delayedSearch.call(this, e.target.value);
    };

    const time = [hours, minutes, seconds]
        .map((seconds) => (seconds < 10 ? `0${seconds}` : seconds))
        .join(':');

    return (
        <header className="header">
            <div className="searchPanel">
                <input
                    type="search"
                    placeholder="Search here..."
                    value={inputValue}
                    onKeyUp={handleKeyUp}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    onClick={handleSearchClick}
                    disabled={inputValue.length === 0}
                >
                    Search
                </button>
            </div>
            <div className="clock">{time}</div>
        </header>
    );
}

export default SearchPanel;
