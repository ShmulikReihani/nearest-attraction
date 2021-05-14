import React, { useState, useEffect } from 'react';
import Attraction from './Attraction/Attraction';
import Buttom from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import { Redirect } from 'react-router-dom';
import { CalculateDistance } from '../../utils/calculates';
import axios from 'axios';
import './Attractions.css';

export default function Attractions({ propsLongitude, propsLatitude }) {

    const [attractions, setAttractions] = useState([]);
    const [attractionTypeName, setAttractionTypeName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const url = process.env.REACT_APP_SERVER_URL + '/attraction';
        axios.get(url)
            .then(res => {
                let attractionsList = makeAttractionList(res.data);
                attractionsList.sort((a, b) => a.props.dissInKm > b.props.dissInKm ? 1 : -1)
                setAttractions(attractionsList);
                setLoading(prev => !prev)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function makeAttractionList(dataArray) {
        const dataList = dataArray.map(attraction => {
            let isFavorited = false;
            const attractionItem = <Attraction key={attraction._id}
                dissInKm={CalculateDistance(propsLongitude, propsLatitude, attraction.X, attraction.Y)}
                attraction={{ ...attraction, isFavorited: isFavorited }}
            />

            const favList = JSON.parse(window.localStorage.getItem('favListLocal'));
            favList.forEach(favObj => {
                if ((favObj.key === attractionItem.key) && attractionItem.props.attraction.isFavorited === false) {
                    attractionItem.props.attraction.isFavorited = !attractionItem.props.attraction.isFavorited;
                }
            })
            return attractionItem
        })
        return dataList;
    }

    useEffect(() => {
        getCommonTypeOfAttraction();
    }, [attractions])

    function getAllAttractionFromMyLocation() {

        let attractionsMap = {};
        let attractionItem = attractions[0];
        let maxCount = 1;
        for (let i = 0; i < attractions.length; i++) {
            let item = attractions[i];
            if (attractionsMap[item] === null)
                attractionsMap[item] = 1;
            else
                attractionsMap[item]++;
            if (attractionsMap[item] > maxCount) {
                attractionItem = item;
                maxCount = attractionsMap[item];
            }
        }
        const typeName = attractionItem ? attractionItem.props.attraction.Attraction_Type : null
        return typeName;
    }

    function getCommonTypeOfAttraction() {
        const typeName = getAllAttractionFromMyLocation();
        setAttractionTypeName(typeName);
    }

    function getAllAttractionOfAttractionType() {
        const AttractionTypeList = attractions.filter(attraction => {
            return attraction.props.attraction.Attraction_Type === attractionTypeName
        })
        return AttractionTypeList
    }

    return (
        <div>
            {propsLongitude ?
                <div>
                    <div>
                        {loading ?
                            <div>

                                {showModal ?
                                    <Modal show={showModal} modalClosed={() => setShowModal(prev => !prev)}>
                                        <div className='AttractionTypeName'>{attractionTypeName}</div>
                                        <ul className="responsive-table">
                                            {[...getAllAttractionOfAttractionType()]}
                                        </ul>
                                    </Modal>
                                    : null}

                                <Buttom btnType="Success" clicked={() => setShowModal(prev => !prev)}>{attractionTypeName} הוא סוג האטרציה הכי נפוצה באזורך לחץ כאן  כדי לראות את כולם  </Buttom>

                                <div>
                                    <div>
                                        <ul className="responsive-table">
                                            <li className="table-header">
                                                <div className="col col-1">מועדפים</div>
                                                <div className="col col-2">לינק לאתר האטרקציה</div>
                                                <div className="col col-3">מרחק בק"מ מהמיקום הנוכחי</div>
                                                <div className="col col-4">כתובת</div>
                                                <div className="col col-4">שם אטרצקיה</div>
                                                <div className="col col-4">מס מזהה של האטרקציה</div>
                                            </li>
                                            {attractions}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            : <div className="loader">Loading...</div>}
                    </div>
                </div>
                :
                <div>
                    <Redirect to='/' />
                </div>}
        </div>
    )
}

