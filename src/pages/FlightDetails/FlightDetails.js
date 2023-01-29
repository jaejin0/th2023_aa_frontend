import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { ReactComponent as Plane } from '../../img/plane.svg';
import { ReactComponent as Cloud1 } from '../../img/cloud1.svg';
import { ReactComponent as Cloud3 } from '../../img/cloud3.svg';
import { ReactComponent as Cloud4 } from '../../img/cloud4.svg';

import './styles.scss';

const FlightDetails = () => {
    const params = useParams();
    const search = useLocation().search;
    const timestamp = new URLSearchParams(search).get('date');
    const date = new Date(timestamp * 1000);

    const [restart, setRestart] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const navigate = useNavigate();

    const onRestart = async () => {
        setRestart(true);
        await delay(1500);
        navigate('/');
    };

    const delayLoad = async () => {
        await delay(750);
        setLoaded(true);
    }

    useEffect(() => {
        delayLoad();
    }, []);

    // TODO - Pull data from API

    return (
        <div className={!loaded || restart ? 'details-page hide' : 'details-page'}>
            <h1>CALCULATED FLIGHT LOGISTICS</h1>

            <div className='info-container'>
                <div>
                    <p>Departure:</p>
                    <p>Dallas, TX</p>
                </div>
                <div>
                    <p>Arrival:</p>
                    <p>Austin, TX</p>
                </div>
                <div>
                    <p>Departure Time:</p>
                    <p>1:45 PM CST</p>
                </div>
                <div>
                    <p>Baggage Check Time:</p>
                    <p>40 min</p>
                </div>
                <div>
                    <p>TSA Time:</p>
                    <p>30 min</p>
                </div>
                <div>
                    <p>Walk Time:</p>
                    <p>20 min</p>
                </div>
                <div>
                    <p>Extra Time:</p>
                    <p>20 min</p>
                </div>
                <div>
                    <p>Recommended Airport Arrival:</p>
                    <p>11:55 PM CST</p>
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