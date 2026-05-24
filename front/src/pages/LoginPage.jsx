import React, { useState } from 'react';
import axios from 'axios';

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await axios.post("/api/auth/reg", { username, password, role: "ROLE_USER"});
                alert("Registration successful! Please log in.");
                setIsRegistering(false);
            } else {
                await axios.post("/login", new URLSearchParams({ username, password }));
                onLogin();
                window.location.href = "/home";
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div style={{ background: '#dbdbdb', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '0 auto', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}>
            <h2 style={{ color: '#52806b', textAlign: 'center' }}>{isRegistering ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        background: '#52806b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    {isRegistering ? "Register" : "Login"}
                </button>
            </form>

            <button
                onClick={() => setIsRegistering(!isRegistering)}
                style={{
                    width: '100%',
                    padding: '10px',
                    background: 'transparent',
                    color: '#52806b',
                    border: '2px solid #52806b',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginTop: '10px',
                }}
            >
                {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
        </div>
    );
}

export default LoginPage;