/**
 * EN-ZOME (縁初め) Script
 */

/* --- CONFIG --- */
const LS_KEY = 'enzome_completed_v1';

/* --- DATA: Questions --- */
const questions = [
    {
        id: 1,
        text: "Q1. 朝、目覚めた瞬間、最初に意識が向かうのは？",
        options: [
            { id: 'A', text: "今日やるべきことが浮かんでくる" },
            { id: 'B', text: "昨日の出来事や夢の余韻を感じている" },
            { id: 'C', text: "身体の感覚や気分を確かめている" },
            { id: 'D', text: "特に何も考えず、ぼんやりしている" }
        ]
    },
    {
        id: 2,
        text: "Q2. 人混みの中を歩いているとき、あなたは？",
        options: [
            { id: 'A', text: "目的地への最短ルートを探している" },
            { id: 'B', text: "周りの人の雰囲気やエネルギーを感じ取っている" },
            { id: 'C', text: "自分の世界に入り込んで、周囲はほとんど気にならない" },
            { id: 'D', text: "面白そうな店や人を見つけて、つい足を止めてしまう" }
        ]
    },
    {
        id: 3,
        text: "Q3. 大切な決断をする時、最も信じるのは？",
        options: [
            { id: 'A', text: "論理的に考えた結果" },
            { id: 'B', text: "胸の奥から湧き上がる直感" },
            { id: 'C', text: "信頼できる人の助言" },
            { id: 'D', text: "これまでの経験と実績" }
        ]
    },
    {
        id: 4,
        text: "Q4. 夜空に満月を見つけたとき、心に浮かぶのは？",
        options: [
            { id: 'A', text: "月の仕組みや科学的な興味" },
            { id: 'B', text: "何か特別なことが起こりそうな予感" },
            { id: 'C', text: "美しいと感じて、しばらく眺めている" },
            { id: 'D', text: "特に何も感じない、ただの月だ" }
        ]
    },
    {
        id: 5,
        text: "Q5. 予定のない休日、あなたはどう過ごす？",
        options: [
            { id: 'A', text: "やりたかったことをリストアップして実行する" },
            { id: 'B', text: "その日の気分で、流れに任せて過ごす" },
            { id: 'C', text: "一人の時間を大切に、静かに過ごす" },
            { id: 'D', text: "誰かと一緒に過ごしたくなる" }
        ]
    },
    {
        id: 6,
        text: "Q6. 初めて訪れた場所で、懐かしさを感じたことは？",
        options: [
            { id: 'A', text: "ほとんどない、すべてが新鮮に感じる" },
            { id: 'B', text: "よくある、前世で来たことがあるような気がする" },
            { id: 'C', text: "たまにある、デジャヴのような感覚" },
            { id: 'D', text: "理由はわからないが、妙に落ち着く場所がある" }
        ]
    },
    {
        id: 7,
        text: "Q7. 突然、強い感情が湧き上がってきたとき、あなたは？",
        options: [
            { id: 'A', text: "なぜそう感じたのか、原因を分析する" },
            { id: 'B', text: "その感情を味わい、身を委ねる" },
            { id: 'C', text: "落ち着くまで、一人になりたくなる" },
            { id: 'D', text: "誰かに話して、気持ちを整理する" }
        ]
    },
    {
        id: 8,
        text: "Q8. 「運命」という言葉を聞いて、最初に思うのは？",
        options: [
            { id: 'A', text: "自分で切り拓くもの" },
            { id: 'B', text: "見えない力に導かれているもの" },
            { id: 'C', text: "偶然の積み重ねが作るもの" },
            { id: 'D', text: "信じたい気持ちはあるが、半信半疑" }
        ]
    },
    {
        id: 9,
        text: "Q9. 鏡に映る自分を見たとき、感じるのは？",
        options: [
            { id: 'A', text: "今日の体調や表情をチェックする" },
            { id: 'B', text: "魂が宿る器として、不思議な感覚がある" },
            { id: 'C', text: "ただの自分、特別な感情はない" },
            { id: 'D', text: "もう一人の自分と対話しているような気分" }
        ]
    }
];

/* --- STATE --- */
let currentQuestionIndex = 0;
let answers = [];

/* --- DOM ELEMENTS --- */
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');

const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const progressBarEl = document.getElementById('progress-bar');
const currentQNumEl = document.getElementById('current-q-num');

