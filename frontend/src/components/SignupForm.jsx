export const SignupForm = function () {
    return (
      <form >
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2 pt-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-neutral-600 rounded bg-neutral-900 text-white focus:border-[#7770d6] focus:outline-none focus:ring focus:ring-[#7770d6]"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-neutral-600 rounded bg-neutral-900 text-white focus:border-[#7770d6] focus:outline-none focus:ring focus:ring-[#7770d6]"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#7770d6] hover:bg-[#b8b3f5] text-white font-bold rounded-xl transition duration-200 pt-2 "
        >
          Sign Up
        </button>
      </form>
    );
  };
  
  
  