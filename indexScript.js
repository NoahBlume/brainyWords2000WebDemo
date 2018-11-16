var correctOnFirstTry = 0;
var firstTry = true;
var totalNumQuestions = 0;

// Get the modal
var modal = document.getElementById('myModal');
// modal.style.display = "block";
// var correctSound = $("#correct-sound");
// var incorrectSound = $("#incorrect-sound").trigger('play');

$( document ).ready(function() {



    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    // btn.onclick = function() {
    //     modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }





    var green = "#22bc00";
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
        totalNumQuestions = questions.numQuestions;

        SetupQuiz(questions);
        quizReady = true;
    });


    $("#top-left").click(function() {
        if(quizReady == true) {
            if(questions.answerIndex == 0) {
                ResetColors();
                $("#top-left").css('background-color', green);
                // alert("Correct!");
                correctAnswer(questions);
            } else {
                // alert("Wrong Answer");
                $("#top-left").css('background-color', 'red');
                firstTry = false;
                $("#incorrect-sound").trigger('play');
            }
        }
    });

    $("#top-right").click(function() {
        if(quizReady == true) {
            if(questions.answerIndex == 1) {
                ResetColors();
                $("#top-right").css('background-color', green);
                // alert("Correct!");
                correctAnswer(questions);
            } else {
                // alert("Wrong Answer");
                $("#top-right").css('background-color', 'red');
                firstTry = false;
                $("#incorrect-sound").trigger('play');
            }
        }
    });

    $("#bottom-left").click(function() {
        if(quizReady == true) {
            if(questions.answerIndex == 2) {
                ResetColors();
                $("#bottom-left").css('background-color', green);
                // alert("Correct!");
                correctAnswer(questions);
            } else {
                // alert("Wrong Answer");
                $("#bottom-left").css('background-color', 'red');
                firstTry = false;
                $("#incorrect-sound").trigger('play');
            }
        }
    });

    $("#bottom-right").click(function() {
        if(quizReady == true) {
            if(questions.answerIndex == 3) {
                ResetColors();
                $("#bottom-right").css('background-color', green);
                // alert("Correct!");
                correctAnswer(questions);
            } else {
                $("#bottom-right").css('background-color', 'red');
                firstTry = false;
                $("#incorrect-sound").trigger('play');
                // alert("Wrong Answer");
            }
        }
    });


});

function ResetColors() {
    $("#top-left").css('background-color', "");
    $("#top-right").css('background-color', "");
    $("#bottom-left").css('background-color', "");
    $("#bottom-right").css('background-color', "");
}

function QuizComplete(questions) {
    // alert("You finished the quiz!");
    $("#numRight").text(correctOnFirstTry + "/" + totalNumQuestions);
    modal.style.display = "block";
}

function correctAnswer(questions) {
    var correctSound = $("#correct-sound").trigger('play');

    setTimeout(function() {
        if (firstTry) {
            correctOnFirstTry++;
        }
        firstTry = true;
        console.log("correct on first try " + correctOnFirstTry);

        questions.curQuestion++;

        ResetColors();

        if(questions.numQuestions <= questions.curQuestion) {
            QuizComplete(questions);
        } else {
            SetupQuiz(questions);
        }
    }, 500);

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