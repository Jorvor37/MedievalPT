const questions = [
    {
        question: "Looking at your reflection in the river, you see yourself as:",
        image: "./img/scene1.jpg",
        answers: {
            A: "Someone with ancient runes etched on your skin",
            B: "A person wearing worn armor with a noble bearing",
            C: "Someone with eyes that seem to glow with nature's light",
            D: "A figure crackling with barely contained power"
        },
        roles: {
            A: ["Scholarly Monk", "Runesmith"],
            B: ["Chivalrous Knight", "Shadow Knight"],
            C: ["Beast Warden", "Grove Guardian"],
            D: ["Battle Mage", "Storm Caller"]
        }
    },
    {
        question: "A street vendor's cart tips over. Your instinct is to:",
        image: "./img/scene2.jpg",
        answers: {
            A: "Use strange symbols that appear in your mind",
            B: "Command others to help in an oddly familiar way",
            C: "Whistle, calling nearby animals to help",
            D: "Reach out with an unseen force"
        },
        roles: {
            A: ["Runesmith", "Mystical Hermit"],
            B: ["Wise Queen", "Young Ambitious Prince"],
            C: ["Dragon Speaker", "Beast Warden"],
            D: ["Storm Caller", "Battle Mage"]
        }
    },
    {
        question: "Your hands find a mysterious object in your pocket. It's:",
        image: "./img/scene3.jpg",
        answers: {
            A: "An ancient scroll with familiar writing",
            B: "A royal seal you somehow recognize",
            C: "A charm made of living wood",
            D: "A crystal humming with power"
        },
        roles: {
            A: ["Scholarly Monk", "Divine Oracle"],
            B: ["Chivalrous Knight", "Wise Queen"],
            C: ["Grove Guardian", "Earth Singer"],
            D: ["Battle Mage", "Moon Blade"]
        }
    },
    {
        question: "A child's crying draws you to an alley. You find them with:",
        image: "./img/scene4.jpg",
        answers: {
            A: "A book of spells they can't read",
            B: "A lost guard's badge",
            C: "An injured magical creature",
            D: "Wild magic sparking from their hands"
        },
        roles: {
            A: ["Scholarly Monk", "Hedge Witch"],
            B: ["Shadow Knight", "Chivalrous Knight"],
            C: ["Beast Warden", "Dragon Speaker"],
            D: ["Storm Caller", "Battle Mage"]
        }
    },
    {
        question: "The town bell rings for danger. You feel drawn to:",
        image: "./img/scene5.jpg",
        answers: {
            A: "The library archives",
            B: "The town's defense walls",
            C: "The sacred grove",
            D: "The mage's tower"
        },
        roles: {
            A: ["Runesmith", "Divine Oracle"],
            B: ["Chivalrous Knight", "Shadow Knight"],
            C: ["Grove Guardian", "Earth Singer"],
            D: ["Battle Mage", "Young Ambitious Prince"]
        }
    },
    {
        question: "A mysterious dream shows you holding:",
        image: "./img/scene6.jpg",
        answers: {
            A: "An ancient tome of knowledge",
            B: "A legendary sword of leadership",
            C: "A staff of natural harmony",
            D: "An orb of raw magic"
        },
        roles: {
            A: ["Scholarly Monk", "Mystical Hermit"],
            B: ["Wise Queen", "Moon Blade"],
            C: ["Dragon Speaker", "Beast Warden"],
            D: ["Storm Caller", "Battle Mage"]
        }
    },
    {
        question: "Your body bears a strange mark that looks like:",
        image: "./img/scene7.jpg",
        answers: {
            A: "Flowing script in an ancient language",
            B: "A noble house's crest",
            C: "Intertwined vines and leaves",
            D: "A spiral of magical energy"
        },
        roles: {
            A: ["Scholarly Monk", "Runesmith"],
            B: ["Young Ambitious Prince", "Wise Queen"],
            C: ["Grove Guardian", "Earth Singer"],
            D: ["Battle Mage", "Storm Caller"]
        }
    },
    {
        question: "In the town square, you're drawn to the sound of:",
        image: "./img/scene8.jpg",
        answers: {
            A: "Old tales being told",
            B: "A call for justice",
            C: "Wild creatures singing",
            D: "Magic being wielded"
        },
        roles: {
            A: ["Divine Oracle", "Mystical Hermit"],
            B: ["Chivalrous Knight", "Wise Queen"],
            C: ["Beast Warden", "Dragon Speaker"],
            D: ["Battle Mage", "Moon Blade"]
        }
    }
];

// Role descriptions with focus on identity
const roleDescriptions = {
    "Scholarly Monk": "You are a keeper of ancient knowledge, your past dedicated to preserving the world's mysteries.",
    "Runesmith": "The language of magic flows through your veins, your power written in sacred symbols.",
    "Chivalrous Knight": "Noble blood runs in your veins, marked by an unwavering sense of justice.",
    "Grove Guardian": "Nature whispers its secrets to you, a chosen protector of the wild.",
    "Dragon Speaker": "You bridge the gap between worlds, born with the gift of understanding all beings.",
    "Beast Warden": "Magical creatures recognize you as their guardian and friend.",
    "Battle Mage": "Raw magical power courses through you, shaped by your will in combat.",
    "Young Ambitious Prince": "Leadership comes naturally to you, marked by destiny for greatness.",
    "Storm Caller": "The elements themselves respond to your command.",
    "Earth Singer": "Your voice carries the power to wake the very forces of nature.",
    "Wise Queen": "You bear the burden of leadership with wisdom and compassion.",
    "Mystical Hermit": "Solitude has taught you secrets others have forgotten.",
    "Moon Blade": "Magic and martial prowess blend perfectly in your fighting style.",
    "Shadow Knight": "You protect others from the shadows, unseen but essential.",
    "Divine Oracle": "Visions of past and future guide your steps.",
    "Hedge Witch": "Your magic flows from the earth itself, healing and nurturing."
};

// Scoring system: Each answer adds points to corresponding roles
const calculateRole = (answers) => {
    const scores = {};
    // Initialize scores
    Object.keys(roleDescriptions).forEach(role => scores[role] = 0);
    
    // Count appearances of each role in chosen answers
    answers.forEach(answer => {
        const roles = questions[answer.questionIndex].roles[answer.choice];
        roles.forEach(role => scores[role] += 1);
    });
    
    // Find highest scoring roles
    const maxScore = Math.max(...Object.values(scores));
    const primaryRoles = Object.entries(scores)
        .filter(([_, score]) => score === maxScore)
        .map(([role]) => role);
    
    return primaryRoles;
};

let currentQuestionIndex = 0;
const userAnswers = [];

function loadQuestion(index) {
    const container = document.getElementById('story-container');
    const questionData = questions[index];

    // Clear container
    container.innerHTML = '';

    // Display image
    const imageElement = document.createElement('img');
    imageElement.src = questionData.image;
    imageElement.alt = 'Scene for the question';
    imageElement.style.width = '100%'; // Adjust dimensions as needed
    imageElement.style.borderRadius = '10px';
    container.appendChild(imageElement);

    // Display question
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<h2>${questionData.question}</h2>`;
    container.appendChild(questionElement);

    // Display answers
    const answersElement = document.createElement('div');
    Object.entries(questionData.answers).forEach(([key, answer]) => {
        const button = document.createElement('button');
        button.textContent = `${key}: ${answer}`;
        button.onclick = () => {
            userAnswers[index] = { questionIndex: index, choice: key };
            if (index + 1 < questions.length) {
                loadQuestion(index + 1);
            } else {
                displayResults();
            }
        };
        answersElement.appendChild(button);
    });
    container.appendChild(answersElement);

    // Navigation buttons
    if (index > 0) {
        const backButton = document.createElement('button');
        backButton.textContent = 'Previous';
        backButton.onclick = () => loadQuestion(index - 1);
        container.appendChild(backButton);
    }
}


function displayResults() {
    const container = document.getElementById('story-container');
    container.innerHTML = '<h2>Your Results</h2>';
    
    const roles = calculateRole(userAnswers);
    roles.forEach(role => {
        const roleElement = document.createElement('div');
        roleElement.textContent = `${role}: ${roleDescriptions[role]}`;
        container.appendChild(roleElement);
    });

    // Check if the user got "Scholarly Monk"
    if (roles.includes("Scholarly Monk")) {
        document.body.style.backgroundImage = "url('./img/Scholarly-Monk.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }
}


document.getElementById('start-quiz').addEventListener('click', () => {
    document.getElementById('intro-story').style.display = 'none';
    document.getElementById('story-container').style.display = 'block';
    loadQuestion(0); // Load the first question
});

// Play background music
window.addEventListener('load', () => {
    const music = document.getElementById('background-music');
    music.volume = 0.3; // Set volume to a low, non-intrusive level
    music.play();
});

//Fade out
document.getElementById('start-quiz').addEventListener('click', () => {
    const intro = document.getElementById('intro-story');
    intro.style.animation = 'fadeOut 1s ease-out';
    setTimeout(() => {
        intro.style.display = 'none';
        document.getElementById('story-container').style.display = 'block';
        loadQuestion(0); // Load the first question
    }, 1000); // Matches fadeOut duration
});

// Load the first question
loadQuestion(currentQuestionIndex);

function loadQuestion(index) {
    const container = document.getElementById('story-container');
    const questionData = questions[index];

    container.innerHTML = '';

    const imageElement = document.createElement('img');
    imageElement.src = questionData.image;
    imageElement.alt = 'Scene for the question';
    container.appendChild(imageElement);

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<h2>${questionData.question}</h2>`;
    container.appendChild(questionElement);

    const answersElement = document.createElement('div');
    answersElement.style.display = 'flex';
    answersElement.style.flexDirection = 'column';
    answersElement.style.gap = '15px';
    answersElement.style.alignItems = 'center';

    Object.entries(questionData.answers).forEach(([key, answer]) => {
        const button = document.createElement('button');
        button.textContent = `${key}: ${answer}`;
        button.onclick = () => {
            userAnswers[index] = { questionIndex: index, choice: key };
            if (index + 1 < questions.length) {
                loadQuestion(index + 1);
            } else {
                displayResults();
            }
        };
        answersElement.appendChild(button);
    });

    container.appendChild(answersElement);

    if (index > 0) {
        const backButton = document.createElement('button');
        backButton.textContent = 'Previous';
        backButton.onclick = () => loadQuestion(index - 1);
        answersElement.appendChild(backButton);
    }
}
