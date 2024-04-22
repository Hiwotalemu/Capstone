import styled, { createGlobalStyle } from 'styled-components';

// Global styles
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Lato', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  p {
    color: rgb(85, 85, 85);
  }

  a,
  .btn {
    transition: all 300ms ease;
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: grey;
    text-decoration: underline;
    text-underline-offset: 1rem;
    text-decoration-color: rgb(181, 181, 181);
  }
`;

// Desktop nav styles
export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 17vh;
`;

export const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  font-size: 1.5rem;
`;

export const NavLink = styled.a`
  color: black;
  text-decoration: none;
`;

export const Logo = styled.div`
font-size: 2rem;
cursor: default;
color: black;

p {
  font-weight: bold; /* Make the text inside the Logo bold */
}
`;

// Hamburger menu styles
export const HamburgerNav = styled.div`
  display: none;
`;

export const HamburgerMenu = styled.div`
  position: relative;
  display: inline-block;
`;

export const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  cursor: pointer;

  span {
    width: 100%;
    height: 2px;
    background-color: black;
    transition: all 0.3 ease-in-out;
  }
`;

export const MenuLinks = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  width: fit-content;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3 ease-in-out;
`;

export const MenuItem = styled.a`
  display: block;
  padding: 10px;
  text-align: center;
  font-size: 1.5rem;
  color: black;
  text-decoration: none;
  transition: all 0.3 ease-in-out;
`;

export const MenuList = styled.ul`
  list-style: none;
`;

// Sections styles
export const About = styled.section`
  padding-top: 4vh;
  height: 96vh;
  margin: 0 10rem;
  box-sizing: border-box;
  min-height: fit-content;
`;


export const Analysis = styled.section`
  padding-top: 4vh;
  height: 96vh;
  margin: 0 10rem;
  box-sizing: border-box;
  min-height: fit-content;
`;

export const AboutContainer = styled.div`
  display: flex;
  gap: 4rem;
  height: 80%;
`;

export const AboutPicContainer = styled.div`
  height: 400px;
  width: 400px;
  margin: auto 0;
`;

export const AboutText = styled.div`
  align-self: center;
  text-align: center;

  p {
    font-weight: 600;
  }
`;

export const AboutTextP2 = styled.p`
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
`;

// Buttons styles
export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const Btn = styled.button`
  font-weight: 600;
  transition: all 300ms ease;
  padding: 1rem;
  width: 8rem;
  border-radius: 2rem;
  cursor: pointer;

  &.btn-color-1,
  &.btn-color-2 {
    border: rgb(53, 53, 53) 0.1rem solid;
  }

  &.btn-color-1:hover,
  &.btn-color-2:hover {
    cursor: pointer;
  }

  &.btn-color-1,
  &.btn-color-2:hover {
    background: rgb(53, 53, 53);
    color: white;
  }

  &.btn-color-1:hover {
    background: rgb(0, 0, 0);
  }

  &.btn-color-2 {
    background: none;
  }

  &.btn-color-2:hover {
    border: rgb(255, 255, 255) 0.1rem solid;
  }
`;

// Additional section styles
export const AdditionalSection = styled.div`
  padding: 50px 0;
  text-align: center;
`;

export const AdditionalSectionTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const AdditionalSectionText = styled.p`
  font-size: 16px;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
`;

// Contact section styles
export const User = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 70vh;
`;

export const UserInfoUpperContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 2rem;
  border: rgb(53, 53, 53) 0.1rem
  `;



//   const AboutSection = styled.section`
//   display: flex; /* or grid */
//   justify-content: center;
//   align-items: center;
//   height: 100vh; /* Adjust as needed */
// `;


const Description = styled.div`
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

/* Add a class to trigger animation when scrolled into view */
// const AboutSection = styled.section`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh; /* Adjust as needed */
  
//   ${props => props.aboutActive && css`
//     ${Description} {
//       opacity: 1;
//       transform: translateX(0);
//     }
//   `}
// `;

