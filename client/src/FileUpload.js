// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//     const [file, setFile] = useState(null);
//     const [analysisResults, setAnalysisResults] = useState(null);

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//       let response;
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             await axios.post('http://localhost:5000/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('Analysis results:', response.data);
//             setAnalysisResults(response.data);
        
//         } catch (error) {
//             console.error('Error uploading file:', error);

//             setAnalysisResults(null);
//         }
//     };

//     return (
//         <div>
//           <input type="file" onChange={handleFileChange} />
//           <button onClick={handleUpload}>Upload</button>
    
//           {analysisResults && (
//             <div>
//               <h2>Analysis Results:</h2>
//               <h3>Keywords:</h3>
//               <ul>
//                 {analysisResults.keywords.map((keyword, index) => (
//                   <li key={index}>{keyword}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       );
//     };
    
//     export default FileUpload;


//mm

// import React, { useState, useRef } from 'react';
// import { useButton } from '@mui/base/useButton';
// import styled from 'styled-components';



// function App() {
//   const [file, setFile] = useState(null);
//   const { getRootProps } = useButton();
//   const fileInputRef = useRef(null);
//   const [analysisResults, setAnalysisResults] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile && selectedFile.type === 'text/html') {
//       setFile(selectedFile);
//     } else {
//       alert('Please select a valid HTML file.');
//     }
//   };

//   const handleUpload = async () => {
   
//     if (!file) {
//       alert('Please select a file before uploading.');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('/upload', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Upload successful:', data);
//       setAnalysisResults(data);

//    if (data.ner_results) {
//       // Handle NER results, e.g., update state or display in the UI
//       console.log('NER Results:', data.ner_results);
//     }

//     if (data.sentiment_results) {
//       // Handle sentiment results
//       console.log('Sentiment Results:', data.sentiment_results);
//     }

//     if (data.lm_results) {
//       // Handle LLM results
//       console.log('LM Results:', data.lm_results);
//     }


//     } catch (error) {
//       console.error('There was an error uploading the file:', error);
//       alert('There was an error uploading the file. Please try again.');
//     }
//   };

//   const handleUploadButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <Container>
//       <Header>News Coverage Analysis</Header>
//       <UploadSection>
//       <StyledButton onClick={() => { handleUpload(); handleUploadButtonClick(); }}>
//   Upload
// </StyledButton>
//         <FileInput
//           ref={fileInputRef}
//           type="file"
//           onChange={handleFileChange}
//         />
//        {analysisResults && (
//   <AnalysisResults>
//     <h3>Analysis Results:</h3>
//     <div className="result-section">
//       <h4>NER Results:</h4>
//       <pre>{JSON.stringify(analysisResults.ner_results, null, 2)}</pre>
//     </div>
//     <div className="result-section">
//       <h4>Sentiment Results:</h4>
//       <pre>{JSON.stringify(analysisResults.sentiment_results, null, 2)}</pre>
//     </div>
//     <div className="result-section">
//       <h4>LM Results:</h4>
//       <pre>{JSON.stringify(analysisResults.lm_results, null, 2)}</pre>
//     </div>
//   </AnalysisResults>
// )}
//       </UploadSection>
//     </Container>
//   );
// }

// // Styled components from MUI
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
