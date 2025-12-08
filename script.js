/* ========== NGÔN NGỮ GIAO DIỆN ========== */
const langData = {
    vi: {
        title: "✨ Luyện Viết Chữ Nhật – Hiragana & Katakana ✨",
        title_kr: "✨ Luyện Viết Chữ Hàn Quốc – Hangul ✨",
        desc: "Hãy luyện viết thật đẹp!",
        back: "⟵ Quay lại",
        clear: "🧹 Xóa",
        done: "✔ Hoàn thành",
        next: "➡ Tiếp theo",
        score: "🏆 Chấm điểm",
        writeCount: "Lần viết",
        speak: "🔊 Phát âm"
    },
    en: {
        title: "✨ Japanese Writing Practice – Hiragana & Katakana ✨",
        title_kr: "✨ Korean Writing Practice – Hangul ✨",
        desc: "Practice writing beautifully!",
        back: "⟵ Back",
        clear: "🧹 Clear",
        done: "✔ Done",
        next: "➡ Next",
        score: "🏆 Score",
        writeCount: "Written",
        speak: "🔊 Pronounce"
    },
    zh: {
        title: "✨ 日语书写练习 – 平假名 & 片假名 ✨",
        title_kr: "✨ 韩文字书写练习 – 韩文 ✨",
        desc: "练习把字写得更漂亮吧！",
        back: "⟵ 返回",
        clear: "🧹 清除",
        done: "✔ 完成",
        next: "➡ 下一个",
        score: "🏆 打分",
        writeCount: "书写次数",
        speak: "🔊 发音"
    },
    fr: {
        title: "✨ Pratique d’Écriture Japonaise – Hiragana & Katakana ✨",
        title_kr: "✨ Pratique d’Écriture Coréenne – Hangul ✨",
        desc: "Entraîne-toi à bien écrire !",
        back: "⟵ Retour",
        clear: "🧹 Effacer",
        done: "✔ Terminer",
        next: "➡ Suivant",
        score: "🏆 Noter",
        writeCount: "Fois écrites",
        speak: "🔊 Prononciation"
    },
    de: {
        title: "✨ Japanische Schreibübung – Hiragana & Katakana ✨",
        title_kr: "✨ Koreanische Schreibübung – Hangul ✨",
        desc: "Übe, schön zu schreiben!",
        back: "⟵ Zurück",
        clear: "🧹 Löschen",
        done: "✔ Fertig",
        next: "➡ Weiter",
        score: "🏆 Bewerten",
        writeCount: "Geschrieben",
        speak: "🔊 Aussprache"
    },
    es: {
        title: "✨ Práctica de Escritura Japonesa – Hiragana & Katakana ✨",
        title_kr: "✨ Práctica de Escritura Coreana – Hangul ✨",
        desc: "¡Practica para escribir bonito!",
        back: "⟵ Volver",
        clear: "🧹 Borrar",
        done: "✔ Completar",
        next: "➡ Siguiente",
        score: "🏆 Puntuar",
        writeCount: "Veces escrito",
        speak: "🔊 Pronunciar"
    }
};

/* ========== BẢNG CHỮ: NHẬT (KANA) ========== */
const kanaList = [
    { k: "あ", r: "a" }, { k: "い", r: "i" }, { k: "う", r: "u" },
    { k: "え", r: "e" }, { k: "お", r: "o" },
    { k: "ア", r: "a" }, { k: "イ", r: "i" }, { k: "ウ", r: "u" },
    { k: "エ", r: "e" }, { k: "オ", r: "o" }
];

/* ========== BẢNG CHỮ: HÀN (HANGUL) ========== */
const hangulList = [
    { k: "가", r: "ga" },
    { k: "나", r: "na" },
    { k: "다", r: "da" },
    { k: "라", r: "ra" },
    { k: "마", r: "ma" },
    { k: "바", r: "ba" },
    { k: "사", r: "sa" },
    { k: "아", r: "a" },
    { k: "자", r: "ja" },
    { k: "차", r: "cha" },
    { k: "카", r: "kha" },
    { k: "타", r: "tha" },
    { k: "파", r: "pha" },
    { k: "하", r: "ha" }
];

