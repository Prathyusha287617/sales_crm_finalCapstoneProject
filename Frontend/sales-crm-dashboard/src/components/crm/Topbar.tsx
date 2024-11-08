import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/crm/topbar.module.css'; // Assuming you have a CSS file for Topbar

interface TopbarProps {
  homePage: boolean;  // You can add more props here if needed
}

const Topbar: React.FC<TopbarProps> = ({homePage}) => {
  return (
    <div className={styles.topbar} style={homePage? {background : 'tranparent'} : {background : 'linear-gradient(to right, #3c90f0, #1c4f91)' }}>
      <h1 className='text-white font-bold'>Sales ERP</h1>
    </div>
  );
};

export default Topbar;