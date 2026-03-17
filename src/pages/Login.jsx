import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      
      const response = await login(email, password);

      
      if (!response.success) {
        setError(response.message);
      } 
      
      else {
        var role = response.user.role;
        role = role.toLowerCase().trim();
        console.log("role: ",role);

        switch (role) {
          case "admin":
            navigate("/admin");
            break;
          case "patient":
            navigate("/patient");
            break;
          case "receptionist":
            navigate("/receptionist");
            break;
          case "doctor":
            navigate("/doctor");
            break;
          default:
            navigate("/");
        }
      }
    }
    catch (err) {
      setError("Login failed. Please try again.");
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        
      <div className='flex justify-center items-center mb-6'>
          <img className="h-18 text-center " src='/logo.png' />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Log In</h2>

        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={email}
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="youremail@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          
          {error && (
            <div className="p-3 bg-zinc-900 text-white text-[10px] font-bold tracking-widest">
              {error}
            </div>
          )}
          
          <button type='submit'
           class="w-full text-white bg-green-500 hover:bg-green-600 font-medium py-2.5 rounded-lg transition-colors"
            disabled={isLoading}
          >
           {isLoading ? "Processing..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}