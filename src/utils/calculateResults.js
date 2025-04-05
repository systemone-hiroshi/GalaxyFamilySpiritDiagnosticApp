import { galaxyFamilies } from '../data/galaxyFamilies';
import { soulTypes } from '../data/soulTypes';
import generateDetailedAnalysis from './generateDetailedAnalysis';

// 回答から結果を計算する関数
export const calculateResults = (answers, questions) => {
  // デバッグログの追加
  console.log("計算開始 - 回答:", answers);
  console.log("質問リスト:", questions);
  
  // questions配列が空または未定義の場合はデフォルト結果を返す
  if (!questions || questions.length === 0) {
    console.error("質問リストが空または未定義です");
    return getDefaultResults();
  }
  
  try {
    // 銀河種族のスコアを初期化
    const galaxyScores = {
      シリウス: { direct: 0, curved: 0, total: 0 },
      プレアデス: { direct: 0, curved: 0, total: 0 },
      リラ: { direct: 0, curved: 0, total: 0 },
      ゼータレティクル: { direct: 0, curved: 0, total: 0 },
      オリオン: { direct: 0, curved: 0, total: 0 },
      アンドロメダ: { direct: 0, curved: 0, total: 0 },
    };
    
    // 一靈四魂のスコアを初期化
    const soulScores = {
      荒魂: { direct: 0, curved: 0, total: 0 },
      幸魂: { direct: 0, curved: 0, total: 0 },
      奇魂: { direct: 0, curved: 0, total: 0 },
      和魂: { direct: 0, curved: 0, total: 0 },
    };
    
    // 直靈・曲靈の全体スコア
    let directSpiritTotal = 0;
    let curvedSpiritTotal = 0;
    let answeredQuestions = 0;
    
    // 各回答を処理
    Object.entries(answers).forEach(([questionId, answer]) => {
      // 質問オブジェクトを取得
      const question = questions.find(q => q.id === parseInt(questionId));
      if (!question) {
        console.warn(`質問ID ${questionId} が見つかりません`);
        return;
      }
      
      answeredQuestions++;
      const answerValue = parseInt(answer);
      
      // 銀河種族のスコアを加算
      if (question.galaxyType && question.galaxyType !== "全般") {
        if (galaxyScores[question.galaxyType]) { // 安全チェックを追加
          if (question.directSpirituality) {
            galaxyScores[question.galaxyType].direct += answerValue;
            directSpiritTotal += answerValue;
          } else {
            galaxyScores[question.galaxyType].curved += answerValue;
            curvedSpiritTotal += answerValue;
          }
        } else {
          console.warn(`未知の銀河種族: ${question.galaxyType}`);
        }
      }
      
      // 一靈四魂のスコアを加算
      if (question.soulType && question.soulType !== "全般") {
        if (soulScores[question.soulType]) { // 安全チェックを追加
          if (question.directSpirituality) {
            soulScores[question.soulType].direct += answerValue;
            directSpiritTotal += answerValue;
          } else {
            soulScores[question.soulType].curved += answerValue;
            curvedSpiritTotal += answerValue;
          }
        } else {
          console.warn(`未知の一靈四魂タイプ: ${question.soulType}`);
        }
      }
      
      // 全般的な質問のスコアを加算
      if (question.galaxyType === "全般" || question.soulType === "全般") {
        if (question.directSpirituality) {
          directSpiritTotal += answerValue;
        } else {
          curvedSpiritTotal += answerValue;
        }
      }
    });
    
    // 回答が不十分な場合はデフォルト結果を返す
    if (answeredQuestions < 5) {
      console.warn("回答数が少なすぎます。デフォルト結果を返します");
      return getDefaultResults();
    }
    
    // 各銀河種族の合計スコアを計算
    Object.keys(galaxyScores).forEach(key => {
      galaxyScores[key].total = galaxyScores[key].direct - galaxyScores[key].curved;
    });
    
    // 各一靈四魂の合計スコアを計算
    Object.keys(soulScores).forEach(key => {
      soulScores[key].total = soulScores[key].direct - soulScores[key].curved;
    });
    
    // 直靈度を計算（0〜100%）
    const directSpiritPercentage = Math.round((directSpiritTotal / (directSpiritTotal + curvedSpiritTotal)) * 100);
    
    // 最も高いスコアの銀河種族を見つける
    const dominantGalaxyType = Object.entries(galaxyScores)
      .sort((a, b) => b[1].total - a[1].total)[0][0];
    
    // 最も高いスコアの一靈四魂を見つける
    const dominantSoulType = Object.entries(soulScores)
      .sort((a, b) => b[1].total - a[1].total)[0][0];
    
    // レーダーチャート用のデータを作成
    const radarData = [
      { axis: "シリウス", value: normalizeScore(galaxyScores.シリウス.total), category: "銀河種族" },
      { axis: "プレアデス", value: normalizeScore(galaxyScores.プレアデス.total), category: "銀河種族" },
      { axis: "リラ", value: normalizeScore(galaxyScores.リラ.total), category: "銀河種族" },
      { axis: "ゼータレティクル", value: normalizeScore(galaxyScores.ゼータレティクル.total), category: "銀河種族" },
      { axis: "オリオン", value: normalizeScore(galaxyScores.オリオン.total), category: "銀河種族" },
      { axis: "アンドロメダ", value: normalizeScore(galaxyScores.アンドロメダ.total), category: "銀河種族" },
      { axis: "荒魂", value: normalizeScore(soulScores.荒魂.total), category: "一靈四魂" },
      { axis: "幸魂", value: normalizeScore(soulScores.幸魂.total), category: "一靈四魂" },
      { axis: "奇魂", value: normalizeScore(soulScores.奇魂.total), category: "一靈四魂" },
      { axis: "和魂", value: normalizeScore(soulScores.和魂.total), category: "一靈四魂" },
    ];
    
    // 秩序軸と調和軸のレーダーチャートデータ
    const axisRadarData = generateAxisRadarData(galaxyScores, soulScores);
    
    // セカンダリーの銀河種族と一靈四魂を見つける
    const secondaryGalaxyType = Object.entries(galaxyScores)
      .filter(([key]) => key !== dominantGalaxyType)
      .sort((a, b) => b[1].total - a[1].total)[0][0];
    
    const secondarySoulType = Object.entries(soulScores)
      .filter(([key]) => key !== dominantSoulType)
      .sort((a, b) => b[1].total - a[1].total)[0][0];
    
    // アドバイスを作成
    const galaxyInfo = galaxyFamilies[dominantGalaxyType];
    const soulInfo = soulTypes[dominantSoulType];
    
    // ステータス値がundefinedの場合にエラーメッセージを表示
    if (!galaxyInfo || !soulInfo) {
      console.error("銀河種族または一靈四魂の情報が見つかりません", dominantGalaxyType, dominantSoulType);
      return getDefaultResults();
    }
    
    // 銀河種族と一靈四魂の関連性に基づいたアドバイス
    let combinedAdvice = "";
    
    // 銀河種族と一靈四魂のマッチング度を評価
    const isGoodMatch = galaxyInfo.relatedSoulType === dominantSoulType || 
                         soulInfo.relatedGalaxyType === dominantGalaxyType;
    
    if (isGoodMatch) {
      combinedAdvice = `あなたは${dominantGalaxyType}の銀河種族と${dominantSoulType}の一靈四魂タイプが調和した稀有な存在です。この組み合わせはとても自然で、あなたの本質をよく表しています。\n\n${dominantGalaxyType}の${galaxyInfo.characteristics.positives[0]}と${dominantSoulType}の${soulInfo.characteristics.positives[0]}が融合することで、あなたは${isDirectSpirit(directSpiritPercentage) ? "直靈" : "曲靈"}の状態で特に${isDirectSpirit(directSpiritPercentage) ? "優れた" : "課題のある"}特性を発揮します。\n\n${galaxyInfo.advice}\n\n${soulInfo.advice}`;
    } else {
      combinedAdvice = `あなたは${dominantGalaxyType}の銀河種族と${dominantSoulType}の一靈四魂タイプを持つユニークな存在です。この特徴的な組み合わせは、あなただけの独自の魂の旅を示しています。\n\n${dominantGalaxyType}の${galaxyInfo.characteristics.positives[0]}と${dominantSoulType}の${soulInfo.characteristics.positives[0]}という異なる特性を持つことで、あなたは多面的な視点を持ち合わせています。\n\n${isDirectSpirit(directSpiritPercentage) ? "直靈の状態を維持することで" : "直靈の状態に近づくことで"}、あなたの持つ多様な特性がより調和し、本来の輝きを発揮できるでしょう。\n\n${galaxyInfo.advice}\n\n${soulInfo.advice}`;
    }
    
    // 直靈と曲靈のバランスに関するアドバイス
    let spiritStateAdvice = "";
    if (isDirectSpirit(directSpiritPercentage)) {
      spiritStateAdvice = `あなたは直靈の状態が${directSpiritPercentage}%と高く、本来の魂の輝きを発揮しています。自分の特性を素直に表現し、周囲と調和しながら生きることで、さらに輝きを増していくでしょう。`;
    } else {
      spiritStateAdvice = `あなたは曲靈の傾向が${100 - directSpiritPercentage}%あります。自分の本質に素直になり、${dominantGalaxyType}と${dominantSoulType}の持つ本来の長所を発揮することで、より直靈の状態に近づき、魂本来の輝きを取り戻すことができるでしょう。`;
    }
    
    // 基本結果オブジェクト
    const baseResults = {
      dominantGalaxyType,
      dominantSoulType,
      secondaryGalaxyType,
      secondarySoulType,
      directSpiritPercentage,
      galaxyScores,
      soulScores,
      radarData,
      axisRadarData,
      galaxyInfo,
      soulInfo,
      combinedAdvice,
      spiritStateAdvice,
      isDirectSpirit: isDirectSpirit(directSpiritPercentage)
    };
    
    try {
      // 詳細分析を追加
      const detailedAnalysis = generateDetailedAnalysis(baseResults);
      
      // 最終結果を返す
      return {
        ...baseResults,
        detailedAnalysis
      };
    } catch (error) {
      console.error("詳細分析の生成中にエラーが発生しました", error);
      // 詳細分析なしで基本結果を返す
      return baseResults;
    }
  } catch (error) {
    console.error("結果計算中にエラーが発生しました", error);
    return getDefaultResults();
  }
};

