import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Documents.module.css';

function Documents({ user }) {
    // 1. State to store the list of documents
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);

    // 2. Fetch documents when component loads (or user changes)
    useEffect(() => {
        fetchDocuments();
    }, [user]);

    const fetchDocuments = async () => {
        try {
            // Adjust this URL if your GET endpoint is different
            const response = await axios.get(`http://localhost:8080/getdocuments/${user.tenantId}`);
            setDocuments(response.data);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("tenantId", user?.tenantId || "UNKNOWN");

        try {
            await axios.post("http://localhost:8080/uploaddocuments", formData);
            alert("Upload Successful!");
            setFile(null);
            // 3. Refresh the list immediately after upload
            fetchDocuments();
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Check console.");
        }
    };

    // 4. Helper to convert Base64 string to a downloadable file
    const downloadFile = (doc) => {
        try {
            // Convert Base64 to binary
            const byteCharacters = atob(doc.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            
            // Create a Blob from the binary data
            const blob = new Blob([byteArray], { type: doc.type });
            
            // Create a temporary link to trigger download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = doc.name; // Use the name from DB
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Download failed", e);
            alert("Error downloading file.");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>📂 Documents</h2>
            
            {/* --- UPLOAD SECTION --- */}
            <div className={styles.uploadCard}>
                <label className={styles.label}>Upload New Document</label>
                <div style={{display: 'flex', gap: '10px'}}>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        className={styles.fileInput}
                        value={file ? undefined : ''} 
                    />
                    <button onClick={handleUpload} className={styles.uploadButton}>
                        Upload
                    </button>
                </div>
            </div>

            <hr className={styles.divider} />

            {/* --- LIST SECTION --- */}
            <h3 className={styles.subHeader}>Stored Files</h3>
            
            <div className={styles.tableWrapper}>
                <table className={styles.docTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Size (Bytes)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.length > 0 ? (
                            documents.map((doc) => (
                                <tr key={doc.id}>
                                    <td>{doc.name}</td>
                                    <td>{doc.type}</td>
                                    <td>{doc.size}</td>
                                    <td>
                                        <button 
                                            className={styles.downloadBtn}
                                            onClick={() => downloadFile(doc)}
                                        >
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{textAlign: "center"}}>
                                    No documents found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    ); 
}

export default Documents;