// Branching Story Project - The Midnight Meow
// Run with: node script.js

// -------------------------------------------------------
// STORY DATA
// -------------------------------------------------------

const storyNodes = {
  start: {
    id: "start",
    text: "It is almost midnight when a tiny meow interrupts your coding homework. Outside, a scruffy male cat sits on your porch as if he made an appointment. Behind you, your female cat, Queen Mochi, gives him a look that could cancel his reservation. Thunder rumbles. The visitor needs help, but who is he?",
    choices: [
      {
        text: "Set out a snack and inspect your mysterious visitor",
        nextId: "porch-snack",
      },
      {
        text: "Look toward the garden gate where he keeps staring",
        nextId: "garden-gate",
      },
    ],
    isEnding: false,
  },

  "porch-snack": {
    id: "porch-snack",
    text: "The cat eats like a tiny vacuum cleaner, then bumps your hand with his head. You decide to call him Biscuit for now. Beneath his fur is a faded collar. Mochi watches through the closed window, deeply offended that the restaurant has expanded its clientele.",
    choices: [
      {
        text: "Read the faded collar tag",
        nextId: "collar-clue",
      },
      {
        text: "Prepare a separate quiet room before the rain starts",
        nextId: "quiet-room",
      },
    ],
    isEnding: false,
  },

  "garden-gate": {
    id: "garden-gate",
    text: "You shine a flashlight beyond the gate. A trail of painted wooden paw prints leads toward a cottage with a glowing lantern. Biscuit takes two steps toward it, then returns to rub against your ankle. Apparently, you are expected to participate in this investigation.",
    choices: [
      {
        text: "Visit the lantern cottage and ask about the cat",
        nextId: "lantern-cottage",
      },
      {
        text: "Return to your porch and offer him food",
        nextId: "porch-snack",
      },
    ],
    isEnding: false,
  },

  "collar-clue": {
    id: "collar-clue",
    text: "The tag reads 'Bean' above a barely readable phone number. Biscuit looks unconcerned about this identity crisis. Perhaps someone has been searching for him. Rain begins tapping on the porch roof.",
    choices: [
      {
        text: "Call the number to investigate",
        nextId: "owner-call",
      },
      {
        text: "Get him settled separately and continue the search tomorrow",
        nextId: "quiet-room",
      },
    ],
    isEnding: false,
  },

  "quiet-room": {
    id: "quiet-room",
    text: "Biscuit settles into the spare room, safely separated from Mochi. She stations herself outside the closed door as head of household security. The next morning, you begin checking local lost-cat notices. You also arrange a veterinary visit to check for a microchip and discuss his care, including neutering. You still need a longer-term plan.",
    choices: [
      {
        text: "Ask a local rescue to help with the search and placement",
        nextId: "rescue-help",
      },
      {
        text: "Offer to foster him while the search continues",
        nextId: "slow-introductions",
      },
    ],
    isEnding: false,
  },

  "lantern-cottage": {
    id: "lantern-cottage",
    text: "A woman named Nora answers the cottage door. Behind her is a garden full of enclosed cat walkways and tiny hammocks. 'You found our midnight visitor!' she says. Nora runs a rescue sanctuary. She has seen him nearby, and someone recently called asking about a missing cat with a faded collar.",
    choices: [
      {
        text: "Ask Nora to connect you with the person searching",
        nextId: "owner-call",
      },
      {
        text: "Ask Nora to coordinate his care and owner search",
        nextId: "rescue-help",
      },
    ],
    isEnding: false,
  },

  "owner-call": {
    id: "owner-call",
    text: "A woman named Eliza answers. Before you describe the cat, she mentions his white back paw and the crooked heart on his collar. She sends years of matching photos. 'Bean slipped out during our move,' she says, her voice shaking. You arrange a reunion, and he chirps the instant he hears her voice at your door.",
    choices: [
      {
        text: "Welcome Eliza and reunite her with Bean",
        nextId: "ending-reunion",
      },
    ],
    isEnding: false,
  },

  "rescue-help": {
    id: "rescue-help",
    text: "Nora coordinates a microchip check, found-cat notices, and veterinary care. In this path, the leads do not produce a verified owner after the search and required local process. She offers Biscuit a place at her sanctuary and arranges his neutering appointment. You can help him settle there or become his foster with the possibility of adoption.",
    choices: [
      {
        text: "Help Biscuit move into Nora's sanctuary",
        nextId: "ending-sanctuary",
      },
      {
        text: "Foster him and see whether your household can adjust",
        nextId: "slow-introductions",
      },
    ],
    isEnding: false,
  },

  "slow-introductions": {
    id: "slow-introductions",
    text: "Weeks pass. With rescue support, the owner search and required local process are completed without a verified owner. Biscuit receives veterinary care, including neutering, and recovers in his separate space. You follow a gradual introduction plan. Mochi eventually watches him calmly from a distance, but she has not offered him membership in her royal court. Nora leaves the decision with you.",
    choices: [
      {
        text: "Commit to adoption and keep giving both cats time and space",
        nextId: "ending-home",
      },
      {
        text: "Choose the sanctuary as his permanent home",
        nextId: "ending-sanctuary",
      },
    ],
    isEnding: false,
  },

  "ending-reunion": {
    id: "ending-reunion",
    text: "Bean climbs into Eliza's arms like he has been rehearsing this moment. She cries; you pretend the porch light is making your eyes water. Later, she sends a photo of him asleep at home. Mochi reclaims the window. Your visitor already had a human, and you helped him find his way back.",
    choices: [],
    isEnding: true,
    endingTitle: "Someone Was Waiting",
  },

  "ending-sanctuary": {
    id: "ending-sanctuary",
    text: "Biscuit settles into Nora's sanctuary after a careful transition. On your visits, he trots over to greet you, then escorts you to his favorite hammock. At home, Mochi relaxes into her familiar routine. You begin volunteering in the secret cat garden. One midnight meow has opened a whole new part of your world.",
    choices: [],
    isEnding: true,
    endingTitle: "The Secret Cat Garden",
  },

  "ending-home": {
    id: "ending-home",
    text: "You sign Biscuit's adoption papers. Over the following months, the two cats build a peaceful routine with their own spaces. Mochi keeps her favorite window; Biscuit claims the chair beside your coding desk. They are not best friends, but the household works. Every night, he curls up beside you as if this was the plan from the beginning.",
    choices: [],
    isEnding: true,
    endingTitle: "His Chosen Human",
  },
};

