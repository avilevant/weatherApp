console.log('check')


const formInput = document.querySelector('form')
const locationInput = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

formInput.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = locationInput.value
    message1.textContent = "Searching..."
    message2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = (data.error)
            } else {
                message1.textContent = (data.location)
                message2.textContent = (data.forecast)
            }
        })
    })

})