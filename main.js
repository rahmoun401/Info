let countdownValue = 15;
let countdownElement = document.getElementById('countdown');
const countdownSound = document.getElementById('countdown-sound');
const startQuizButton = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz-container');
const nextQuestionButton = document.getElementById('next-question');
const welcomeAudio = document.getElementById('welcome-audio');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const finalMessage = document.getElementById('final-message');
const scoreElement = document.getElementById('score');
const soundToggle = document.getElementById('sound-toggle');

let isSoundOn = true;

// قائمة الأسئلة مع الإجابات الصحيحة
const questions = [
    { question: 'ما هو أقوى معدن على وجه الأرض؟', options: ['الماس', 'البلاتين', 'الذهب'], correct: 0 },
    { question: 'من هو أول من سافر إلى الفضاء؟', options: ['يوري غاغارين', 'نيل أرمسترونغ', 'تيد موسبي'], correct: 0 },
    { question: 'ما هو أطول نهر في العالم؟', options: ['أمازون', 'نهر النيل', 'اليانغتسي'], correct: 1 },
    { question: 'ما هي أكبر قارة من حيث المساحة؟', options: ['آسيا', 'أفريقيا', 'أمريكا الشمالية'], correct: 0 },
    { question: 'أي من هذه الدول ليست في الاتحاد الأوروبي؟', options: ['سويسرا', 'ألمانيا', 'فرنسا'], correct: 0 },
    { question: 'ما هو الغاز الأكثر وفرة في الغلاف الجوي للأرض؟', options: ['النيتروجين', 'الأوكسجين', 'الأرغون'], correct: 0 },
    { question: 'من هو مؤسس شركة مايكروسوفت؟', options: ['بيل جيتس', 'ستيف جوبز', 'مارك زوكربيرغ'], correct: 0 },
    { question: 'ما هو أول عنصر في الجدول الدوري؟', options: ['الهيدروجين', 'الهيليوم', 'الليثيوم'], correct: 0 },
    { question: 'في أي سنة حدثت الثورة الفرنسية؟', options: ['1789', '1800', '1776'], correct: 0 },
    { question: 'من هو أول رئيس للولايات المتحدة الأمريكية؟', options: ['جورج واشنطن', 'توماس جيفرسون', 'أبراهام لينكولن'], correct: 0 },
    { question: 'كم عدد الكواكب في المجموعة الشمسية؟', options: ['8', '9', '7'], correct: 0 },
    { question: 'ما هو أكبر محيط في العالم؟', options: ['المحيط الهادئ', 'المحيط الأطلسي', 'المحيط الهندي'], correct: 0 },
    { question: 'ما هو أعلى جبل في العالم؟', options: ['إيفرست', 'كليمنجارو', 'البروس'], correct: 0 },
    { question: 'ما هو الحيوان الذي يُعرف بملك الغابة؟', options: ['الأسد', 'النمر', 'الدب'], correct: 0 },
    { question: 'ما هي عاصمة اليابان؟', options: ['طوكيو', 'أوساكا', 'كيوتو'], correct: 0 },
    { question: 'من هو مكتشف أمريكا؟', options: ['كريستوفر كولومبوس', 'فاسكو دا غاما', 'ماجلان'], correct: 0 },
    { question: 'ما هي العملة الرسمية للولايات المتحدة؟', options: ['الدولار', 'اليورو', 'الجنيه الإسترليني'], correct: 0 },
    { question: 'ما هو العنصر الأساسي في الماء؟', options: ['الهيدروجين', 'الأوكسجين', 'النيتروجين'], correct: 0 },
    { question: 'ما هي اللغة الأكثر انتشارًا في العالم؟', options: ['الإنجليزية', 'الإسبانية', 'الصينية'], correct: 2 },
];

let currentQuestionIndex = 0;
let score = 0;
let countdownInterval;

startQuizButton.addEventListener('click', startQuiz);
soundToggle.addEventListener('click', toggleSound);

function startQuiz() {
    document.getElementById('name-entry-container').classList.add('hidden');
    welcomeAudio.play();

    loadQuestion();
    quizContainer.classList.remove('hidden');
}

function startCountdown() {
    clearInterval(countdownInterval);
    countdownValue = 15;
    countdownElement.textContent = countdownValue;
    countdownInterval = setInterval(() => {
        countdownElement.textContent = countdownValue;
        if (countdownValue === 0) {
            clearInterval(countdownInterval);
            moveToNextQuestion();
        }
        countdownValue--;
    }, 1000);
}

function loadQuestion() {
    startCountdown();

    let question = questions[currentQuestionIndex];
    let questionElement = document.getElementById('question');
    let optionsContainer = document.getElementById('options-container');

    questionElement.textContent = question.question;

    let shuffledOptions = [...question.options];
    let correctAnswer = shuffledOptions.splice(question.correct, 1);
    shuffledOptions.sort(() => Math.random() - 0.5);
    shuffledOptions.splice(Math.floor(Math.random() * 3), 0, correctAnswer[0]);

    optionsContainer.innerHTML = '';
    shuffledOptions.forEach((option, index) => {
        let optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option');
        optionButton.addEventListener('click', function () {
            checkAnswer(option, question.options[question.correct]);
        });
        optionsContainer.appendChild(optionButton);
    });

    nextQuestionButton.classList.add('hidden');
}

function checkAnswer(selectedOption, correctOption) {
    clearInterval(countdownInterval);
    if (selectedOption === correctOption) {
        correctSound.play();
        score++;
    } else {
        wrongSound.play();
    }

    scoreElement.textContent = `النقاط: ${score}`;
    nextQuestionButton.classList.remove('hidden');
}

nextQuestionButton.addEventListener('click', moveToNextQuestion);

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalMessage();
    }
}

function showFinalMessage() {
    finalMessage.classList.remove('hidden');
    finalMessage.textContent = `شكرًا لمشاركتك! نقاطك: ${score}`;
    quizContainer.classList.add('hidden');
}

function toggleSound() {
    isSoundOn = !isSoundOn;
    soundToggle.textContent = isSoundOn ? '🔊' : '🔇';

    [welcomeAudio, correctSound, wrongSound, countdownSound].forEach(audio => {
        audio.muted = !isSoundOn;
    });
}
