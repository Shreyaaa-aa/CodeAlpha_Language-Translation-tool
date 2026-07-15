Language-Translation-tool

A simple web-based tool that translates text between languages using a live translation API.

## What it does
- Lets the user type or paste text into a text box.
- Lets the user pick a source language and a target language from dropdown menus.
- Sends the text to a translation API and displays the translated result on screen.
- Includes two optional features: a **Copy** button (copies the translation to clipboard) and a **Listen** button (reads the translation aloud using text-to-speech).

## Files
| File | Purpose |
|------|---------|
| `index.html` | The structure of the page — text box, dropdowns, buttons, output area. |
| `style.css` | Visual styling — colors, spacing, layout, button design. |
| `script.js` | The logic — calls the translation API, displays the result, handles copy/speech. |

## How it works (step by step)
1. The user enters text and selects a "from" and "to" language.
2. Clicking **Translate** triggers `translateText()` in `script.js`.
3. That function sends the text to the **MyMemory Translation API** using the browser's built-in `fetch()` function:
   ```
   https://api.mymemory.translated.net/get?q=<text>&langpair=<source>|<target>
   ```
4. The API processes the text and sends back a JSON response containing the translated text.
5. The script extracts the translation from the response and displays it in the output box.
6. The **Copy** button uses the browser's clipboard API to copy the result.
7. The **Listen** button uses the browser's built-in `SpeechSynthesisUtterance` to read the translation aloud in the target language.

## Why no backend server is needed
The translation API call happens directly from the browser using `fetch()`. The browser talks straight to MyMemory's servers over the internet — there is no need to run a local server, install Node.js, or write backend code. Opening `index.html` in a browser is enough to run the entire application.

## How to run it
1. Make sure `index.html`, `style.css`, and `script.js` are all saved in the **same folder** with these exact names.
2. Double-click `index.html` to open it in a browser.
3. Make sure you're connected to the internet (the translation API call requires it).
4. Enter text, choose languages, and click **Translate**.

## Technologies used
- **HTML5** — page structure
- **CSS3** — styling and layout
- **JavaScript (ES6, async/await, Fetch API)** — API calls and interactivity
- **MyMemory Translation API** — free, no-key-required translation service
- **Web Speech API** (`SpeechSynthesisUtterance`) — built-in browser text-to-speech
- **Clipboard API** (`navigator.clipboard`) — copy-to-clipboard functionality

## Possible future improvements
- Auto-detect the source language instead of requiring manual selection.
- Add a character limit counter.
- Save recent translations to local storage for history.
- Switch to Google Translate API or Microsoft Translator for higher accuracy (requires an API key and, for security, a backend to hide that key).