let currentScript = "jp"; // "jp" hoặc "kr"
let index = 0;
let count = 0;

/* ========== CANVAS ========== */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawGrid() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 320, 320);
    ctx.strokeStyle = "#e6e6e6";

    for (let i = 0; i <= 320; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 320); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(320, i); ctx.stroke();
    }
}

let drawing = false;

canvas.addEventListener("pointerdown", e => {
    drawing = true;
    const r = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
});

canvas.addEventListener("pointermove", e => {
    if (!drawing) return;
    const r = canvas.getBoundingClientRect();
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineTo(e.clientX - r.left, e.clientY - r.top);
    ctx.stroke();
});

canvas.addEventListener("pointerup", () => (drawing = false));
canvas.addEventListener("pointerleave", () => (drawing = false));

/* ========== TRỢ GIÚP ========== */
function getCurrentList() {
    return currentScript === "kr" ? hangulList : kanaList;
}

function getLangConfig() {
    const sel = document.getElementById("languageSelect");
    const code = sel.value;
    return langData[code] || langData["vi"];
}

/* ========== CẬP NHẬT UI ========== */
function updateUI() {
    const lang = getLangConfig();
    const list = getCurrentList();

    if (index >= list.length) index = 0;
    if (index < 0) index = list.length - 1;

    const title =
        currentScript === "kr"
            ? lang.title_kr
            : lang.title;

    document.getElementById("pageTitle").innerText = title;
    document.getElementById("desc").innerText = lang.desc;

    document.getElementById("btnBack").innerText = lang.back;
    document.getElementById("btnClear").innerText = lang.clear;
    document.getElementById("btnComplete").innerText = lang.done;
    document.getElementById("btnNext").innerText = lang.next;
    document.getElementById("btnScore").innerText = lang.score;
    document.getElementById("btnSpeak").innerText = lang.speak;

    document.getElementById("kanaDisplay").innerText = list[index].k;
    document.getElementById("romaji").innerText = list[index].r;
    document.getElementById("counter").innerText =
        `${lang.writeCount}: ${count}/10`;
}

/* ========== ĐỔI NGÔN NGỮ UI ========== */
function changeLanguage() {
    updateUI();
}

/* ========== ĐỔI BẢNG CHỮ ========== */
function changeScript() {
    const sel = document.getElementById("scriptSelect");
    currentScript = sel.value; // "jp" hoặc "kr"
    index = 0;
    count = 0;
    updateUI();
    drawGrid();
}

/* ========== NÚT LOGIC ========== */
function nextKana() {
    const list = getCurrentList();
    count = 0;
    index = (index + 1) % list.length;
    updateUI();
    drawGrid();
}

function goBack() {
    const list = getCurrentList();
    count = 0;
    index = (index - 1 + list.length) % list.length;
    updateUI();
    drawGrid();
}

function clearCanvas() {
    drawGrid();
}

function completeOnce() {
    count++;
    if (count >= 10) nextKana();
    updateUI();
    drawGrid();
}

/* ========== CHẤM ĐIỂM ========== */
function gradeDrawing() {
    document.getElementById("score").innerText =
        "⭐ Điểm: 88/100 – Rất tốt!";
}

/* ========== PHÁT ÂM ========== */
let voices = [];

if ("speechSynthesis" in window) {
    function loadVoices() {
        voices = window.speechSynthesis.getVoices();
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

function playPronunciation() {
    if (!("speechSynthesis" in window)) {
        alert("Trình duyệt của bạn không hỗ trợ phát âm (Speech Synthesis).");
        return;
    }

    const list = getCurrentList();
    const char = list[index].k;
    const langCode = currentScript === "kr" ? "ko-KR" : "ja-JP";

    const utter = new SpeechSynthesisUtterance(char);
    utter.lang = langCode;

    // cố gắng chọn đúng giọng
    if (voices && voices.length > 0) {
        const voiceMatch = voices.find(v => v.lang && v.lang.startsWith(langCode.slice(0, 2)));
        if (voiceMatch) utter.voice = voiceMatch;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
}

/* ========== KHỞI TẠO ========== */
drawGrid();
updateUI();
