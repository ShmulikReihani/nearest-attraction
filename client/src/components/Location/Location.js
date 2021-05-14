import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../UI/Button/Button';
import './Location.css';

export default function Location({ propsLongitude, propsLatitude }) {

    const history = useHistory();
    const [status, setstatus] = useState('');

    function getLocation() {

        let latitude;
        let longitude;

        function success(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            propsLatitude.setLatitude(latitude);
            propsLongitude.setLongitude(longitude);
        }

        function error() {
            setstatus('Unable to retrieve your location');
        }

        if (!navigator.geolocation) {
            setstatus('Geolocation is not supported by your browser');
        } else {
            setstatus('Locating…');
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return (
        <div>
            <Button btnType="Success" clicked={getLocation}>הצג מיקום נוכחי</Button>
            {propsLongitude.longitude ?
                <div>
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-1">longitude</div>
                            <div className="col col-2">latitude</div>
                            <div className="col col-3">מצא אטרקציות בסביבתי</div>
                        </li>
                        <li className="table-row">
                            <div className="col col-1" data-label="longitude">{propsLongitude.longitude}°</div>
                            <div className="col col-2" data-label="latitude">{propsLatitude.latitude}°</div>
                            <div className="col col-3" data-label="מצא אטרקציות בסביבתי"><i className="fa fa-external-link" aria-hidden="true" onClick={() => history.push('/attractions')}></i></div>
                        </li>
                    </ul>
                </div>
                :
                <div>{status}</div>
            }
        </div>
    )
}
