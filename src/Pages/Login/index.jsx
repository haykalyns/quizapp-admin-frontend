// Import yang diperlukan
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Api/users";
import { useDispatch } from 'react-redux';
import { login } from "../../service/auth/authSlice";

// Komponen Login
export default function Login() {
  // State untuk menyimpan email, password, dan error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Penggunaan hook navigate dari React Router DOM
  const navigate = useNavigate();

  // Role default
  const defaultRole = "admin";

  // Dispatch dari Redux untuk dispatch action login
  const dispatch = useDispatch();

  // Handle submit form login
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Role dari state atau defaultRole jika tidak diubah
      const role = defaultRole;
  
      // Memanggil fungsi loginUser dari API
      const user = await loginUser(email, password, role);
  
      // Jika user ditemukan dan login berhasil
      if (user) {
        // Dispatch action login ke Redux store
        sessionStorage.setItem('jwt_token', user.token);
        dispatch(login(user));

        // document.cookie = `jwt_token=${user.token}`;
        // Redirect ke halaman utama setelah login
        navigate("/");
      } else {
        // Jika login gagal, set error
        setError("Login failed. Please check your credentials.");
      }
      
      // Log ke konsol bahwa data berhasil dikirim ke database
      console.log("Data successfully sent to the database:", user);
    } catch (error) {
      // Jika terjadi kesalahan, set error dan log error ke konsol
      setError("Login failed. Please check your credentials.");
      console.error("Error while sending data to the database:", error);
    }
  };  

    // Memeriksa apakah token JWT sudah tersedia di sessionStorage saat komponen dimuat
    useEffect(() => {
      const jwtToken = sessionStorage.getItem('jwt_token');
      if (jwtToken) {
        // Redirect ke halaman utama jika token JWT sudah tersedia
        navigate("/");
      }
    }, [navigate]);

  // Return tampilan komponen Login
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form onSubmit={handleSubmit} autoComplete="on" className="max-w-xs w-full">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Email</span>
          </div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Password</span>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Role</span>
          </div>
          <input
            type="text"
            placeholder="role"
            defaultValue={defaultRole}
            readOnly
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <button type="submit" className="mt-10 w-full btn btn-primary">
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Dont have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </p>

        {/* Tampilkan pesan error jika login gagal */}
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}
