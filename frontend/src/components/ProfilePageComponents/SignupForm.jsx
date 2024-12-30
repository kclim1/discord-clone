import { useState } from "react";
import axios from "axios";

export const SignupForm = function () {

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleFirstNameInput = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameInput = (event) => {
    setLastName(event.target.value);
  };
  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        password,
        firstName,
        lastName,
      });

      const { user } = response.data;
      window.location.href = `http://localhost:5173/dashboard/${user.profileId}`;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div className="mb-6">
        <label
          className="block text-white text-sm font-bold mb-2 pt-2"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameInput}
          className="w-full p-3 border border-neutral-600 rounded bg-neutral-900 text-white focus:border-[#7770d6] focus:outline-none focus:ring focus:ring-[#7770d6]"
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-white text-sm font-bold mb-2 pt-2"
          htmlFor="first-name"
        >
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameInput}
          className="w-full p-3 border border-neutral-600 rounded bg-neutral-900 text-white focus:border-[#7770d6] focus:outline-none focus:ring focus:ring-[#7770d6]"
          placeholder="Enter your first name"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-white text-sm font-bold mb-2 pt-2"
          htmlFor="username"
        >
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameInput}
          className="w-full p-3 border border-neutral-600 rounded bg-neutral-900 text-white focus:border-[#7770d6] focus:outline-none focus:ring focus:ring-[#7770d6]"
          placeholder="Enter your last name"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordInput}
          className="w-full p-3 border border-neutral-600 rounded bg-neutral-900 text-white focus:border-[#7770d6] focus:outline-none focus:ring focus:ring-[#7770d6]"
          placeholder="Enter your password"
        />
      </div>
      {errors.length > 0 && (
        <div className="error-messages text-center pb-4">
          {errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error.msg}
            </p>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#7770d6] hover:bg-[#b8b3f5] text-white font-bold rounded-xl transition duration-200 pt-2 "
      >
        Sign Up
      </button>
    </form>
  );
};
