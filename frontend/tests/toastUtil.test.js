import { showSuccessToast } from '../utils/toastUtil'; // Adjust the path as necessary
import { vi } from 'vitest';
import { toast } from 'sonner';
import { describe,afterEach,it,expect } from 'vitest';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe('showSuccessToast', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks between tests
  });

  it('should call toast.success with the correct arguments', () => {
    const message = 'Test success message';

    showSuccessToast(message);

    expect(toast.success).toHaveBeenCalledWith(message, {
      unstyled: true,
      className: "bg-green-500 text-white font-bold text-center p-4 m-4 rounded-md flex items-center space-x-4",
      position: "bottom-right",
      duration: 3000,
    });
  });
});
