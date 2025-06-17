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
  {
    question: "6月は旧暦で「水無月」といいますが，これはどういう意味でしょう？",
    choices: [
      { text: "水が無い月" },
      { text: "水の月" },
    ],
    correct: 1,
  },
  {
    question: "6月の月は何と呼ばれている？",
    choices: [
      { text: "ブルームーン" },
      { text: "レイニームーン" },
      { text: "ストロベリームーン" },
      { text: "ハリケーンムーン" },
    ],
    correct: 2,
  },
  {
    question: "明智光秀が織田信長を襲撃したのは何月何日？",
    choices: [
      { text: "6月12日" },
      { text: "6月21日" },
      { text: "6月22日" },
      { text: "6月29日" },
    ],
    correct: 1,
  },
  {
    question: "6月にある祝日は，次のうちどれ？",
    choices: [
      { text: "昭和の日" },
      { text: "憲法記念日" },
      { text: "文化の日" },
      { text: "そもそも祝日はない" },
    ],
    correct: 3,
  },
];
const Explanation = ["実は，ツバメが低く飛んでいるときは，雨が近づいている証拠だと言われています．\n雨が近づくと水蒸気が増え，ツバメの餌となる虫たちも湿気で重たくなってしまいます．\nそうして体が重くなって低くしか飛べない虫たちを追いかけるために，ツバメも同じように低く飛ぶそうです．",
                     "カエルがよく鳴いているとき，それは雨が近づいている証拠かもしれません．\nカエルは肺呼吸だけでなく，皮膚呼吸もしています．\n湿気の高い中で皮膚呼吸を行うと，酸素と二酸化炭素の交換であるガス交換がうまく作用することから，よく鳴くようになるそうです．\nただ，カエルはメスを呼ぶときや自分の縄張りをアピールするためにも鳴くことがあるので，鳴いているからといって必ずしも雨が降るとは限りません．",
                     "実は，この「無」という漢字は「無し」という意味ではなく「の」として扱います．\nそのため，水無月の本当の意味は「水の月」となるのです．\nちょうどこの時期に田んぼに水を張ったりすることからも，このように呼ばれるようになりました．\n6月30日には，旧暦と同じ名前の「水無月」というお菓子を食べると，厄除けができるそうですよ．",
                     "満月には，毎月その月に合わせた別名が付けられています．\nこれは，アメリカの先住民族が季節を感じるために付けたとされており，6月の満月は野いちごの収穫がおこなわれることから「ストロベリームーン」と呼ばれています．\n決して月がイチゴのように赤く見えるから，というわけではありません．",
                     "明智光秀が織田信長を襲撃した「本能寺の変」は，1582年6月21日に起こりました．\nちなみに，\n1.6月12日は，1560年に桶狭間の戦い\n4.6月29日は，1575年に長篠の戦い\nが起こりました．\n有名な戦いの年号は覚えておくと，テストや受験で便利かも．",
                     "内閣府が定める「国民の祝日」によると，6月と12月には祝日となるような記念日や祝い事が存在しません．\nちなみに，\n1.昭和の日は，4月29日\n2.憲法記念日は，5月3日\n3.文化の日は，11月3日\nです．\n祝日はありませんが，1ヶ月頑張っていきましょう！"
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

  document.getElementById("解説").innerText = Explanation[currentQuestion];

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
