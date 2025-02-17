import toast from 'react-hot-toast';

export const success_toaster = (message: string) => toast.success(message);
export const error_toaster = (message: string) => toast.error(message);
