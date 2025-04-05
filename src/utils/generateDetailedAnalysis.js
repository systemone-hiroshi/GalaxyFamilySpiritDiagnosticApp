import { relationshipMatrix, analyzeComplementaryPattern, determineGrowthDirection, suggestPathToDirectSpirit } from '../data/relationshipMatrix';

// 定数の定義
const BALANCE_THRESHOLD_HIGH = 0.7;
const BALANCE_THRESHOLD_LOW = 0.3;
const INTEGRATION_POTENTIAL_HIGH = 0.8;
const INTEGRATION_POTENTIAL_GOOD = 0.6;
const INTEGRATION_POTENTIAL_MEDIUM = 0.4;
const GOOD_MATCH_ADJUSTMENT = 0.1;
const SPIRITUAL_STAGE_INTEGRATION = 90;
const SPIRITUAL_STAGE_HARMONY = 75;
const SPIRITUAL_STAGE_SELF_AWARENESS = 60;
const SPIRITUAL_STAGE_TRANSFORMATION = 40;
const DEFAULT_COMPATIBILITY_SCORE = 0.7;

// 詳細分析を生成する関数
export const generateDetailedAnalysis = (results) => {
  // nullチェックと基本値の確認
  if (!results) {
    console.error('結果オブジェクトが未定義です');
    return getDefaultDetailedAnalysis();
  }
  
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
  
  // 主要パラメータの存在を確認
  if (!dominantGalaxyType || !dominantSoulType || !galaxyScores || !soulScores) {
    console.error('必須パラメータが未定義です', { dominantGalaxyType, dominantSoulType });
    return getDefaultDetailedAnalysis();
  }
  
  try {
    // 主要タイプの関係性分析
    let primaryRelationship = {};
    if (relationshipMatrix[dominantGalaxyType] && relationshipMatrix[dominantGalaxyType][dominantSoulType]) {
      primaryRelationship = relationshipMatrix[dominantGalaxyType][dominantSoulType];
    } else {
      // 主要タイプの組み合わせがマトリックスに存在しない場合のデフォルト値
      primaryRelationship = {
        compatibility: DEFAULT_COMPATIBILITY_SCORE,
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
        galaxy: secondaryGalaxyType || "未定義",
        soul: secondarySoulType || "未定義"
      },
      complementaryPattern,
      growthDirection,
      pathToDirectSpirit,
      galaxyBalanceAnalysis,
      soulBalanceAnalysis,
      integrationPotential,
      spiritualGrowthStage: determineSpiritualGrowthStage(directSpiritPercentage || 50)
    };
  } catch (error) {
    console.error('詳細分析の生成中にエラーが発生しました', error);
    return getDefaultDetailedAnalysis();
  }
};

