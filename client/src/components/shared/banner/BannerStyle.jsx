// import styled from "styled-components";

// export const SliderWrap = styled.div`
//   position: relative;
//   width: 1000px;
//   height: 500px;
//   overflow: hidden;
//   margin: auto;
// `;

// export const Slider = styled.ul`
//     display: flex;
//     width: 100%;
//     height: 100%;
// `;

// export const SliderItem = styled.li`
//     flex-shrink: 0;
//     width: 100%;
//     height: 100%;
// `;

// export const SliderImage = styled.img`
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
// `;

// export const Button = styled.button`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   background: none;
//   border: none;
//   font-size: 2rem;
//   cursor: pointer;
//   &:focus {
//     outline: none;
//   }
//   &:hover {
//     transform: translateY(-50%);
//   }
// `;

// export const PrevButton = styled(Button)`
//   color: white;
//   font-size: 5rem;
//   left: 10px;
// `;

// export const NextButton = styled(Button)`
//   color: white;
//   font-size: 5rem;
//   right: 10px;
// `;

// export const Indicator = styled.div`
//   position: absolute;
//   bottom: 10px;
//   left: 50%;
//   transform: translateX(-50%);
//   display: flex;
//   gap: 10px;
// `;

// export const Dot = styled.div`
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   /* background-color: ${({ active }) => (active ? "black" : "white")}; */
  
//   background-color: ${(props) => (props.active ? '#000':'#ccc')};
// `;


// export const IndicatorHotelCard = styled.div`
//   position: absolute;
//   bottom: 10px;
//   display: flex;
//   justify-content: center;
//   gap: 10px;
//   width: 100%;
// `


import styled from "styled-components";

export const SliderWrap = styled.div`
  position: relative;
  // width: 1000px;
  width: 85%;
  height: 500px;
  overflow: hidden;
  margin: auto;
`;

export const Slider = styled.ul`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const SliderItem = styled.li`
    flex-shrink: 0;
    width: 100%;
    height: 100%;
`;

export const SliderImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    transform: translateY(-50%);
  }
`;

export const PrevButton = styled(Button)`
  color: white;
  font-size: 5rem;
  left: 10px;
`;

export const NextButton = styled(Button)`
  color: white;
  font-size: 5rem;
  right: 10px;
`;

export const Indicator = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%; //이부분으로원형을만든거임.
  background-color: ${({ active }) => (active ? "white" : "#a0a0a0")};
`;


export const IndicatorHotelCard = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 10px;
  width: 100%;
`