// -------------------------------------------------------
// GAME STATE
// -------------------------------------------------------

let currentSceneId = "start";
const visitedScenes = [];

// -------------------------------------------------------
// FOUR GAME FUNCTIONS
// -------------------------------------------------------

// Returns the scene object for the given ID.
function getCurrentScene(sceneId) {
  return storyNodes[sceneId];
}

// Prints the scene and its choices or ending title.
function displayScene(sceneId) {
  const scene = getCurrentScene(sceneId);

  console.log("\n" + "-".repeat(50));
  console.log("Previous scenes visited: " + visitedScenes.length);
  console.log("-".repeat(50));

  console.log("\n" + scene.text + "\n");

  if (scene.isEnding) {
    console.log("-- " + scene.endingTitle + " --");
  } else {
    scene.choices.forEach(function (choice, index) {
      console.log(index + 1 + ". " + choice.text);
    });
  }
}

// Records the current scene and returns the chosen destination.
function makeChoice(sceneId, choiceNumber) {
  const scene = getCurrentScene(sceneId);

  // Subtract 1 because arrays start at index 0.
  const selectedChoice = scene.choices[choiceNumber - 1];

  visitedScenes.push(sceneId);

  return selectedChoice.nextId;
}

// Resets the game to its starting state.
function restartGame() {
  currentSceneId = "start";
  visitedScenes.length = 0;
}

// -------------------------------------------------------
// GAME LOOP - DO NOT MODIFY
// This section handles all console input and output.
// It calls your functions above to run the game.
// -------------------------------------------------------

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runGame() {
  displayScene(currentSceneId);

  const scene = getCurrentScene(currentSceneId);

  if (scene.isEnding) {
    askAfterEnding();
  } else {
    const quitNumber = scene.choices.length + 1;
    console.log(quitNumber + ". Quit");
    askForInput();
  }
}

function askForInput() {
  rl.question("\nEnter your choice: ", function (answer) {
    const choiceNumber = parseInt(answer);
    const scene = getCurrentScene(currentSceneId);
    const quitNumber = scene.choices.length + 1;

    if (isNaN(choiceNumber) || choiceNumber < 1 || choiceNumber > quitNumber) {
      console.log("Please enter a number between 1 and " + quitNumber + ".");
      askForInput();
      return;
    }

    if (choiceNumber === quitNumber) {
      console.log("\nGoodbye.");
      rl.close();
      process.exit(0);
    }

    currentSceneId = makeChoice(currentSceneId, choiceNumber);
    runGame();
  });
}

function askAfterEnding() {
  console.log("\n1. Play Again");
  console.log("2. Quit");

  rl.question("\nEnter your choice: ", function (answer) {
    const choiceNumber = parseInt(answer);

    if (choiceNumber === 1) {
      restartGame();
      runGame();
      return;
    }

    if (choiceNumber === 2) {
      console.log("\nThanks for playing.");
      rl.close();
      process.exit(0);
    }

    console.log("Please enter 1 or 2.");
    askAfterEnding();
  });
}

runGame();
