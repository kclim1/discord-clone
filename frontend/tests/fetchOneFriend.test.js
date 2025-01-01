import { fetchOneFriend } from '../utils/fetchOneFriend'; // Adjust the import path as necessary
import { vi } from 'vitest';
import axios from 'axios';
import { describe, it, expect, afterEach } from 'vitest';

vi.mock('axios'); // Mock axios

describe('fetchOneFriend', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks to ensure test isolation
  });

  it('should fetch a friend\'s profile successfully', async () => {
    const mockResponse = {
      data: {
        id: '1',
        username: 'Alice',
        profilePic: '/path/to/profilePic',
        status: 'accepted',
      },
    };

    axios.get.mockResolvedValueOnce(mockResponse); // Mock axios.get to resolve with mockResponse

    const profileId = 'mockProfileId'; // Simulate a profile ID
    const friendId = 'mockFriendId'; // Simulate a friend ID
    const friend = await fetchOneFriend(profileId, friendId); // Call the function being tested

    expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/profiles/${profileId}/friends/${friendId}`);
    // Assert that axios.get was called with the correct endpoint

    expect(friend).toEqual(mockResponse.data);
    // Assert that the returned data matches the mock response
  });

  it('should throw an error if the API call fails', async () => {
    const mockError = new Error('Network Error');
    axios.get.mockRejectedValueOnce(mockError); // Mock axios.get to reject with an error

    const profileId = 'mockProfileId'; // Simulate a profile ID
    const friendId = 'mockFriendId'; // Simulate a friend ID

    await expect(fetchOneFriend(profileId, friendId)).rejects.toThrow(mockError);
    // Assert that the function throws the error from axios.get

    expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/profiles/${profileId}/friends/${friendId}`);
    // Assert that axios.get was called with the correct endpoint
  });
});
