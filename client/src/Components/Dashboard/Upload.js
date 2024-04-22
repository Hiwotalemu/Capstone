// import React, { useState, useRef } from 'react';
// import { useButton } from '@mui/base/useButton';
// import styled from 'styled-components';

// function App() {
//   const [file, setFile] = useState(null);
//   const { getRootProps } = useButton();
//   const fileInputRef = useRef(null);
//   const [analysisResults, setAnalysisResults] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     fetch('/upload', {
//       method: 'POST',
//       body: formData
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         setAnalysisResults(data);
       
//       })
//       .catch(error => console.error('There was an error uploading the file:', error));
//   };

//   const handleUploadButtonClick = () => {
  
//     fileInputRef.current.click();
//   };

//   return (
//     <Container>
//       <Header>News Coverage Analysis</Header>
//       <UploadSection>
//         <StyledButton onClick={handleUploadButtonClick}>
//           Upload
//         </StyledButton>
//         <FileInput
//           ref={fileInputRef}
//           type="file"
//           onChange={handleFileChange}
//           />
//           {analysisResults && (
//             <AnalysisResults>
//               <h3>Analysis Results:</h3>
//               <pre>{JSON.stringify(analysisResults, null, 2)}</pre>
//               //fix later above 
//             </AnalysisResults>
//           )}
//         </UploadSection>
//       </Container>
//     );
//   }

// // From syled components imort mui
// const Container = styled.div`
//   text-align: center;
// `;

// const Header = styled.h2`
//   color: #BF4F74;
// `;

// const UploadSection = styled.div`
//   margin-top: 20px;
// `;

// const StyledButton = styled.button`
//   background: #BF4F74;
//   border: none;
//   border-radius: 5px;
//   color: white;
//   padding: 10px 20px;
//   cursor: pointer;
//   transition: background 0.3s ease;

//   &:hover {
//     background: #A43B5B;
//   }
// `;

// const FileInput = styled.input`
//   display: none; 
// `;

// const AnalysisResults = styled.div`
//   margin-top: 20px;
//   padding: 10px;
//   background: #f0f0f0;
//   border-radius: 5px;

//   h3 {
//     color: #BF4F74;
//   }
// `;

// export default App;

// //npm start


