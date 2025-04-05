// /src/components/ContactForm.jsx
import React, { useState } from 'react';
import Button from './UI/Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // バリデーション
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: '全ての項目を入力してください'
      });
      return;
    }
    
    // メール形式の簡易チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: false,
        error: true,
        message: '有効なメールアドレスを入力してください'
      });
      return;
    }
    
    // 実際のプロジェクトではここにAPIリクエストを追加
    // ここではモックの成功レスポンスを返す
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'お問い合わせありがとうございます。メッセージを受け付けました。'
      });
      
      // フォームをリセット
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 1000);
  };
  
  return (
    <div className="contact-form">
      {formStatus.submitted ? (
        <div className="form-success">
          <h4>送信完了</h4>
          <p>{formStatus.message}</p>
          <Button 
            onClick={() => setFormStatus(prev => ({ ...prev, submitted: false }))}
            type="secondary"
          >
            新しいお問い合わせ
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">お名前 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="お名前を入力してください"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">メールアドレス *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">メッセージ *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="お問い合わせ内容を入力してください"
              rows="5"
              required
            ></textarea>
          </div>
          
          {formStatus.error && (
            <div className="form-error">
              <p>{formStatus.message}</p>
            </div>
          )}
          
          <div className="form-actions">
            <Button type="primary" submit>送信する</Button>
          </div>
        </form>
      )}
      
      <style jsx>{`
        .contact-form {
          max-width: 600px;
          margin: 0 auto;
          padding: 1.5rem;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        input, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          font-family: inherit;
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(255, 153, 102, 0.2);
        }
        
        .form-error {
          background-color: rgba(244, 67, 54, 0.1);
          color: #f44336;
          padding: 0.75rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        
        .form-success {
          text-align: center;
          padding: 2rem 0;
        }
        
        .form-success h4 {
          color: var(--success-color);
          margin-bottom: 1rem;
        }
        
        .form-actions {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;