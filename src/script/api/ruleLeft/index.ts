import service from '../../utils/request'

export const getRuleLists = (): any => {
  return service({
    url: '/homepage/rule',
    method: 'GET'
  })
}
