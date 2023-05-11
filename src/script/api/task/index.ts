import service from '../../utils/request'

export const getTaskLists = () => {
  return service({
    url: '/homepage/task',
    method: 'GET'
  })
}
