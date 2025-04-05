import React from 'react';
import BalanceChart from '../charts/BalanceChart';
import RelationshipChart from '../charts/RelationshipChart';
import Button from '../UI/Button';
import './DetailedAnalysisSlide.css';

const DetailedAnalysisSlide = ({ results, onBack }) => {
  const { 
    dominantGalaxyType,
    dominantSoulType,
    secondaryGalaxyType,
    secondarySoulType,
    detailedAnalysis,
    galaxyScores,
    soulScores,
    galaxyInfo,
    soulInfo
  } = results;
  
  // 関係性チャートのデータを作成
  const relationshipChartData = {
    primaryGalaxy: dominantGalaxyType,
    primarySoul: dominantSoulType,
    secondaryGalaxy: secondaryGalaxyType,
    secondarySoul: secondarySoulType,
    compatibility: detailedAnalysis.primaryRelationship.compatibility || 0.7,
    connections: [
      {
        source: 'primaryGalaxy',
        target: 'primarySoul',
        value: detailedAnalysis.primaryRelationship.compatibility * 100,
        description: '主要関係'
      },
      {
        source: 'primaryGalaxy', 
        target: 'secondaryGalaxy', 
        strength: 0.6,
        description: '銀河種族間の関係'
      },
      {
        source: 'primarySoul', 
        target: 'secondarySoul', 
        strength: 0.65,
        description: '一靈四魂間の関係'
      },
      {
        source: 'primaryGalaxy', 
        target: 'secondarySoul', 
        strength: 0.5,
        description: '副次的関係'
      },
      {
        source: 'primarySoul', 
        target: 'secondaryGalaxy', 
        strength: 0.55,
        description: '副次的関係'
      }
    ]
  };
  
  // バランスチャートのデータを作成
  const createBalanceChartData = () => {
    const { galaxyBalanceAnalysis, soulBalanceAnalysis } = detailedAnalysis;
    
    return [
      {
        axis: "行動-愛軸",
        value: galaxyBalanceAnalysis.actionLove.balance,
        leftSide: "リラ(行動)",
        rightSide: "プレアデス(愛)",
        description: galaxyBalanceAnalysis.actionLove.description
      },
      {
        axis: "分析-調和軸",
        value: galaxyBalanceAnalysis.harmonyAnalysis.balance,
        leftSide: "ゼータ(分析)",
        rightSide: "シリウス(調和)",
        description: galaxyBalanceAnalysis.harmonyAnalysis.description
      },
      {
        axis: "変容-創造軸",
        value: galaxyBalanceAnalysis.transformationCreation.balance,
        leftSide: "オリオン(変容)",
        rightSide: "アンドロメダ(創造)",
        description: galaxyBalanceAnalysis.transformationCreation.description
      },
      {
        axis: "勇-愛軸",
        value: soulBalanceAnalysis.courageKindness.balance,
        leftSide: "荒魂(勇)",
        rightSide: "幸魂(愛)",
        description: soulBalanceAnalysis.courageKindness.description
      },
      {
        axis: "智-親軸",
        value: soulBalanceAnalysis.wisdomHarmony.balance,
        leftSide: "奇魂(智)",
        rightSide: "和魂(親)",
        description: soulBalanceAnalysis.wisdomHarmony.description
      }
    ];
  };
  
  // 画像パスを生成する関数
  const getGalaxyImagePath = (galaxyType) => {
    const typeMap = {
      'リラ': 'lyra',
      'プレアデス': 'pleiades',
      'シリウス': 'sirius',
      'ゼータレティクル': 'zeta',
      'オリオン': 'orion',
      'アンドロメダ': 'andromeda'
    };
    
    return `/images/galaxyImages/galaxy_${typeMap[galaxyType] || 'sirius'}.jpg`;
  };
  
  const getSoulImagePath = (soulType) => {
    const typeMap = {
      '荒魂': 'ara',
      '幸魂': 'saki',
      '奇魂': 'kushi',
      '和魂': 'nigi'
    };
    
    return `/images/soulTypeImages/soul_${typeMap[soulType] || 'nigi'}.jpg`;
  };
  
  return (
    <div className="detailed-analysis-slide">
      <div className="detailed-header">
        <Button onClick={onBack} type="secondary">
          <span className="back-icon">←</span> 基本結果に戻る
        </Button>
        <h1>詳細分析結果</h1>
      </div>
      
      <div className="detailed-main">
        <section className="primary-relationship">
          <h2>主要タイプの関係性分析</h2>
          <div className="relationship-card">
            <div className="relationship-header">
              <div className="relationship-images">
                <div className="relationship-image-container">
                  <img 
                    src={galaxyInfo.imageUrl} 
                    alt={dominantGalaxyType} 
                    className="relationship-image"
                  />
                  <span className="relationship-image-label">{dominantGalaxyType}</span>
                </div>
                <div className="relationship-connection">×</div>
                <div className="relationship-image-container">
                  <img 
                    src={soulInfo.imageUrl} 
                    alt={dominantSoulType} 
                    className="relationship-image"
                  />
                  <span className="relationship-image-label">{dominantSoulType}</span>
                </div>
              </div>
              <div className="compatibility-meter">
                <div className="meter-label">相性</div>
                <div className="meter">
                  <div 
                    className="meter-fill"
                    style={{ width: `${detailedAnalysis.primaryRelationship.compatibility * 100}%` }}
                  ></div>
                </div>
                <div className="meter-value">{Math.round(detailedAnalysis.primaryRelationship.compatibility * 100)}%</div>
              </div>
            </div>
            
            <div className="relationship-content">
              <h4>相乗効果</h4>
              <p>{detailedAnalysis.primaryRelationship.synergy}</p>
              
              <h4>課題</h4>
              <p>{detailedAnalysis.primaryRelationship.challenge}</p>
              
              <h4>成長の道筋</h4>
              <p>{detailedAnalysis.primaryRelationship.growthPath}</p>
            </div>
          </div>
        </section>
        
        <section className="secondary-types">
          <h2>副次的タイプ</h2>
          <div className="secondary-types-grid">
            <div className="secondary-type">
              <h3>銀河種族</h3>
              <div className="secondary-image-container">
                <img 
                  src={getGalaxyImagePath(secondaryGalaxyType)} 
                  alt={secondaryGalaxyType} 
                  className="secondary-image"
                />
              </div>
              <div className="type-value">{secondaryGalaxyType}</div>
              <p>あなたの主要な銀河種族（{dominantGalaxyType}）を補完するエネルギーとして作用します。</p>
            </div>
            
            <div className="secondary-type">
              <h3>一靈四魂</h3>
              <div className="secondary-image-container">
                <img 
                  src={getSoulImagePath(secondarySoulType)} 
                  alt={secondarySoulType} 
                  className="secondary-image"
                />
              </div>
              <div className="type-value">{secondarySoulType}</div>
              <p>あなたの主要な一靈四魂（{dominantSoulType}）を補完する側面として現れます。</p>
            </div>
          </div>
          
          <div className="complementary-pattern">
            <h3>補完パターン</h3>
            <p>{detailedAnalysis.complementaryPattern.description}</p>
            <p><strong>バランス:</strong> {detailedAnalysis.complementaryPattern.balance}</p>
            <p><strong>統合への道:</strong> {detailedAnalysis.complementaryPattern.integration}</p>
          </div>
        </section>
        
        <section className="balance-analysis">
          <h2>バランス分析</h2>
          <div className="balance-chart-container">
            <BalanceChart data={createBalanceChartData()} height={400} />
          </div>
          
          <div className="balance-descriptions">
            {createBalanceChartData().map((item, index) => (
              <div key={index} className="balance-description">
                <h4>{item.axis}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="relationship-visualization">
          <h2>関係性の可視化</h2>
          <div className="relationship-chart-container">
            <RelationshipChart data={relationshipChartData} />
          </div>
        </section>
        
        <section className="integration-potential">
          <h2>統合ポテンシャル</h2>
          <div className="potential-meter">
            <div className="meter-label">統合ポテンシャル</div>
            <div className="meter">
              <div 
                className="meter-fill"
                style={{ 
                  width: `${detailedAnalysis.integrationPotential.potentialScore * 100}%`,
                  background: `linear-gradient(90deg, #3F51B5 0%, #4CAF50 50%, #FF9800 100%)`
                }}
              ></div>
            </div>
            <div className="meter-value">{Math.round(detailedAnalysis.integrationPotential.potentialScore * 100)}%</div>
          </div>
          <p>{detailedAnalysis.integrationPotential.description}</p>
        </section>
        
        <section className="spiritual-growth">
          <h2>魂の成長段階</h2>
          <div className="growth-stage-card">
            <h3>{detailedAnalysis.spiritualGrowthStage.stage}</h3>
            <p>{detailedAnalysis.spiritualGrowthStage.description}</p>
          </div>
        </section>
        
        <section className="path-direct-spirit">
          <h2>直靈への道筋</h2>
          <div className="path-list">
            {detailedAnalysis.pathToDirectSpirit.map((suggestion, index) => (
              <div key={index} className="path-item">
                <div className="path-number">{index + 1}</div>
                <p>{suggestion}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="growth-direction">
          <h2>成長の方向性</h2>
          <div className="growth-card">
            <p>{detailedAnalysis.growthDirection}</p>
          </div>
        </section>
      </div>
      
      <div className="detailed-footer">
        <Button onClick={onBack} type="secondary">
          基本結果に戻る
        </Button>
      </div>
    </div>
  );
};

export default DetailedAnalysisSlide;