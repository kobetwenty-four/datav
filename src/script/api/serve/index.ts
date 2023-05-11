import service from '../../utils/request'

export const getServerLists = (): any => {
  return service({
    url: '/homepage/server',
    method: 'GET'
  })
}
