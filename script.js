const submitButton = document.querySelector('.submit-button')

const dayLabel = document.querySelector('.day-label')
const monthLabel = document.querySelector('.month-label')
const yearLabel = document.querySelector('.year-label')

const day = document.querySelector('#day')
const month = document.querySelector('#month')
const year = document.querySelector('#year')

const dayErrorMessage = document.querySelector('.error-message.day')
const monthErrorMessage = document.querySelector('.error-message.month')
const yearErrorMessage = document.querySelector('.error-message.year')

const years = document.querySelector('#years')
const months = document.querySelector('#months')
const days = document.querySelector('#days')



let dayError = '';
let monthError = '';
let yearError = '';


submitButton.addEventListener('click', ()=>{
    removeErrors()

    validateDay(day.value)
    validateMonth(month.value)
    validateYear(year.value)

    if(dayError){
        dayErrorMessage.innerText = dayError;
        day.classList.add('error')
        dayLabel.classList.add('error')
    }
    
    if(monthError){
        monthErrorMessage.innerText = monthError;
        month.classList.add('error')
        monthLabel.classList.add('error')
    }

    if(yearError){
        yearErrorMessage.innerText = yearError;
        year.classList.add('error')
        yearLabel.classList.add('error')
    }

    else if(!dayError&&!monthError&&!isDateValid(day.value, month.value, year.value)){
        dayError = 'Must be a valid date'
        dayErrorMessage.innerText = dayError;
        day.classList.add('error')
        dayLabel.classList.add('error')
        month.classList.add('error')
        monthLabel.classList.add('error')
        year.classList.add('error')
        yearLabel.classList.add('error')
    
    }
    
    else{
        
        const results = getResult(day.value, month.value, year.value)
        years.innerText = results.years;
        months.innerText = results.months;
        days.innerText = results.days;
    }
})


function validateDay(day){
    if(day==''){
        dayError = 'This field is required'
    }else if(day>31||day<1){
        dayError = 'Must be a valid day' 
    }
}


function validateMonth(month){
    if(month==''){
        monthError = 'This field is required'
    }else if(month>12||month<1){
        monthError = 'Must be a valid month' 
    }
}


function validateYear(year){
    const currentYear = new Date().getFullYear()
    if(year==''){
        yearError = 'This field is required'
    }else if(year>currentYear){
        yearError = 'Must be in the past' 
    }
}

function isDateValid(day, month, year){
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === Number(year) && date.getMonth() === Number(month) - 1 && date.getDate() === Number(day);
}

function removeErrors(){
    dayError = '';
    monthError = '';
    yearError = '';
    
    dayErrorMessage.innerText = '';
    monthErrorMessage.innerText = '';
    yearErrorMessage.innerText = '';

    day.classList.remove('error')
    dayLabel.classList.remove('error')

    month.classList.remove('error')
    monthLabel.classList.remove('error')

    year.classList.remove('error')
    yearLabel.classList.remove('error')
}

function getResult(day, month, year) {
    const milliseconds = new Date() - new Date(year, month-1, day);
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const oneMonth = 30 * oneDay; // Approximate number of milliseconds in a month
    const oneYear = 365 * oneDay; // Approximate number of milliseconds in a year
  
    const years = Math.floor(milliseconds / oneYear);
    const months = Math.floor((milliseconds % oneYear) / oneMonth);
    const days = Math.floor(((milliseconds % oneYear) % oneMonth) / oneDay);
    return { years, months, days };
  }