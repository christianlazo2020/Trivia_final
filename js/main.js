// Question
// UI
// Category
// Result
//
// import { name, name2 } from './Question.js'
// import Result from './Result.js';
// const result = new Result();



options();

function Update() {
    getQuestions();
}

function getQuestions() {
    const questionNumbers = document.getElementById('question-numbers').value;
    const typeCategory = document.getElementById('select-category').value;
    const selectDifficulty = document.getElementById('difficulty').value;
    const selectType = document.getElementById('type').value;

    if (questionNumbers <= 0) {
        alert("No se han seleccionado la cantidad de preguntas");
    } else {
        fetch(`https://opentdb.com/api.php?amount=${questionNumbers}&category=${typeCategory}&difficulty=${selectDifficulty}&type=${selectType}`)
            .then(response => response.json())
            .then(data => printCards(data.results));
    }

}

function options() {
    const cant = document.getElementById('question-numbers');

    cant.innerHTML = '';

    for (let i = 0; i <= 20; i++) {
        const row = `<option value="${i}">${i}</option>`;
        cant.innerHTML += row;
    }

}

function printCards(element) {
    const container = document.getElementById('container-card');
    container.innerHTML = '';
    let cont = 0;
    element.forEach((x) => {
        const row = cardHTML(x, cont);
        container.innerHTML += row;
        cont++;
    });

}

function cardHTML(ques, cont) {
    const card = `<div class="form-group">
                    <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${ques.category}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${ques.question}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">${ques.difficulty}</h6>
                    ${answeres(ques.correct_answer, ques.incorrect_answers, cont)}
                    </div>
                    </div>
    </div>`;

    return card;
}

function answeres(correct, incorrects, cont) {
    const ram = random();

    incorrects.splice(ram, 0, correct);

    var incorrecRBTN = '';

    incorrects.forEach((x, index) => {
        if (index === ram) {
            incorrecRBTN += `<div class="form-check">
            <input class="form-check-input" type="radio" name="question${JSON.stringify(cont)}" id="id${JSON.stringify(cont) + JSON.stringify(index)}" value = true required>
            <label class="form-check-label" for="id${JSON.stringify(cont) + JSON.stringify(index)}">
            ${x}
            </label>
            </div>`;
        } else {
            incorrecRBTN += `<div class="form-check">
            <input class="form-check-input" type="radio" name="question${JSON.stringify(cont)}" id="id${JSON.stringify(cont) + JSON.stringify(index)}" value = false>
            <label class="form-check-label" for="id${JSON.stringify(cont) + JSON.stringify(index)}">
            ${x}
            </label>
            </div>`;
        }
    });

    console.log(incorrecRBTN);
    return incorrecRBTN;
}

function random() {
    return Math.floor(Math.random() * (4 - 1)) + 0;
}


function Verifity() {
    event.preventDefault();

    const tipos = document.getElementById('type').value;
    const cant = document.getElementById('question-numbers').value;
    let ok = 0;
    let bad = 0;

    if (cant === '0') {

    } else {
        if (tipos === 'multiple') {

            for (let i = 0; i < cant; i++) {

                for (let j = 0; j < 4; j++) {
                    let text = 'id' + JSON.stringify(i) + JSON.stringify(j);
                    const searh = document.getElementById(text);

                    if (searh.checked === true && searh.value === 'true') {
                        ok++;
                        break;
                    }
                    else if (searh.checked === true) {
                        bad++;
                        break;
                    }
                }
            }

        } else if (tipos === 'boolean') {

            for (let i = 0; i < cant; i++) {

                for (let j = 0; j < 2; j++) {
                    let text = 'id' + JSON.stringify(i) + JSON.stringify(j);
                    const searh = document.getElementById(text);

                    if (searh.checked === true && searh.value === 'true') {
                        ok++;
                        break;
                    }
                    else if (searh.checked === true) {
                        bad++;
                        break;
                    }
                }
            }
        }

        localStorage.setItem("ok", JSON.stringify(ok));
        localStorage.setItem("bad", JSON.stringify(bad));

        window.location.href = './resp.html';
    }


}
