// /src/components/ContactForm.jsx
import React, { useState, useRef } from 'react';
import Button from './UI/Button';
import './ContactForm.css';

/**
 * お問い合わせフォームコンポーネント
 * @returns {JSX.Element} お問い合わせフォーム
 */
const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // 送信完了状態を追加
  const formRef = useRef(null); // フォームへの参照

  // バリデーション関数
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'お名前は必須です。';
    if (!email.trim()) {
      newErrors.email = 'メールアドレスは必須です。';
    } else if (!/\S+@\S+\.\S+/.test(email) && email !== '返信不要') { // 「返信不要」を許可
      newErrors.email = '有効なメールアドレスを入力してください。';
    }
    if (!message.trim()) newErrors.message = 'お問い合わせ内容は必須です。';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // iframe のロード完了ハンドラ
  const handleIframeLoad = () => {
    console.log('iframe loaded, assuming submission complete.');
    setIsSubmitted(true); // 送信完了状態にする
    setStatus('送信しました'); // オプション: ステータスメッセージ
    // フォームの入力をクリア（任意）
    // setName('');
    // setEmail('');
    // setMessage('');
  };


  // フォーム送信処理 (Googleフォームへの送信はHTMLのactionに任せる)
  const handleSubmit = (event) => {
    setStatus(''); // ステータスクリア
    if (!validateForm()) {
      event.preventDefault(); // バリデーションエラー時は送信を停止
      setStatus('入力内容にエラーがあります。');
      return;
    }
    // バリデーションが通れば、デフォルトのフォーム送信を実行させる
    // そのため event.preventDefault() はここでは呼び出さない
    setStatus('送信中...'); // 送信中の表示（実際にはiframeがロードされるまで）
    console.log('Form validation passed, submitting to Google Forms via iframe...');

    // 注意: ここでは event.preventDefault() を呼び出さないことで、
    // form タグの action と target に基づく標準の送信が行われるようにします。
    // 従来のfetchやAPI送信は不要です。
  };


  // 送信完了メッセージを表示
  if (isSubmitted) {
    return (
      <div className="contact-form-container submitted">
        <h2>お問い合わせありがとうございます</h2>
        <p>内容を確認の上、担当者よりご連絡いたします。</p>
        <p>（返信不要と入力された場合、ご連絡はいたしません）</p>
        {/* 必要であればリセットボタンなどを追加 */}
         <Button onClick={() => setIsSubmitted(false)} type="secondary">
           別の内容で問い合わせる
         </Button>
      </div>
    );
  }

  return (
    <div className="contact-form-container">
      <h2>お問い合わせ</h2>
      <p>診断に関するご質問や、サービスについてのお問い合わせはこちらからどうぞ。</p>
      {/* Google Form 送信用に action, method, target を設定 */}
      <form
        ref={formRef} // 参照を設定
        className="contact-form"
        onSubmit={handleSubmit}
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeRrM4_A7QTegaA7IgKjPBxg72TojfO4JzDDK7rCO6X6ggyPQ/formResponse"
        method="POST"
        target="hidden_iframe" // iframeをターゲットに指定
      >
        <div className="form-group">
          <label htmlFor="name">お名前<span className="required">*</span></label>
          <input
            type="text"
            id="name"
            // Google Form の name 属性に変更
            name="entry.1912207169"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">メールアドレス<span className="required">*</span></label>
          <input
            type="email" // emailタイプの方が適切
            id="email"
             // Google Form の name 属性に変更
            name="entry.225433882"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={errors.email ? 'error-input' : ''}
            placeholder="返信不要の場合は「返信不要」と入力"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">お問い合わせ内容<span className="required">*</span></label>
          <textarea
            id="message"
             // Google Form の name 属性に変更
            name="entry.664562810"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="6"
            required
            className={errors.message ? 'error-input' : ''}
          ></textarea>
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        {status && <p className={`status-message ${errors && Object.keys(errors).length > 0 ? 'error' : ''}`}>{status}</p>}

        <Button type="submit" disabled={status === '送信中...'}>
          送信する
        </Button>
      </form>
      {/* 送信処理用の非表示 iframe */}
      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        style={{ display: 'none' }}
        onLoad={handleIframeLoad} // iframe のロード完了時に handleIframeLoad を呼び出す
        title="hidden iframe for google form submission"
      ></iframe>
    </div>
  );
};

export default ContactForm;