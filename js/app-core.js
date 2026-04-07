// js/app-core.js
let currentLang = 'en'; 
let navHistory = ['dashboard'];
let currentModIndex = 0;

window.AppCore = {
    init: function() {
        this.buildSidebar();
        this.navigate('dashboard');
        
        const hist = document.getElementById('guru-history');
        if(hist && hist.innerHTML === '') {
            hist.innerHTML = `<div class="flex justify-start"><div class="bg-blue-900/40 border border-[#00f3ff] text-[#00f3ff] p-4 rounded-xl rounded-tl-none max-w-[85%] text-sm shadow-[0_0_15px_rgba(0,243,255,0.3)] leading-relaxed">System Online. Matrix Initialized. Welcome to Quantum Dhamma. I am Guru AI, ready to assist you.</div></div>`;
        }
    },

    navigate: function(view, index = 0) {
        if(navHistory[navHistory.length-1] !== view) navHistory.push(view);
        document.getElementById('btn-back').classList.toggle('hidden', view === 'dashboard');

        const ui = typeof UI_DICT !== 'undefined' ? getTr(UI_DICT, currentLang) : {};

        if(view === 'dashboard') {
            document.getElementById('header-title').innerText = ui.dash || "Dashboard";
            document.getElementById('dynamic-content').innerHTML = `
                <div class="fade-in text-center pt-20 relative min-h-[60vh] flex flex-col items-center justify-center">
                    <i class="fas fa-dharmachakra floating-element float-slow text-[#ffd700] text-9xl" style="top: 10%; left: 15%;"></i>
                    <i class="fas fa-atom floating-element float-med text-[#00f3ff] text-8xl" style="bottom: 10%; right: 20%;"></i>
                    <div class="floating-element spin-slow text-[#b026ff] text-6xl font-bold opacity-20" style="top: 20%; right: 15%;">Ψ</div>
                    <div class="floating-element float-slow text-white text-5xl font-bold opacity-10 title-font" style="bottom: 20%; left: 10%;">E=mc²</div>
                    
                    <i class="fas fa-yin-yang text-8xl text-[#00f3ff] mb-8 relative z-10 shadow-neon rounded-full" style="animation: spin 20s linear infinite;"></i>
                    <h2 class="title-font text-4xl font-bold text-white mb-4 relative z-10">${ui.welcome || 'Welcome to the Matrix'}</h2>
                    <p class="text-slate-400 uppercase tracking-widest text-xs relative z-10">${ui.select || 'Select a module from the sidebar'}</p>
                </div>`;
            if(window.SimulatorEngine) SimulatorEngine.stop();
        } else if(view === 'module') { 
            this.renderModule(index);
        } else if(view === 'library') { 
            this.renderLibrary();
        } else if(view === 'settings') { 
            this.renderSettings(); 
        }
        
        document.getElementById('ui-hub').innerText = ui.hub || "Research Hub";
        document.getElementById('ui-settings').innerText = ui.settings || "Settings";
    },
    
    goBack: function() { 
        if(navHistory.length > 1) { 
            navHistory.pop(); 
            this.navigate(navHistory[navHistory.length-1], currentModIndex); 
        } 
    },

    toggleLangMenu: function(e) {
        if(e) e.stopPropagation();
        const menu = document.getElementById('lang-dropdown');
        if(menu.classList.contains('hidden')) { 
            this.buildLangList(); menu.classList.remove('hidden'); 
        } else { menu.classList.add('hidden'); }
    },
    
    buildLangList: function() {
        const langs = [
            {c:'en', l:'English'}, {c:'si', l:'සිංහල'}, {c:'hi', l:'हिन्दी'}, 
            {c:'ta', l:'தமிழ்'}, {c:'ar', l:'العربية'}, {c:'ur', l:'اردو'}, 
            {c:'ko', l:'한국어'}, {c:'ja', l:'日本語'}, {c:'zh', l:'中文'}, 
            {c:'es', l:'Español'}, {c:'fr', l:'Français'}
        ];
        let html = '';
        langs.forEach(l => { 
            html += `<li class="border-b border-slate-800 last:border-0"><a href="#" onclick="AppCore.changeLang('${l.c}', '${l.l}'); return false;" class="block px-5 py-3 hover:bg-slate-800 hover:text-[#00f3ff] transition text-left w-full">${l.l}</a></li>`; 
        });
        document.getElementById('lang-list').innerHTML = html;
    },

    changeLang: function(lang, labelStr) {
        currentLang = lang; 
        document.getElementById('current-lang-code').innerText = labelStr.substring(0,2).toUpperCase();
        document.getElementById('lang-dropdown').classList.add('hidden');
        
        document.body.className = "bg-theme overflow-hidden transition-colors duration-500"; 
        
        if(lang==='si') document.body.classList.add('font-si');
        if(lang==='ar' || lang==='ur') document.getElementById('content-area').setAttribute('dir', 'rtl');
        else document.getElementById('content-area').setAttribute('dir', 'ltr');

        this.buildSidebar();
        
        const cv = navHistory[navHistory.length-1];
        if(cv === 'module') this.renderModule(currentModIndex); 
        else this.navigate(cv);
    },

    changeFont: function(fontFamily) {
        document.documentElement.style.setProperty('--main-font', fontFamily);
        document.body.style.fontFamily = fontFamily; 
    },

    buildSidebar: function() {
        if(typeof QuantumCurriculum === 'undefined') return;
        const list = document.getElementById('nav-modules'); list.innerHTML = '';
        QuantumCurriculum.forEach((mod, index) => {
            list.innerHTML += `<button onclick="currentModIndex=${index}; AppCore.navigate('module', ${index})" class="w-full text-left px-5 py-4 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-[#00f3ff] transition flex items-center gap-4 group border border-transparent hover:border-[#00f3ff]/30"><div class="btn-icon"><i class="fas ${mod.icon}"></i></div><span class="font-bold text-xs uppercase tracking-widest leading-relaxed">${getTr(mod.title, currentLang)}</span></button>`;
        });
    },

    renderModule: function(index) {
        if(typeof QuantumCurriculum === 'undefined') return;
        const mod = QuantumCurriculum[index]; 
        const ui = typeof UI_DICT !== 'undefined' ? getTr(UI_DICT, currentLang) : {};
        document.getElementById('header-title').innerText = getTr(mod.title, currentLang).split(':')[0];
        
        document.getElementById('dynamic-content').innerHTML = `
            <div class="fade-in">
                <div class="text-center mb-12"><h3 class="title-font text-2xl md:text-3xl font-bold gradient-text uppercase tracking-widest">${getTr(mod.title, currentLang)}</h3></div>
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
                    <div class="glass-panel p-8 rounded-3xl border-t-2 border-[#00f3ff] hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] transition">
                        <h4 class="title-font text-xl font-bold text-[#00f3ff] mb-6 uppercase"><i class="fas fa-microscope mr-2"></i> Quantum Physics</h4>
                        <div class="text-slate-300 mb-8 leading-relaxed text-justify">${getTr(mod.physics, currentLang)}</div>
                        <div class="bg-black/80 p-5 rounded-2xl border border-slate-700 text-center shadow-inner font-mono text-lg text-white selection:bg-[#00f3ff] selection:text-black tracking-widest">${mod.equation}</div>
                    </div>
                    <div class="glass-panel p-8 rounded-3xl border-t-2 border-[#ffd700] hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] transition">
                        <h4 class="title-font text-xl font-bold text-[#ffd700] mb-6 uppercase"><i class="fas fa-dharmachakra mr-2"></i> Theravada & Mahayana</h4>
                        <div class="text-slate-300 mb-8 leading-relaxed text-justify space-y-4">${getTr(mod.dhamma, currentLang)}</div>
                        <div class="bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-2xl italic text-amber-100">${getTr(mod.sutra, currentLang)}</div>
                    </div>
                </div>
                <div class="glass-panel p-8 rounded-3xl border border-[#00f3ff]/30 shadow-neon relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent opacity-50"></div>
                    <h4 class="title-font text-lg font-bold text-white uppercase mb-6 flex items-center"><i class="fas fa-laptop-code text-[#b026ff] mr-3 text-2xl"></i> ${ui.sim || 'Matrix Simulator'} - [ ${mod.simType} ]</h4>
                    <div class="mb-8 border border-slate-800 rounded-xl overflow-hidden shadow-inner"><canvas id="sim-canvas" width="1000" height="400" class="w-full bg-[#050505]"></canvas></div>
                    <div id="sim-controls" class="bg-black/40 p-4 rounded-xl border border-slate-800"></div>
                </div>
            </div>`;
        
        if(window.SimulatorEngine) SimulatorEngine.init(mod.simType, ui);
    },

    renderLibrary: function() {
        if(window.SimulatorEngine) SimulatorEngine.stop();
        const ui = typeof UI_DICT !== 'undefined' ? getTr(UI_DICT, currentLang) : {};
        document.getElementById('header-title').innerText = ui.hub || "Research Library";
        document.getElementById('dynamic-content').innerHTML = `
            <div class="fade-in glass-panel p-16 rounded-3xl text-center border-t-4 border-[#ffd700] shadow-neon">
                <i class="fas fa-book-journal-whills text-6xl text-[#00f3ff] mb-8 float-slow"></i>
                <h3 class="title-font text-3xl font-bold text-white mb-12 uppercase tracking-widest">${ui.hub || 'Global Knowledge Base'}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <a href="https://scholar.google.com/scholar?q=quantum+physics+and+buddhism" target="_blank" class="glass-panel p-6 border border-slate-700 hover:border-[#00f3ff] transition group hover:-translate-y-2"><i class="fas fa-graduation-cap text-4xl text-blue-400 mb-4 group-hover:scale-110 transition"></i><h4 class="text-xs font-bold text-white uppercase mt-2">Google Scholar</h4></a>
                    <a href="https://ocw.mit.edu/courses/physics/" target="_blank" class="glass-panel p-6 border border-slate-700 hover:border-red-500 transition group hover:-translate-y-2"><i class="fas fa-university text-4xl text-red-500 mb-4 group-hover:scale-110 transition"></i><h4 class="text-xs font-bold text-white uppercase mt-2">MIT Courses</h4></a>
                    <a href="https://arxiv.org/archive/quant-ph" target="_blank" class="glass-panel p-6 border border-slate-700 hover:border-green-400 transition group hover:-translate-y-2"><i class="fas fa-file-pdf text-4xl text-green-400 mb-4 group-hover:scale-110 transition"></i><h4 class="text-xs font-bold text-white uppercase mt-2">ArXiv Papers</h4></a>
                    <a href="https://suttacentral.net/" target="_blank" class="glass-panel p-6 border border-slate-700 hover:border-[#ffd700] transition group hover:-translate-y-2"><i class="fas fa-om text-4xl text-amber-500 mb-4 group-hover:scale-110 transition"></i><h4 class="text-xs font-bold text-white uppercase mt-2">SuttaCentral</h4></a>
                    <a href="https://en.wikipedia.org/wiki/Quantum_mechanics" target="_blank" class="glass-panel p-6 border border-slate-700 hover:border-white transition group hover:-translate-y-2"><i class="fab fa-wikipedia-w text-4xl text-white mb-4 group-hover:scale-110 transition"></i><h4 class="text-xs font-bold text-white uppercase mt-2">Wikipedia</h4></a>
                </div>
            </div>`;
    },

    renderSettings: function() {
        if(window.SimulatorEngine) SimulatorEngine.stop();
        const ui = typeof UI_DICT !== 'undefined' ? getTr(UI_DICT, currentLang) : {};

        document.getElementById('header-title').innerText = ui.settings || "Settings";
        document.getElementById('dynamic-content').innerHTML = `
            <div class="fade-in glass-panel p-10 rounded-3xl max-w-2xl mx-auto border-t-2 border-[#b026ff] shadow-neon">
                <h3 class="title-font text-2xl font-bold text-white mb-8 uppercase tracking-widest"><i class="fas fa-sliders-h text-[#b026ff] mr-3"></i> ${ui.settings || 'System Configuration'}</h3>
                
                <div class="space-y-6">
                    <div class="bg-black/50 p-6 rounded-xl border border-slate-700">
                        <label class="text-white font-bold block mb-4 uppercase text-xs tracking-widest"><i class="fas fa-palette mr-2"></i> Neon Accent</label>
                        <select onchange="document.documentElement.style.setProperty('--neon-blue', this.value)" class="w-full bg-slate-900 border border-slate-600 text-white p-3 rounded-lg outline-none cursor-pointer">
                            <option value="#00f3ff">🔵 Cyber Blue</option>
                            <option value="#b026ff">🟣 Quantum Purple</option>
                            <option value="#00ff88">🟢 Matrix Green</option>
                        </select>
                    </div>

                    <div class="bg-black/50 p-6 rounded-xl border border-slate-700 border-t-2 border-t-[#ffd700]">
                        <label class="text-[#ffd700] font-bold block mb-4 uppercase text-xs tracking-widest"><i class="fas fa-font mr-2"></i> Typography / Font Style</label>
                        <select onchange="AppCore.changeFont(this.value)" class="w-full bg-slate-900 border border-slate-600 text-white p-3 rounded-lg outline-none cursor-pointer">
                            <option value="'Space Grotesk', sans-serif">Modern & Tech (Default)</option>
                            <option value="'Noto Sans Sinhala', Arial, sans-serif">Standard Readable (Clear Text)</option>
                            <option value="'Cinzel', serif">Classic Elegant (Serif)</option>
                            <option value="'Comic Sans MS', 'OpenDyslexic', cursive">Dyslexia Friendly (Easy Read)</option>
                        </select>
                    </div>
                </div>
            </div>`;
    }
};

document.addEventListener("DOMContentLoaded", () => { window.AppCore.init(); });
document.addEventListener('click', (e) => {
    const m = document.getElementById('lang-dropdown');
    if(m && !m.classList.contains('hidden') && !e.target.closest('.relative')) m.classList.add('hidden');
});