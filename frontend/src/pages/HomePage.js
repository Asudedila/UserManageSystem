import React from 'react';
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      <h2 className="home-title">Nasıl Çalışır?</h2>
      <p className="home-description">
        Bu uygulama, kullanıcılarınızı ve rollerini kolayca yönetmenizi sağlar. Yan menüdeki bağlantıları kullanarak ilgili sayfalara erişebilirsiniz.
      </p>
      
      <ul className="home-list">
        <li>Menüdeki <strong>"Users"</strong> linkine tıklayarak kullanıcı listesini görüntüleyin ve yönetin.</li>
        <li><strong>"Roles"</strong> sayfasına giderek rolleri kontrol edin.</li>
      </ul>
    </div>
  );
}
