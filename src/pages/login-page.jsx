import React, { useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { collection, getDocs } from "firebase/firestore";
import FLogo from "/assets/images/Logo2.png";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  localStorage.setItem("isLoggedIn", false);
  const navigate = useNavigate();
  const [adminLogin, setAdminLogin] = useState({
    username: "",
    password: "",
  });
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    const querySnapshot = await getDocs(collection(db, "admins"));
    const admins = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAdmins(admins);
  };

  useEffect(() => {
    getAdmins();
    localStorage.clear();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = adminLogin;
    const cekLogin = admins.find((admin) => admin.username === username && admin.password === password);

    if (cekLogin) {
      localStorage.setItem("admin", JSON.stringify(cekLogin));
      localStorage.setItem("isLoggedIn", true);
      alert("Login Success");
      navigate("/event-list");
      window.location.reload();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-2 ">
          <img className="w-60" src={FLogo} alt="logo" />
        </div>
        <div className="w-full bg-[#F4A115] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">Login Here</h1>
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="username" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={adminLogin.username}
                  onChange={handleChange}
                  className="bg-[#4D4D63] border border-[#4D4D63]-300 text-white-900 placeholder-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Masukkan username.."
                  required=""
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={adminLogin.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="••••••••"
                  className="bg-[#4D4D63] border border-[#4D4D63]-300 text-white-900 placeholder-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-white dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-[#4D4D63] hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#36369F] hover:bg-[#13294C] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-white dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a href="#" className="font-medium text-[#4D4D63] hover:underline dark:text-[primary]-500">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
