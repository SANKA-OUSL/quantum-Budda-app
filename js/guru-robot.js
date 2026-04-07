// js/guru-robot.js
window.GuruRobot = (function() {
    // භාෂා 11 සඳහා අදාළ Voice සහ Recognition කේත
    const voiceLocales = {
        'en': 'en-US', 'si': 'si-LK', 'hi': 'hi-IN', 
        'ta': 'ta-IN', 'ar': 'ar-SA', 'ur': 'ur-PK', 
        'ko': 'ko-KR', 'ja': 'ja-JP', 'zh': 'zh-CN', 
        'es': 'es-ES', 'fr': 'fr-FR'
    };

    function toggleChat() { 
        const chat = document.getElementById('guru-chat-window');
        chat.classList.toggle('hidden'); 
        if(!chat.classList.contains('hidden')) {
            speak((typeof currentLang !== 'undefined' && currentLang === 'si') ? "මම සූදානම්. ඔබේ ප්‍රශ්නය අසන්න." : "I am listening. Ask your question.");
        }
    }

    function speak(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(text);
        
        // තෝරාගත් භාෂාවට අදාළ කටහඬ ලබාදීම
        utterance.lang = voiceLocales[currentLang] || 'en-US';
        utterance.pitch = 0.5; 
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    }

    function appendMessage(text, isUser = false, id = null) {
        const hist = document.getElementById('guru-history');
        const idAttr = id ? `id="${id}"` : '';
        if (isUser) {
            hist.innerHTML += `<div ${idAttr} class="flex justify-end mt-4"><div class="bg-slate-800 text-white p-3 rounded-xl rounded-tr-none text-sm">${text}</div></div>`;
        } else {
            hist.innerHTML += `<div ${idAttr} class="flex justify-start mt-4"><div class="bg-indigo-900/30 border border-[#b026ff] text-[#00f3ff] p-3 rounded-xl rounded-tl-none max-w-[85%] text-sm shadow-[0_0_15px_rgba(176,38,255,0.3)] whitespace-pre-wrap leading-relaxed">${text}</div></div>`;
        }
        hist.scrollTop = hist.scrollHeight;
    }

    async function processInput(voiceText = null) {
        const inputEl = document.getElementById('guru-input');
        const msg = voiceText || inputEl.value.trim();
        if(!msg) return;
        
        appendMessage(msg, true);
        inputEl.value = ''; 
        
        const m = msg.toLowerCase();

        if(m.includes('setting') || m.includes('සැකසුම්')) {
            if(window.AppCore) AppCore.navigate('settings');
            const reply = (currentLang === 'si') ? "සැකසුම් මෙනුව විවෘත කරන ලදි." : "Opening System Settings.";
            appendMessage(reply); speak(reply); return;
        }

        const loadId = 'load-' + Date.now();
        const loadMsg = (currentLang === 'si') ? "විශ්ලේෂණය කරමින්..." : "Processing matrix...";
        const hist = document.getElementById('guru-history');
        hist.innerHTML += `<div id="${loadId}" class="flex justify-start mt-4"><div class="bg-indigo-900/30 border border-[#b026ff] text-[#00f3ff] p-3 rounded-xl rounded-tl-none max-w-[85%] text-sm shadow-[0_0_15px_rgba(176,38,255,0.3)] animate-pulse"><i class="fas fa-atom fa-spin mr-2"></i> ${loadMsg}</div></div>`;
        hist.scrollTop = hist.scrollHeight;

        try {
            // ඔබගේ සජීවී සර්වර් ලින්ක් එක
            const BACKEND_URL = "https://quantum-backend-qqwc.onrender.com/api/guru-chat"; 
            
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // භාෂාව සර්වර් එකට යැවීම
                body: JSON.stringify({ message: msg, language: currentLang })
            });

            if (!response.ok) throw new Error("Server communication failed");

            const data = await response.json();
            document.getElementById(loadId).remove();

            if (data.error) {
                appendMessage(data.error); speak(data.error); return;
            }

            appendMessage(data.reply);
            const textToSpeak = data.reply.replace(/\*/g, '').replace(/#/g, ''); 
            speak(textToSpeak);

        } catch (error) {
            document.getElementById(loadId).remove();
            appendMessage("Server Connection Error. Backend is offline.");
        }
    }

    function startListening() {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if(!SpeechRec) {
            alert("Voice Recognition is not supported in this browser.");
            return;
        }
        const rec = new SpeechRec();
        
        // මයික් එකට කතා කරන භාෂාව හඳුනා ගැනීම
        rec.lang = voiceLocales[currentLang] || 'en-US';
        
        const btn = document.querySelector('.fa-microphone').parentElement;
        btn.classList.add('animate-pulse', 'border-[#ff0055]'); 

        rec.start();
        if(document.getElementById('guru-chat-window').classList.contains('hidden')) toggleChat();
        
        rec.onresult = (e) => { 
            processInput(e.results[0][0].transcript); 
            btn.classList.remove('animate-pulse', 'border-[#ff0055]');
        };
        rec.onerror = () => { btn.classList.remove('animate-pulse', 'border-[#ff0055]'); }
        rec.onend = () => { btn.classList.remove('animate-pulse', 'border-[#ff0055]'); }
    }

    return { toggleChat, processInput, startListening };
})();