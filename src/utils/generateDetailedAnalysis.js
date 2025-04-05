import { relationshipMatrix, analyzeComplementaryPattern, determineGrowthDirection, suggestPathToDirectSpirit } from '../data/relationshipMatrix';

// 詳細分析を生成する関数
export const generateDetailedAnalysis = (results) => {
  const { 
    dominantGalaxyType, 
    dominantSoulType, 
    secondaryGalaxyType,
    secondarySoulType,
    galaxyScores, 
    soulScores,
    directSpiritPercentage,
    isDirectSpirit
  } = results;
  
  // 主要タイプの関係性分析
  let primaryRelationship = {};
  if (relationshipMatrix[dominantGalaxyType] && relationshipMatrix[dominantGalaxyType][dominantSoulType]) {
    primaryRelationship = relationshipMatrix[dominantGalaxyType][dominantSoulType];
  } else {
    // 主要タイプの組み合わせがマトリックスに存在しない場合のデフォルト値
    primaryRelationship = {
      compatibility: 0.7,
      synergy: `${dominantGalaxyType}の特性と${dominantSoulType}の機能には相互補完的な関係性があります。`,
      challenge: "この組み合わせの具体的な課題は、双方の特性のバランスを取ることです。",
      growthPath: "各特性の長所を伸ばしつつ、短所を意識的に改善することで成長が見込めます。"
    };
  }
  
  // 補完パターンの分析
  const complementaryPattern = analyzeComplementaryPattern(
    dominantGalaxyType, dominantSoulType, 
    secondaryGalaxyType, secondarySoulType
  );
  
  // 成長の方向性
  const growthDirection = determineGrowthDirection(results);
  
  // 直靈への道筋
  const pathToDirectSpirit = suggestPathToDirectSpirit(results);
  
  // 銀河種族間のバランス分析
  const galaxyBalanceAnalysis = analyzeGalaxyBalance(galaxyScores);
  
  // 一靈四魂間のバランス分析
  const soulBalanceAnalysis = analyzeSoulBalance(soulScores);
  
  // 統合ポテンシャル分析
  const integrationPotential = analyzeIntegrationPotential(results);
  
  // 最終分析結果の構築
  return {
    primaryRelationship,
    secondaryTypes: {
      galaxy: secondaryGalaxyType,
      soul: secondarySoulType
    },
    complementaryPattern,
    growthDirection,
    pathToDirectSpirit,
    galaxyBalanceAnalysis,
    soulBalanceAnalysis,
    integrationPotential,
    spiritualGrowthStage: determineSpiritualGrowthStage(directSpiritPercentage)
  };
};

