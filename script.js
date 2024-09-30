const typingInput = document.querySelector(".typing-input"),
    contentBox = document.querySelector(".content-box"),
    mistakeTag = contentBox.querySelector(".mistake span b"),
    timeTag = contentBox.querySelector(".time span b"),
    wpmTag = contentBox.querySelector(".wpm span b"),
    cpmTag = contentBox.querySelector(".cpm span b"),
    tryAgainBtn = contentBox.querySelector("button"),
    quoteText = document.querySelector(".quote");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

const paragraphs = [
    "Happiness can be found even in the darkest of times if one only remembers to turn on the light.",
    "It does not do to dwell on dreams and forget to live.",
    "We've all got both light and dark inside us. What matters is the part we choose to act on. That's who we really are.",
    "It is our choices, Harry, that show what we truly are, far more than our abilities.",
    "You think the dead we loved ever truly leave us? You think that we don't recall them more clearly than ever in times of great trouble?",
    "We are only as strong as we are united, as weak as we are divided.",
    "Do not pity the dead, Harry. Pity the living, and above all, those who live without love."
];

function loadParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    quoteText.innerHTML = "";
    paragraphs[randomIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        quoteText.innerHTML += span;
    });
    document.addEventListener("keydown", () => typingInput.focus());
    quoteText.addEventListener("click", () => typingInput.focus());
}

function startTyping() {
    const characters = quoteText.querySelectorAll("span");
    let typedChar = typingInput.value.split("")[charIndex];

    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        typingInput.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    typingInput.value = "";
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
typingInput.addEventListener("input", startTyping);
tryAgainBtn.addEventListener("click", resetGame);
