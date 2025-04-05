import React from 'react';
import Button from '../UI/Button';
import './IntroSlide.css';

const IntroSlide = ({ onNext, onBack }) => {
  return (
    <div className="intro-slide">
      <div className="intro-content">
        <h2 className="intro-title">診断について</h2>
        
        <div className="intro-card">
          <div className="intro-section">
            <h3>銀河ファミリー＆一靈四魂診断とは</h3>
            <p>
              この診断は、古神道の「一靈四魂」の考え方と銀河文明の知恵を融合した、
              あなたの魂の特性を知るためのツールです。
              あなたの本来の輝きを取り戻し、より自分らしく生きるためのヒントを提供します。
            </p>
          </div>
          
          <div className="intro-section">
            <h3>銀河種族について</h3>
            <p>
              銀河種族は、あなたの魂が持つ宇宙的なエネルギーパターンを表します。
              シリウス、プレアデス、リラ、ゼータレティクル、オリオン、アンドロメダの
              6つの種族のうち、どれがあなたに最も強く影響しているかを診断します。
            </p>
          </div>
          
          <div className="intro-section">
            <h3>一靈四魂について</h3>
            <p>
              一靈四魂は、古神道に伝わる魂の構造についての考え方です。
              荒魂（行動の力）、幸魂（愛の力）、奇魂（智の力）、和魂（調和の力）の
              4つの特性のうち、あなたがどれを最も強く持っているかを診断します。
            </p>
          </div>
          
          <div className="intro-section">
            <h3>直靈と曲靈について</h3>
            <p>
              直靈は魂が本来の輝きを発揮している状態、曲靈は魂が本来の輝きを失っている状態を指します。
              あなたの魂が直靈と曲靈のどちらの状態に近いかを診断し、
              より直靈の状態に近づくためのアドバイスを提供します。
            </p>
          </div>
          
          <div className="intro-section">
            <h3>診断方法</h3>
            <p>
              全50問の質問に対して、「全くそう思わない」から「非常にそう思う」までの
              5段階で回答してください。所要時間は約5〜10分です。
            </p>
            <p>
              回答を元に、あなたの銀河種族、一靈四魂タイプ、直靈度を計算し、
              あなたに合ったアドバイスを提供します。
            </p>
          </div>
          
          <div className="intro-note">
            <p>
              ※この診断は、あなたの可能性を広げるためのツールです。
              結果を過度に受け止めたり、自分を限定したりする必要はありません。
              あなたの直感を大切にしながら、参考にしてください。
            </p>
          </div>
        </div>
        
        <div className="intro-actions">
          <Button onClick={onBack} type="secondary">
            戻る
          </Button>
          <Button onClick={onNext} type="primary">
            診断を始める
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroSlide;