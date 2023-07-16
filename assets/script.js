let questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options:
        [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ]
    },
    {
    numb: 2,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
        "eXtensible Markup Language",
        "eXecutable Multiple Language",
        "eXtra Multiprogram Language",
        "eXamine Multiple Language"
        ]
    },
    {
    numb: 3,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
        "Stylish Question Language",
        "Stylesheet Query Language",
        "Statement Question Language",
        "Structured Query Language"
        ]
    },
    {
    numb: 4,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
    options: [
        "Cascada Style Script",
        "Cascading Style Sheets",
        "Casted Script Style",
        "Calculated Scripting Science"
        ]
    },
    {
    numb: 5,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
        "Hypertext Programming",
        "Hypertext Postprocessing",
        "Homosapiens Philosophy",
        "Hypertext Preprocessor"
        ]
    },

];

//da rest of da JS
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_button = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeline = document.querySelector(".header .timeline");
const timeText = document.querySelector(".timer .time_left_text");
const timeCount = document.querySelector(".timer .timer_sec");

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

exit_button.onclick = ()=>{
    info_box.classList.remove("activeInfo")
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    qCounter(1);
    startTimer(60);
    startTimerLine(0);
} 

let timeValue = 60;
let qCount = 0;
let qNumb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick= ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 60;
    qCount = 0;
    qNumb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(qCount);
    qCounter(qNumb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

quit_quiz.onclick = ()=>{
    window.location.reload();
}

const next_btn = document.querySelector("footer .next_btn");
const bottome_question_counter = document.querySelector("footer .total_question")

next_btn.onclick = ()=>{
    if(qCount < questions.length - 1){
        qCount++;
        qNumb++;
        showQuestions(qCount);
        qCounter(qNumb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showQuestions(index){
    const qText = document.querySelector(".qText");

    let qTag = "<span>" + questions[index].numb + "." + questions[index].question + "</span>";
    let option_tag = "<div class='option'><span>" + questions[index].options[0] + "</span></div>"
    + "<div class='option'><span>" + questions[index].options[1] + "</span></div>"
    + "<div class='option'><span>" + questions[index].options[2] + "</span></div>"
    + "<div class='option'><span>" + questions[index].options[3] + "</span></div>";
    qText.innerHTML = qTag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option")

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[qCount].answer;
    const allOptions = option_list.children.length;

    if (userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        console.log("Correct Answer");
        console.log("Your Score = " + userScore);
    }else{
        answer.classList.add("incorrect");
        console.log("Incorrect");
        timeValue = timeValue - 5; //Check this line

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute('option correct')
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children.classList.add("disabled");
    }
    next_btn.classList.add("show");
};

function showResult(){
    info_box.classList.remove("activeInfo");
    quit_quiz.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text")
    let scoreTag = "<span>and congrats! you got <p>" + userScore + "</p> out of <p>" + questions.length + "</p> points!"
    scoreText.innerHTML = scoreTag
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px"; 
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}