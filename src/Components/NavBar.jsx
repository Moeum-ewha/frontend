import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import home from '../Assets/icons/home.png';
import map from '../Assets/icons/map.png';
import friends from '../Assets/icons/friends.png';
import settings from '../Assets/icons/settings.png';
import plus from '../Assets/icons/plus.png';
import check from '../Assets/icons/check.png';

import { ModalBack, ModalBox, ModalBtn, ExitBtn } from './PhotoModal';

export const NavBar = (props) => {
  const modalBackground = useRef();
  const fileInput = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [modalOpen, setModalOpen] = useState(false);

  const isPostingPage = currentPath === '/posting';
  const writePost = () => {
    console.log(props);
    const when = props.when;
    const where = props.where;
    const what = props.what;
    navigate('/viewpost', { state: { when, where, what } });
    console.log(props.when);
  };

  const moveHome = () => {
    navigate('/home');
  };
  const moveBinder = () => {
    navigate('/binder');
  };

  const moveMypage = () => {
    navigate('/settings');
  };

  const moveMap = () => {
    navigate('/map');
  };

  /*const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event.target.result);
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };*/

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      navigate('/facerecognition', { state: { img: selectedFile } });
      /*onImageSelect(selectedFile);*/
    }
  };

  const fileUpload = () => {
    // input 요소 클릭
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <>
      <>
        {modalOpen && (
          <ModalBack
            ref={modalBackground}
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                setModalOpen(false);
              }
            }}
          >
            <ModalBox>
              <ModalBtnTop>카메라</ModalBtnTop>
              <ModalBtn onClick={fileUpload}>사진 보관함</ModalBtn>
              <input
                type="file"
                ref={fileInput}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
                id="imageUpload"
              />
            </ModalBox>
            <ExitBtn onClick={() => setModalOpen(false)}>취소</ExitBtn>
          </ModalBack>
        )}
      </>
      <NavigationBar>
        <NavBtn>
          <img src={home} alt="로고" onClick={moveHome} />
        </NavBtn>
        <NavBtn>
          <img src={friends} alt="로고" onClick={moveBinder} />
        </NavBtn>
        {isPostingPage ? (
          <CenterBtn onClick={writePost}>
            <img src={check} alt="작성버튼" />
          </CenterBtn>
        ) : (
          <CenterBtn onClick={() => setModalOpen(true)}>
            <img src={plus} alt="추가 버튼" />
          </CenterBtn>
        )}
        <NavBtn />
        <NavBtn>
          <img src={map} alt="로고" onClick={moveMap} />
        </NavBtn>
        <NavBtn>
          <img src={settings} alt="로고" onClick={moveMypage} />
        </NavBtn>
      </NavigationBar>
    </>
  );
};

export const NavigationBar = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  height: 94px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.07);
  background: white;
  position: fixed;
  z-index: 1;
  padding: 0 10px;
`;
export const NavBtn = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  display: flex;
  align-items: center;
  border: none;
  padding: 0px;
  position: relative;
  z-index: 1000;
`;

export const CenterBtn = styled.button`
  position: fixed;
  bottom: 60px;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: #ffc329;
  z-index: 2;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
`;

// export const PlusBtn = styled.button`
//   width: 30px;
//   height: 30px;
//   background: transparent;
//   display: flex;
//   align-items: center;
//   align-content: center;
//   border: none;
//   margin: 0px 0px 0px 0px;
//   padding: 0px;
//   position: relative;
//   z-index: 1000;
// `;

export const ModalBtnTop = styled(ModalBtn)`
  //왜인지 모르겠으나 적용이 안댐..
  border-bottom: 1px #dddddd;
`;
