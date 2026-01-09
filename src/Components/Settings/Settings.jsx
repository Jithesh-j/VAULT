import styles from './Settings.module.css';

function Settings({ user }) {
    
    // Safety check just in case user is null
    if (!user) return <div className={styles.container}>Loading profile...</div>;

    // Get the first letter of the email for the avatar (e.g. "B" for bob@nike.com)
    const initial = user.email ? user.email.charAt(0).toUpperCase() : "?";
    
    // Extract the name part of email (e.g. "bob" from "bob@nike.com")
    const displayName = user.email.split('@')[0];

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Account Settings</h2>

            <div className={styles.profileCard}>
                
                {/* 1. Avatar Circle */}
                <div className={styles.avatar}>
                    {initial}
                </div>

                {/* 2. Main Info */}
                <div className={styles.info}>
                    <h3 className={styles.name}>
                        {displayName}
                        <span style={{ marginLeft: '10px', fontSize: '1rem', fontWeight: '400', color: '#64748b' }}>
                             @{user.tenantId}
                        </span>
                    </h3>
                    <span className={styles.roleTag}>Vault Administrator</span>
                </div>
            </div>

            {/* 3. Detailed Fields */}
            <div className={styles.detailsGrid}>
                <div className={styles.field}>
                    <span className={styles.label}>Email Address</span>
                    <div className={styles.value}>{user.email}</div>
                </div>

                <div className={styles.field}>
                    <span className={styles.label}>Organization ID</span>
                    <div className={styles.value}>{user.tenantId}</div>
                </div>

                <div className={styles.field}>
                    <span className={styles.label}>Account Status</span>
                    <div className={styles.value} style={{ color: '#4ade80' }}>● Active</div>
                </div>

                
            </div>
        </div>
    );
}

export default Settings;