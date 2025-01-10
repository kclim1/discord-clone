import { fetchChat } from '../utils/fetchChat'; // Adjust the import path as necessary
import { vi } from 'vitest';
import axios from 'axios';
import { describe ,it ,expect,afterEach } from 'vitest';

vi.mock('axios');

describe('fetchChat', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch chat data successfully', async () => {
    const mockResponse = {
      data: [
        { chatId: '1', participants: ['user1', 'user2'] },
        { chatId: '2', participants: ['user1', 'user3'] },
      ],
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    const profileId = 'mockProfileId';
    const chats = await fetchChat(profileId);

    expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_ROUTE}/chats/${profileId}`);
    expect(chats).toEqual(mockResponse.data);
  });

  it('should throw an error if the API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const profileId = 'mockProfileId';

    await expect(fetchChat(profileId)).rejects.toThrow('Failed to fetch chats. Please try again.');

    expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_ROUTE}/chats/${profileId}`);
  });
});
