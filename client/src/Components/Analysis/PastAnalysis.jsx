import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HistoryList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const HistoryItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const StyledContainer = styled.div`
  padding: 20px;
  margin-top: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

function PastAnalysis({ historicalData, setResult }) {
  const [loading, setLoading] = useState(false);

  const fetchAnalysisById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/get-analysis-by-id?id=${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Failed to fetch analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <h2>Past Analysis</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <HistoryList>
          {historicalData.map((item) => (
            <HistoryItem key={item._id} onClick={() => fetchAnalysisById(item._id)}>
              Collection Name: {item.collection_name}, Date: {new Date(item.date).toLocaleDateString()}
            </HistoryItem>
          ))}
        </HistoryList>
      )}
    </StyledContainer>
  );
}

export default PastAnalysis;