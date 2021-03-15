const getWithMaxIndex = (arr) => {
  return arr.reduce((acc,current) => {
    return Number(current.id) > Number(acc.id) ? current : acc
  })
}

export const getNextId = (arr) => {
  const last = getWithMaxIndex(arr)
  return Number(last.id)+1
}
