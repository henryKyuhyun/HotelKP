import React, { useEffect } from 'react';
import {MapLayout, MapContainer} from './MapStyle'

export default function Map({address}) {

    useEffect(()=> {
        const {kakao} = window;
        console.log('address',address)

        // const mapElement = useRef(null);
        if (kakao && kakao.maps) {
            kakao.maps.load(() => {
                try {
                    const container = document.getElementById('map'); 
                    const options = {
                        center: new kakao.maps.LatLng(37.5704, 126.9923), 
                        level: 3
                    };
                
                    const map = new kakao.maps.Map(container, options);
                    const geocoder = new kakao.maps.services.Geocoder();
                
                    geocoder.addressSearch(address, function(result, status){
                        if(status === kakao.maps.services.Status.OK) {
                            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                            let marker = new kakao.maps.Marker({
                                map: map,
                                position: coords
                            });
                            map.setCenter(coords);
                        }
                    });
                } catch (error) {
                    console.error('Kakao Maps API Error:', error);
                }
        })
    }else {
        console.log('api 로드 실패')
    }
}, [address]);
    return (
        <MapLayout>
            <h1>호스팅 위치</h1>
            <p>{address}</p>   
            <MapContainer id="map"></MapContainer>
        </MapLayout>
    );
}