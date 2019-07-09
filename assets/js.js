$(document).ready(function () {
    $("#remaining-time").hide();
    $(document).on('click', '#start', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
})

var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',


    questions: {
        q1: 'Who is actually a chef?',
        q2: 'What does Joey love to eat?',
        q3: 'How many times has Ross been divorced?',
        q4: 'How many types of towels does Monica have?',
        q5: "Who stole Monica's thunder after she got engaged?",
        q6: 'Who hates Thanksgiving?',
        q7: "Who thinks they're always the last to find out everything?"
    },
    options: {
        q1: ['Monica', 'Chandler', 'Rachel', 'Ross'],
        q2: ['Fish', 'Apples', 'Oranges', 'Sandwhiches'],
        q3: ['5', '2', '1', '3'],
        q4: ['3', '8', '11', '6'],
        q5: ['Rachel', 'Phoebe', 'Emily', 'Carol'],
        q6: ['Joey', 'Chandler', 'Rachel', 'Ross'],
        q7: ['Ross', 'Phoebe', 'Monica', 'Chandler']
    },
    answers: {
        q1: 'Monica',
        q2: 'Sandwhiches',
        q3: '3',
        q4: '11',
        q5: 'Rachel',
        q6: 'Chandler',
        q7: 'Phoebe'
    },

    startGame: function () {
        console.log("Start Game");
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $("#game").show();

        $("#results").html('');

        $("#timer").text(trivia.timer);

        $("#start").hide();

        $("#remaining-time").show();

        trivia.nextQuestion();
    },

    nextQuestion: function () {

        trivia.timer = 10;
        $("#timer").removeClass('last-seconds')
        $("#timer").text(trivia.timer);

        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionsContent = Object.values(trivia.questions)[trivia.currentSet];
        $("#question").text(questionsContent);

        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        $.each(questionOptions, function (index, key) {
            $("#options").append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },

    timerRunning: function () {
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $("#timer").text(trivia.timer);
            trivia.timer--;
            if (trivia.timer == 4) {
                $("#timer").addClass("last-seconds");
            }
        }

        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $("#results").html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }

        else if (trivia.currentSet === Object.keys(trivia.questions).length) {
            $("#results").html('<h3>Thank you for playing!</h3>' +
                '<p>Correct: ' + trivia.correct + '</p>' +
                '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                '<p>Please play again!</p>');

            $("#game").hide();

            $("#start").show();
        }
    },

    guessChecker: function () {
        var resultId;

        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if ($(this).text() === currentAnswer) {
            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $("#results").html('<h3>Correct Answer!</h3>');
        }

        else {
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $("#results").html("<h3>Better luck next time! " + currentAnswer + " </h3>")
        }
    },

    guessResult: function(){
        trivia.currentSet++;

        $(".option").remove();
        $("#results h3").remove();

        trivia.nextQuestion();
    }
}
