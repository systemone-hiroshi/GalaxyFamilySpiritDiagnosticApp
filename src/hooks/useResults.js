import { useState } from 'react';

export const useResults = () => {
  const [results, setResults] = useState(null);
  
  // 診断結果を設定する
  const setDiagnosticResults = (calculatedResults) => {
    setResults(calculatedResults);
  };
  
  // 診断結果をリセットする
  const resetResults = () => {
    setResults(null);
  };
  
  return {
    results,
    setDiagnosticResults,
    resetResults
  };
};

export default useResults;