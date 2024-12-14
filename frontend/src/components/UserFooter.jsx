import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const UserFooter = () => {
  return (
    <div className="flex items-center justify-between p-3 bg-[#292b2f] text-white">
      {/* Left side: User avatar and name */}
      <div className="flex items-center space-x-3">
        <AccountCircleIcon className="w-10 h-10" />
        <div className="leading-tight">
          <p className="text-sm font-semibold">Username</p>
          <p className="text-xs text-gray-400">#0000</p>
        </div>
      </div>

      {/* Right side: Mic, Headphones, and Manage Account icons */}
      <div className="flex items-center space-x-3">
        <MicIcon className="cursor-pointer hover:text-gray-300" />
        <HeadphonesIcon className="cursor-pointer hover:text-gray-300" />
        <ManageAccountsIcon className="cursor-pointer hover:text-gray-300" />
      </div>
    </div>
  );
};
