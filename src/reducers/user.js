import * as types from '../actions/types'
import initialState from './initial-state'

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_FETCH_SUCCESS:
      return {
        ...state,
        info: action.user,
        isLoggedIn: true
      }
    case types.USER_FETCH_FAIL:
      return {
        ...state,
        isLoggedIn: false
      }
    case types.USER_LOGIN_START:
      return {
        ...state,
        isLoggingIn: true
      }
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        info: action.user,
        isLoggedIn: true,
        isLoggingIn: false
      }
    case types.USER_LOGIN_FAIL:
      return {
        ...state,
        info: {},
        isLoggedIn: false,
        isLoggingIn: false
      }
    case types.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        info: {},
        isLoggedIn: false
      }
    default:
      return state
  }
}
