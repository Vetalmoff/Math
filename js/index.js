'use strict'

let $containerTask = document.querySelector('.containerTask'),
    $containerConfig = document.querySelector('.containerConfig'),
    $containerResults = document.querySelector('.containerResults'),
    $description = document.querySelector('.description')



configTask.addEventListener('click', (event) => {
    event.preventDefault()

    if ($containerConfig.style.display === "block") {
        $containerConfig.style="display: none"
        configTask.classList.remove('active')


    } else {
        $containerConfig.style="display: block"
        configTask.classList.add('active')
        task.classList.remove('active')
        statistic.classList.remove('active')
        description.classList.remove('active')
        $containerResults.style = "display: none"
        $description.style = "display: none"
        $containerTask.style="display: none"
    }

})



task.addEventListener('click', () => {
    event.preventDefault()

    if ($containerTask.style.display === "block") {
        $containerTask.style = "display: none"
        task.classList.remove('active')

    } else {
        $containerTask.style="display: block"
        task.classList.add('active')
        configTask.classList.remove('active')
        statistic.classList.remove('active')
        description.classList.remove('active')
        $containerResults.style = "display: none"
        $description.style = "display: none"
        $containerConfig.style="display: none"
    }

})


document.querySelector('#description').addEventListener('click', () => {
    event.preventDefault()

    if ($description.style.display === "block") {
        $description.style = "display: none"
        description.classList.remove('active')

    } else {
        $description.style="display: block"
        description.classList.add('active')
        configTask.classList.remove('active')
        statistic.classList.remove('active')
        task.classList.remove('active')
        $containerResults.style = "display: none"
        $containerTask.style = "display: none"
        $containerConfig.style="display: none"

    }
})




exit.addEventListener('click', () => {
    $containerTask.style="display: none"

})


exitConfig.addEventListener('click', (event) => {
    event.preventDefault()
    $containerConfig.style="display: none"
})


exitResult.addEventListener('click', () =>  {
    localStorage.removeItem('statistic')
    correct.innerHTML = 0
    wrong.innerHTML = 0
})


statistic.addEventListener('click', function() {
    event.preventDefault()
    let stat = JSON.parse(localStorage.getItem('statistic')) 

    if (!stat) {
        stat = {
            rightAnswer: 0,
            wrongAnswer: 0
        }
    }
    
    correct.innerHTML = stat.rightAnswer
    wrong.innerHTML = stat.wrongAnswer


    if ($containerResults.style.display === "block") {
        $containerResults.style = "display: none"
        statistic.classList.remove('active')

    } else {
        $containerResults.style="display: block"
        statistic.classList.add('active')
        configTask.classList.remove('active')
        task.classList.remove('active')
        description.classList.remove('active')
        $containerConfig.style="display: none"
        $containerTask.style = "display: none"
        $description.style = "display: none"

    }

    $containerConfig.style="display: none"


    // let statContent = `
    // <p><span>Correct ones</span><div id="correct">${stat.rightAnswer}</div></p>
    // <p><span>Wrong ones</span><div id="wrong">${stat.wrongAnswer}</div></p>
    // `

    // statisticModal.setcontent(statContent)
    // statisticModal.open()

})






const statisticModal = $.modalResult({
    title: 'Statistic',
    closable: true,
    width: '400px',
    footerButtons: [ 
        {text: 'Close',
        type: 'primary',
        handler() {
            statisticModal.close()
            }
        },
        {text: 'Refresh statistic',
        type: 'danger',
        handler() {
            localStorage.removeItem('statistic')
            statisticModal.close()
        }
    }]
})



const exampleModal = $.modalResult({
    title: 'Example',
    closable: true,
    width: '400px',
    footerButtons: [ {
            text: 'Ok',
            type: 'primary',
            data: 1,
            handler() {
                exampleModal.close()
                document.querySelector('#answer').focus()

            }
    }]
})
 

const configModal = $.modalResult({
    title: 'Configuration',
    closable: false,
    width: '400px',
    footerButtons: [ {
            text: 'Ok',
            type: 'primary',
            handler() {
                configModal.close()
                $containerConfig.style="display: none"
                }
        }]
})



