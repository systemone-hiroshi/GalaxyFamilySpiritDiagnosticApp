// saveImage.js の改善
import html2canvas from 'html2canvas';

export const saveImage = (element, filename = '診断結果') => {
  if (!element) {
    console.error('保存対象の要素が見つかりません');
    return Promise.reject(new Error('保存対象の要素が見つかりません'));
  }
  
  return html2canvas(element, {
    scale: 2, // 高解像度のためのスケール
    useCORS: true, // クロスオリジンリソースのサポート
    allowTaint: true, // 外部リソースの読み込みを許可
    backgroundColor: "#ffffff", // 背景色を明示的に設定
    logging: process.env.NODE_ENV !== 'production', // 開発環境でのみログを表示
  }).then(canvas => {
    try {
      // データURLに変換
      const imgData = canvas.toDataURL('image/png');
      
      // ダウンロードリンクを作成
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = imgData;
      
      // クリックイベントをシミュレートしてダウンロード
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true; // 成功を返す
    } catch (err) {
      console.error('画像のダウンロード中にエラーが発生しました', err);
      return Promise.reject(err);
    }
  }).catch(err => {
    console.error('画像の生成中にエラーが発生しました', err);
    return Promise.reject(err);
  });
};

export default saveImage;