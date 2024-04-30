import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
`;

export const ModalTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px; // Adds space below the title
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover, &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Modal = ({ show, children, closeModal }) => {
  return (
    <ModalBackground show={show} onClick={closeModal}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;