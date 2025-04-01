import React, { useState } from 'react';
import styles from './ArticleTabs.module.scss';

type Props = {
  featured: React.ReactNode;
  latest: React.ReactNode;
};

const ArticleTabs = ({ featured, latest }: Props) => {
  const [activeTab, setActiveTab] = useState<'featured' | 'latest'>('featured');

  const component = activeTab === 'featured' ? featured : latest;
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <button
          className={activeTab === 'featured' ? styles.active : ''}
          onClick={() => setActiveTab('featured')}
        >
          Featured
        </button>
        <button
          className={activeTab === 'latest' ? styles.active : ''}
          onClick={() => setActiveTab('latest')}
        >
          Latest
        </button>
      </div>
      <div
        className={`${styles.content} ${activeTab === 'featured' ? styles.featured : styles.latest}`}
      >
        {component}
      </div>
    </div>
  );
};

export default ArticleTabs;
