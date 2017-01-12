import * as types from './types'
import * as auth from '../utils/auth'

export function fetchUserSuccess(user) {
  return {
    type: types.USER_FETCH_SUCCESS,
    user
  }
}

export function fetchUserFail() {
  return {
    type: types.USER_FETCH_FAIL
  }
}

export function loginUserStart() {
  return {
    type: types.USER_LOGIN_START
  }
}

export function loginUserSuccess(user) {
  return {
    type: types.USER_LOGIN_SUCCESS,
    user
  }
}

export function loginUserFail() {
  return {
    type: types.USER_LOGIN_FAIL
  }
}

export function logoutUserSuccess() {
  return {
    type: types.USER_LOGOUT_SUCCESS
  }
}
export function fetchUser() {
  if (!auth.accessTokenIsExpired()) {
    const user = auth.getAccessTokenDecoded()
    return fetchUserSuccess(user)
  } else {
    return fetchUserFail()
  }
}

export function loginUser(username, password) {
  return (dispatch) => {
    dispatch(loginUserStart())

    return fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      return response.text().then(token => {
        token = token.replace(/"/g, '')
        if (!response.ok) {
          dispatch(loginUserFail())
        } else {
          auth.setAccessToken(token)
          dispatch(loginUserSuccess(auth.getAccessTokenDecoded()))
        }

        return response
      })
    })
    .catch(error => {
      dispatch(loginUserFail())
      throw error
    })
  }
}

export function logoutUser() {
  return (dispatch) => {
    auth.destroyTokens()
    return dispatch(logoutUserSuccess())
  }
}
