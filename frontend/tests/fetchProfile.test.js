import { vi } from 'vitest';
import axios from 'axios';
import { fetchProfile } from '../utils/fetchProfile'; // Adjust the path as necessary
import { describe, it, expect, afterEach } from 'vitest';

vi.mock('axios'); // Mock axios

// Mock Zustand store
const mockSetUser = vi.fn();
const mockSetLoading = vi.fn();

vi.mock('../store/useProfileStore', () => ({
  useProfileStore: {
    getState: vi.fn(() => ({
      setUser: mockSetUser,
      setLoading: mockSetLoading,
    })),
  },
}));

describe('fetchProfile', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and set profile data successfully', async () => {
    const profileId = 'mockProfileId';
    const mockResponse = {
      status: 200,
      data: {
        username: 'mockUser',
        email: 'mockEmail@example.com',
        profilePic: 'mockProfilePicUrl',
        profileId: 'mockProfileId',
      },
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    await fetchProfile(profileId);

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/user/${profileId}`);
    expect(mockSetUser).toHaveBeenCalledWith({
      username: 'mockUser',
      email: 'mockEmail@example.com',
      profilePic: 'mockProfilePicUrl',
      profileId: 'mockProfileId',
    });
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it('should handle errors gracefully', async () => {
    const profileId = 'mockProfileId';

    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    await fetchProfile(profileId);

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/user/${profileId}`);
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });
});
