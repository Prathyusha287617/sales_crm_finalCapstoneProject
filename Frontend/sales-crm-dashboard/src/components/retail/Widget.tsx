// src/components/crm/Widget.tsx
import React, { ReactNode } from 'react';
import styles from '../../styles/crm/widget.module.css';

interface WidgetProps {
  title: string;
  children?: ReactNode;  // Adding `children` prop to the WidgetProps interface
}

const Widget: React.FC<WidgetProps> = ({ title, children }) => {
  return (
    <div className={styles.widget}>
      <h3>{title}</h3>
      <div className={styles.widgetContent}>
        {children}
      </div>
    </div>
  );
};

export default Widget;
