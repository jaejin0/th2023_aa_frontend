import React, {useState} from 'react';
import DatePicker from 'react-datepicker';

import './styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

const Search = () => {
    const [flightNumber, setFlightNumber] = useState();
    const [date, setDate] = useState(new Date());

    return (
        <div className='search-page'>
            <h1>Airport Planner</h1>
            <div className='search-box'>
                <h3>Enter your flight information to get started</h3>
                <div className='flight-info'>
                    <div className='flight-number'>
                        <input
                            onChange={(e) => {setFlightNumber(e.target.value)}}
                            placeholder='Flight Number'
                        />
                    </div>
                    <div className='date'>
                        <DatePicker
                            selected={date} 
                            onChange={(date) => setDate(date)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;