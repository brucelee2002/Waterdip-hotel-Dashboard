import React from 'react';
import Dashboard from './components/Dashboard';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Hotel Booking Analytics</h1>
      </header>
      <main className={styles.main}>
        <Dashboard />
      </main>
      <footer className={styles.footer}>
        <p>© 2015 Hotel Booking Analytics. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;