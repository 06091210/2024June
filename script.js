const quizData = [
  {
    question: "ツバメが低く飛ぶと雨が降る　⚪︎か×か？",
    choices: [
      { text: "⚪︎" },
      { text: "×" },
    ],
    correct: 0,
  },
  {
    question: "カエルがよく鳴くと雨が降る　⚪︎か×か？",
    choices: [
      { text: "⚪︎" },
      { text: "×" },
    ],
    correct: 0,
  },
];

let currentQuiz = quizData; // 全問題をそのまま使用
let currentQuestion = 0;
let score = 0;
const totalQuestions = quizData.length;
document.getElementById("total-questions").textContent = totalQuestions;

// 初期化
function initQuiz() {
  currentQuestion = 0; // 問題番号の初期化
  score = 0; // スコアの初期化
  loadQuestion();
}

// 問題と選択肢を表示
function loadQuestion() {
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("answer-section").style.display = "none";
  document.getElementById("final-result").style.display = "none";

  // 問題番号を表示
  document.getElementById("question-number").textContent = `第 ${
    currentQuestion + 1
  } 問`;

  if (currentQuestion === 0) {
    document.getElementById("解説").innerText = "実は，ツバメが低く飛んでいるときは，雨が近づいている証拠だと言われています．\n雨が近づくと水蒸気が増え，ツバメの餌となる虫たちも湿気で重たくなってしまいます．\nそうして体が重くなって低くしか飛べない虫たちを追いかけるために，ツバメも同じように低く飛ぶそうです．";
  }
  if (currentQuestion === 1) {
    document.getElementById("解説").textContent = "カエルがよく鳴いているとき，それは雨が近づいている証拠かもしれません．カエルは肺呼吸だけでなく，皮膚呼吸もしています．湿気の高い中で皮膚呼吸を行うと，酸素と二酸化炭素の交換であるガス交換がうまく作用することから，よく鳴くようになるそうです．ただ，カエルはメスを呼ぶときや自分の縄張りをアピールするためにも鳴くことがあるので，鳴いているからといって必ずしも雨が降るとは限りません．";
  }

  const questionData = currentQuiz[currentQuestion];

  document.getElementById("question").textContent = questionData.question;
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  // 選択肢に番号を付ける
  questionData.choices.forEach((choice, index) => {
    const choiceDiv = document.createElement("div");
    choiceDiv.classList.add("choice");
    choiceDiv.textContent = `${index + 1}. ${choice.text}`; // 番号付きの選択肢
    choiceDiv.onclick = () => checkAnswer(index, questionData);
    choicesContainer.appendChild(choiceDiv);
  });
}

// 答えを確認
function checkAnswer(selected, questionData) {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("answer-section").style.display = "block";

  const resultText = document.getElementById("answer-result");
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = ""; // クリアして選択肢を再描画

  // 正解・不正解のメッセージ表示
  if (selected === questionData.correct) {
    resultText.innerHTML = "<span class='correct'>正解！</span>";
    score++;
  } else {
    resultText.innerHTML = "<span class='wrong'>不正解です。</span>";
  }

  // 最終問題かどうかのチェック
  if (currentQuestion === currentQuiz.length - 1) {
    document.getElementById("next-question").textContent = "結果を見る";
  } else {
    document.getElementById("next-question").textContent = "次の問題へ";
  }
}

// 次の問題へ
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < currentQuiz.length) {
    loadQuestion();
    document.getElementById("container").scrollIntoView({ behavior: "smooth" }); // containerにスクロール
  } else {
    showResult();
  }
}

// 結果を表示
function showResult() {
  document.getElementById("answer-section").style.display = "none";
  document.getElementById("final-result").style.display = "block";

  const percentage = (score / currentQuiz.length) * 100;
  document.getElementById("score").textContent = `正解数: ${score}/${
    currentQuiz.length
  } (${percentage.toFixed(2)}%)`;
}

// もう一度遊ぶ
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  initQuiz();
}

// クイズ開始
initQuiz();
