import React, { useEffect } from "react";

import BackgroundContainer from "../Components/BackgroundContainer";
import { TopBar, Title, Content, MapDiv, MoeumDiv, Moeum, Photo, Info, Date, Place, Friends, Dday,} from "../Components/MapComponents";
import { NavBar } from "../Components/NavBar";
import demo from '../../public/dummy/dummy.json';

import dummy1 from '../Assets/dummy10.png';
import dummy2 from '../Assets/dummy11.png';

const Map = () => {
    const postList = demo.userList.map((user) => user.postList).flat();

    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f105135f49e581605fbe90ab15560672&autoload=false`
        document.head.appendChild(kakaoMapScript)

        const onLoadKakaoAPI = () => {
          window.kakao.maps.load(() => {
            var container = document.getElementById('map') //지도를 표시할 div
             var options = {
              center: new window.kakao.maps.LatLng(37.552914, 126.942011), // 지도의 중심좌표
              level: 6, //지도의 확대 레벨
            }

            const map = new window.kakao.maps.Map(container, options) // 지도 생성

            var positions = postList.map((post) => ({
                title: post.date, 
                latlng: new kakao.maps.LatLng(parseFloat(`${post.longitude}`), parseFloat(`${post.latitude}`))
            })
            );

            positions.forEach((position) => {
                var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

                var imageSize = new kakao.maps.Size(24, 35); 

                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

                var marker = new kakao.maps.Marker({
                    map: map, // 여기서 map은 이미 만들어진 Kakao 지도 객체입니다.
                    position: position.latlng,
                    title: position.title,
                    image: markerImage
                });
            });
                
            /*for (var i = 0; i < positions.length; i ++) {
                
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new kakao.maps.Size(24, 35); 
                
                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

                var marker = new kakao.maps.Marker({
                        map: map,
                        position: positions[i].latlng,
                        title: positions[i].title,
                        image: markerImage
                });                
            }*/
        // 
          })
        }
      
        kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
      }, [])

    return (
        <BackgroundContainer>
            <Content>
            <TopBar>
                <Title>
                    지도
                </Title>
            </TopBar>
            <MapDiv id="map" style= {{ width:'100vw', height:'70vh'}}>
            </MapDiv>
            <MoeumDiv style={{
            overflowY: 'auto', // Y축 스크롤이 필요한 경우만 스크롤을 표시합니다.
            maxHeight: '50vh', // MoeumDiv의 최대 높이를 조절합니다.
          }}>
                <Moeum>
                    <Photo>
                        <img src={dummy2} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px'}}/>
                    </Photo>
                    <Info>
                        <Date>
                            2023. 09. 22
                        </Date>
                        <Place>
                            신촌역
                        </Place>
                        <Friends>
                            건희, 진영
                        </Friends>
                        <Dday>
                            만난 지 40일 +
                        </Dday>
                    </Info>
                </Moeum>
                {postList.map((post, index) => (
                    <Moeum key={post.id}>
                        <Photo>
                            <img
                                src={`../../dummy/${post.original}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px'}}
                                />
                        </Photo>
                        <Info>
                            <Date>
                                {post.date}
                            </Date>
                            <Place>
                                {post.location}
                            </Place>
                            <Friends>
                                
                            </Friends>
                            <Dday>
                            </Dday>
                        </Info>
                    </Moeum>
                ))}
                <Moeum>
                <div style = {{width: '100vw', height:'6vh'}}/>
                </Moeum>
            </MoeumDiv>
            </Content>
            <NavBar />
      </BackgroundContainer>
    );
};

export default Map;