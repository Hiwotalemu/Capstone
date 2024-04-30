import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTableHeader = styled.th`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const StyledTableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const StyledTableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  white-space: nowrap; /* Prevents content from wrapping */
  overflow: hidden; /* Hide overflowing content */
  text-overflow: ellipsis; /* Display ellipsis for overflowed content */
`;

const DataDisplayComponent = ({ data }) => {

  const formatDate = (dateString) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatKeywords = (keywords) => {
    return (
      <div>
        {keywords.map((kw, index) => (
          <div key={index}>
            {kw[0]} - {kw[1]}
          </div>
        ))}
      </div>
    );
  };

  const formatFileNames = (files) => {
    return files.map((file, index) => {
      // Remove the number after the dot and before the extension, if present
      return (
        <div key={index}>
          {file}
        </div>
      );
    });
  };

  const formatDomainLinksCount = (domainLinksCount) => {
    // Convert the object to an array of [domain, count] pairs and sort them by count in descending order
    const sortedDomainLinks = Object.entries(domainLinksCount).sort((a, b) => b[1] - a[1]);
  
    return (
      <ul>
        {sortedDomainLinks.map(([domain, count], index) => (
          <li key={index}>
            {domain}: {count}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTableHeader>Files</StyledTableHeader>
          <StyledTableHeader>Upload Date</StyledTableHeader>
          <StyledTableHeader>Keywords</StyledTableHeader>
          <StyledTableHeader>Sentiment</StyledTableHeader>
          <StyledTableHeader>Score</StyledTableHeader>
          <StyledTableHeader>Domain Links</StyledTableHeader>
        </tr>
      </thead>
      <tbody>
        <StyledTableRow>
          <StyledTableCell>{formatFileNames(data.files)}</StyledTableCell>
          <StyledTableCell>{formatDate(data.upload_date)}</StyledTableCell>
          <StyledTableCell>{formatKeywords(data.keywords)}</StyledTableCell>
          <StyledTableCell>{data.sentiment}</StyledTableCell>
          <StyledTableCell>{data.score.toFixed(2)}</StyledTableCell>
          <StyledTableCell>
            {formatDomainLinksCount(data.domain_links)}
          </StyledTableCell>
        </StyledTableRow>
      </tbody>
    </StyledTable>
  );
};

export default DataDisplayComponent;
