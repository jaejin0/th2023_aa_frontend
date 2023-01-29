import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    const [flightNumber, setFlightNumber] = useState(null);
    const [date, setDate] = useState(dayjs('2023-01-28T21:11:54'));
    const [submit, setSubmit] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const onSubmit = async () => {
        if (flightNumber !== null && flightNumber !== '') {
            setSubmit(true);
            await delay(1500); // wait for animation to complete then redirect
            navigate(`/catch/${flightNumber}?date=${date.unix()}`);
        } else
            toast.error('Please enter a flight number!');
    };

    const delayLoad = async () => {
        await delay(750);
        setLoaded(true);
    }

    useEffect(() => {
        delayLoad();
    }, [delayLoad]);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className={!loaded || submit ? 'search-page hide' : 'search-page'}>
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
                        <Button onClick={onSubmit} variant='contained'>Get Info</Button>
                    </div>
                </div>

                <Plane className={!loaded || submit ? 'plane out' : 'plane in'}/>
                <Cloud1 className={!loaded || submit ? 'cloud1 out' : 'cloud1 in'}/>
                <Cloud2 className={!loaded || submit ? 'cloud2 out' : 'cloud2 in'}/>
                <Cloud3 className={!loaded || submit ? 'cloud3 out' : 'cloud3 in'}/>
                <Cloud4 className={!loaded || submit ? 'cloud4 out' : 'cloud4 in'}/>
            </div>
        </LocalizationProvider>
    );
};

export default Search;