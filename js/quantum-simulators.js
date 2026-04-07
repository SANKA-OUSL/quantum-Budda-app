// js/quantum-simulators.js
window.SimulatorEngine = (function() {
    let animId;
    let simState = {};

    function stop() {
        if(animId) cancelAnimationFrame(animId);
        simState = {};
    }

    function init(type, uiDict) {
        stop();
        const canvas = document.getElementById('sim-canvas');
        if(!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        const controls = document.getElementById('sim-controls');
        simState.time = 0;

        // 1. WAVE PACKET (Foundations)
        if (type === 'WAVE_PACKET') {
            simState.waves = 5;
            controls.innerHTML = `<input type="range" min="1" max="50" value="5" class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" oninput="window.SimulatorEngine.update('waves', this.value)"><p class="text-center text-[#00f3ff] text-xs mt-2 uppercase tracking-widest">Adjust Superposition States</p>`;
            function drawWavePacket() {
                ctx.fillStyle = '#050505'; ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.beginPath(); ctx.moveTo(0, canvas.height/2); ctx.lineTo(canvas.width, canvas.height/2); ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.stroke();
                
                let N = parseInt(simState.waves);
                let amp = 120 / Math.sqrt(N);
                ctx.beginPath();
                for(let x=0; x<canvas.width; x+=2) { 
                    let ySum=0;
                    for(let i=0; i<N; i++) {
                        let k = 0.05 + (i - N/2)*0.005;
                        ySum += Math.cos(k*x - simState.time*k*10);
                    }
                    let y = canvas.height/2 - (ySum * amp);
                    if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
                }
                ctx.strokeStyle = N > 15 ? "#00ff88" : "#00f3ff"; ctx.lineWidth = 2; ctx.stroke();
                simState.time += 0.2; animId = requestAnimationFrame(drawWavePacket);
            }
            drawWavePacket();

        // 2. DOUBLE SLIT (Principles)
        } else if (type === 'DOUBLE_SLIT') {
            simState.obs = false;
            controls.innerHTML = `<div class="flex gap-4"><button onclick="window.SimulatorEngine.update('obs', true)" class="flex-1 py-2 bg-[#ffd700] text-black font-bold rounded hover:scale-105 transition">${uiDict.obs || 'Observe'}</button><button onclick="window.SimulatorEngine.update('obs', false)" class="flex-1 py-2 bg-[#00f3ff] text-black font-bold rounded hover:scale-105 transition">${uiDict.res || 'Wave'}</button></div>`;
            let particles = [];
            for(let i=0; i<150; i++) particles.push({x: Math.random()*canvas.width, y: canvas.height/2+(Math.random()-0.5)*20});
            
            function drawDoubleSlit() {
                ctx.fillStyle = 'rgba(5,5,5,0.3)'; ctx.fillRect(0,0,canvas.width,canvas.height);
                const obs = simState.obs;
                
                ctx.fillStyle = '#1e293b'; ctx.fillRect(300,0,20,canvas.height);
                let s1 = canvas.height/2-50, s2 = canvas.height/2+50;
                ctx.clearRect(300, s1-20, 20, 40); ctx.clearRect(300, s2-20, 20, 40);
                if(obs) { ctx.fillStyle = '#ffd700'; ctx.font = "24px Arial"; ctx.fillText("👁️", 260, s1+8); ctx.fillText("👁️", 260, s2+8); }
                
                if(!obs) {
                    for(let r=0; r<canvas.width; r+=20) {
                        let wave = r - simState.time*30;
                        if(wave>0 && wave<800) {
                            ctx.beginPath(); ctx.arc(320, s1, wave, -Math.PI/2, Math.PI/2); ctx.strokeStyle = `rgba(0, 243, 255, ${Math.max(0, 0.1 - wave/2000)})`; ctx.stroke();
                            ctx.beginPath(); ctx.arc(320, s2, wave, -Math.PI/2, Math.PI/2); ctx.stroke();
                        }
                    }
                }
                
                ctx.fillStyle = obs ? '#ffd700' : '#00f3ff';
                particles.forEach(p => {
                    p.x += 4; if(p.x>canvas.width) { p.x=0; p.y=canvas.height/2+(Math.random()-0.5)*20; }
                    let dy = p.y;
                    if(p.x > 320) {
                        if(!obs) { dy = p.y + Math.sin((p.y-canvas.height/2)*0.08) * Math.cos(p.x*0.04)*80; } 
                        else { dy = p.y > canvas.height/2 ? s2+(Math.random()-0.5)*20 : s1+(Math.random()-0.5)*20; }
                    }
                    ctx.beginPath(); ctx.arc(p.x, dy, 2, 0, Math.PI*2); ctx.fill();
                });
                simState.time += 0.1; animId = requestAnimationFrame(drawDoubleSlit);
            }
            drawDoubleSlit();

        // 3. SCHRODINGER WELL (Math Framework)
        } else if (type === 'SCHRODINGER') {
             controls.innerHTML = `<p class="text-[#b026ff] text-center font-bold uppercase">Probability Density Plot |Ψ|²</p>`;
             function drawWell() {
                ctx.fillStyle = '#050505'; ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.beginPath(); ctx.moveTo(0, canvas.height/2); ctx.lineTo(canvas.width, canvas.height/2); ctx.strokeStyle="rgba(255,255,255,0.2)"; ctx.stroke();
                
                ctx.beginPath();
                for(let x=0; x<canvas.width; x+=3) {
                    let dx = (x - canvas.width/2) * 0.015;
                    // Ground state harmonic oscillator
                    let psiSq = Math.exp(-dx*dx) * (1 + 0.5*Math.cos(dx * 4 - simState.time));
                    let y = canvas.height/2 - (psiSq * 120);
                    if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
                }
                ctx.strokeStyle = "#b026ff"; ctx.lineWidth = 3; ctx.stroke();
                
                ctx.beginPath(); ctx.moveTo(canvas.width/2-150, 20); ctx.lineTo(canvas.width/2-150, canvas.height-20); ctx.strokeStyle="#00f3ff"; ctx.lineWidth=1; ctx.stroke();
                ctx.beginPath(); ctx.moveTo(canvas.width/2+150, 20); ctx.lineTo(canvas.width/2+150, canvas.height-20); ctx.stroke();

                simState.time += 0.1; animId = requestAnimationFrame(drawWell);
             }
             drawWell();

        // 4. SPIN & ORBITALS (Atomic)
        } else if (type === 'SPIN_ORBITALS') {
            controls.innerHTML = `<p class="text-[#00ff88] text-center font-bold uppercase">Pauli Exclusion / Quantum Spin</p>`;
            function drawSpin() {
                ctx.fillStyle = 'rgba(5,5,5,0.2)'; ctx.fillRect(0,0,canvas.width,canvas.height);
                let cx = canvas.width/2, cy = canvas.height/2;
                
                // Nucleus
                ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI*2); ctx.fillStyle="#ffd700"; ctx.fill(); ctx.shadowBlur=20; ctx.shadowColor="#ffd700";
                
                // Orbitals
                for(let r=50; r<=150; r+=50) {
                    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.strokeStyle="rgba(255,255,255,0.1)"; ctx.stroke();
                    
                    // Electrons (Pauli pairs - opposite spin)
                    let angle1 = simState.time * (200/r) * 0.02;
                    let angle2 = angle1 + Math.PI; // Opposite side
                    
                    let x1 = cx + Math.cos(angle1)*r, y1 = cy + Math.sin(angle1)*r;
                    let x2 = cx + Math.cos(angle2)*r, y2 = cy + Math.sin(angle2)*r;
                    
                    // Spin Up (Blue)
                    ctx.beginPath(); ctx.arc(x1, y1, 5, 0, Math.PI*2); ctx.fillStyle="#00f3ff"; ctx.fill();
                    ctx.beginPath(); ctx.moveTo(x1, y1-10); ctx.lineTo(x1, y1-20); ctx.lineTo(x1-5, y1-15); ctx.lineTo(x1+5, y1-15); ctx.fillStyle="#00f3ff"; ctx.fill();
                    
                    // Spin Down (Red)
                    ctx.beginPath(); ctx.arc(x2, y2, 5, 0, Math.PI*2); ctx.fillStyle="#ff0055"; ctx.fill();
                    ctx.beginPath(); ctx.moveTo(x2, y2+10); ctx.lineTo(x2, y2+20); ctx.lineTo(x2-5, y2+15); ctx.lineTo(x2+5, y2+15); ctx.fillStyle="#ff0055"; ctx.fill();
                }
                ctx.shadowBlur=0;
                simState.time += 0.5; animId = requestAnimationFrame(drawSpin);
            }
            drawSpin();

        // 5. QUBIT GATES (Computing)
        } else if (type === 'QUBIT_GATES') {
            simState.gate = 'H';
            controls.innerHTML = `<div class="flex gap-4"><button onclick="window.SimulatorEngine.update('gate', 'H')" class="flex-1 py-2 bg-[#b026ff] text-white font-bold rounded">Apply Hadamard (Superposition)</button><button onclick="window.SimulatorEngine.update('gate', 'X')" class="flex-1 py-2 bg-[#00f3ff] text-black font-bold rounded">Apply X-Gate (Flip)</button></div>`;
            function drawQubits() {
                ctx.fillStyle = '#050505'; ctx.fillRect(0,0,canvas.width,canvas.height);
                
                // Quantum Circuit Wire
                ctx.beginPath(); ctx.moveTo(100, canvas.height/2); ctx.lineTo(900, canvas.height/2); ctx.strokeStyle="rgba(255,255,255,0.5)"; ctx.lineWidth=2; ctx.stroke();
                
                // Qubit Probability state mapping
                let stateA = simState.gate === 'H' ? "50% |0⟩ + 50% |1⟩" : "|1⟩";
                let color = simState.gate === 'H' ? "#b026ff" : "#00f3ff";
                
                // Gate Box
                ctx.fillStyle = color; ctx.fillRect(canvas.width/2 - 40, canvas.height/2 - 40, 80, 80);
                ctx.fillStyle = "#fff"; ctx.font = "30px Arial"; ctx.fillText(simState.gate, canvas.width/2 - 12, canvas.height/2 + 10);
                
                // Readout
                ctx.font = "20px Arial";
                ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.fillText("Input: |0⟩", 120, canvas.height/2 - 20);
                
                // Oscillating output if Superposition
                ctx.fillStyle = color;
                if(simState.gate === 'H') {
                    ctx.globalAlpha = Math.abs(Math.sin(simState.time*0.1));
                    ctx.fillText(stateA, 650, canvas.height/2 - 20);
                    ctx.globalAlpha = 1.0;
                } else {
                    ctx.fillText(stateA, 650, canvas.height/2 - 20);
                }
                
                simState.time += 1; animId = requestAnimationFrame(drawQubits);
            }
            drawQubits();

        // 6. QFT SIMULATION (Advanced)
        } else if (type === 'QFT_SIM') {
            controls.innerHTML = `<p class="text-[#00f3ff] text-center font-bold uppercase tracking-widest">Quantum Vacuum Fluctuations</p>`;
            let grid = []; for(let x=0; x<canvas.width; x+=15) { for(let y=0; y<canvas.height; y+=15) grid.push({x,y}); }
            function drawQFT() {
                ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect(0,0,canvas.width,canvas.height);
                grid.forEach(pt => {
                    let nx = Math.sin(pt.y*0.05 + simState.time)*4;
                    let ny = Math.cos(pt.x*0.05 + simState.time)*4;
                    // Spontaneous particle-antiparticle pairs
                    if(Math.random() < 0.001) {
                        ctx.beginPath(); ctx.arc(pt.x+nx, pt.y+ny, 6, 0, Math.PI*2); ctx.fillStyle='#ffd700'; ctx.fill(); ctx.shadowBlur=15; ctx.shadowColor="#ffd700";
                    } else if(Math.random() < 0.001) {
                        ctx.beginPath(); ctx.arc(pt.x-nx, pt.y-ny, 6, 0, Math.PI*2); ctx.fillStyle='#b026ff'; ctx.fill(); ctx.shadowBlur=15; ctx.shadowColor="#b026ff";
                    } else { 
                        ctx.fillStyle='#00f3ff'; ctx.shadowBlur=0; ctx.fillRect(pt.x+nx, pt.y+ny, 1.5, 1.5); 
                    }
                });
                simState.time += 0.15; animId = requestAnimationFrame(drawQFT);
            }
            drawQFT();
        }
    }

    return { init: init, stop: stop, update: function(key, val) { simState[key]=val; } };
})();