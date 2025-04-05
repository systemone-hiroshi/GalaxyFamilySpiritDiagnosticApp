import React from 'react';
import './Footer.css';

/**
 * アプリケーションのフッターコンポーネント
 * @returns {JSX.Element} フッター要素
 */
const Footer = () => {
  const currentYear = new Date().getFullYear(); // 現在の年を取得

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3>銀河ファミリー＆一靈四魂診断</h3>
          <p className="footer-tagline">宇宙と古神道から紐解く、あなたの本質</p>
        </div>
        
        <div className="footer-info">
          <p>このアプリは、古神道の一靈四魂の考え方と銀河文明の知恵を融合した診断ツールです。</p>
          <p>あなたの本来の輝きを取り戻すヒントとして活用してください。</p>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; {currentYear} GREAT HERO'S JOURNEY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;