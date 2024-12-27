import axios from "axios"
import { useFriendsStore } from "../../../store/useFriendsStore"
import { showSuccessToast , showErrorToast } from "../../../utils/toastUtil"
import { useParams } from "react-router-dom"

export const AcceptFriendButton =  ()=>{
    const {senderId  } = useFriendsStore()
    const {profileId} = useParams()

    const handleAccept = async () => {
        try {
            console.log('this is the sender id ',senderId)
            console.log('this is the receiver id ',profileId)
            const payload = {
                senderId, 
                status: "accepted" 
            };
            const acceptFriend = await axios.patch(`http://localhost:3000/friends/${profileId}`, payload);
            console.log('this is accept friend',acceptFriend)
            if (acceptFriend.status === 200) {
                showSuccessToast('Friend Added !!');
            }
        } catch (error) {
            showErrorToast('Friend request acceptance failed!');
            console.error('Error accepting friend request', error);
        }
    };
    
    return(
    <div>
         <button onClick={handleAccept} className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600">
            Accept 
         </button>
    </div>
    )
    
}

// router.patch('/friends/:profileId',chatController.acceptFriendRequest)
