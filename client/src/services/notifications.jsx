import axios from 'axios';

const VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;

export const setupNotification = async (loggedInUser) => {
    const Token = sessionStorage.getItem("accessToken");

    if ('serviceWorker' in navigator) {
      try {
        //Service Worker 등록
        const registration = await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`);
        console.log('Service Worker 등록 성공:', registration);
  
        // 알림 권한을 체크하고 사용자에게 요청.
        await navigator.serviceWorker.ready;
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const subscription = await registration.pushManager.subscribe({
            //수신한 푸시 메시지 사용자에게 보여주어야 한다
            userVisibleOnly: true,
            applicationServerKey: VAPID_PUBLIC_KEY
          });
          
        console.log('subscription',subscription); ////

            try {
              const response = await axios.post('/api/register', {
                subscription,
                id: loggedInUser.id,
              },{
                headers:{Authorization:`Bearer ${Token}`}
              });
              console.log('subscription이 서버에 전송되었습니다.', response);
            } catch (error) {
              if (error.response.status === 400) {
                console.log('이미 알림구독을 하고있는 id입니다.');
              } else {
                console.log('subscription 전송 실패:', error);
              }
            }
          }
        } catch (error) {
        console.log('Service Worker 등록 실패:', error);
      };
    }
  };