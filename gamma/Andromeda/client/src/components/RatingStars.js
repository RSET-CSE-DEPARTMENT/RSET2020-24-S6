import React, { useEffect, useState } from 'react';
import { api } from '../api';
import Star from './Star';
import '../styles/star.css';
import { useParams } from 'react-router-dom';

const RatingStars = (props) => {
    const { id } = useParams();
    const [gradeIndex, setGradeIndex] = useState(-1);
    const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    const activeStar = {
        fill: 'yellow'
    };
    const [index,setIndex] = useState(0);

    const changeGradeIndex = ( index ) => {
        setGradeIndex(index);
    }

    const currentUser = localStorage.getItem("loggedUser");
    useEffect(()=> {
        (async()=> {
            const { data } = await api.get(`/product/${id}`);
            data.rating.map((rate)=> {
                if(rate.username === currentUser)
                    setGradeIndex(rate.rating-1);
            })
        })();
    },[gradeIndex])
    return (
        <div className="container">
            <h1 className="result">{ GRADES[gradeIndex] ? GRADES[gradeIndex] : 'You didn\'t review yet'}</h1>
            <div className="stars">
                {
                    GRADES.map((grade, index) => (
                        <Star 
                            index={index} 
                            gradeIndex={gradeIndex}
                            key={grade} 
                            changeGradeIndex={changeGradeIndex}
                            style={ gradeIndex >= index ? activeStar : {}}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default RatingStars;