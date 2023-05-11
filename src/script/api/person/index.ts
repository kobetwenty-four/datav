import service from '../../utils/request'

export const getPersonLists = (): any => {
  return service({
    url: '/homepage/user',
    method: 'GET'
  })
}
