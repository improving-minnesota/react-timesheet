import jwtDecode from 'jwt-decode'

const ACCESS_TOKEN = 'accessToken'

/**
 * Gets access token and determines if it is expired, or close to expiring.
 * -30000 subtracts 30 seconds, which is more than enough buffer time to make sure the
 * token isn't going to expire mid-transit.
 *
 * @returns {Boolean} True if access token is expired
 */
export function accessTokenIsExpired() {
  const accessToken = getAccessToken()
  if (!accessToken) return true
  const decoded = jwtDecode(accessToken)
  return Date.now() >= decoded.exp * 1000 - 30000
}

/**
 * Destroy access and refresh tokens from local storage.
 */
export function destroyTokens() {
  window.localStorage.removeItem(ACCESS_TOKEN)
}

/**
 * Retrieve the access token from localstorage
 *
 * @returns {String} JWT access token
 */
export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN)
}

/**
 * Retrieve the decoded access token.
 *
 * @returns {Object} JWT access token decoded
 */
export function getAccessTokenDecoded() {
  const accessToken = getAccessToken()
  if (!accessToken) return undefined
  return jwtDecode(accessToken)
}

/**
 * Set the JWT access token and update the user.
 *
 * @param {String} accessToken - JWT Access token.
 * @returns {String} Access token
 */
export function setAccessToken(accessToken) {
  window.localStorage.setItem(ACCESS_TOKEN, accessToken)
}