// 銀河種族間のバランス分析
const analyzeGalaxyBalance = (galaxyScores) => {
  // リラ-プレアデス軸（行動-愛）のバランス
  const actionLoveBalance = calculateAxisBalance(galaxyScores.リラ.total, galaxyScores.プレアデス.total);
  
  // シリウス-ゼータレティクル軸（調和-分析）のバランス
  const harmonyAnalysisBalance = calculateAxisBalance(galaxyScores.シリウス.total, galaxyScores.ゼータレティクル.total);
  
  // オリオン-アンドロメダ軸（変容-創造）のバランス
  const transformationCreationBalance = calculateAxisBalance(galaxyScores.オリオン.total, galaxyScores.アンドロメダ.total);
  
  // バランス状態の説明文生成
  let actionLoveDescription = "";
  if (actionLoveBalance > 0.7) {
    actionLoveDescription = "行動的なエネルギー（リラ）が優位で、時に愛や感情（プレアデス）を無視して進むことがあります。";
  } else if (actionLoveBalance < 0.3) {
    actionLoveDescription = "愛や感情的なエネルギー（プレアデス）が優位で、時に行動（リラ）に移すことが難しい場合があります。";
  } else {
    actionLoveDescription = "行動（リラ）と愛（プレアデス）のバランスが取れています。行動の基盤に愛があり、愛を行動で表現できる状態です。";
  }
  
  let harmonyAnalysisDescription = "";
  if (harmonyAnalysisBalance > 0.7) {
    harmonyAnalysisDescription = "調和（シリウス）を重視するあまり、時に真実や分析（ゼータレティクル）を無視することがあります。";
  } else if (harmonyAnalysisBalance < 0.3) {
    harmonyAnalysisDescription = "分析的なエネルギー（ゼータレティクル）が優位で、時に調和（シリウス）を損なう場合があります。";
  } else {
    harmonyAnalysisDescription = "調和（シリウス）と分析（ゼータレティクル）のバランスが取れています。真実を追求しながらも全体の調和を維持できる状態です。";
  }
  
  let transformationCreationDescription = "";
  if (transformationCreationBalance > 0.7) {
    transformationCreationDescription = "変容（オリオン）に焦点が当たっており、時に創造的な表現（アンドロメダ）が不足することがあります。";
  } else if (transformationCreationBalance < 0.3) {
    transformationCreationDescription = "創造的なエネルギー（アンドロメダ）が優位で、時に内面の変容（オリオン）を避ける傾向があります。";
  } else {
    transformationCreationDescription = "変容（オリオン）と創造（アンドロメダ）のバランスが取れています。内面の変容を創造的に表現できる状態です。";
  }
  
  return {
    actionLove: {
      balance: actionLoveBalance,
      description: actionLoveDescription
    },
    harmonyAnalysis: {
      balance: harmonyAnalysisBalance,
      description: harmonyAnalysisDescription
    },
    transformationCreation: {
      balance: transformationCreationBalance,
      description: transformationCreationDescription
    }
  };
};

// 一靈四魂間のバランス分析
const analyzeSoulBalance = (soulScores) => {
  // 荒魂-幸魂軸（勇-愛）のバランス
  const courageKindnessBalance = calculateAxisBalance(soulScores.荒魂.total, soulScores.幸魂.total);
  
  // 奇魂-和魂軸（智-親）のバランス
  const wisdomHarmonyBalance = calculateAxisBalance(soulScores.奇魂.total, soulScores.和魂.total);
  
  // バランス状態の説明文生成
  let courageKindnessDescription = "";
  if (courageKindnessBalance > 0.7) {
    courageKindnessDescription = "勇気や行動力（荒魂）が優位で、時に優しさや愛（幸魂）が不足することがあります。";
  } else if (courageKindnessBalance < 0.3) {
    courageKindnessDescription = "優しさや愛（幸魂）が優位で、時に勇気や行動力（荒魂）が不足することがあります。";
  } else {
    courageKindnessDescription = "勇気（荒魂）と優しさ（幸魂）のバランスが取れています。強さと優しさを兼ね備えた状態です。";
  }
  
  let wisdomHarmonyDescription = "";
  if (wisdomHarmonyBalance > 0.7) {
    wisdomHarmonyDescription = "知恵や分析力（奇魂）が優位で、時に調和や親愛（和魂）が不足することがあります。";
  } else if (wisdomHarmonyBalance < 0.3) {
    wisdomHarmonyDescription = "調和や親愛（和魂）が優位で、時に知恵や分析力（奇魂）が不足することがあります。";
  } else {
    wisdomHarmonyDescription = "知恵（奇魂）と調和（和魂）のバランスが取れています。知性と調和を両立できる状態です。";
  }
  
  return {
    courageKindness: {
      balance: courageKindnessBalance,
      description: courageKindnessDescription
    },
    wisdomHarmony: {
      balance: wisdomHarmonyBalance,
      description: wisdomHarmonyDescription
    }
  };
};

