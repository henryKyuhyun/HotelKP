import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

export default function Star ({score=null, setScore=null, resetStar=null}) {
    const starArray = [0, 1, 2, 3, 4];
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    const handleStarClick  = index => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i <= index ? true : false
        }
        setClicked(clickStates);
        console.log(clickStates);
    }

    useEffect(()=> {
        if (setScore !== null) { // 별점 입력 모드일 때
            let score = clicked.filter(Boolean).length;
            setScore(score);
            console.log(score);
        }
    },[clicked]);
    
    useEffect(() => {
        if(resetStar && setScore !== null) { // 별점 입력 모드일 때
            setClicked([false,false,false,false,false]); 
        }
    },[resetStar]);


    if (score !== null) { // 별점 표시
        return (
          <div>
            {starArray.map((index)=> {
              return (
                <StarIcon 
                  key={index}
                  filled={index < score}
                />
              );
            })}
          </div>   
        );
      } else { // 별점 입력
        return (
            <div>
            {starArray.map((index)=> {
                return (
                    <StarIcon 
                        key={index}
                        onClick={()=> handleStarClick(index)}
                        filled={clicked[index]}
                    />
                )
          })}
            </div>
        );
      }
}


const StarIcon = styled(FaStar) `
    color: ${props => props.filled ? '#ffd700' : '#afb5b8'};
    cursor: pointer;
    font-size: 12px;
`