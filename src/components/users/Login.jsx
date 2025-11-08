import { useState } from "react";
import { supabase } from "../../services/auth/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👈 for password toggle icons

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle input
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle login / signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (isLogin) {
        // LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        navigate("/dashboard");
      } else {
        // SIGNUP
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        alert("Check your email for a confirmation link!");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // OAuth provider login
  const handleOAuth = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 bg-white px-6 py-12">
        <div className="max-w-sm mx-auto py-10">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            {isLogin ? "Log in" : "Sign up"}
          </h2>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-gray-500 text-sm mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-md px-3 py-3 border-2 border-gray-300 focus:border-gray-500 focus:ring-0 outline-none text-lg"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-500 text-sm">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 text-sm flex items-center space-x-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full rounded-md px-3 py-3 border-2 border-gray-300 focus:border-gray-500 focus:ring-0 outline-none text-lg"
              />
            </div>

            {/* Confirm Password for Sign Up */}
            {!isLogin && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-500 text-sm">
                    Confirm Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 text-sm flex items-center space-x-1"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    <span>{showConfirmPassword ? "Hide" : "Show"}</span>
                  </button>
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md px-3 py-3 border-2 border-gray-300 focus:border-gray-500 focus:ring-0 outline-none text-lg"
                />
              </div>
            )}

            {/* Remember Me */}
            {isLogin && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-gray-600 text-sm">
                  Remember me
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-lg"
            >
              {isLogin ? "Log in" : "Sign up"}
            </button>
          </form>

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-center mt-3">
              <a
                href="#"
                className="text-gray-600 underline text-sm hover:text-gray-800"
              >
                Forgot your password?
              </a>
            </div>
          )}

          {/* Toggle Login/Signup */}
          <div className="text-center mt-4">
            <span className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 underline font-medium text-sm"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleOAuth("google")}
              className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl hover:bg-red-600 transition-colors"
            >
              G
            </button>
            <button
              onClick={() => handleOAuth("facebook")}
              className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl hover:bg-blue-700 transition-colors"
            >
              f
            </button>
            <button
              onClick={() => handleOAuth("twitter")}
              className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center text-white text-xl hover:bg-sky-600 transition-colors"
            >
              T
            </button>
            <button
              onClick={() => handleOAuth("apple")}
              className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white text-xl hover:bg-gray-800 transition-colors"
            >
              A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
