import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
    font-family: 'Noto Sans KR', sans-serif;
    font-style: normal;
    letter-spacing: - 0.25px;
    color: var(--font-color);
    // font-size, font-weight 만 각자 지정?
    a {
        text-decoration: none;
        color: inherit;
      }
    button {
      border: 0;
      cursor:pointer;
      background: transparent;
      &:hover{
        transform:scale(1.1);
      }
    }
  }

  html {
    font-size: 62.5%;
  }

  body {
    font: 1.6rem;
  }

  .react-datepicker-wrapper {
    width: 100%;
    display: inline-block;
    padding: 0;
    border: 0;
  }

  .react-datepicker {
    display: flex;
    background-color: #fff;
    border: none;
    position: relative;
    align-content: center;
    padding: 0

  }

  .react-datepicker__header {
    text-align: center;
    padding: 8px 0;
    position: relative;
    background-color: white;
    border-bottom: none;
  }
    
  .react-datepicker__day-name {
   margin:6px;
   color:#BDBDBD;
   font-size: 12px;
   font-weight: 600;
  }
  
  .react-datepicker__day {
    margin:6px;
    font-size: 12px;
    font-weight: 600;
  }

  .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--outside-month) {
    background-color: #C6E7F5; 
    box-shadow: 0 0 0 6px #C6E7F5; 
    border-radius: 0;
  }

  .react-datepicker__day:hover {
      background-color: #D8D8D8; 
      box-shadow: 0 0 0 6px #D8D8D8; 
      border-radius: 0;
  }
  

  // 날짜 선택된 후 
  .react-datepicker__day--in-range:not(.react-datepicker__day--outside-month),
  .react-datepicker__day--selected-start,
  .react-datepicker__day--selected-end {
    background-color: #147bb7; 
    box-shadow: 0 0 0 6px #147bb7; 
    border-radius: 0;
  }
  

  .react-datepicker__current-month {
    margin: 30px 20px 30px 20px;
    font-weight: 700;
    font-size: 16px;
  }

  .react-datepicker__navigation {
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
    position: absolute;
    top: 40px;
    }

   .react-datepicker__month-container {
     margin: auto;
   }

   .react-datepicker__day--outside-month {
     visibility: hidden;
   }
`;

  export default GlobalStyle;