/* --- EVENTS --- */
document.addEventListener('DOMContentLoaded', () => {
    // Check LocalStorage
    if (localStorage.getItem(LS_KEY) === 'true') {
        showResult();
        return;
    }

    if (startBtn) startBtn.addEventListener('click', startQuiz);
});

/* --- FUNCTIONS --- */

function startQuiz() {
    switchScreen(welcomeScreen, quizScreen);
    currentQuestionIndex = 0;
    answers = [];
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];

    // Update progress
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarEl.style.width = `${progressPercent}%`;
    currentQNumEl.textContent = currentQuestionIndex + 1;

    // Animate Text Update
    questionTextEl.style.opacity = 0;
    setTimeout(() => {
        questionTextEl.textContent = q.text;
        questionTextEl.style.opacity = 1;
    }, 200);

    // Render Options
    optionsContainerEl.innerHTML = '';
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-label">${opt.id}.</span> ${opt.text}`;
        btn.onclick = () => selectAnswer(opt.id);
        optionsContainerEl.appendChild(btn);
    });
}

function selectAnswer(choiceId) {
    answers.push(choiceId);

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    // Set LocalStorage
    localStorage.setItem(LS_KEY, 'true');
    showResult();
}

function showResult() {
    // 1. Switch Background
    document.body.classList.add('cosmic-mode');

    // 2. Hide other screens / Show result
    welcomeScreen.classList.remove('active');
    welcomeScreen.style.display = 'none';
    quizScreen.classList.remove('active');
    quizScreen.style.display = 'none';

    resultScreen.classList.remove('hidden');
    resultScreen.style.display = 'flex';
    setTimeout(() => resultScreen.classList.add('active'), 10);

    // 3. Inject Content with Section Boxes
    const resultCard = resultScreen.querySelector('.archetype-card');
    resultCard.innerHTML = `
        <h2 class="archetype-name">満月の守護者</h2>
        <p class="archetype-subtitle">〜 調和と導きの光 〜</p>
        
        <div class="divider-gold"></div>

        <div class="result-text-body">
            <div class="result-section-box">
                <p class="result-paragraph">あなたは数字の <strong>「3」</strong> です。</p>
            </div>

            <div class="result-section-box">
                <h3 class="result-section-title">一、魂の本質</h3>
                <p class="result-paragraph">
                    あなたは満月のように、周囲を優しく照らす存在です。<br>
                    理性と感性、現実と夢、光と影――相反するものを自然に調和させる力を持っています。<br>
                    多くの人が「どちらか一方」を選ぶ中、あなたは「両方」を抱えることができる稀有な魂です。<br>
                    その本質は「3」という数字に現れています。<br>
                    「3」は完成と調和の象徴。<br>
                    始まり（1）と対立（2）を経て、統合（3）へと至る。<br>
                    あなたはその統合を体現する者なのです。<br>
                    満月は欠けることも満ちることもない、完全な姿。<br>
                    あなたもまた、すでに完成された存在として、この世に生まれてきました。
                </p>
            </div>

            <div class="result-section-box">
                <h3 class="result-section-title">二、日常に現れるサイン</h3>
                <ul class="result-list">
                    <li>何気ない風景や人の表情から、深い意味を感じ取ることがある。</li>
                    <li>どちらか一方に偏らず、バランスを取ろうとする。<br>極端な意見には違和感を覚える。</li>
                    <li>満月の夜、なぜか眠れなかったり、逆に深く眠れたりする。<br>月の満ち欠けに敏感。</li>
                    <li>対立している人同士の間に入り、自然と仲裁役になることがある。</li>
                    <li>論理的に考えた後、最後は直感で決める。<br>または直感を論理で確かめる。</li>
                    <li>3という数字、三角形、三つ組になっているものに、なぜか惹かれる。</li>
                </ul>
            </div>

            <div class="result-section-box">
                <h3 class="result-section-title">三、持って生まれた才能</h3>
                <div class="result-definition">
                    <strong>調和を生み出す力：</strong>
                    バラバラなものを一つにまとめ、調和させる天性の才能があります。
                </div>
                <div class="result-definition">
                    <strong>導きの光：</strong>
                    迷っている人を、優しく正しい方向へ導くことができます。<br>
                    押し付けるのではなく、ただそこにいるだけで、相手が自ら答えを見つけられる。
                </div>
                <div class="result-definition">
                    <strong>両面を見る眼：</strong>
                    物事の表と裏、光と影、どちらも同時に見ることができます。<br>
                    だからこそ、偏った判断をせず、公平でいられます。
                </div>
                <div class="result-definition">
                    <strong>完成へと導く力：</strong>
                    未完成なものを完成へ、混沌を秩序へと導く力。<br>
                    「3」の持つ完成のエネルギーが、あなたの中に宿っています。
                </div>
            </div>

            <div class="result-section-box">
                <h3 class="result-section-title">四、気をつけたい罠</h3>
                <div class="result-definition">
                    <strong>完璧主義の沼：</strong>
                    調和を求めるあまり、完璧を目指しすぎて疲れてしまうことがあります。<br>
                    世界はもともと不完全なもの。<br>
                    その不完全さも、愛おしいものだと気づいてください。
                </div>
                <div class="result-definition">
                    <strong>他者への過剰な配慮：</strong>
                    人を照らすことに意識が向きすぎて、自分自身が消耗してしまう危険性があります。<br>
                    満月も欠ける時間が必要なように、あなたも休息が必要です。
                </div>
                <div class="result-definition">
                    <strong>決められない病：</strong>
                    両方の視点が見えるがゆえに、決断に時間がかかることも。<br>
                    時には「不完全でも進む」勇気が必要です。
                </div>
                <div class="result-definition">
                    <strong>孤独感：</strong>
                    誰よりも高い位置から全体を見渡せるあなたは、時に孤独を感じるかもしれません。<br>
                    でも、それはあなたが守護者だから。<br>
                    月はひとつしかないのです。
                </div>
            </div>

            <div class="result-section-box">
                <h3 class="result-section-title">五、縁の引き寄せ方</h3>
                <p class="result-paragraph">あなたが引き寄せるのは、「導きを求める人」と「あなたを守ろうとする人」です。</p>
                <div class="result-definition">
                    <strong>導きを求める人：</strong>
                    人生に迷い、答えを探している人が、自然とあなたのもとへやってきます。<br>
                    あなたの光を求めて、蛾が月明かりに集まるように。
                </div>
                <div class="result-definition">
                    <strong>守ろうとする人：</strong>
                    あなたが他者を照らすように、あなたを守りたいと思う人も現れます。<br>
                    それは恋人かもしれないし、友人かもしれない。<br>
                    あなたが輝き続けられるよう、そっと支えてくれる存在です。
                </div>
                <div class="result-definition">
                    <strong>同じ守護者：</strong>
                    稀に、あなたと同じように「守護者」としての役割を持つ人と出会います。<br>
                    その出会いは運命的で、深い理解と共鳴が生まれます。
                </div>
                <p class="result-paragraph" style="margin-top: 16px;">
                    縁を大切にするコツは、「与えること」と「受け取ること」のバランスです。<br>
                    光を与えるだけでなく、相手からの光も受け取ってください。
                </p>
            </div>

            <div class="result-section-box">
                <h3 class="result-section-title">六、魂が求める方向性</h3>
                <p class="result-paragraph">
                    あなたの魂が求めているのは、「完全なる調和」です。<br>
                    それは外側の調和だけではありません。<br>
                    自分の内側――理性と感情、強さと弱さ、光と影――そのすべてを統合し、ひとつの完全な存在になること。
                </p>
                <p class="result-paragraph">「3」という数字が示すように、あなたの人生には3つの段階があります。</p>
                <ul class="result-list">
                    <li>第一段階（新月）： 自分を知る時期。<br>まだ光は弱く、手探りの時期です。</li>
                    <li>第二段階（半月）： 他者を照らす時期。<br>自分の光を外へ向け、人を導き始めます。</li>
                    <li>第三段階（満月）： 完全なる調和。<br>内と外、自己と他者、すべてが統合された状態です。</li>
                </ul>
                <p class="result-paragraph">今、あなたがどの段階にいるかは、あなた自身が一番よく知っています。<br>焦る必要はありません。<br>満月は必ず訪れます。</p>
            </div>
            
            <div class="result-footer-text">
                あなたは数字の 「3」。<br>
                完成と調和を体現する、満月の守護者。<br>
                あなたの光が、誰かの道を照らしますように。
            </div>
        </div>
    `;
}

function switchScreen(from, to) {
    from.classList.remove('active');
    from.classList.add('hidden');

    // Small delay for smooth feel
    setTimeout(() => {
        from.style.display = 'none'; // Ensure it's gone
        to.classList.remove('hidden');
        to.style.display = 'flex'; // Reset display
        // Force reflow
        void to.offsetWidth;
        to.classList.add('active');
    }, 500);
}
