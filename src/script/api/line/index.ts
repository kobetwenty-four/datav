import service from '../../utils/request'

export const getIncrementLists = (): any => {
  return service({
    url: '/homepage/increment',
    method: 'GET'
  })
}
