import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { loginUser } from '../../api';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './index.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      const response = await loginUser({ email, password });
      login(response.data.data.user, response.data.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};
export default LoginPage;