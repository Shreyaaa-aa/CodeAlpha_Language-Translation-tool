// ===== Element references =====
const sourceLang   = document.getElementById('sourceLang');
const targetLang   = document.getElementById('targetLang');
const inputText    = document.getElementById('inputText');
const translateBtn = document.getElementById('translateBtn');
const outputContainer = document.getElementById('outputContainer');
const outputText   = document.getElementById('outputText');
const statusMsg     = document.getElementById('statusMsg');
const copyBtn       = document.getElementById('copyBtn');
const speakBtn      = document.getElementById('speakBtn');
const swapBtn       = document.getElementById('swapBtn');

// Map of language codes to BCP-47 codes for the speech synthesizer
const speechLangMap = {
  en: 'en-US', hi: 'hi-IN', es: 'es-ES', fr: 'fr-FR', de: 'de-DE',
  ja: 'ja-JP', zh: 'zh-CN', ar: 'ar-SA', ru: 'ru-RU', pt: 'pt-PT'
};

// ===== Step 1: Send text to the Translation API =====
async function translateText(text, sourceCode, targetCode) {
  // MyMemory API endpoint - free, no API key required
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceCode}|${targetCode}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network error: ' + response.status);
  }

  const data = await response.json();

  if (!data.responseData || !data.responseData.translatedText) {
    throw new Error('No translation returned');
  }

  return data.responseData.translatedText;
}

// ===== Step 2: Handle the Translate button click =====
translateBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();
  const src = sourceLang.value;
  const tgt = targetLang.value;

  if (!text) {
    statusMsg.textContent = 'Please enter some text first.';
    return;
  }

  // Show loading state
  translateBtn.disabled = true;
  translateBtn.textContent = 'Translating...';
  statusMsg.textContent = '';
  outputContainer.style.display = 'none';

  try {
    const translated = await translateText(text, src, tgt);

    // Step 3: Display the translated text
    outputText.textContent = translated;
    outputContainer.style.display = 'block';
  } catch (err) {
    statusMsg.textContent = 'Translation failed. Please try again.';
    console.error(err);
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = 'Translate';
  }
});

// ===== Optional: Copy button =====
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(outputText.textContent);
    statusMsg.textContent = 'Copied to clipboard!';
    setTimeout(() => (statusMsg.textContent = ''), 2000);
  } catch (err) {
    statusMsg.textContent = 'Could not copy text.';
  }
});

// ===== Optional: Text-to-speech button =====
speakBtn.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) {
    statusMsg.textContent = 'Text-to-speech not supported in this browser.';
    return;
  }
  const utterance = new SpeechSynthesisUtterance(outputText.textContent);
  utterance.lang = speechLangMap[targetLang.value] || 'en-US';
  window.speechSynthesis.cancel(); // stop any ongoing speech
  window.speechSynthesis.speak(utterance);
});

// ===== Optional: Swap source/target languages =====
swapBtn.addEventListener('click', () => {
  const temp = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = temp;
});