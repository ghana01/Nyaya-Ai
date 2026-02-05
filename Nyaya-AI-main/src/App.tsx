import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import KnowYourRights from './pages/KnowYourRights';
import Chatbot from './pages/Chatbot';
import FileComplaint from './pages/FileComplaint';
import CaseStatus from './pages/CaseStatus';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'rights':
        return <KnowYourRights />;
      case 'chatbot':
        return <Chatbot />;
      case 'complaint':
        return <FileComplaint />;
      case 'status':
        return <CaseStatus />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
