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
            choices:[
                `for it is never lost.`, 
                `for it is never forgotten.`, 
                `because it is proven.`,
                `for it is always there.`],
            answer:`for it is never forgotten.`,
      },
      //Question 5      
      {
            question: `The Legend of Zelda(NES) is known for being the first video game that…`,
            choices:[
                `had music.`,
                `allowed saving.`, 
                `had color.`, 
                `was released on the NES.`],
            answer: `allowed saving.`,
      },
      //Question 6
      {
            question: `Who is the main antagonist a majority of The Legend of Zelda series?`,
            choices:[`Ganon`, 
            `Zant`, 
            `Ghirahim`, 
            `Majora`],
            answer: `Ganon`,
      },
      //Question 7      
      {
            question: `Which of The Legend of Zelda games was the first to not have the usual main villain?`,
            choices:[`Minish Cap`, `Skyward Sword`, `The Legend of Zelda II`, `Majora’ s Mask`],
            answer: `The Legend of Zelda II`,
      },
      //Question 8
      {
            question:`What is the Hero’ s name ?`,
            choices:[
                `Zelda`, 
                `Link`, 
                `Epona`, 
                `Shiek`
            ],
            answer:`Link`,
      },
      //Question 9
      {
            question: `How many hearts do you need in Breath of the Wild to get the Master Sword?`,
            choices:[`13`, `10`, `20`, `15`],
            answer: `13`,
      },
      //Question 10                  
      {
            question: `Who develops the Legend of Zelda(series)?`,
            choices:[`Sony`, `Microsoft`, `Sega`, `Nintendo`],
            answer:`Nintendo`,
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
