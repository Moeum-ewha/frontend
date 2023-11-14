import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Question,
  PictureContainer,
  Face,
  FaceBox,
  BottomContainer,
  Btn,
} from '../Components/ClassifiContainer';

const IsSavedFriend = () => {
  const location = useLocation();

  // 데이터 URL을 받아옴
  const croppedFaceDataURL = location.state.img;
  const name = location.state.name;
  const originalImg = location.state.wholeImg;
  const navigate = useNavigate();

  const moveFunc = () => {
    navigate('/selectfriend', {
      state: {
        faceImg: croppedFaceDataURL,
        wholeImg: originalImg,
        canvasData: location.state.canvasData,
        selectedFace: location.state.selectedFace,
      },
    });
  };

  const moveNewFriend = () => {
    navigate('/addname', {
      state: {
        faceImg: croppedFaceDataURL,
        wholeImg: originalImg,
        canvasData: location.state.canvasData,
        selectedFace: location.state.selectedFace,
      },
    });
  };

  const moveAdd = () => {
    navigate('/isanyonemore', {
      state: {
        wholeImg: originalImg,
        canvasData: location.state.canvasData,
        selectedFace: location.state.selectedFace,
        savedFriendData: {
          name: name,
          //친구목록 파일의 사진으로 추후 수정
          faceImg: croppedFaceDataURL,
        },
      },
    });
  };

  return (
    <BackgroundContainer>
      <Content>
        <Question>{name}님이 맞나요?</Question>
        <PictureContainer>
          <Face>
            <img
              src={croppedFaceDataURL}
              style={{ width: '90%', transform: 'scale(2)' }}
            />
          </Face>
        </PictureContainer>
        <BottomContainer>
          <Btn onClick={moveAdd}>네, 맞아요!</Btn>
          <Btn onClick={moveFunc}>등록된 다른 친구예요.</Btn>
          <Btn onClick={moveNewFriend}>새로운 친구예요.</Btn>
        </BottomContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default IsSavedFriend;
