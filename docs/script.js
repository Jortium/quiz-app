const STORE = [
      //Question 1
      {
            question: `Who is the Sage of Shadows in Ocarina of Time?`,
            choices: [
            `Princess Zelda`, 
            `Saria`, 
            `Darunia`, 
            `Impa`
      ],
            answer: `Impa`
      },
      //Question 2
      {
            question: `What is the fairies name that follows the Hero in Majora’s Mask?`,
            choices: [
                  `Tatl`, 
                  `Termina`, 
                  `Twinmold`, 
                  `Tael`
            ],
            answer: `Tatl`
      },
      //Question 3
      {
            question: `What is the first Zelda game that the Hero was an adult the whole game?`,
            choices: [
                  `Breath of the Wild`,
                  `Ocarina of Time`,
                  `Twilight Princess`,
                  `Wind Waker`
            ],
            answer: `Twilight Princess`
      },
      //Question 4
      {
            question: `Finish this quote: “Courage need not be remembered, …”`,
            choices: [
                  `for it is never lost.`,
                  `for it is never forgotten.`,
                  `because it is proven.`,
                  `for it is always there.`
            ],
            answer: `for it is never forgotten.`
      },
      //Question 5
      {
            question: `The Legend of Zelda(NES) is known for being the first video game that…`,
            choices: [
                  `had music.`,
                  `allowed saving.`,
                  `had color.`,
                  `was released on the NES.`
            ],
            answer: `allowed saving.`
      },
      //Question 6
      {
            question: `Who is the main antagonist a majority of The Legend of Zelda series?`,
            choices: [
                  `Ganon`, 
                  `Zant`, 
                  `Ghirahim`, 
                  `Majora`
            ],
            answer: `Ganon`
      },
      //Question 7
      {
            question: `Which of The Legend of Zelda games was the first to not have the usual main villain?`,
            choices: [
                  `Minish Cap`,
                  `Skyward Sword`,
                  `The Legend of Zelda II`,
                  `Majora’ s Mask`
            ],
            answer: `The Legend of Zelda II`
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
            answer: `Link`
      },
      //Question 9
      {
            question: `How many hearts do you need in Breath of the Wild to get the Master Sword?`,
            choices: [
                  `13`, 
                  `10`, 
                  `20`, 
                  `15`
            ],
            answer: `13`
      },
      //Question 10
      {
            question: `Who develops the Legend of Zelda(series)?`,
            choices: [
                  `Sony`, 
                  `Microsoft`, 
                  `Sega`, 
                  `Nintendo`
            ],
            answer: `Nintendo`
      }
];

const OUTCOMES = {
      perfect: {
            message: `You are worthy of holding the Master Sword at it's full power!`,
            endImage: `images/fullpowermastersword.png`,
            altImage: `The Master Sword at it's Full Power`,
            namingClass: `MasterSword`
      },

      great: {
            message: `You are worthy of holding the Master Sword but it isn't at it's full potential.`,
            endImage: `images/mastersword.png`,
            altImage: `The Master Sword`,
            namingClass: `MasterSword`
      },

      good: {
            message: `You have drawn the Master Sword but it's damaged.  Return it to the pedastal and try again.`,
            endImage: `images/rustedmastersword.png`,
            altImage: `Rusted and damaged Master Sword`,
            namingClass: `MasterSword`
      },

      fail: {
            message: `It's dangerous to go alone! Use this and try again.`,
            endImage: `images/firstsword.png`,
            altImage: `Pixelated weak sword`,
            namingClass: `Pixels`
      }
};
//Global variable to fill the number count for below listed variables.
let hearts = 10;
let brokenPots = 0;
//This is just more of a nod to fans as every Zelda game starts at 3 hearts. So more for Zelda fans than actually doing anything.
generateHearts(3);

//Press the start button to begin your quest.
function startQuest() {
      $('#quizcontainer').on('click', '.startbutton', function () {
            initalizeQuest();
      });
}

//Functions to clear the menu  and start the question generating.
function initalizeQuest() {
      $('#quizcontainer').empty();
      $('.potCounter').empty();
      $('.potCounter').append(
            `<h1><span>Question:<span class ="brokenPots">0</span>/10</span></h1>`
      );
      $('.brokenPots').text(1);
      $('.heartcontainer').empty();
      generateHearts(hearts);
      $('#quizcontainer').append(generateQuestion());
}

