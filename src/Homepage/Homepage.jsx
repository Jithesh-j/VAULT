import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import styles from './Homepage.module.css';

// 1. Simple Components with basic styling
function Documents() { 
    return (
        <div>
            <h2 className={styles.pageHeader}>📂 Documents</h2>
            <p>Manage and secure your organization's files here.</p>
        </div>
    ); 
}

function Chat() { 
    return (
        <div>
            <h2 className={styles.pageHeader}>💬 AI Assistant</h2>
            <p>Ask Vault AI anything about your enterprise data.</p>
        </div>
    ); 
}

function Settings() { 
    return (
        <div>
            <h2 className={styles.pageHeader}>⚙️ Configuration</h2>
            <p>Manage users, permissions, and security policies.</p>
        </div>
    ); 
}

function Homepage({ user, onLogout }) {

    return (
        <div className={styles.container}>
            
            {/* --- SIDEBAR --- */}
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <h3 className={styles.title}>Vault</h3>
                    <p className={styles.subtitle}>{user.tenantId} Workspace</p>
                    <p className={styles.subtitle} style={{fontSize: '0.75rem', opacity: 0.7}}>{user.email}</p>
                </div>
                
                <nav className={styles.nav}>
                    {/* NavLink automatically adds "active" class when URL matches */}
                    <NavLink 
                        to="docs" 
                        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.activeLink}` : styles.navItem}
                    >
                        📂 Documents
                    </NavLink>
                    
                    <NavLink 
                        to="chat" 
                        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.activeLink}` : styles.navItem}
                    >
                        💬 AI Chat
                    </NavLink>
                    
                    <NavLink 
                        to="settings" 
                        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.activeLink}` : styles.navItem}
                    >
                        ⚙️ Settings
                    </NavLink>
                </nav>

                <button onClick={onLogout} className={styles.logoutBtn}>
                    Sign Out
                </button>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className={styles.contentArea}>
                <Routes>
                    {/* Default Redirect: / -> /docs */}
                    <Route path="/" element={<Navigate to="docs" replace />} />
                    
                    <Route path="docs" element={<Documents />} />
                    <Route path="chat" element={<Chat />} />
                    <Route path="settings" element={<Settings />} />
                </Routes>
            </main>
        </div>
    );
}

export default Homepage;