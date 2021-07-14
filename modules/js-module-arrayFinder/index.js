export function findInArray (array, key, value) {
  const tmp = array.findIndex((element) => {
    return element[key] === value
  })

  return (tmp >= 0 ? tmp : null)
}
export function findInArrayGreaterThan (array, key, value) {
  // warning, this assume that array is sorted
  let i = 0
  for (i; i < array.length; i++) {
    if (value > array[i][key]) { // if the current item is smaller than the parameter
      return i // return the value at the index you are on
    }
  }
  return i === array.length ? array.length : null
}
export function findInArrayLessThan (array, key, value) {
  // warning, this assume that array is sorted
  let i = 0
  for (i; i < array.length; i++) {
    if (value < array[i][key]) { // if the current item is smaller than the parameter
      return i // return the value at the index you are on
    }
  }
  return array.length === i ? null : i
}
export function isArrayEqual (array1, array2) {
  // type test
  if (typeof array1 !== typeof array2) {
    return false
  }

  // length test
  if (array1.length !== array2.length) {
    return false
  }

  // value test
  let tes = true
  for (let index = 0; index < array1.length; index++) {
    const element = array1[index]
    switch (typeof element) {
      case 'object':
        if (Array.isArray(element)) {
          const _tes = isArrayEqual(element, array2[index])
          if (!_tes) {
            index = array1.length + 1 // break off
            tes = false
          }
        } else {
          const _tes = isObjectEqual(element, array2[index])
          if (!_tes) {
            index = array1.length + 1 // break off
            tes = false
          }
        }
        break
      default:
        if (element !== array2[index]) {
          tes = false
          index = array1.length + 1 // break off
        }
        break
    }
  }
  return tes
}

export function isObjectEqual (array1, array2) {
  // type test
  if (typeof array1 !== typeof array2) {
    return false
  }

  // length test
  if (array1.length !== array2.length) {
    return false
  }

  // value test
  let tes = true
  for (let index = 0; index < Object.keys(array1).length; index++) {
    const element = array1[Object.keys(array1)[index]]
    switch (typeof element) {
      case 'object':
        if (Array.isArray(element)) {
          const _tes = isArrayEqual(element, array2[Object.keys(array2)[index]])
          if (!_tes) {
            index = array1.length + 1 // break off
            tes = false
          }
        } else {
          const _tes = isObjectEqual(element, array2[Object.keys(array2)[index]])
          if (!_tes) {
            index = array1.length + 1 // break off
            tes = false
          }
        }
        break
      default:
        if (element !== array2[Object.keys(array2)[index]]) {
          tes = false
          index = array1.length + 1 // break off
        }
        break
    }
  }
  return tes
}
