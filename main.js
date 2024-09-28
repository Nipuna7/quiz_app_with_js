let min = 0;
let sec = 0;
let qNumber = 1;
let interval = undefined;
let submitDataArray=[];

let dataArray = [];

$('#txt-time').val('00:00');
$('#txt-q-number').val('1/5');

class Answer {
    constructor(id, answer, correctState) {
        this.id = id;
        this.answer = answer;
        this.correctState = correctState;
    }
}

class Question {
    constructor(id, question, answers) {
        this.id = id;
        this.question = question;
        this.answers = answers;

    }
}



let q1 = new Question(1, 'Question 1', [new Answer(1, 'Answer 1', true), new Answer(1, 'Answer 2', false), new Answer(1, 'Answer 3', false)]);
let q2 = new Question(2, 'Question 2', [new Answer(1, 'Answer 1', false), new Answer(1, 'Answer 2', true), new Answer(1, 'Answer 3', false)]);
let q3 = new Question(3, 'Question 3', [new Answer(1, 'Answer 1', false), new Answer(1, 'Answer 2', false), new Answer(1, 'Answer 3', true)]);
let q4 = new Question(4, 'Question 4', [new Answer(1, 'Answer 1', false), new Answer(1, 'Answer 2', true), new Answer(1, 'Answer 3', false)]);
let q5 = new Question(5, 'Question 5', [new Answer(1, 'Answer 1', true), new Answer(1, 'Answer 2', false), new Answer(1, 'Answer 3', false)]);

dataArray.push(q1, q2, q3, q4, q5);

const showAnswers=()=>{
    marks=0;
    for(let x=0;x<submitDataArray.length;x++){
        let selectedQuesion=dataArray[x];
        let selectedAnswer=submitDataArray[x];
        let de=selectedQuesion.answers.find(d=>d.id==selectedAnswer.answer);
        if(de.correctState){
            marks++;
        }
    }
    $('#txt-answer').val('Result :'+marks+'/5');
}

const verifyAnswer = (state) => {
    clearInterval(interval);
    if (state == 'skipped') {
        submitDataArray.push(null);
    } else {
        let answer=$('input[name=answer]:checked').val();
        submitDataArray.push({
            qNumber:qNumber,
            answer:answer,
            time:$('#txt-time').val()
        });
    }
    if (qNumber == 5) {
        qNumber=1;
        $('#txt-q-number').val('1/5');
        $('#txt-time').val('00:00');
        $('#start-button').prop('disabled',false);
        $('#answer-list').empty();
        $('#question').val('');
        showAnswers();
        return;
    }

    qNumber++;
    $('#txt-q-number').val(qNumber + '/5');
    displayQuiz();
}

const displayQuiz = () => {
    sec = 0;

    let selectedQuesion = dataArray[qNumber - 1];

    $('#question').val(selectedQuesion.question);
    $('#answer-list').empty();

    $.each(selectedQuesion.answers, function (index, record) {
        let li = $('<li>');
        let rbtn = $('<input>').attr({
            name: 'answer',
            type: 'radio',
            value: record.id
        })

        let lbl = $('<label>').text(record.answer);
        li.append(rbtn); li.append(lbl);
        $('#answer-list').append(li);
    });

    interval = setInterval(() => {
        if (sec < 10) {
            $('#txt-time').val('0' + sec);
        } else {
            $('#txt-time').val(sec);
        }
        sec++;
        if (sec == 30) {
            verifyAnswer('skipped');
        }

    }, 1000);

}

const start = () => {
    $('#start-button').prop('disabled', true);
    submitDataArray=[];
    displayQuiz();
}