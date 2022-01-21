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
    return (binaryInput.value = '')
  }
}

const convertDecimalToBinary = (e) => {
  let number = e.target.value
  let numbers = []



  do {
    numbers.push(number % 2)

    number = Math.floor(number / 2)
  } while (number >= 1)

  binaryInput.value = numbers.reverse().join('')
}

binaryInput.addEventListener('input', e => convertBinaryToDecimal(e))
decimalInput.addEventListener('input', e => convertDecimalToBinary(e))

binaryInput.removeEventListener('input', convertBinaryToDecimal)
decimalInput.removeEventListener('input', convertDecimalToBinary)
