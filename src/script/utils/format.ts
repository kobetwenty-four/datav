export const time = (value: number) => {
  let time = []
  let day = parseInt(String(value / 60 / 24))
  let hour = parseInt(String((value / 60) % 24))
  let min = parseInt(String(value % 60))
  time[0] = (day > 0 ? day : 0) + '天'
  time[1] = (hour > 0 ? hour : 0) + '小时'
  time[2] = (min > 0 ? parseFloat(String(min)) : 0) + '分钟'
  return time.join(' ')
}
