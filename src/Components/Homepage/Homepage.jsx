import { NavLink, Outlet } from 'react-router-dom';
import styles from './Homepage.module.css';

function Homepage({ user, onLogout }) {
  return (
    <div className={styles.container}>
      
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h3 className={styles.title}>Vault</h3>
          <p className={styles.subtitle}>{user.tenantId} Workspace</p>
          <p className={styles.subtitle} style={{ fontSize: '0.75rem', opacity: 0.7 }}>
            {user.email}
          </p>
        </div>

        <nav className={styles.nav}>
          <NavLink to="docs" className={({isActive}) =>
            isActive ? `${styles.navItem} ${styles.activeLink}` : styles.navItem
          }>
            📂 Documents
          </NavLink>

          <NavLink to="chat" className={({isActive}) =>
            isActive ? `${styles.navItem} ${styles.activeLink}` : styles.navItem
          }>
            💬 AI Chat
          </NavLink>

          <NavLink to="settings" className={({isActive}) =>
            isActive ? `${styles.navItem} ${styles.activeLink}` : styles.navItem
          }>
            ⚙️ Settings
          </NavLink>
        </nav>

        <button onClick={onLogout} className={styles.logoutBtn}>
          Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.contentArea}>
        <Outlet /> {/* 👈 CHILD ROUTES RENDER HERE */}
      </main>
    </div>
  );
}

export default Homepage;
