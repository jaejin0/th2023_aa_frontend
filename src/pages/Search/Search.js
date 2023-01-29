import React, {useState} from 'react';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { ReactComponent as Plane } from '../../img/plane.svg';
import { ReactComponent as Cloud1 } from '../../img/cloud1.svg';
import { ReactComponent as Cloud2 } from '../../img/cloud2.svg';
import { ReactComponent as Cloud3 } from '../../img/cloud3.svg';
import { ReactComponent as Cloud4 } from '../../img/cloud4.svg';

import './styles.scss';

const Search = () => {
    const [flightNumber, setFlightNumber] = useState();
    const [date, setDate] = useState(dayjs('2023-01-28T21:11:54'));

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className='search-page'>
                <h1>FLIGHT CATCHER</h1>

                <div className='info-container'>
                    <div className='flight-number'>
                        <p>Flight Number</p>
                        <TextField 
                            fullWidth
                            color='primary'
                            onChange={(e) => setFlightNumber(e.target.value)}
                        />
                    </div>
                    <div className='date'>
                        <p>Date</p>
                        <DesktopDatePicker
                            fullWidth
                            value={date}
                            onChange={(date) => setDate(date)}
                            renderInput={(params) => <TextField {...params} fullWidth/>}
                        />
                    </div>
                    <div className='submit'>
                        <Button variant='contained'>Get Info</Button>
                    </div>
                </div>

                <Plane className='plane'/>
                <Cloud1 className='cloud1'/>
                <Cloud2 className='cloud2'/>
                <Cloud3 className='cloud3'/>
                <Cloud4 className='cloud4'/>
            </div>
        </LocalizationProvider>
    );
};

export default Search;