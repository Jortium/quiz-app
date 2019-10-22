let hearts = 10;
let brokenPots = 0;

function startQuest() {
      $('#quizcontainer').on('click', '.startbutton', function (event) {
            $('#quizcontainer').empty();
            $('.potCounter').empty();
            $('.potCounter').html(`<h3><li>Question:<span class ="brokenPots">0</span>/10</li></h3>`);
            $('.brokenPots').text(1);
            $('.heartcontainer').empty();
            generateHearts();
            $('#quizcontainer').append(generateQuestion());
      });
}

function generateQuestion() {
      if (brokenPots < STORE.length) {
            return generateQuiz(brokenPots);
      } else {
            $('#quizcontiner').empty();
            heartsRemaining();
            $('.brokenPots').text(10);
      }
}

function generateQuiz(questionIndex) {
      let formMaker = $(`<form>
        <fieldset class="choices">
          <legend class="questionText">${STORE[questionIndex].question}</legend><br>
        </fieldset>
      </form>`)

      let fieldSelector = $(formMaker).find('fieldset');

      STORE[questionIndex].choices.forEach(function (choicesValue, choicesIndex) {
            $(`<label class="choices" for="${choicesIndex}">
            <input type="radio" class="select" id="${choicesIndex}" value="${choicesValue}" name="answer" required>
            <span>${choicesValue}</span>
          </label>
          `).appendTo(fieldSelector);
      });
      $(`<br><button type="submit" class="submitButton press">Submit</button >`).appendTo(fieldSelector);
      return formMaker;
}

function submitChoice() {
      $('#quizcontainer').on('submit', function (event) {
            const chosen = $('input:checked');
            const choice = chosen.val();
            const correct = STORE[brokenPots].answer;
            if (choice === correct) {
                  correctChoice();
            } else {
                  wrongChoice();
            }
      });
}

function correctChoice() {
      $('#quizcontainer').empty();
      $('#quizcontainer').append(
            `<h3>Correct!</h3>
            <br>
    <button type="button" class="nextButton press">Next</button>`
      )
}

function wrongChoice() {
      $('#quizcontainer').empty();
      $('#quizcontainer').append(
            `<h3>You took some damage.</h3>
      <span class="next">Correct Answer is:</span>
      <span class="next">${STORE[brokenPots].answer}</span>
      <br>
      <button type="button" class="nextButton press">Next</button>`
      );
      updateHearts();
}

function nextQuestion() {
      $('#quizcontainer').on('click', '.nextButton', function (event) {
            $('#quizcontainer').empty();
            updatePotsBroken();
            $('#quizcontainer').append(generateQuestion());
      });
}

function updatePotsBroken() {
      brokenPots++;
      $('.brokenPots').text(brokenPots + 1);
}

function generateHearts() {
      if (hearts < 10) {
            for (i = 1; i <= hearts; i++) {
                  $('.heartcontainer').append(`<img class='full' src="images/full.png">`);
            }

function updateHearts() {
      hearts--;
      $('.hearts').slice('.full').append(`<img src = 'images/empty.png'>`);
}

function heartsRemaining() {
      const questResult = countHearts();
      return (`<h1>${questResult.message}</h1>`)
}

function countHearts() {
      if (hearts === 10) {
            return OUTCOMES.perfect;
      } else if (hearts < 9 && hearts >= 7) {
            return OUTCOMES.great;
      } else if (hearts < 6 && hearts >= 3) {
            return OUTCOMES.good;
      } else {
            return OUTCOMES.fail;
      }
}

function restartQuest() {
      hearts = 10;
      brokenPots = 0;
      $('.hearts')
      $('.brokenPots').text(0);
}

function handledrawSword() {
      startQuest();
      generateQuestion();
      submitChoice();
      nextQuestion();
      restartQuest();
}

$(handledrawSword);