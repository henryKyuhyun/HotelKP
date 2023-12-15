// import React , { useState } from 'react';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { enGB } from 'date-fns/esm/locale';

// export default function DayPicker({ dateInput, adjustDate }) {

//   const DATE_FORMAT = 'dd/MM/yyyy';
//   const DATE_FORMAT_CALENDAR =  'MMM yyyy';

//   const [DatesText, setDatesText] = useState("");

//     return (
//       <>
//         <p>{DatesText}</p>

//         <DatePicker
//           inline
//           startDate={dateInput.startDate}
//           endDate={dateInput.endDate}
//           minDate={new Date()}
//           dateFormat={DATE_FORMAT}
//           dateFormatCalendar={DATE_FORMAT_CALENDAR}
//           onChange={(dates) => {
//             adjustDate(dates);

//             // 선택된 날짜 범위가 있으면 보여주기
//             if (dates[0] && dates[1]) {
//               setDatesText(`${dates[0].toLocaleDateString()} - ${dates[1].toLocaleDateString()}`);
//             }
//           }}
//           selectsRange 
//           locale={enGB} 
//           monthsShown={2}
//         />
//       </>
//   );}



import React , { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from 'date-fns/esm/locale';

export default function DayPicker({ dateInput, adjustDate }) {

  const DATE_FORMAT = 'dd/MM/yyyy';
  const DATE_FORMAT_CALENDAR =  'MMM yyyy';

  const [DatesText, setDatesText] = useState("");

    return (
      <>
        {/* <p style={{marginTop: "10px"}}>{DatesText}</p> */}

        <DatePicker
          inline
          startDate={dateInput.startDate}
          endDate={dateInput.endDate}
          minDate={new Date()}
          dateFormat={DATE_FORMAT}
          dateFormatCalendar={DATE_FORMAT_CALENDAR}
          onChange={(dates) => {
            adjustDate(dates);

            // 선택된 날짜 범위가 있으면 보여주기
            if (dates[0] && dates[1]) {
              setDatesText(`${dates[0].toLocaleDateString()} - ${dates[1].toLocaleDateString()}`);
            }
          }}
          selectsRange 
          locale={enGB} 
          monthsShown={2}
        />
      </>
  );}