function getOptionsMinMax(event) {
    
    event.preventDefault()

    let min = Number(from.value)
    let max = Number(to.value)    
    
    let checkboxes = document.querySelectorAll('.checkbox') 
    let chedboxesChecked = []
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            chedboxesChecked.push(checkboxes[i].value)
        }
    }

    let error = ''

    if (from.value === '') {
        error += 'Choose minimum number <br>'
    } if (to.value === '') {
        error += 'Choose maximum number <br>'
    } if (+from.value > +to.value) {
        error += 'Minimun must bee less then maximum \n'
    } if (chedboxesChecked.length === 0 ) {
        error += 'Choose minimum one operation'
    } 
    if (error.length > 0) {
        warning.innerHTML = error
    } 
    else  {

        warning.innerHTML = ''

        let configuration = {
            min,
            max,
            operations: chedboxesChecked
            }

            let showConfig = `
            <h5>Your configuration :</h5> 
            <p>min = ${configuration.min}</p>
            <p>max = ${configuration.max}</p>
            <p>operations = ${configuration.operations}</p>
            `

        sessionStorage.setItem('configuration', JSON.stringify(configuration))

        configModal.setcontent(showConfig)
        configModal.open()
        }    

        
    return 
}



saveConfig.addEventListener('click', getOptionsMinMax)



function change(x, y) {
    if ( x < y) {
        let c = x
        x = y
        y = c
    }
    return [x, y]
}


function generateExample() {

    let configObj = JSON.parse(sessionStorage.getItem('configuration'))
    let a = Math.floor(configObj.min + Math.random() * (configObj.max + 1 - configObj.min))
    let b = Math.floor(configObj.min + Math.random() * (configObj.max + 1 - configObj.min))
    let signId = Math.floor(Math.random() * configObj.operations.length)
    let sign = configObj.operations[signId]

    switch (sign) {
        case '-' :
          [a, b] = change(a, b)
            break;
        case '/' :
            [a, b] = change(a, b)
            break;
        default:
            break;
    }

    

    let stringExample = `${a} ${sign} ${b} = `

    if (sign ==='/') {
        specification.innerHTML = ' must be 2 decimal prices'
    } else {
        specification.innerHTML = ''
    }

    document.querySelector('#example').innerHTML = stringExample

    let example = {
        a,
        b,
        sign
    }

    sessionStorage.setItem('example', JSON.stringify(example))

    document.querySelector('#answer').focus()

    let $generateEx = document.querySelector('#generateEx')
    $generateEx.setAttribute('disabled','')
    $generateEx.style.display = 'none'
    
}



generateEx.addEventListener('click', generateExample)




checkYourself.addEventListener('click', function() {

    let statistic
    let example = JSON.parse(sessionStorage.getItem('example'))
    let correctAnswer
    let res
    let a = Number(example.a),
        b = Number(example.b)
        
    


    if (JSON.parse(localStorage.getItem('statistic')) !== null) {
        statistic = JSON.parse(localStorage.getItem('statistic'))
    } else {
        statistic = {
            rightAnswer: 0,
            wrongAnswer: 0
        }
    }


    switch (example.sign) {
        case '+' :
            res = a + b
            break;

        case '-' :
            [a, b] = change(a, b)
            res = a - b 
            break;

        case '*' :
            res = a * b
            break;

        case '/' :
            [a, b] = change(a, b)
            if (b === 0) {
                res = 0
            } else {
                res = Number((a / b).toFixed(2))
            } 
                break;
    
        default:
            break;
    }


    if (Number(document.querySelector('#answer').value) === res) {
        statistic.rightAnswer += 1 
        correctAnswer = 'right'
        soundRightAnswer()
    } else {
        statistic.wrongAnswer += 1 
        correctAnswer = 'wrong'
        soundWrongAnswer()
    }


    localStorage.setItem('statistic', JSON.stringify(statistic))


    generateExample()

    document.querySelector('#answer').value = ''

    let $btns = document.querySelectorAll('[data-btn]'),
        arrBtns = Array.from($btns),
        $okBtn = arrBtns.filter( f => f.dataset.btn === '1') 


    exampleModal.setcontent(`<div id="modal-answer" class="${correctAnswer}">
    <p>You are ${correctAnswer} !</p> 
    <p>${a} ${example.sign} ${b} = ${res}</p>
    </div>
    `)
    exampleModal.open()
    document.querySelector('[data-btn]')

})




document.querySelector('#answer').addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        checkYourself.click()
        this.value = ''
    }
})




function soundRightAnswer() {
    let audio = new Audio(); 
    audio.src = '/Users/vitalii/Downloads/line_open.mp3'; 
    audio.play(); 
    }

function soundWrongAnswer() {
    let audio = new Audio(); 
    audio.src = '/Users/vitalii/Downloads/100-k-1-the-same-answer.mp3'; 
    audio.play(); 
    }