// 銀河種族間のバランス分析
const analyzeGalaxyBalance = (galaxyScores) => {
  try {
    // 必要なプロパティの存在確認
    if (!galaxyScores || !galaxyScores.リラ || !galaxyScores.プレアデス || 
        !galaxyScores.シリウス || !galaxyScores.ゼータレティクル || 
        !galaxyScores.オリオン || !galaxyScores.アンドロメダ) {
      throw new Error('銀河種族スコアの一部が欠けています');
    }
    
    // リラ-プレアデス軸（行動-愛）のバランス
    const actionLoveBalance = calculateAxisBalance(galaxyScores.リラ.total, galaxyScores.プレアデス.total);
    
    // シリウス-ゼータレティクル軸（調和-分析）のバランス
    const harmonyAnalysisBalance = calculateAxisBalance(galaxyScores.シリウス.total, galaxyScores.ゼータレティクル.total);
    
    // オリオン-アンドロメダ軸（変容-創造）のバランス
    const transformationCreationBalance = calculateAxisBalance(galaxyScores.オリオン.total, galaxyScores.アンドロメダ.total);
    
    // バランス状態の説明文生成
    let actionLoveDescription = "";
    if (actionLoveBalance > BALANCE_THRESHOLD_HIGH) {
      actionLoveDescription = "行動的なエネルギー（リラ）が優位で、時に愛や感情（プレアデス）を無視して進むことがあります。";
    } else if (actionLoveBalance < BALANCE_THRESHOLD_LOW) {
      actionLoveDescription = "愛や感情的なエネルギー（プレアデス）が優位で、時に行動（リラ）に移すことが難しい場合があります。";
    } else {
      actionLoveDescription = "行動（リラ）と愛（プレアデス）のバランスが取れています。行動の基盤に愛があり、愛を行動で表現できる状態です。";
    }
    
    let harmonyAnalysisDescription = "";
    if (harmonyAnalysisBalance > BALANCE_THRESHOLD_HIGH) {
      harmonyAnalysisDescription = "調和（シリウス）を重視するあまり、時に真実や分析（ゼータレティクル）を無視することがあります。";
    } else if (harmonyAnalysisBalance < BALANCE_THRESHOLD_LOW) {
      harmonyAnalysisDescription = "分析的なエネルギー（ゼータレティクル）が優位で、時に調和（シリウス）を損なう場合があります。";
    } else {
      harmonyAnalysisDescription = "調和（シリウス）と分析（ゼータレティクル）のバランスが取れています。真実を追求しながらも全体の調和を維持できる状態です。";
    }
    
    let transformationCreationDescription = "";
    if (transformationCreationBalance > BALANCE_THRESHOLD_HIGH) {
      transformationCreationDescription = "変容（オリオン）に焦点が当たっており、時に創造的な表現（アンドロメダ）が不足することがあります。";
    } else if (transformationCreationBalance < BALANCE_THRESHOLD_LOW) {
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
  } catch (error) {
    console.error('銀河種族バランス分析中にエラーが発生しました', error);
    return getDefaultGalaxyBalance();
  }
};

// 一靈四魂間のバランス分析
const analyzeSoulBalance = (soulScores) => {
  try {
    // 必要なプロパティの存在確認
    if (!soulScores || !soulScores.荒魂 || !soulScores.幸魂 || 
        !soulScores.奇魂 || !soulScores.和魂) {
      throw new Error('一靈四魂スコアの一部が欠けています');
    }
    
    // 荒魂-幸魂軸（勇-愛）のバランス
    const courageKindnessBalance = calculateAxisBalance(soulScores.荒魂.total, soulScores.幸魂.total);
    
    // 奇魂-和魂軸（智-親）のバランス
    const wisdomHarmonyBalance = calculateAxisBalance(soulScores.奇魂.total, soulScores.和魂.total);
    
    // バランス状態の説明文生成
    let courageKindnessDescription = "";
    if (courageKindnessBalance > BALANCE_THRESHOLD_HIGH) {
      courageKindnessDescription = "勇気や行動力（荒魂）が優位で、時に優しさや愛（幸魂）が不足することがあります。";
    } else if (courageKindnessBalance < BALANCE_THRESHOLD_LOW) {
      courageKindnessDescription = "優しさや愛（幸魂）が優位で、時に勇気や行動力（荒魂）が不足することがあります。";
    } else {
      courageKindnessDescription = "勇気（荒魂）と優しさ（幸魂）のバランスが取れています。強さと優しさを兼ね備えた状態です。";
    }
    
    let wisdomHarmonyDescription = "";
    if (wisdomHarmonyBalance > BALANCE_THRESHOLD_HIGH) {
      wisdomHarmonyDescription = "知恵や分析力（奇魂）が優位で、時に調和や親愛（和魂）が不足することがあります。";
    } else if (wisdomHarmonyBalance < BALANCE_THRESHOLD_LOW) {
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
  } catch (error) {
    console.error('一靈四魂バランス分析中にエラーが発生しました', error);
    return getDefaultSoulBalance();
  }
};

// 統合ポテンシャル分析
const analyzeIntegrationPotential = (results) => {
  try {
    const { dominantGalaxyType, dominantSoulType, directSpiritPercentage } = results;
    
    if (!dominantGalaxyType || !dominantSoulType || directSpiritPercentage === undefined) {
      throw new Error('統合ポテンシャル分析に必要なパラメータが欠けています');
    }
    
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
      adjustmentFactor += GOOD_MATCH_ADJUSTMENT; // 良いマッチングはポテンシャルを高める
    }
    
    // 最終的な統合ポテンシャル（0-1の範囲に収める）
    const finalIntegrationPotential = Math.min(1, Math.max(0, baseIntegrationPotential + adjustmentFactor));
    
    // 統合ポテンシャルの説明文生成
    let description = "";
    if (finalIntegrationPotential >= INTEGRATION_POTENTIAL_HIGH) {
      description = "あなたは高い統合ポテンシャルを持っています。多様な側面をバランス良く表現し、直靈の状態を維持する能力があります。今後は、さらに深い統合と他者への良い影響に焦点を当てることで成長できるでしょう。";
    } else if (finalIntegrationPotential >= INTEGRATION_POTENTIAL_GOOD) {
      description = "あなたは良好な統合ポテンシャルを持っています。多くの場合、多様な側面をバランスよく表現できていますが、時に特定の側面に偏ることがあります。意識的なバランスの練習を続けることで、より深い統合が可能になるでしょう。";
    } else if (finalIntegrationPotential >= INTEGRATION_POTENTIAL_MEDIUM) {
      description = "あなたの統合ポテンシャルは中程度です。時に多様な側面をバランスよく表現できますが、しばしば特定の側面に偏る傾向があります。自己観察と意識的な実践を通じて、より良いバランスと統合を目指しましょう。";
    } else {
      description = "あなたの統合ポテンシャルはまだ発展途上にあります。多くの場合、特定の側面に強く偏る傾向があります。多様な側面を認識し受け入れる練習から始め、徐々にバランスを取る方法を学んでいきましょう。";
    }
    
    return {
      potentialScore: finalIntegrationPotential,
      description: description
    };
  } catch (error) {
    console.error('統合ポテンシャル分析中にエラーが発生しました', error);
    return {
      potentialScore: 0.5,
      description: "統合ポテンシャルの分析中にエラーが発生しました。より正確な分析のために、診断を再度お試しください。"
    };
  }
};

// スピリチュアルな成長段階の決定
const determineSpiritualGrowthStage = (directSpiritPercentage) => {
  try {
    if (directSpiritPercentage === undefined || directSpiritPercentage === null) {
      throw new Error('直靈パーセンテージが未定義です');
    }
    
    let stage = "";
    let description = "";
    
    if (directSpiritPercentage >= SPIRITUAL_STAGE_INTEGRATION) {
      stage = "統合の段階";
      description = "あなたは高度な統合の段階にあります。直靈の状態を安定して維持し、多様な側面を調和させることができます。今後は、この統合された状態から周囲に良い影響を与え、より大きな調和に貢献することが課題となるでしょう。";
    } 
    else if (directSpiritPercentage >= SPIRITUAL_STAGE_HARMONY) {
      stage = "調和の段階";
      description = "あなたは調和の段階にあります。多くの場合、直靈の状態を維持できており、多様な側面を調和させる能力が発達しています。時折生じる曲靈の傾向にも気づき、すぐに修正できる状態です。より深い統合と安定を目指しましょう。";
    } 
    else if (directSpiritPercentage >= SPIRITUAL_STAGE_SELF_AWARENESS) {
      stage = "自己認識の段階";
      description = "あなたは自己認識の段階にあります。直靈と曲靈の違いを理解し、多くの場合は直靈の状態を意識的に選べる状態です。さらなる成長のためには、一貫して直靈の状態を維持する練習と、多様な側面を調和させる努力が必要です。";
    } 
    else if (directSpiritPercentage >= SPIRITUAL_STAGE_TRANSFORMATION) {
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
  } catch (error) {
    console.error('スピリチュアル成長段階の決定中にエラーが発生しました', error);
    return {
      stage: "判定不能",
      description: "成長段階の判定中にエラーが発生しました。より正確な分析のために、診断を再度お試しください。"
    };
  }
};

// 二つの値のバランスを計算する補助関数（0-1の範囲で、0.5が完全なバランス）
// スコアが負の値も取りうるため、絶対値を使ってバランスを計算するように修正
const calculateAxisBalance = (value1, value2) => {
  try {
    // 値が数値であることを確認
    if (typeof value1 !== 'number' || typeof value2 !== 'number') {
      throw new Error('バランス計算に数値以外が使用されました');
    }
    
    const absValue1 = Math.abs(value1);
    const absValue2 = Math.abs(value2);
    const totalAbs = absValue1 + absValue2;
  
    if (totalAbs === 0) return 0.5; // 両方とも0の場合はバランスしているとみなす
    
    // value1の方向へのバランス度合いを計算 (0-1の範囲)
    return absValue1 / totalAbs; 
  } catch (error) {
    console.error('軸バランス計算中にエラーが発生しました', error);
    return 0.5; // エラー時はバランスしているとみなす
  }
};

// デフォルトの詳細分析結果を生成する関数
const getDefaultDetailedAnalysis = () => {
  return {
    primaryRelationship: {
      compatibility: DEFAULT_COMPATIBILITY_SCORE,
      synergy: "データが不十分です。より詳細な分析のために、再度診断をお試しください。",
      challenge: "データが不十分です。",
      growthPath: "データが不十分です。"
    },
    secondaryTypes: {
      galaxy: "未定義",
      soul: "未定義"
    },
    complementaryPattern: {
      description: "データが不十分です。",
      balance: "判定できません。",
      integration: "データが不十分です。"
    },
    growthDirection: ["自己観察を深めましょう", "より多くの自己理解を得るために再度診断をお試しください"],
    pathToDirectSpirit: ["自己観察を通じて直靈状態への気づきを深めましょう"],
    galaxyBalanceAnalysis: getDefaultGalaxyBalance(),
    soulBalanceAnalysis: getDefaultSoulBalance(),
    integrationPotential: {
      potentialScore: 0.5,
      description: "データが不十分なため、統合ポテンシャルを正確に判断できません。"
    },
    spiritualGrowthStage: {
      stage: "判定不能",
      description: "データが不十分なため、成長段階を判断できません。"
    }
  };
};

// デフォルトの銀河種族バランス分析結果
const getDefaultGalaxyBalance = () => {
  return {
    actionLove: {
      balance: 0.5,
      description: "データが不十分なため、行動-愛のバランスを正確に判断できません。"
    },
    harmonyAnalysis: {
      balance: 0.5,
      description: "データが不十分なため、調和-分析のバランスを正確に判断できません。"
    },
    transformationCreation: {
      balance: 0.5,
      description: "データが不十分なため、変容-創造のバランスを正確に判断できません。"
    }
  };
};

// デフォルトの一靈四魂バランス分析結果
const getDefaultSoulBalance = () => {
  return {
    courageKindness: {
      balance: 0.5,
      description: "データが不十分なため、勇-愛のバランスを正確に判断できません。"
    },
    wisdomHarmony: {
      balance: 0.5,
      description: "データが不十分なため、智-親のバランスを正確に判断できません。"
    }
  };
};

export default generateDetailedAnalysis;
