import React, { useContext } from 'react';
import { FavoriteCtx } from '../../Context/FavoriteContext';
import './Attraction.css';

export default function Attraction({ dissInKm, attraction }) {

    const [, setFavList] = useContext(FavoriteCtx);

    function favHandler() {
        attraction.isFavorited = !attraction.isFavorited;

        if (attraction.isFavorited) {
            const newFav = <Attraction key={attraction._id}
                dissInKm={dissInKm}
                attraction={attraction}
            />
            setFavList(prev => [...prev, newFav]);
        } else {
            const getLocalStorage = JSON.parse(localStorage.getItem('favListLocal'))
            let id = 0;
            const index = getLocalStorage.findIndex(favObj => (favObj.props.attraction._id === id))
            getLocalStorage.splice(index, 1);
            localStorage.setItem('favListLocal', JSON.stringify(getLocalStorage));
            setFavList(getLocalStorage);
        }
    }

    return (
        <li className="table-row">
            <div className="col col-1" data-label="מועדפים"><i className={`fa fa-heart ${attraction.isFavorited ? 'fill-heart' : ''}`} onClick={favHandler}></i></div>
            <div className="col col-2" data-label="לינק לאתר האטרקציה"><a className='Link' href={attraction.URL}>לינק לאתר</a></div>
            <div dir='rtl' className="col col-3" data-label="מרחק בק'מ מהמיקום הנוכחי">{dissInKm} ק"מ</div>
            <div className="col col-4" data-label="כתובת">{attraction.Address}</div>
            <div className="col col-4" data-label="שם אטרצקיה">{attraction.Name}</div>
            <div className="col col-4" data-label="מס מזהה של האטרקציה">{attraction.Id}</div>
        </li>
    )
}