import { useState } from "react";
import supabase from "../utils/supabaseClient";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = ({ setUser, setError, setLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setUser(user);
      localStorage.setItem("registeredEmail", email);
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <h1 className="text-2xl font-semibold mb-4 text-black text-center pb-9">Sign Up</h1>
    
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
    />
    
    <div className="relative flex justify-center ">
      <input
        type={showPassword ? "text" : "password"} 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)} 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 po"
      >
        {showPassword ? (
          <AiFillEyeInvisible className="text-gray-500" size={20} />
        ) : (
          <AiFillEye className="text-gray-500" size={20} />
        )}
      </button>
    </div>

    <button
      onClick={handleRegister}
      className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
    >
      Create account
    </button>
  </div>
  );
};

export default Register;
