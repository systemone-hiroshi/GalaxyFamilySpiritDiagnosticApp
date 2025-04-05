import React from 'react';
import './Header.css';

const Header = ({ currentSlide }) => {
  // スライドに対応するタイトルを取得
  const getSlideTitle = () => {
    switch (currentSlide) {
      case 'title':
        return '';
      case 'intro':
        return '診断について';
      case 'question':
        return '質問';
      case 'result':
        return '診断結果';
      default:
        return '';
    }
  };
  
  // スライドの進行状況を取得
  const getSteps = () => {
    const steps = [
      { id: 'intro', label: '説明' },
      { id: 'question', label: '質問' },
      { id: 'result', label: '結果' }
    ];
    
    // 現在のスライドのインデックスを取得
    let currentIndex = steps.findIndex(step => step.id === currentSlide);
    // タイトル画面の場合は最初のステップの前
    if (currentIndex === -1) currentIndex = currentSlide === 'title' ? -1 : steps.length;
    
    return steps.map((step, index) => ({
      ...step,
      status: index < currentIndex ? 'completed' : (index === currentIndex ? 'active' : 'pending')
    }));
  };
  
  const slideTitle = getSlideTitle();
  const steps = getSteps();
  
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-logo">
          <h1>銀河ファミリー＆一靈四魂診断</h1>
        </div>
        
        {currentSlide !== 'title' && (
          <div className="header-progress">
            <div className="progress-steps">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {index > 0 && (
                    <div className={`step-line ${step.status !== 'pending' ? 'step-active' : ''}`}></div>
                  )}
                  <div className={`step-item ${step.status}`}>
                    <div className="step-circle"></div>
                    <div className="step-label">{step.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {slideTitle && (
        <div className="header-subtitle">
          <h2>{slideTitle}</h2>
        </div>
      )}
    </header>
  );
};

export default Header;