//Creates the questions unless you have answered them all.
function generateQuestion() {
      if (brokenPots < STORE.length) {
            return generateQuiz(brokenPots);
      } else {
            heartsRemaining();
            $('.brokenPots').text(10);
      }
}

//Creates a home for the questions that will be generated.
function generateQuiz(questionIndex) {
      let dungeonMaker = $(`<form>
        <fieldset class="choices">
          <legend class="questionText">${STORE[questionIndex].question}</legend><br>
        </fieldset>
      </form>`);

      let fieldFinder = $(dungeonMaker).find('fieldset');

      STORE[questionIndex].choices.forEach(function (choicesValue, choicesIndex) {
            $(`<label class="choices" for="${choicesIndex}">
            <input type="radio" class="select" id="${choicesIndex}" value="${choicesValue}" name="answer" required>
            <span>${choicesValue}</span>
          </label>
          `).appendTo(fieldFinder);
      });
      $(
            `<br><button type="submit" class="submitButton press">Submit</button >`
      ).appendTo(fieldFinder);
      return dungeonMaker;
}

//Submit your choice to decide wheather you're right or wrong.
function submitChoice() {
      $('#quizcontainer').on('submit', function () {
            const choice = checkChoice();
            const correct = STORE[brokenPots].answer;
            if (choice === correct) {
                  correctChoice();
            } else {
                  wrongChoice();
            }
      });
}

//Check your decsion.
function checkChoice() {
      const chosen = $('input:checked');
      return chosen.val();
}

//You were correct! You don't take any damage!
function correctChoice() {
      $('#quizcontainer').empty();
      $('#quizcontainer').append(
            `<h3>Correct!</h3>
            <br>
    <button type="button" class="nextButton press">Next</button>`
      );
      updateHearts(true);
}

//Wrong choice. You will lose a heart for that.
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

//Onward to the next question!
function nextQuestion() {
      $('#quizcontainer').on('click', '.nextButton', function () {
            nextDungeon();
      });
}

//The logic to moving on to the next question.
function nextDungeon() {
      $('#quizcontainer').empty();
      updatePotsBroken();
      $('#quizcontainer').append(generateQuestion());
}

//You really like breaking these things huh? (Updates the question counter.)
function updatePotsBroken() {
      brokenPots++;
      $('.brokenPots').text(brokenPots + 1);
}

//Fill your hearts up to 10 to begin your quest.
function generateHearts(number) {
      for (i = 1; i <= number; i++) {
            $('.heartcontainer').append(`<img src=images/full.png class="fullheart" alt='A full heart. Question is right or unanswered.'>`);
      }
}

//If you get a question incorrect you'll take damage which this will remove the heart based on which question you are on.
function updateHearts(answer) {
      if (!answer) {
            $(`.fullheart:nth-child(${brokenPots + 1})`).attr(
                  'src',
                  'images/empty.png'
            ).attr('alt', 'An empty heart. You got a question wrong.')
            hearts--;
      }
}

//Count the total hearts that are full to see how worthy you truly are.
function countHearts() {
      if (hearts === 10) {
            return OUTCOMES.perfect;
      } else if (hearts <= 9 && hearts >= 7) {
            return OUTCOMES.great;
      } else if (hearts <= 6 && hearts >= 3) {
            return OUTCOMES.good;
      } else {
            return OUTCOMES.fail;
      }
}

//With the function above added in here it calculates the reply class image and alt that will be generated.
function heartsRemaining() {
      const questResult = countHearts();
      $('#quizcontiner').empty();
      $('#quizcontainer').append(`<h3>${questResult.message}</h3>
      <img src=${questResult.endImage} class=${questResult.namingClass} alt=${questResult.altImage}>
      <span>You had ${hearts} health remaining.</span>
      <button type="submit" class="continueButton press">Continue</button>`);
}

//If you wish to try again then this will go through the functions and refill everything as well as clear everything up.
function reinitializeQuest() {
      $('#quizcontainer').empty();
      $('.heartcontainer').empty();
      hearts = 10;
      brokenPots = 0;
      generateHearts(hearts);
      $('.brokenPots').text(0);
      $('#quizcontainer').append(generateQuestion());
}

//The event for the above mentioned function.
function restartQuest() {
      $('#quizcontainer').on('click', '.continueButton', function () {
            reinitializeQuest();
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