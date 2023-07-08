import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'store';
import { logout } from 'store/authSlice';

export default function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useCallback(() => {
    console.log('Logout');
    dispatch(logout());
    navigate('/pages/login');
  }, [dispatch, navigate]);
}
