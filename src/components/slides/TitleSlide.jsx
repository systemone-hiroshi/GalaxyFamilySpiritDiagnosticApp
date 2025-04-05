import React from 'react';
import Button from '../UI/Button';
import './TitleSlide.css';

const TitleSlide = ({ onStart }) => {
  return (
    <div className="title-slide">
      <div className="title-content">
        <h1 className="title-main">銀河ファミリー＆一靈四魂</h1>
        <h2 className="title-sub">宇宙と古神道から紐解く、あなたの本質診断</h2>
        
        <div className="title-description">
          <p>
            古神道の「一靈四魂」の考え方と銀河文明の知恵を融合した、
            あなたの魂の特性を診断するツールです。
          </p>
          <p>
            50の質問に答えることで、あなたの銀河種族と一靈四魂タイプ、
            そして「直靈」と「曲靈」のバランスを知ることができます。
          </p>
          <p>
            あなたの本来の輝きを取り戻すヒントを見つけましょう。
          </p>
        </div>
        
        <div className="title-features">
          <div className="feature">
            <div className="feature-icon">🌌</div>
            <div className="feature-text">
              <h3>銀河種族</h3>
              <p>シリウス、プレアデス、リラなど6つの銀河種族から、あなたの特性を診断します。</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">🔮</div>
            <div className="feature-text">
              <h3>一靈四魂</h3>
              <p>荒魂、幸魂、奇魂、和魂という日本古来の考え方から、あなたの魂の性質を分析します。</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">✨</div>
            <div className="feature-text">
              <h3>直靈と曲靈</h3>
              <p>あなたの本来の輝きを発揮できているか、魂の状態を診断します。</p>
            </div>
          </div>
        </div>
        
        <div className="title-start">
          <Button onClick={onStart} type="primary">
            診断を始める
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TitleSlide;