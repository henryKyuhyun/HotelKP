import React from 'react';
import ChangePasswordForm from '../../pages/ChangePasswordForm';
import {
    ActivitySelectBox,
    ActivitySelectItems,
    ActivitySelectItem,
    HeartIcon,
    CreditCardIcon,
    CommentIcon,
    PencilIcon,
} from "../pagestyles/MyPageStyle";

export default function ActivitySelect({userRole}) {

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      };

    return (
        <>
            <h2>나의 활동</h2>
            <ActivitySelectBox>
          <ActivitySelectItems>

            <ActivitySelectItem onClick={() => scrollTo('likedHotels')}>
              <div>
                <HeartIcon/>
                좋아한
              </div>
            </ActivitySelectItem>

            <ActivitySelectItem onClick={() => scrollTo('reservationHotels')}>
            <div>
            <CreditCardIcon />
              결제한
            </div>
            </ActivitySelectItem>

            {userRole === 'hotel_admin' && (
              <ActivitySelectItem onClick={() => scrollTo('hotelLists')}>
              <div>
                <CommentIcon />
                등록한
              </div>

            </ActivitySelectItem>
            )}

            <ActivitySelectItem onClick={() => scrollTo('hotelComments')}>
              <div>
                <PencilIcon/>
                작성한
              </div>
            </ActivitySelectItem>
          <ActivitySelectItem>
            <div>
            <PencilIcon/>
            <ChangePasswordForm />
            </div> 
          </ActivitySelectItem>

          </ActivitySelectItems>
        </ActivitySelectBox>


        </>
    );
}
