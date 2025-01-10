import { fetchFriends } from '../utils/fetchFriends'; // Adjust the import path as necessary
import { vi } from 'vitest';
import axios from 'axios';
import { describe, it, expect, afterEach } from 'vitest';

vi.mock('axios'); // Mock axios

describe('fetchFriends', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks to ensure test isolation
  });

  it('should fetch friends data successfully', async () => {
    const mockResponse = {
      data: [
        { id: '1', username: 'Alice', status: 'accepted' },
        { id: '2', username: 'Bob', status: 'pending' },
      ],
    };

    axios.get.mockResolvedValueOnce(mockResponse); // Mock axios.get to resolve with mockResponse

    const profileId = 'mockProfileId'; // Simulate a profile ID
    const friends = await fetchFriends(profileId); // Call the function being tested

    expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_ROUTE}/profiles/${profileId}/friends`);
    // Assert that axios.get was called with the correct endpoint

    expect(friends).toEqual(mockResponse.data);
    // Assert that the returned data matches the mock response
  });

  it('should throw an error if the API call fails', async () => {
    const mockError = new Error('Network Error');
    axios.get.mockRejectedValueOnce(mockError); // Mock axios.get to reject with an error

    const profileId = 'mockProfileId'; // Simulate a profile ID

    await expect(fetchFriends(profileId)).rejects.toThrow(mockError);
    // Assert that the function throws the error from axios.get

    expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_ROUTE}/profiles/${profileId}/friends`);
    // Assert that axios.get was called with the correct endpoint
  });
});
