import service from '../../utils/request'

export const getLogLists = (): any => {
  return service({
    url: '/homepage/syslog',
    method: 'GET'
  })
}
