import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import './QuestionSlide.css';

const QuestionSlide = ({ 
  question, 
  totalQuestions, 
  currentQuestion, 
  onAnswer, 
  onBack 
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // 質問が変わったら選択をリセット
    setSelectedValue(null);
  }, [question]);
  
  const handleOptionSelect = (value) => {
    if (!isSubmitting) {
      setSelectedValue(value);
    }
  };
  
  const handleSubmit = () => {
    if (selectedValue !== null && !isSubmitting) {
      setIsSubmitting(true);
      
      // 回答を親コンポーネントに送信
      onAnswer(question.id, selectedValue);
      
      // 送信状態をリセット（必要に応じて）
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  };
  
  return (
    <div className="question-slide">
      <div className="question-content">
        <div className="question-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {currentQuestion + 1} / {totalQuestions}
          </div>
        </div>
        
        <div className="question-card">
          <div className="question-text">
            <h3>{question?.text || "質問を読み込み中..."}</h3>
          </div>
          
          <div className="question-options">
            <div className="options-labels">
              <span>全くそう思わない</span>
              <span>あまりそう思わない</span>
              <span>どちらとも言えない</span>
              <span>ややそう思う</span>
              <span>非常にそう思う</span>
            </div>
            
            <div className="options-buttons">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`option-button ${selectedValue === value ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(value)}
                  disabled={isSubmitting}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          
          <div className="question-actions">
            <Button 
              onClick={onBack} 
              type="secondary"
              disabled={isSubmitting}
            >
              戻る
            </Button>
            
            <Button 
              onClick={handleSubmit} 
              type="primary"
              disabled={selectedValue === null || isSubmitting}
            >
              次へ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSlide;