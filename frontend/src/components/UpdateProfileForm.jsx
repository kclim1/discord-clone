// VERSION 1 FORM
import { useProfileStore } from "../../store/useProfileStore";
import axios from "axios";
import { showErrorToast, showSuccessToast   } from "../../utils/toastUtil";
export const UpdateProfileForm = () => {
    const {user ,setUser } = useProfileStore()
    
    const handleUsername = (event)=>{
        const { name, value } = event.target;
        setUser({[name]:value})
    }
    const handleEmail = (event)=>{
        const { name, value } = event.target;
        setUser({[name]:value})
    }
    const handlePassword = (event)=>{
        const { name, value } = event.target;
        setUser({[name]:value})
    }
    const handleSubmit = async (event) => {
      console.log('profileId is :' , user.profileId)
      event.preventDefault()
      try {
        // Destructure the `user` object and send the relevant fields to the backend
        const { username, email, profilePic ,password , profileId  } = user;
    
        // Send a PUT request to update the user's profile
        const response = await axios.put(
          `http://localhost:3000/dashboard/${user.profileId}`,
          { username, email, password, profilePic , profileId} 
        );
        console.log('updated profile',response)
        if(response.status === 200){
          showSuccessToast("Profile successfully updated!");

        }
      } catch (error) {
        showErrorToast("Oops! Failed to update profile :(");
        console.error('Error updating profile:', error);
      }
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-[#202225] rounded-lg shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-bold mb-1">Username:</label>
          <input
            className="p-2 border border-[#7770d6] bg-[#2f3136] text-[#B9BBBE] rounded focus:border-[#5b56a6] focus:ring-2 focus:ring-[#5b56a6]"
            type="text"
            placeholder="Enter your username"
            value={user.username}
            name="username"
            onChange={handleUsername}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-1">Email:</label>
          <input
            className="p-2 border border-[#7770d6] bg-[#2f3136] text-[#B9BBBE] rounded focus:border-[#5b56a6] focus:ring-2 focus:ring-[#5b56a6]"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            name="email"
            onChange={handleEmail}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-1">Password:</label>
          <input
            className="p-2 border border-[#7770d6] bg-[#2f3136]  text-[#B9BBBE] rounded focus:border-[#5b56a6] focus:ring-2 focus:ring-[#5b56a6]"
            type="password"
            placeholder="Enter new password"
            value={user.password}
            name="password"
            onChange={handlePassword}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-1">ProfileId:</label>
          <input
            type="text"
            id="profileId"
            value={user.profileId} 
            readOnly
            className="w-full p-3 border border-neutral-600 rounded bg-neutral-700 text-grey focus:outline-none"
            
          />
        </div>
        <button
          className="mt-4 p-3 bg-[#5865F2] text-white rounded hover:bg-[#6978F5] transition"
          type="submit"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
};

// VERSION 2
// export const UpdateProfileForm = () => {
//   return (
//     <form>
//       <div className="w-max-lg flex flex-col rounded-md mx-auto bg-red-400 justify-center">
//         <div className="pb-6 mx-auto w-full flex items-center gap-4">
//           <label className="">Username:</label>
//           <input
//             type="text"
//             className="flex-grow p-2 border border-gray-400 rounded"
//           />
//         </div>
//         <div className=" w-full gap-4 items-center flex">
//           <label>Password: </label>
//           <input className="flex-grow p-2 border border-gray-300 rounded" />
//         </div>
//         <div className="bg-green-400 p-6 mx-auto flex w-full gap-4 items-center">
//           <label>Email: </label>
//           <input className="flex-grow p-2 " />
//         </div>
//         <button>SAVE</button>
//       </div>
//     </form>
//   );
// };
