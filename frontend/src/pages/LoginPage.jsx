
import { LoginForm } from "../components/LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

export const LoginPage = function () {
  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col">
      

      {/* Main content centered */}
      <main className="flex flex-col items-center justify-center flex-grow">
        {/* Container for consistent width of form elements */}
        <div className="container max-w-md mx-auto p-4  rounded-lg shadow-md">
          <h1 className="text-white text-2xl mb-4 text-center">
            Sign in to your account
          </h1>

          <span className="text-gray-400 mb-6 block text-center">
            Don&apos;t have an account? <a className="text-[#7770d6] hover:text-[#b8b3f5]" href="/signup"> Sign up for free</a>
          </span>

          <a href={`${import.meta.env.VITE_BACKEND_ROUTE}/auth/github`}>Login with GitHub
          <button className="w-full text-white bg-neutral-700 hover:bg-neutral-600 border border-neutral-400 rounded-xl py-3 px-4 mb-4 text-md">
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            Continue with GitHub
          </button>
          </a>

          <a href={`${import.meta.env.VITE_BACKEND_ROUTE}/auth/google`}>
            <button className="w-full text-white bg-neutral-700 hover:bg-neutral-600 border border-neutral-400 rounded-xl py-3 px-4 mb-6 text-md">
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Continue with Google
            </button>
          </a>

          <div className="flex items-center justify-center my-2 w-full">
            <hr className="flex-grow border-neutral-600" />
            <span className="text-gray-400 px-4 whitespace-nowrap">
              Or Continue with
            </span>
            <hr className="flex-grow border-neutral-600" />
          </div>

          <LoginForm />
        </div>
      </main>

      
    </div>
  );
};

// className="bg-[#070708]"
