import request from '@/utils/requestapi'
export function getIdentity(username, password) {
  return request({
    url: 'api/identitytest/GetIdentityTest',
    method: 'get'
  })
}
