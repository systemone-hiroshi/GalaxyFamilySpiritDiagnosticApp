import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import TitleSlide from './components/slides/TitleSlide';
import IntroSlide from './components/slides/IntroSlide';
import QuestionSlide from './components/slides/QuestionSlide';
import ResultSlide from './components/slides/ResultSlide';
import useQuestions from './hooks/useQuestions';
import { calculateResults } from './utils/calculateResults';

function App() {
  // 現在のスライド状態
  const [currentSlide, setCurrentSlide] = useState('title');
  
  // 質問関連の状態と関数を取得
  const { questions, currentQuestion, setCurrentQuestion, totalQuestions } = useQuestions();
  
  // 回答の状態管理
  const [answers, setAnswers] = useState({});
  
  // 診断結果
  const [results, setResults] = useState(null);

  // スライドの変更をログに記録（開発用）
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log("現在のスライド:", currentSlide);
    }
  }, [currentSlide]);
  
  // 次のスライドに進む
  const goToNextSlide = () => {
    switch (currentSlide) {
      case 'title':
        setCurrentSlide('intro');
        break;
      case 'intro':
        setCurrentSlide('question');
        break;
      case 'question':
        // 質問が終了したら結果画面へ
        if (process.env.NODE_ENV !== 'production') {
          console.log("質問終了 - 結果計算開始");
        }
        const calculatedResults = calculateResults(answers, questions);
        setResults(calculatedResults);
        setCurrentSlide('result');
        break;
      default:
        break;
    }
  };
  
  // 前のスライドに戻る
  const goToPrevSlide = () => {
    switch (currentSlide) {
      case 'intro':
        setCurrentSlide('title');
        break;
      case 'question':
        if (currentQuestion === 0) {
          setCurrentSlide('intro');
        } else {
          setCurrentQuestion(currentQuestion - 1);
        }
        break;
      default:
        break;
    }
  };
  
  // 質問への回答を記録
  const handleAnswer = (questionId, value) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`回答記録: 質問${questionId}=${value}, 現在の質問=${currentQuestion}, 総質問数=${totalQuestions}`);
    }
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // 次の質問へ進むか、すべて終了したら結果へ
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      goToNextSlide();
    }
  };
  
  // 診断をリセットする
  const resetDiagnostic = () => {
    setCurrentSlide('title');
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };
  
  // 現在のスライドに応じたコンポーネントをレンダリング
  const renderSlide = () => {
    switch (currentSlide) {
      case 'title':
        return <TitleSlide onStart={goToNextSlide} />;
      case 'intro':
        return <IntroSlide onNext={goToNextSlide} onBack={goToPrevSlide} />;
      case 'question':
        // 質問がまだロードされていない場合はローディング表示
        if (!questions || questions.length === 0 || !questions[currentQuestion]) {
          return (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>質問を読み込み中...</p>
            </div>
          );
        }
        
        return (
          <QuestionSlide
            question={questions[currentQuestion]}
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestion}
            onAnswer={handleAnswer}
            onBack={goToPrevSlide}
          />
        );
      case 'result':
        return <ResultSlide results={results} onReset={resetDiagnostic} />;
      default:
        return (
          <div className="error-container">
            <h2>エラーが発生しました</h2>
            <p>無効なスライド状態です。</p>
            <button 
              className="error-reset-button" 
              onClick={resetDiagnostic}
            >
              初めからやり直す
            </button>
          </div>
        );
    }
  };
  
  return (
    <div className="app">
      <Header currentSlide={currentSlide} />
      <main className="app-content">
        {renderSlide()}
      </main>
      <Footer />
    </div>
  );
}

export default App;