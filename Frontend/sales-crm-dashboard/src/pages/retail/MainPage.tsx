// src/pages/MainPage.tsx
import React from 'react';
import Styles from '../../styles/Retail/mainpage.module.css';
import Sidebar from '../../components/retail/Sidebar';

const MainPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-100 h-screen overflow-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to MyApp</h2>
          <p className="text-gray-600">This is the main page content.</p>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
