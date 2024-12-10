// VERSION 1 FORM

export const UpdateProfileForm = () => {
  return (
    <form className="max-w-lg mx-auto p-6 bg-red-300 rounded-lg shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-bold mb-1">Username:</label>
          <input
            className="p-2 border border-gray-400 rounded"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-1">Email:</label>
          <input
            className="p-2 border border-gray-400 rounded"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-1">Password:</label>
          <input
            className="p-2 border border-gray-400 rounded"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-1">ProfileId:</label>
          <input
            type="text"
            id="profileId"
            // value={profileId} // fetched from the database or Zustand store
            readOnly
            className="w-full p-3 border border-neutral-600 rounded bg-neutral-700 text-white focus:outline-none"
            placeholder="123456789"
          />
         
        </div>
        <button
          className="mt-4 p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          type="submit"
        >
          Save
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
