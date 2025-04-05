// /src/components/ContactForm.jsx
import React from 'react';
import './ContactForm.css';

/**
 * お問い合わせフォームコンポーネント (改修中表示)
 */
const ContactForm = () => {
  return (
    <div className="contact-form-container maintenance">
      <h2>お問い合わせ</h2>
      <p>
        現在、お問い合わせフォームは改修中です。
        <br />
        ご不便をおかけしますが、再開まで今しばらくお待ちください。
      </p>
      {/* 必要であれば連絡先メールアドレスなどを表示 */}
      {/* <p>お急ぎの場合は <a href="mailto:your-email@example.com">your-email@example.com</a> までご連絡ください。</p> */}
    </div>
  );
};

export default ContactForm;