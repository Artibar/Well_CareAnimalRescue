import useAuthStore from '../../store/useAuthStore.js'
import { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom'
const Login = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    role: 'user',
  });
  const navigate = useNavigate();

  const { login, loading, error, clearError } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    let payload;
    console.log("Payload being sent:", payload);

    if (formData.role === 'admin' || formData.role === 'volunteer') {
      payload = {
        userId: formData.identifier,
        password: formData.password,
        role: formData.role,
      };
    } else {
      payload = {
        email: formData.identifier,
        password: formData.password,
        role: 'user',
      };
    }

    try {
      await login(payload);
      console.log("Payload being sent:", payload);
      if (formData.role === 'admin') {
        navigate('/dashboard');
      } else if (formData.role === 'volunteer') {
        navigate('/dashboard'); // or '/dashboard' if you want
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err.message);
    }
  }
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}
        
        <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formData.role === 'user' ? 'Email' : 'ID'}
          </label>
          <input
            type="text"
            value={formData.identifier}
            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            placeholder={formData.role === 'user' ? 'your.email@example.com' : 'Enter your ID'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-sm"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to='/signup'
          onClick={onToggle}
          className="text-blue-600 hover:underline font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};
export default Login;