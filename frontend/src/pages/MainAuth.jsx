import Login from "./Auth/Login";
import Signup from "./Auth/Signup"
export default function MainAuth() {
  const [showLogin, setShowLogin] = useState(true);
  const { user, isAuthenticated, logout } = useAuthStore();

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome, {user.name}!
            </h2>
          </div>
          
          <div className="space-y-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Role:</span>
              <span className="capitalize bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {user.role}
              </span>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {showLogin ? (
        <Login onToggle={() => setShowLogin(false)} />
      ) : (
        <Signup onToggle={() => setShowLogin(true)} />
      )}
    </div>
  );
}