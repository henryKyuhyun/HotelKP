self.addEventListener('install', (event) => {
  console.log('Service Worker 설치되었습니다.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker 활성화되었습니다.');
});


self.addEventListener('push', function (event) {
  // 알림 페이로드(Payload) 가져오기
  const payload = event.data.json();
  console.log(payload);
    
  // 알림 옵션 설정 
  const options = {
    body: payload.body,
  };
  
  event.waitUntil(self.registration.showNotification(payload.title, options));
});
