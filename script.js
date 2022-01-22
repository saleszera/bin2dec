const [binaryField, decimalField] = document.getElementsByClassName('bin2dec-input')
const [binaryInput, decimalInput] = document.getElementsByTagName('input')
const [container] = document.getElementsByClassName('container')

window.onload = function() {
  binaryInput.focus()
}

const showToast = (message) => {  
  const toast = document.createElement('div')
  const error = document.createElement('p')
  toast.className = 'toast'

  const errorText = document.createTextNode(message)
  error.appendChild(errorText)
  toast.appendChild(error)

  container.parentNode.insertBefore(toast, container)

  setTimeout(() => {
    toast.remove()
  }, 2000)
}


const convertBinaryToDecimal = (e) => {
  const binary = e.target.value.split('')

  if(!binary.length) {    
    return (decimalInput.value = '')
  }

  try {    
    const toDecimal = binary.reverse().reduce((acc, curr, index) => {
      if(curr > 1 || curr < 0){        
        throw new Error('Entre apenas com números binários!')        
      }
      const number = (2 ** index) * curr 
  
      return acc + number
    }, 0)
  
    if(toDecimal){
      decimalInput.value = toDecimal
    }   
  } catch (error) {   
    showToast(error.message)
    binaryInput.value = ''
    decimalInput.value = ''
  }
}

const convertDecimalToBinary = (e) => {
  let number = e.target.value
  let numbers = []

  if(Boolean(binaryInput.value) && !number){
    const classes = [...binaryField.classList]

    if(classes.includes('bin2dec-input-focus')){
      binaryField.classList.remove('bin2dec-input-focus')
    }

    return (binaryInput.value = '')
  }

  do {
    numbers.push(number % 2)

    number = Math.floor(number / 2)
  } while (number >= 1)

  binaryInput.value = numbers.reverse().join('')
}

const binaryFocus = (element) => {  
  element.classList.add('bin2dec-input-focus')
}

const removeBinaryFocus = (elementField, elementInput) => {
  const classes = [...elementField.classList]  

  if(!elementInput.value && classes.includes('bin2dec-input-focus')){
    elementField.classList.remove('bin2dec-input-focus')
  }
}

binaryInput.addEventListener('input', e => convertBinaryToDecimal(e))
binaryInput.addEventListener('focus', () => binaryFocus(binaryField))
binaryInput.addEventListener('blur', () => removeBinaryFocus(binaryField, binaryInput))
decimalInput.addEventListener('input', e => convertDecimalToBinary(e))
decimalInput.addEventListener('focus', () => binaryFocus(decimalField))
decimalInput.addEventListener('blur', () => removeBinaryFocus(decimalField, decimalInput))

binaryInput.removeEventListener('input', convertBinaryToDecimal)
binaryInput.removeEventListener('focus', binaryFocus)
binaryInput.removeEventListener('blur', removeBinaryFocus)
decimalInput.removeEventListener('input', convertDecimalToBinary)
decimalInput.removeEventListener('focus', binaryFocus)
decimalInput.removeEventListener('blur', removeBinaryFocus)
