// useQuestions.js の改善
import { useState, useEffect } from 'react';
import { questions } from '../data/questions';

export const useQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const totalQuestions = 50;
  
  // Fisher-Yates シャッフルアルゴリズムを使用
  const shuffleArray = (array) => {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  };
  
  // コンポーネントマウント時に質問をシャッフル
  useEffect(() => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled.slice(0, totalQuestions));
  }, []);
  
  return {
    questions: shuffledQuestions,
    currentQuestion,
    setCurrentQuestion,
    totalQuestions
  };
};

export default useQuestions;