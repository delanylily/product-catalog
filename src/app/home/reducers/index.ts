
import { createReducer, on } from '@ngrx/store';
import { getUser } from '../home.actions';

export const initialAuthenticationState: any = {
  user: undefined
}

export function authenticationReducer(state, action) {
  return _authenticationReducer(state, action);
}

const _authenticationReducer = createReducer(
  initialAuthenticationState,

  on(getUser, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  })
)