// 秩序軸と調和軸のレーダーチャートデータを生成
const generateAxisRadarData = (galaxyScores, soulScores) => {
  // 秩序軸: リラ(行動) vs プレアデス(愛)
  const actionLoveAxis = calculateAxisBalance(
    normalizeScore(galaxyScores.リラ.total), 
    normalizeScore(galaxyScores.プレアデス.total)
  );
  
  // 知性軸: ゼータレティクル(分析) vs シリウス(調和)
  const analysisHarmonyAxis = calculateAxisBalance(
    normalizeScore(galaxyScores.ゼータレティクル.total), 
    normalizeScore(galaxyScores.シリウス.total)
  );
  
  // 変容軸: オリオン(変容) vs アンドロメダ(創造)
  const transformationCreationAxis = calculateAxisBalance(
    normalizeScore(galaxyScores.オリオン.total), 
    normalizeScore(galaxyScores.アンドロメダ.total)
  );
  
  // 勇愛軸: 荒魂(勇) vs 幸魂(愛)
  const courageKindnessAxis = calculateAxisBalance(
    normalizeScore(soulScores.荒魂.total), 
    normalizeScore(soulScores.幸魂.total)
  );
  
  // 知親軸: 奇魂(智) vs 和魂(親)
  const wisdomHarmonyAxis = calculateAxisBalance(
    normalizeScore(soulScores.奇魂.total), 
    normalizeScore(soulScores.和魂.total)
  );
  
  return [
    { axis: "行動-愛", value: actionLoveAxis, leftSide: "リラ(行動)", rightSide: "プレアデス(愛)" },
    { axis: "分析-調和", value: analysisHarmonyAxis, leftSide: "ゼータ(分析)", rightSide: "シリウス(調和)" },
    { axis: "変容-創造", value: transformationCreationAxis, leftSide: "オリオン(変容)", rightSide: "アンドロ(創造)" },
    { axis: "勇-愛", value: courageKindnessAxis, leftSide: "荒魂(勇)", rightSide: "幸魂(愛)" },
    { axis: "智-親", value: wisdomHarmonyAxis, leftSide: "奇魂(智)", rightSide: "和魂(親)" }
  ];
};

