$( document ).ready(function() {

    var questions = {};
    var quizReady = false;
    questions['answerIndex'] = -1;
    questions['numQuestions'] = -1;
    questions['curQuestion'] = 0;

    $.ajaxSetup({
        scriptCharset: "utf-8",
        contentType: "application/json; charset=utf-8"
    });

    $.getJSON("quizQuestions.json", {}, function(json) {
        console.log(json); // this will show the info it in firebug console
        questions['quiz'] = json.quiz;

        questions.numQuestions = questions.quiz.length;

        SetupQuiz(questions);
        quizReady = true;
    });


    $("#top-left").click(function() {
        if(quizReady == true) {
            if(questions.answerIndex == 0) {
                alert("Correct!");
                correctAnswer(questions);
            } else {
                alert("Wrong Answer");
            }
        }
    });

    $("#top-right").click(function() {
        if(quizReady == true) {
            if(questions.answerIndex == 1) {
                alert("Correct!");
                correctAnswer(questions);
            } else {
                alert("Wrong Answer");
            }
        }
    });

    $("#bottom-left").click(function() {
        if(quizReady == true) {
            if(questions.answerIndex == 2) {
                alert("Correct!");
                correctAnswer(questions);
            } else {
                alert("Wrong Answer");
            }
        }
    });

    $("#bottom-right").click(function() {
        if(quizReady == true) {
            if(questions.answerIndex == 3) {
                alert("Correct!");
                correctAnswer(questions);
            } else {
                alert("Wrong Answer");
            }
        }
    });


});

function QuizComplete(questions) {
    alert("You finished the quiz!");
}

function correctAnswer(questions) {
    questions.curQuestion++;


    if(questions.numQuestions <= questions.curQuestion) {
        QuizComplete(questions);
    } else {
        SetupQuiz(questions);
    }

}

function SetupQuiz(questions) {
    var quiz = questions.quiz;
    var curQuestion = questions.curQuestion;
    console.log(questions);
    var allSrcs = [];

    var question = quiz[curQuestion];
    var word = question.word;
    $("#question-word").text(word);

    var correctImage = question.answerSrc;
    var answerIndex = Math.floor((Math.random() * 4));

    $.each(question.incorrectSrc, function(index, value) {
        allSrcs.push(value);
    });

    if(answerIndex == 4) {
        allSrcs.push(correctImage);
    } else {
        allSrcs.splice(answerIndex, 0, correctImage);
    }
    console.log(allSrcs);
    console.log(answerIndex);

    $("#top-left").children(".option-image").attr("src", allSrcs[0]);
    $("#top-right").children(".option-image").attr("src", allSrcs[1]);
    $("#bottom-left").children(".option-image").attr("src", allSrcs[2]);
    $("#bottom-right").children(".option-image").attr("src", allSrcs[3]);

    questions.answerIndex = answerIndex;
}