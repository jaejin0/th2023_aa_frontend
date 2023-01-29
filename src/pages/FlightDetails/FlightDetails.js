import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import moment from 'moment';
import { toast } from 'react-toastify';

import { ReactComponent as Plane } from '../../img/plane.svg';
import { ReactComponent as Cloud1 } from '../../img/cloud1.svg';
import { ReactComponent as Cloud3 } from '../../img/cloud3.svg';
import { ReactComponent as Cloud4 } from '../../img/cloud4.svg';

import './styles.scss';

const MockInfo = {
    departure: 'Dallas-Fort Worth',
    arrival: 'Austin',
    departureTime: '02:56 AM',
    baggageCheckTime: 20,
    tsaTime: 20,
    walkTime: 20
};

const FlightDetails = () => {
    const params = useParams();
    const search = useLocation().search;
    const timestamp = new URLSearchParams(search).get('date');
    const date = new Date(timestamp * 1000);

    const [restart, setRestart] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const navigate = useNavigate();

    const extraTime = 20; // minutes

    const [departure, setDeparture] = useState('...'); 
    const [arrival, setArrival] = useState('...');
    const [departureTime, setDepartureTime] = useState('...'); // 02:56 AM
    const [baggageCheckTime, setBaggageCheckTime] = useState('...');
    const [tsaTime, setTSATime] = useState('...');
    const [walkTime, setWalkTime] = useState('...');
    const [recommendedArrival, setRecommendedArrival] = useState('...');

    // TODO - Pull data from API
    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/members/${date.toISOString().substr(0, 10)}/${params.flightNum}`);
            const data = await response.json();
            setArrival(data.arrival);
            setBaggageCheckTime(data.baggageTime)
            setDeparture(data.departure)
            setDepartureTime(data.departureTime[0] == 0 ? MockInfo.departureTime.slice(1) : data.departureTime)
            setTSATime(data.tsaTime)
            setWalkTime(data.walkTime)
        } catch {
            console.log('error getting info for flight number');
        }

        let departureDate = new Date(`${date.toISOString().split('T')[0]} ${departureTime}`);
        let arrivalString = moment(departureDate).subtract(baggageCheckTime + tsaTime + walkTime + extraTime, 'm').toDate()
            .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        arrivalString = arrivalString[0] == 0 ? arrivalString.slice(1) : arrivalString;
        setRecommendedArrival(arrivalString);

        setLoaded(true);
    };

    const onRestart = async () => {
        setRestart(true);
        await delay(1500);
        navigate('/');
    };

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div className={!loaded || restart ? 'details-page hide' : 'details-page'}>
            <h1>CALCULATED FLIGHT LOGISTICS</h1>

            <div className='info-container'>
                <div>
                    <p>Departure:</p>
                    <p>{departure}</p>
                </div>
                <div>
                    <p>Arrival:</p>
                    <p>{arrival}</p>
                </div>
                <div>
                    <p>Departure Time:</p>
                    <p>{departureTime}</p>
                </div>
                <div>
                    <p>Baggage Check Time:</p>
                    <p>{baggageCheckTime} min</p>
                </div>
                <div>
                    <p>TSA Time:</p>
                    <p>{tsaTime} min</p>
                </div>
                <div>
                    <p>Walk Time:</p>
                    <p>{walkTime} min</p>
                </div>
                <div>
                    <p>Extra Time:</p>
                    <p>{extraTime} min</p>
                </div>
                <div>
                    <p>Recommended Airport Arrival:</p>
                    <p>{recommendedArrival}</p>
                </div>
                <div className='restart'>
                    <Button onClick={onRestart} variant='contained'>Restart</Button>
                </div>
            </div>

            <Plane className={!loaded || restart ? 'plane out' : 'plane in'}/>
            <Cloud1 className={!loaded || restart ? 'cloud1 out' : 'cloud1 in'}/>
            <Cloud3 className={!loaded || restart ? 'cloud3 out' : 'cloud3 in'}/>
            <Cloud4 className={!loaded || restart ? 'cloud4 out' : 'cloud4 in'}/>
        </div>
    );
};

export default FlightDetails;