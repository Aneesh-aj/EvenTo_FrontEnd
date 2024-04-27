import { Dispatch } from 'redux';
import { setUser } from '../redux/userSlice';

export const clearUser = (dispatch: Dispatch<any>) => {
  dispatch(
    setUser({
      role: '',
      name: '',
      email: '',
      id: '',
      blocked: false,
      approve: false,
    })
  );
};
