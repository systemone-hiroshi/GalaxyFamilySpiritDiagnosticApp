// /src/components/ContactForm.jsx
import React, { useState, useRef, useEffect } from 'react';
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const formRef = useRef(null);

  // ★ デバッグ: formSubmitting の状態変化を監視
  useEffect(() => {
    console.log(`formSubmitting state changed: ${formSubmitting}`);
  }, [formSubmitting]);

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
    const isValid = Object.keys(newErrors).length === 0;
    console.log(`Validation result: ${isValid ? 'Valid' : 'Invalid'}`);
    return isValid;
  };

  // iframe のロード完了ハンドラ
  const handleIframeLoad = () => {
    console.log(`handleIframeLoad called. Current formSubmitting: ${formSubmitting}`); // ★ デバッグ
    if (formSubmitting) {
      console.log('Setting isSubmitted to true, status to "送信しました", and formSubmitting to false.');
      setIsSubmitted(true);
      setStatus('送信しました');
      setFormSubmitting(false);
    } else {
      console.log('Initial iframe load, ignoring.'); // ★ デバッグ
    }
  };

  // フォーム送信処理 (Googleフォームへの送信はHTMLのactionに任せる)
  const handleSubmit = (event) => {
    console.log('handleSubmit called.'); // ★ デバッグ
    setStatus('');
    setErrors({});

    if (!validateForm()) {
      event.preventDefault();
      setStatus('入力内容にエラーがあります。');
      console.log('Validation failed. Submission prevented.');
      return;
    }

    console.log('Validation successful. Setting formSubmitting flag AND status to "送信中..."');
    setFormSubmitting(true);
    setStatus('送信中...');
    console.log('Allowing default form submission...'); // ★ デバッグ
    // event.preventDefault() は呼び出さない
  };

  // 送信完了メッセージを表示
  if (isSubmitted) {
    return (
      <div className="contact-form-container submitted">
        <h2>お問い合わせありがとうございます</h2>
        <p>内容を確認の上、担当者よりご連絡いたします。</p>
        <p>（返信不要と入力された場合、ご連絡はいたしません）</p>
        <Button onClick={() => {
          console.log('Resetting form state.'); // ★ デバッグ
          setIsSubmitted(false);
          setFormSubmitting(false);
          setName('');
          setEmail('');
          setMessage('');
          setStatus('');
          setErrors({});
        }} type="secondary">
          別の内容で問い合わせる
        </Button>
      </div>
    );
  }

  // ★ デバッグ: レンダリング時の formSubmitting の値を確認
  console.log(`Rendering form. Status: "${status}", Button disabled: ${status === '送信中...'}`);

  return (
    <div className="contact-form-container">
      <h2>お問い合わせ</h2>
      <p>診断に関するご質問や、サービスについてのお問い合わせはこちらからどうぞ。</p>
      <form
        ref={formRef}
        className="contact-form"
        onSubmit={handleSubmit}
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeRrM4_A7QTegaA7IgKjPBxg72TojfO4JzDDK7rCO6X6ggyPQ/formResponse"
        method="POST"
        target="hidden_iframe"
      >
        <input type="hidden" name="fvv" value="1" />
        <input type="hidden" name="partialResponse" value='[null,null,"4921373502918840604"]' />
        <input type="hidden" name="pageHistory" value="0" />
        <input type="hidden" name="fbzx" value="4921373502918840604" />

        <div className="form-group">
          <label htmlFor="name">お名前<span className="required">*</span></label>
          <input
            type="text"
            id="name"
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
            type="email"
            id="email"
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
            name="entry.664562810"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="6"
            required
            className={errors.message ? 'error-input' : ''}
          ></textarea>
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        {status && <p className={`status-message ${status === '入力内容にエラーがあります。' ? 'error' : ''}`}>{status}</p>}

        <Button type="submit" disabled={status === '送信中...'}>
          送信する
        </Button>
      </form>
      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        style={{ display: 'none' }}
        onLoad={handleIframeLoad}
        title="hidden iframe for google form submission"
      ></iframe>
    </div>
  );
};

export default ContactForm;