// 統合ポテンシャル分析
const analyzeIntegrationPotential = (results) => {
  const { dominantGalaxyType, dominantSoulType, directSpiritPercentage } = results;
  
  // 直靈度による基本的な統合ポテンシャル
  let baseIntegrationPotential = directSpiritPercentage / 100;
  
  // 特定の組み合わせによる調整
  let adjustmentFactor = 0;
  
  // 銀河種族と一靈四魂のマッチング度による調整
  if (
    (dominantGalaxyType === "リラ" && dominantSoulType === "荒魂") ||
    (dominantGalaxyType === "プレアデス" && dominantSoulType === "幸魂") ||
    (dominantGalaxyType === "ゼータレティクル" && dominantSoulType === "奇魂") ||
    (dominantGalaxyType === "シリウス" && dominantSoulType === "和魂")
  ) {
    adjustmentFactor += 0.1; // 良いマッチングはポテンシャルを高める
  }
  
  // 最終的な統合ポテンシャル（0-1の範囲に収める）
  const finalIntegrationPotential = Math.min(1, Math.max(0, baseIntegrationPotential + adjustmentFactor));
  
  // 統合ポテンシャルの説明文生成
  let description = "";
  if (finalIntegrationPotential >= 0.8) {
    description = "あなたは高い統合ポテンシャルを持っています。多様な側面をバランス良く表現し、直靈の状態を維持する能力があります。今後は、さらに深い統合と他者への良い影響に焦点を当てることで成長できるでしょう。";
  } else if (finalIntegrationPotential >= 0.6) {
    description = "あなたは良好な統合ポテンシャルを持っています。多くの場合、多様な側面をバランスよく表現できていますが、時に特定の側面に偏ることがあります。意識的なバランスの練習を続けることで、より深い統合が可能になるでしょう。";
  } else if (finalIntegrationPotential >= 0.4) {
    description = "あなたの統合ポテンシャルは中程度です。時に多様な側面をバランスよく表現できますが、しばしば特定の側面に偏る傾向があります。自己観察と意識的な実践を通じて、より良いバランスと統合を目指しましょう。";
  } else {
    description = "あなたの統合ポテンシャルはまだ発展途上にあります。多くの場合、特定の側面に強く偏る傾向があります。多様な側面を認識し受け入れる練習から始め、徐々にバランスを取る方法を学んでいきましょう。";
  }
  
  return {
    potentialScore: finalIntegrationPotential,
    description: description
  };
};

// スピリチュアルな成長段階の決定
const determineSpiritualGrowthStage = (directSpiritPercentage) => {
  let stage = "";
  let description = "";
  
  if (directSpiritPercentage >= 90) {
    stage = "統合の段階";
    description = "あなたは高度な統合の段階にあります。直靈の状態を安定して維持し、多様な側面を調和させることができます。今後は、この統合された状態から周囲に良い影響を与え、より大きな調和に貢献することが課題となるでしょう。";
  } 
  else if (directSpiritPercentage >= 75) {
    stage = "調和の段階";
    description = "あなたは調和の段階にあります。多くの場合、直靈の状態を維持できており、多様な側面を調和させる能力が発達しています。時折生じる曲靈の傾向にも気づき、すぐに修正できる状態です。より深い統合と安定を目指しましょう。";
  } 
  else if (directSpiritPercentage >= 60) {
    stage = "自己認識の段階";
    description = "あなたは自己認識の段階にあります。直靈と曲靈の違いを理解し、多くの場合は直靈の状態を意識的に選べる状態です。さらなる成長のためには、一貫して直靈の状態を維持する練習と、多様な側面を調和させる努力が必要です。";
  } 
  else if (directSpiritPercentage >= 40) {
    stage = "変容の段階";
    description = "あなたは変容の段階にあります。直靈と曲靈の違いを認識し始め、時に意識的に直靈の状態を選べるようになっています。しかし、まだ曲靈の傾向が強く現れることがあります。自己観察を深め、パターンに気づくことで成長していきましょう。";
  } 
  else {
    stage = "気づきの段階";
    description = "あなたは気づきの段階にあります。多くの場合、曲靈の状態にありますが、その状態に気づき始めている段階です。自己観察と自己受容を通じて、直靈の状態を少しずつ増やしていくことが課題です。自分を責めず、優しく見守る姿勢を大切にしましょう。";
  }
  
  return {
    stage,
    description
  };
};

// 二つの値のバランスを計算する補助関数（0-1の範囲で、0.5が完全なバランス）
const calculateAxisBalance = (value1, value2) => {
  if (value1 + value2 === 0) return 0.5; // 両方とも0の場合はバランスしているとみなす
  return value1 / (value1 + value2);
};

export default generateDetailedAnalysis;
