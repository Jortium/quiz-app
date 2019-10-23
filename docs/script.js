const STORE = [
//Question 1
{
      question: `Who is the Sage of Shadows in Ocarina of Time?`,
            choices: [
                  `Princess Zelda`,
                  `Saria`,
                  `Darunia`,
                  `Impa`],
                  answer: `Impa`,
      },
//Question 2            
{
      question: `What is the fairies name that follows the Hero in Majora’s Mask?`,
            choices: [
                  `Tatl`,
                  `Termina`,
                  `Twinmold`,
                  `Tael`],
                  answer: `Tatl`,
      },
//Question 3            
{
      question: `What is the first Zelda game that the Hero was an adult the whole game?`,
            choices: [
                  `Breath of the Wild`,
                  `Ocarina of Time`,
                  `Twilight Princess`,
                  `Wind Waker`],
                  answer: `Twilight Princess`,
            
      },
//Question 4            
{
      question: `Finish this quote: “Courage need not be remembered, …”`,
            choices: [
                  `for it is never lost.`,
                  `for it is never forgotten.`,
                  `because it is proven.`,
                  `for it is always there.`],
                  answer: `for it is never forgotten.`,
      },
//Question 5      
{
      question: `The Legend of Zelda(NES) is known for being the first video game that…`,
            choices: [
                  `had music.`,
                  `allowed saving.`,
                  `had color.`,
                  `was released on the NES.`],
                  answer: `allowed saving.`,
      },
//Question 6
{
      question: `Who is the main antagonist a majority of The Legend of Zelda series?`,
            choices: [`Ganon`,
                  `Zant`,
                  `Ghirahim`,
                  `Majora`],
                  answer: `Ganon`,
      },
//Question 7      
{
      question: `Which of The Legend of Zelda games was the first to not have the usual main villain?`,
            choices: [`Minish Cap`, `Skyward Sword`, `The Legend of Zelda II`, `Majora’ s Mask`],
                  answer: `The Legend of Zelda II`,
      },
//Question 8
{
      question: `What is the Hero’ s name ?`,
            choices: [
                  `Zelda`,
                  `Link`,
                  `Epona`,
                  `Shiek`
            ],
                  answer: `Link`,
      },
//Question 9
{
      question: `How many hearts do you need in Breath of the Wild to get the Master Sword?`,
            choices: [`13`, `10`, `20`, `15`],
                  answer: `13`,
      },
//Question 10                  
{
      question: `Who develops the Legend of Zelda(series)?`,
            choices: [`Sony`, `Microsoft`, `Sega`, `Nintendo`],
                  answer: `Nintendo`,
      }
    ];

const OUTCOMES = {
      perfect: {
            message: `You are worthy of holding the Master Sword at it's full power!`,
            endImage: `images/fullpowermastersword.png`
      },

      great: {
            message: `You are worthy of holding the Master Sword but it isn't at it's full potential.`,
            endImage: `images/mastersword.png`
      },

      good: {
            message: `You have drawn the Master Sword but it's damaged.  Return it to the pedastal and try again.`,
            endImage: `images/rustedmastersword.png`
      },

      fail: {
            message: `You are not worthy. Here's a stick.`,
            endImage: `images/treebranch.png`
      },
}

let hearts = 10;
let brokenPots = 0;

function startQuest() {
      $('#quizcontainer').on('click', '.startbutton', function (event) {
            $('#quizcontainer').empty();
            $('.potCounter').empty();
            $('.potCounter').html(`<h1><span>Question:<span class ="brokenPots">0</span>/10</span></h1>`);
            $('.brokenPots').text(1);
            $('.heartcontainer').empty();
            generateHearts(hearts);
            $('#quizcontainer').append(generateQuestion());
      });
}

function generateQuestion() {
      if (brokenPots < STORE.length) {
            return generateQuiz(brokenPots);
      } else {
            heartsRemaining();
            $('.brokenPots').text(10);
      }
}

function generateQuiz(questionIndex) {
      let dungeonMaker = $(`<form>
        <fieldset class="choices">
          <legend class="questionText">${STORE[questionIndex].question}</legend><br>
        </fieldset>
      </form>`)

      let fieldFinder = $(dungeonMaker).find('fieldset');

      STORE[questionIndex].choices.forEach(function (choicesValue, choicesIndex) {
            $(`<label class="choices" for="${choicesIndex}">
            <input type="radio" class="select" id="${choicesIndex}" value="${choicesValue}" name="answer" required>
            <span>${choicesValue}</span>
          </label>
          `).appendTo(fieldFinder);
      });
      $(`<br><button type="submit" class="submitButton press">Submit</button >`).appendTo(fieldFinder);
      return dungeonMaker;
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
      updateHearts(true);
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
      updateHearts(false);
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

function generateHearts(number) {
      for (i = 1; i <= number; i++) {
            $('.heartcontainer').append(`<img src=images/full.png class='fullheart'>`);
      }
}

function updateHearts(answer) {
      if (!answer) {
            $(`.fullheart:nth-child(${brokenPots + 1})`).attr("src", "images/empty.png");
            hearts--;
      }
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

function heartsRemaining() {
      const questResult = countHearts();
      $('#quizcontiner').empty();
      $("#quizcontainer").append(`<h1>${questResult.message}</h1>
      <img src=${questResult.endImage} class="ruWorthy">
      <span>You had ${hearts} remaining.</span>
      <button type="submit" class="continueButton press">Continue</button>`);
}

function restartQuest() {
      $('#quizcontainer').on('click', '.continueButton', function (event) {
      $('#quizcontainer').empty();
      $('.heartcontainer').empty();
      hearts = 10;
      brokenPots = 0;
      generateHearts(hearts);
      $('.brokenPots').text(0);      
      $('#quizcontainer').append(generateQuestion());
      });
}

function handledrawSword() {
      startQuest();
      generateQuestion();
      submitChoice();
      nextQuestion();
      restartQuest();
}

$(handledrawSword);