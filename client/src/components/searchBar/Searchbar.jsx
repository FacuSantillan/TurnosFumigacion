import style from './searchbar.module.css'

import { getClientName } from '../../redux/actions'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Searchbar(props) {
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value) => {
        setSearchValue(value); 
        dispatch(getClientName(value));
    };
      
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            dispatch(getClientName(searchValue));
        }
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            dispatch(getClientName(searchValue))
        }
    };

    return (
        <div>
            <input
                type='search'
                className={style.input}
                placeholder='Buscar por nombre.'
                value={searchValue}
                onChange={(event) => handleSearch(event.target.value)}
                onKeyDown={handleKeyDown}
                onKeyUp={handleEnter}
            />
            <button onClick={handleSearch} className='submit'>
            </button>
        </div>
    )
}


