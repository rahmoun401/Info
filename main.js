const questions = [
    { question: "ما هو عاصمة فرنسا؟", options: ["باريس", "لندن", "مدريد"], answer: "باريس" },
    { question: "كم عدد الكواكب في النظام الشمسي؟", options: ["7", "8", "9"], answer: "8" },
    { question: "من هو مخترع المصباح الكهربائي؟", options: ["إديسون", "تسلا", "فرانكلين"], answer: "إديسون" },
    { question: "ما هو أكبر محيط في العالم؟", options: ["الأطلسي", "الهندي", "الهادي"], answer: "الهادي" },
    { question: "كم عدد قارات العالم؟", options: ["5", "6", "7"], answer: "7" },
    { question: "ما هو الحيوان الذي يلقب بسفينة الصحراء؟", options: ["الجمل", "الحصان", "الفيل"], answer: "الجمل" },
    { question: "ما هو أسرع حيوان على وجه الأرض؟", options: ["الفهد", "الصقر", "الأسد"], answer: "الفهد" },
    { question: "ما هو العنصر الكيميائي الذي يرمز له بالرمز 'O'؟", options: ["أكسجين", "ذهب", "حديد"], answer: "أكسجين" },
    { question: "ما هو الكوكب المعروف بالكوكب الأحمر؟", options: ["المريخ", "الزهرة", "المشتري"], answer: "المريخ" },
    { question: "من هو أول رئيس للولايات المتحدة؟", options: ["لينكولن", "جورج واشنطن", "جيفرسون"], answer: "جورج واشنطن" },
    { question: "ما هو أعلى جبل في العالم؟", options: ["إيفرست", "كينيا", "الألب"], answer: "إيفرست" },
    { question: "ما هو أطول نهر في العالم؟", options: ["الأمازون", "النيل", "اليانغتسي"], answer: "النيل" },
    { question: "أي دولة تشتهر بصنع السوشي؟", options: ["الصين", "اليابان", "كوريا"], answer: "اليابان" },
    { question: "كم عدد أيام الأسبوع؟", options: ["5", "6", "7"], answer: "7" },
    { question: "ما هو لون السماء في يوم صافٍ؟", options: ["أزرق", "أحمر", "أخضر"], answer: "أزرق" },
    { question: "ما هو الحيوان الذي يصدر صوت المواء؟", options: ["القط", "الكلب", "الحصان"], answer: "القط" },
    { question: "ما هو اسم الكوكب الذي نعيش عليه؟", options: ["الأرض", "المريخ", "الزهرة"], answer: "الأرض" },
    { question: "ما هو عدد أصابع اليد الواحدة؟", options: ["4", "5", "6"], answer: "5" },
    { question: "من هو النبي الذي ابتلعه الحوت؟", options: ["يونس", "موسى", "إبراهيم"], answer: "يونس" },
    { question: "ما هي عاصمة مصر؟", options: ["القاهرة", "الرباط", "الخرطوم"], answer: "القاهرة" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let audio = document.getElementById("welcomeAudio");
        let toggleButton = document.getElementById("toggleSound");
        let isMuted = false;
    
        toggleButton.addEventListener("click", function() {
            if (isMuted) {
                audio.play();
                toggleButton.textContent = "🔊 كتم الصوت";
            } else {
                audio.pause();
                toggleButton.textContent = "🔇 تشغيل الصوت";
            }
            isMuted = !isMuted;});



const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-question");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("countdown");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const timerSound = document.getElementById("timer-sound");

function startTimer() {
    let timeLeft = 15;
    timerElement.textContent = timeLeft;
    timerSound.play();
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            wrongSound.play();
            nextQuestion();
        }
    }, 1000);
}

function displayQuestion() {
    clearInterval(timer);
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(option, button));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption, button) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        button.classList.add("correct");
        score++;
        correctSound.play();
    } else {
        button.classList.add("wrong");
        wrongSound.play();
    }
    scoreElement.textContent = `النقاط: ${score}`;
    nextButton.classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        nextButton.classList.add("hidden");
    } else {
        alert(`انتهت المسابقة! حصلت على ${score} نقاط.`);
    }
}

document.getElementById("start-quiz").addEventListener("click", () => {
    document.getElementById("quiz-container").classList.remove("hidden");
    displayQuestion();
});

document.getElementById("next-question").addEventListener("click", nextQuestion);
