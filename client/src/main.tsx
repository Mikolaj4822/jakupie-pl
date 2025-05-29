import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>JaKupię.pl - Zamieść, Co Chcesz Kupić</title>
      <meta name="description" content="JaKupię.pl to odwrócony rynek, gdzie kupujący zamieszczają, czego szukają, a sprzedający przychodzą z najlepszymi ofertami." />
      
      {/* Open Graph tags */}
      <meta property="og:title" content="JaKupię.pl - Zamieść, Co Chcesz Kupić" />
      <meta property="og:description" content="JaKupię.pl to odwrócony rynek, gdzie kupujący zamieszczają, czego szukają, a sprzedający przychodzą z najlepszymi ofertami." />
      <meta property="og:type" content="website" />
      
      {/* Add Font Awesome */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer" 
      />
      
      {/* Inter Font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
        rel="stylesheet"
      />
    </Helmet>
    <App />
  </HelmetProvider>
);
