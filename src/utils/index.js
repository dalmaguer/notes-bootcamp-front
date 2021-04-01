const getWithMaxIndex = (arr) => {
  if (Array.isArray(arr) && arr.length) {
    return arr.reduce((acc, current) => {
      return Number(current.id) > Number(acc.id) ? current : acc
    })
  }
  return 0
}

export const getNextId = (arr) => {
  const last = getWithMaxIndex(arr)
  return Number(last.id) + 1
}

export const handleErrorMessage = (err) => {
  const { response, message } = err
  let errorMessage
  if (response && response.data && response.data.error) {
    errorMessage = response.data.error
  } else if (message) {
    errorMessage = message
  }
  return errorMessage
}
