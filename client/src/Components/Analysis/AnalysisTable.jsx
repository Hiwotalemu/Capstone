import React from 'react';

function AnalysisResultsTable({ data }) {
  // Destructure to get analysis_results directly from the data prop
  const { analysis_results } = data;

  return (
    <div>
      <h2>Analysis Results for User: {data.user}</h2>
      <p>Report Time: {data.time}</p>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Article ID</th>
            <th>URL</th>
            <th>Domain</th>
            <th>Linkage</th>
            <th>Bias Score</th>
          </tr>
        </thead>
        <tbody>
          {analysis_results.map((result, index) => (
            <tr key={index}>
              <td>{result.article_id}</td>
              <td><a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a></td>
              <td>{result.domain}</td>
              <td>{result.linkage.join(', ')}</td>
              <td>{result.bias_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalysisResultsTable;