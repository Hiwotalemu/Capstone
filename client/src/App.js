import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { GlobalStyles, Nav, NavLinks, Logo, HamburgerNav, Analysis, HamburgerMenu, HamburgerIcon, MenuLinks, MenuItem, MenuList, Section, About, AboutPicContainer, AboutTextP2, Title, BtnContainer, Btn, AdditionalSection, AdditionalSectionTitle, AdditionalSectionText, User, UserInfoUpperContainer } from './style';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/Login/LoginSignUp';
import AnalysisResultsTable from './Components/Analysis/AnalysisTable';
import DataDisplayComponent from './Components/Analysis/DataDisplayComponent';
import PastAnalysis from './Components/Analysis/PastAnalysis';

const TableContainer = styled.div` margin-top: 20px; `;
const Table = styled.table` width: 100%; border-collapse: collapse; `;
const TableHeader = styled.th` border: 1px solid #ddd; padding: 8px; text-align: left; `;
const TableRow = styled.tr` &:nth-child(even) { background-color: #f2f2f2; } `;
const TableCell = styled.td` border: 1px solid #ddd; padding: 8px; `;
const Container2 = styled.div`
  width: 100%;  // Ensures the container stretches to full width of its parent
  margin-top: 20px;
  padding: 20px;  // Padding inside the container, around the table
  background-color: #f0f0f0;  // Gray background
  border-radius: 8px;  // Rounded corners for the container
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  // Box-shadow for some depth
  overflow: auto;  // Adds a scrollbar if the table overflows the width of the container
`;
const AboutSection = styled.section` display: flex; justify-content: center; align-items: center; height: 100vh; .visible { opacity: 1; transform: translateX(0); } `;
const Description = styled.div` opacity: 0; transform: translateX(100%); transition: opacity 0.5s ease, transform 0.5s ease; font-size: 1.5em; font-family: 'Lato', sans-serif; `;
const AnalysisDetails = styled.div` padding: 50px 0; text-align: center; `;
const DomainLinksContainer = styled.div` margin-top: 20px; `;
const DomainName = styled.p` font-weight: bold; `;
const DomainLinkList = styled.ul` list-style-type: none; padding: 0; `;
const LinkList = styled.ul` list-style-type: none; padding: 0; `;
const LinkListItem = styled.li` margin-bottom: 5px; `;
const AboutText = styled.div` flex: 1; `;
const DomainLink = styled.a` color: #007bff; text-decoration: none; &:hover { text-decoration: underline; } `;
const Home = styled.section` padding: 20px; background-color: #f8f8f8; `;
const ScrollableTableContainer = styled.div`
  overflow-x: auto;  // Allows horizontal scrolling
`;

const App = () => {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);

  const toggleMenu = () => { setMenuOpen(!menuOpen); };
  const handleFileChange = (event) => { setFiles([...event.target.files]); };
  const [historicalData, setHistoricalData] = useState([]);
  const [loadingHistoricalData, setLoadingHistoricalData] = useState(false);

  const [collectionName, setCollectionName] = useState("");

  const handleCollectionNameChange = (event) => {
    setCollectionName(event.target.value);
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoadingHistoricalData(true);
      try {
        const response = await fetch('/get-historical-data'); // Ensure this endpoint is correct
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
      } finally {
        setLoadingHistoricalData(false);
      }
    };

    fetchHistoricalData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection && window.scrollY >= aboutSection.offsetTop - window.innerHeight / 2) {
        setAboutActive(true);
      } else {
        setAboutActive(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('collection_name', collectionName);
    for (let file of files) {
        formData.append('files', file);  // Match this key 'files' with the backend
    }

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        const resultData = await response.json();
        setResult(resultData);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
  };


  return (
    <Router>
      <>
        <GlobalStyles />
        <Nav>
          <Logo>News Bias Analysis</Logo>
          <NavLinks id="desktop-nav">
            <Link to="Home" smooth={true} duration={500}><MenuItem>Home</MenuItem></Link>
            <Link to="about" smooth={true} duration={500}><MenuItem>About</MenuItem></Link>
            <Link to="Analysis" smooth={true} duration={500}><MenuItem>Analysis</MenuItem></Link>
            <Link to="/login" smooth={true} duration={500}><MenuItem>User</MenuItem></Link>
          </NavLinks>
          <HamburgerNav id="hamburger-nav">
            <HamburgerMenu className="hamburger-menu" onClick={toggleMenu}>
              <HamburgerIcon className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </HamburgerIcon>
            </HamburgerMenu>
            <MenuLinks className={`menu-links ${menuOpen ? 'open' : ''}`}>
              <MenuList>
                <MenuItem href="#">Home</MenuItem>
                <MenuItem href="#">About</MenuItem>
                <MenuItem href="#">Analysis</MenuItem>
                <MenuItem href="#">User</MenuItem>
              </MenuList>
            </MenuLinks>
          </HamburgerNav>
        </Nav>
        <AboutSection id="about" aboutActive={aboutActive}>
          <About>
            <AboutPicContainer></AboutPicContainer>
            <AboutText>
              <Title>Upload Document</Title>
              <AboutTextP2>Receive the Best Bias</AboutTextP2>
            </AboutText>
          </About>
          <Description className={aboutActive ? "visible" : ""}>
            Welcome to our application, where you can upload your documents to receive a basic analysis along with web source linkage, including the domains. Simply start by selecting files and clicking upload, then the analysis will be displayed.
          </Description>
        </AboutSection>
        <Analysis id="Analysis">
          <BtnContainer>
            <input type="file" name="files[]" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            <Btn className="btn-color-1" onClick={() => document.querySelector('input[type="file"]').click()}>Choose Files</Btn>
            <Btn className="btn-color-1" onClick={handleUpload}>Upload</Btn>
            <input
              type="text"
              value={collectionName}
              onChange={handleCollectionNameChange}
              placeholder="Enter collection name"
            />
          </BtnContainer>
          {result && (
            <Container2 className="innerContainer">
              <h2>Analysis Results:</h2>
              <DataDisplayComponent data={result} />
            </Container2>
          )}
          <PastAnalysis 
            historicalData={historicalData} 
            loadingHistoricalData={loadingHistoricalData} 
            setResult={setResult} 
          />
        </Analysis>
        <User id="User">
          <Title></Title>
        </User>
      </>
    </Router>
  );
};

export default App;
