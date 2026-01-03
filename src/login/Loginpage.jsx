// src/components/Loginpage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios
import styles from './Loginpage.module.css';

function Loginpage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // New State for Organizations
    const [tenants, setTenants] = useState([]); // Stores the list from API
    const [selectedTenant, setSelectedTenant] = useState(''); // Stores the user's choice

    // 1. Fetch Organizations on Page Load
    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const response = await axios.get("http://localhost:8080/tenantdetails");
                setTenants(response.data);
                
                // Optional: Auto-select the first one
                if (response.data.length > 0) {
                    setSelectedTenant(response.data[0].id);
                }
            } catch (error) {
                console.error("Could not load organizations", error);
            }
        };
        fetchTenants();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("Logging in...", { email, password, organization: selectedTenant });

        try {
            // Updated Login Call (Pass the Organization ID too!)
            const response = await axios.post("http://localhost:8080/login", {
                email: email,
                password: password,
                tenantId: selectedTenant // Send this to backend if needed
            });
            
            console.log("Login Response: ", response.data);
            // Pass success up to the parent
            if (response.data == true) {
                console.log("Logged In....")
                const userObject = {
                    email: email,
                    tenantId: selectedTenant 
                };
                onLoginSuccess(userObject);
               
            }
        } catch (error) {
            alert("Login Failed: " + (error.response?.data?.message || "Check credentials"));
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Sign in to Vault</h2>
                    <p className={styles.subtitle}>Select your organization to continue</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    
                    {/* --- NEW DROPDOWN SECTION --- */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="org" className={styles.label}>Organization</label>
                        <select 
                            id="org"
                            className={styles.selectInput} // New CSS class
                            value={selectedTenant} 
                            onChange={(e) => setSelectedTenant(e.target.value)}
                        >
                            <option value="" disabled>Select Workspace...</option>
                            {tenants.map((t) => (
                                <option key={t.id} value={t.id}>
                                    🏢 {t.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.signInButton}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Loginpage;