// 二つの値のバランスを計算する補助関数（0-1の範囲で、0.5が完全なバランス）
const calculateAxisBalance = (value1, value2) => {
  // 両方とも0に近い場合はデフォルト値を返す
  const threshold = 0.1;
  if (value1 < threshold && value2 < threshold) return 0.5;
  
  // それ以外は相対的なバランスを計算
  return value1 / (value1 + value2 || 1); // 0除算を防止
};

// スコアを0-1の範囲に正規化する関数
const normalizeScore = (score) => {
  // -20から20の範囲のスコアを0-1に変換
  return Math.max(0, Math.min(1, (score + 20) / 40));
};

// 直靈状態かどうかを判定する関数
const isDirectSpirit = (percentage) => {
  return percentage >= 60; // 60%以上を直靈と判定
};

// デフォルトの結果を返す関数
const getDefaultResults = () => {
  return {
    dominantGalaxyType: "シリウス",
    dominantSoulType: "和魂",
    secondaryGalaxyType: "プレアデス",
    secondarySoulType: "幸魂",
    directSpiritPercentage: 75,
    galaxyScores: {
      シリウス: { direct: 10, curved: 2, total: 8 },
      プレアデス: { direct: 8, curved: 3, total: 5 },
      リラ: { direct: 6, curved: 4, total: 2 },
      ゼータレティクル: { direct: 5, curved: 4, total: 1 },
      オリオン: { direct: 4, curved: 3, total: 1 },
      アンドロメダ: { direct: 3, curved: 3, total: 0 },
    },
    soulScores: {
      荒魂: { direct: 6, curved: 4, total: 2 },
      幸魂: { direct: 8, curved: 3, total: 5 },
      奇魂: { direct: 5, curved: 4, total: 1 },
      和魂: { direct: 10, curved: 2, total: 8 },
    },
    radarData: [
      { axis: "シリウス", value: 0.8, category: "銀河種族" },
      { axis: "プレアデス", value: 0.6, category: "銀河種族" },
      { axis: "リラ", value: 0.5, category: "銀河種族" },
      { axis: "ゼータレティクル", value: 0.4, category: "銀河種族" },
      { axis: "オリオン", value: 0.3, category: "銀河種族" },
      { axis: "アンドロメダ", value: 0.2, category: "銀河種族" },
      { axis: "荒魂", value: 0.5, category: "一靈四魂" },
      { axis: "幸魂", value: 0.6, category: "一靈四魂" },
      { axis: "奇魂", value: 0.4, category: "一靈四魂" },
      { axis: "和魂", value: 0.8, category: "一靈四魂" },
    ],
    axisRadarData: [
      { axis: "行動-愛", value: 0.4, leftSide: "リラ(行動)", rightSide: "プレアデス(愛)" },
      { axis: "分析-調和", value: 0.3, leftSide: "ゼータ(分析)", rightSide: "シリウス(調和)" },
      { axis: "変容-創造", value: 0.5, leftSide: "オリオン(変容)", rightSide: "アンドロ(創造)" },
      { axis: "勇-愛", value: 0.4, leftSide: "荒魂(勇)", rightSide: "幸魂(愛)" },
      { axis: "智-親", value: 0.3, leftSide: "奇魂(智)", rightSide: "和魂(親)" },
    ],
    galaxyInfo: galaxyFamilies["シリウス"],
    soulInfo: soulTypes["和魂"],
    combinedAdvice: "あなたはシリウスの銀河種族と和魂の一靈四魂タイプが調和した稀有な存在です。この組み合わせはとても自然で、あなたの本質をよく表しています。",
    spiritStateAdvice: "あなたは直靈の状態が75%と高く、本来の魂の輝きを発揮しています。",
    isDirectSpirit: true,
    detailedAnalysis: {
      primaryRelationship: {
        compatibility: 0.95,
        synergy: "シリウスの調和と平和を重視する特性と和魂の親愛の機能は完全に一致しており、非常に高い相性を持ちます。",
        challenge: "「自分たち」と「それ以外」を区別する傾向があり、時に狭い視野での平和を追求することがあります。",
        growthPath: "集団の中でも自分の真の意見を表明し、表面的な調和ではなく、真の調和を求めることで成長します。"
      },
      secondaryTypes: {
        galaxy: "プレアデス",
        soul: "幸魂"
      },
      spiritualGrowthStage: {
        stage: "調和の段階",
        description: "あなたは調和の段階にあります。多くの場合、直靈の状態を維持できています。"
      },
      pathToDirectSpirit: [
        "日々の自己観察を通して、直靈と曲靈の状態を認識する練習をしましょう。",
        "定期的な瞑想や静かな時間を持ち、内なる声に耳を傾けることが助けになります。"
      ]
    }
  };
};