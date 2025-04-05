import React, { useRef, useState } from 'react';
import RadarChart from '../charts/RadarChart';
import BalanceChart from '../charts/BalanceChart';
import Button from '../UI/Button';
import { saveImage } from '../../utils/saveImage';
import ContactForm from '../ContactForm';
import DetailedAnalysisSlide from './DetailedAnalysisSlide';
import './ResultSlide.css';
import html2canvas from 'html2canvas';

const ResultSlide = ({ results, onReset }) => {
  const resultRef = useRef(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  
  const {
    dominantGalaxyType,
    dominantSoulType,
    directSpiritPercentage,
    galaxyInfo,
    soulInfo,
    radarData,
    axisRadarData,
    combinedAdvice,
    spiritStateAdvice,
    isDirectSpirit,
    detailedAnalysis
  } = results;
  
  const handleSaveImage = () => {
    if (resultRef.current) {
      saveImage(resultRef.current, `銀河ファミリー＆一靈四魂診断結果_${dominantGalaxyType}_${dominantSoulType}`);
    }
  };
  
  const handleDownloadImage = () => {
    const elementToCapture = resultRef.current;
    if (elementToCapture) {
      html2canvas(elementToCapture, {
        scale: 2,
      }).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = '診断結果.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(err => {
        console.error("画像生成エラー:", err);
      });
    }
  };
  
  if (showDetailedAnalysis) {
    return (
      <DetailedAnalysisSlide 
        results={results} 
        onBack={() => setShowDetailedAnalysis(false)} 
      />
    );
  }
  
  return (
    <div className="result-slide">
      <div className="result-container" ref={resultRef}>
        <div className="result-header">
          <h1>銀河ファミリー＆一靈四魂診断 結果</h1>
        </div>
        
        <div className="result-main">
          <div className="result-summary">
            <h2>あなたの診断結果</h2>
            <div className="result-types">
              <div className="result-type galaxy">
                <h3>銀河種族</h3>
                <div className="type-image-container">
                  <img 
                    src={galaxyInfo.imageUrl} 
                    alt={dominantGalaxyType} 
                    className="type-image"
                  />
                </div>
                <div className="type-value">{dominantGalaxyType}</div>
                <p>{galaxyInfo.description}</p>
              </div>
              
              <div className="result-type soul">
                <h3>一靈四魂</h3>
                <div className="type-image-container">
                  <img 
                    src={soulInfo.imageUrl} 
                    alt={dominantSoulType} 
                    className="type-image"
                  />
                </div>
                <div className="type-value">{dominantSoulType}</div>
                <p>{soulInfo.description}</p>
              </div>
            </div>
            
            <div className="spirit-state">
              <h3>直靈と曲靈のバランス</h3>
              <div className="spirit-meter">
                <div 
                  className="spirit-meter-fill" 
                  style={{ width: `${directSpiritPercentage}%` }}
                ></div>
                <span className="spirit-meter-label">{directSpiritPercentage}% 直靈</span>
              </div>
              <p>{spiritStateAdvice}</p>
              
              <div className="spiritual-growth-stage">
                <h4>魂の成長段階</h4>
                <div className="stage-badge">{detailedAnalysis.spiritualGrowthStage.stage}</div>
              </div>
            </div>
          </div>
          
          <div className="result-chart">
            <h3>特性バランス</h3>
            <RadarChart data={radarData} />
          </div>
        </div>
        
        <div className="result-details">
          <div className="characteristics">
            <div className="characteristic-section">
              <h3>{dominantGalaxyType}の特性</h3>
              <div className="characteristic-lists">
                <div className="positives">
                  <h4>{isDirectSpirit ? "直靈の状態" : "直靈を目指して"}</h4>
                  <ul>
                    {galaxyInfo.characteristics.positives.map((positive, index) => (
                      <li key={`galaxy-pos-${index}`}>{positive}</li>
                    ))}
                  </ul>
                </div>
                <div className="negatives">
                  <h4>曲靈の状態</h4>
                  <ul>
                    {galaxyInfo.characteristics.negatives.map((negative, index) => (
                      <li key={`galaxy-neg-${index}`}>{negative}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="characteristic-section">
              <h3>{dominantSoulType}の特性</h3>
              <div className="characteristic-lists">
                <div className="positives">
                  <h4>{isDirectSpirit ? "直靈の状態" : "直靈を目指して"}</h4>
                  <ul>
                    {soulInfo.characteristics.positives.map((positive, index) => (
                      <li key={`soul-pos-${index}`}>{positive}</li>
                    ))}
                  </ul>
                </div>
                <div className="negatives">
                  <h4>曲靈の状態</h4>
                  <ul>
                    {soulInfo.characteristics.negatives.map((negative, index) => (
                      <li key={`soul-neg-${index}`}>{negative}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="axis-balance">
            <h3>軸バランス分析</h3>
            <BalanceChart data={axisRadarData.slice(0, 2)} height={200} />
            <div className="view-detailed-button">
              <Button 
                onClick={() => setShowDetailedAnalysis(true)}
                type="secondary"
              >
                詳細分析を見る
              </Button>
            </div>
          </div>
          
          <div className="advice-section">
            <h3>あなたへのアドバイス</h3>
            <div className="advice-content">
              {combinedAdvice.split('\n\n').map((paragraph, index) => (
                <p key={`advice-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        
        <div className="result-footer">
          <div className="result-note">
            <p>この診断結果は、古神道の一靈四魂の考えと銀河ファミリーの特性を融合させて分析したものです。</p>
            <p>あなたの魂の特性を知り、より輝かせるためのヒントとして活用してください。</p>
          </div>
        </div>

        <div className="copyright-footer">
          &copy; {new Date().getFullYear()} GREAT HERO'S JOURNEY. All rights reserved.
        </div>

      </div>
      
      <div className="result-actions">
        <Button onClick={handleSaveImage} type="primary">
          結果を画像保存
        </Button>
        <Button onClick={() => setShowDetailedAnalysis(true)} type="secondary">
          詳細分析を見る
        </Button>
        <Button onClick={onReset} type="secondary">
          もう一度診断する
        </Button>
      </div>
      
      <div className="contact-section">
        <h3>お問い合わせ</h3>
        <ContactForm />
      </div>
    </div>
  );
};

export default ResultSlide;