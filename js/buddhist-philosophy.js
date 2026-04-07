// js/buddhist-philosophy.js
const UI_DICT = {
    en: { hub: "Research Library", settings: "Settings", dash: "Dashboard", welcome: "Welcome to the Matrix", select: "Select a module to begin", sim: "Interactive Simulator", obs: "Observe (Collapse)", res: "Unobserved (Wave)", on: "Turn On", off: "Turn Off" },
    si: { hub: "පර්යේෂණ පුස්තකාලය", settings: "සැකසුම්", dash: "ප්‍රධාන පුවරුව", welcome: "සත්‍යයේ අනුකෘතියට සාදරයෙන් පිළිගනිමු", select: "මෙනුවෙන් මාතෘකාවක් තෝරන්න", sim: "සජීවීකරණ පද්ධතිය", obs: "නිරීක්ෂණය කරන්න", res: "මුදා හරින්න", on: "ක්‍රියාත්මක කරන්න", off: "අක්‍රිය කරන්න" },
    hi: { hub: "अनुसंधान पुस्तकालय", settings: "समायोजन", dash: "डैशबोर्ड", welcome: "मैट्रिक्स में आपका स्वागत है", select: "प्रारंभ करने के लिए एक मॉड्यूल चुनें", sim: "इंटरैक्टिव सिम्युलेटर", obs: "निरीक्षण करें", res: "तरंग (Wave)", on: "चालू करें", off: "बंद करें" },
    ta: { hub: "ஆராய்ச்சி நூலகம்", settings: "அமைப்புகள்", dash: "முகப்பு", welcome: "மேட்ரிக்ஸ்க்கு வரவேற்கிறோம்", select: "தொகுதியைத் தேர்ந்தெடுக்கவும்", sim: "சிமுலேட்டர்", obs: "கவனிக்கவும்", res: "அலை", on: "ஆன்", off: "ஆஃப்" },
    ar: { hub: "مكتبة البحوث", settings: "إعدادات", dash: "لوحة القيادة", welcome: "مرحبا بكم في المصفوفة", select: "حدد وحدة للبدء", sim: "محاكاة تفاعلية", obs: "مراقبة", res: "موجة", on: "تشغيل", off: "إيقاف" },
    ur: { hub: "ریسرچ لائبریری", settings: "ترتیبات", dash: "ڈیش بورڈ", welcome: "میٹرکس میں خوش آمدید", select: "ماڈیول منتخب کریں", sim: "سمیلیٹر", obs: "مشاہدہ کریں", res: "لہر", on: "آن کریں", off: "آف کریں" },
    ko: { hub: "연구 도서관", settings: "설정", dash: "대시보드", welcome: "매트릭스에 오신 것을 환영합니다", select: "모듈을 선택하세요", sim: "시뮬레이터", obs: "관찰하다", res: "파동", on: "켜기", off: "끄기" },
    ja: { hub: "研究図書館", settings: "設定", dash: "ダッシュボード", welcome: "マトリックスへようこそ", select: "モジュールを選択", sim: "シミュレータ", obs: "観察する", res: "波", on: "オン", off: "オフ" },
    zh: { hub: "研究图书馆", settings: "设置", dash: "仪表板", welcome: "欢迎来到矩阵", select: "选择一个模块", sim: "模拟器", obs: "观察", res: "波", on: "开", off: "关" },
    es: { hub: "Biblioteca de Investigación", settings: "Ajustes", dash: "Panel", welcome: "Bienvenido a Matrix", select: "Selecciona un módulo", sim: "Simulador", obs: "Observar", res: "Onda", on: "Encender", off: "Apagar" },
    fr: { hub: "Bibliothèque de Recherche", settings: "Paramètres", dash: "Tableau de Bord", welcome: "Bienvenue dans la Matrice", select: "Sélectionnez un module", sim: "Simulateur", obs: "Observer", res: "Onde", on: "Allumer", off: "Éteindre" }
};

const QuantumCurriculum = [
    {
        id: "foundations", icon: "fa-water", simType: "WAVE_PACKET",
        title: { 
            en: "1. Foundations: Wave-Particle Duality", si: "1. මූලික සංකල්ප: තරංග-අංශු ද්විත්වතාව", hi: "1. आधार: तरंग-कण द्वैत", ta: "1. அடிப்படைகள்: அலை-துகள் இருமை", ar: "1. الأساسيات: ازدواجية الموجة والجسيم", ur: "1. بنیادیں: لہر ذرہ دوہراپن", ko: "1. 기초: 파동-입자 이중성", ja: "1. 基礎: 波と粒子の二重性", zh: "1. 基础：波粒二象性", es: "1. Fundamentos: Dualidad Onda-Partícula", fr: "1. Fondations : Dualité Onde-Particule" 
        },
        physics: {
            en: "Classical physics failed to explain subatomic behavior. Max Planck introduced 'Quanta'. Einstein proved light acts as particles (Photons). Louis de Broglie showed that all matter also behaves as waves.",
            si: "සම්භාව්‍ය භෞතික විද්‍යාව පරමාණුක ලෝකයේදී බිඳ වැටුණි. ප්ලාන්ක් විසින් ශක්තිය 'ක්වොන්ටා' ලෙසද, අයින්ස්ටයින් ආලෝකය අංශු ලෙසද, ඩි බ්‍රොග්ලි පදාර්ථය තරංග ලෙසද හැසිරෙන බව පෙන්වා දුන්නේය.",
            hi: "शास्त्रीय भौतिकी उप-परमाणु व्यवहार को समझाने में विफल रही। प्लैंक ने 'क्वांटा' पेश किया और डी ब्रोगली ने दिखाया कि पदार्थ तरंगों के रूप में व्यवहार करता है।",
            ta: "பாரம்பரிய இயற்பியல் துணை அணு நடத்தை விளக்கத் தவறியது. பிளாங்க் குவாண்டாவை அறிமுகப்படுத்தினார்.",
            ar: "فشلت الفيزياء الكلاسيكية في تفسير السلوك دون الذري. أثبت أينشتاين ودي بروي أن المادة تتصرف كأمواج وجسيمات.",
            ur: "کلاسیکی طبیعیات ذیلی ایٹمی رویے کی وضاحت کرنے میں ناکام رہی۔ مادہ لہروں اور ذرات کے طور پر کام کرتا ہے۔",
            ko: "고전 물리학은 아원자 세계를 설명하지 못했습니다. 모든 물질은 파동처럼 행동할 수 있습니다.",
            ja: "古典物理学は亜原子の振る舞いを説明できませんでした。すべての物質は波のように振る舞います。",
            zh: "经典物理学无法解释亚原子行为。所有物质都像波一样表现。",
            es: "La física clásica falló en explicar el mundo subatómico. Toda la materia se comporta como ondas.",
            fr: "La physique classique n'a pas pu expliquer le comportement subatomique. Toute matière se comporte comme une onde."
        },
        equation: "E = hν &nbsp; | &nbsp; λ = h/p",
        dhamma: {
            en: "<b class='text-[#00f3ff]'>Theravada:</b> Matches the concept of 'Rupa Kalapas'—matter is not solid but subatomic flashes of energy.<br><br><b class='text-[#ffd700]'>Mahayana:</b> Nagarjuna's 'Sunyata' (Emptiness). Particles have no inherent self-nature.",
            si: "<b class='text-[#00f3ff]'>ථේරවාදය:</b> භෞතික ලෝකයට ඝන හරයක් නැත. එය තත්පරයකට බිලියන වාරයක් ඉපිදෙමින් නැතිවෙන 'රූප කලාප' වල එකතුවකි.<br><br><b class='text-[#ffd700]'>මහායානය:</b> නාගර්ජුනයන්ගේ 'ශූන්‍යතාවය'. අංශුවකට ස්වාධීන පැවැත්මක් නැත.",
            hi: "<b class='text-[#00f3ff]'>थेरवाद:</b> यह 'रूप कलाप' है - पदार्थ ठोस नहीं बल्कि ऊर्जा है। <br><br><b class='text-[#ffd700]'>महायान:</b> नागार्जुन की 'शून्यता'।",
            ta: "தேரவாதம்: இது ரூப கலாபங்கள். மகாயானம்: நாகார்ஜுனரின் சூன்யதா.",
            ar: "تيرافادا: المادة ليست صلبة. ماهايانا: الفراغ (سونياتا).",
            ur: "تھیرواد: مادہ ٹھوس نہیں ہے۔ مہایان: شونیتا (خالی پن)۔",
            ko: "상좌부: 물질은 단단하지 않은 에너지입니다. 대승: 용수의 공(空) 사상.",
            ja: "上座部: 物質は固いものではありません。大乗: 龍樹の「空」。",
            zh: "上座部：物质不是固体的，而是能量的闪烁。大乘：龙树的“空”。",
            es: "Theravada: La materia no es sólida. Mahayana: La 'Vacuidad' de Nagarjuna.",
            fr: "Theravada : La matière n'est pas solide. Mahayana : La 'Vacuité' de Nagarjuna."
        },
        sutra: { 
            en: "\"Form is like a lump of foam...\"", si: "\"පෙන පිඬක් වැනිය රූපය...\"", hi: "\"रूप झाग के समान है...\"", ta: "\"உருவம் நுரை போன்றது...\"", ar: "\"الشكل مثل كتلة من الرغوة...\"", ur: "\"شکل جھاگ کے ایک گانٹھ کی طرح ہے...\"", ko: "\"형태는 거품과 같다...\"", ja: "\"形は泡のようなもの...\"", zh: "\"色如聚沫...\"", es: "\"La forma es como un trozo de espuma...\"", fr: "\"La forme est comme un morceau d'écume...\""
        }
    },
    {
        id: "principles", icon: "fa-eye", simType: "DOUBLE_SLIT",
        title: { en: "2. Principles: Superposition", si: "2. මූලධර්ම: අවිනිශ්චිතතාව හා පැටලීම", hi: "2. सिद्धांत: सुपरपोजिशन", ta: "2. கோட்பாடுகள்: சூப்பர்பொசிஷன்", ar: "2. المبادئ: التراكب", ur: "2. اصول: سپر پوزیشن", ko: "2. 원리: 중첩", ja: "2. 原理: 重ね合わせ", zh: "2. 原理：叠加", es: "2. Principios: Superposición", fr: "2. Principes : Superposition" },
        physics: {
            en: "Heisenberg's Uncertainty Principle states position and momentum cannot be simultaneously known. Particles exist in 'Superposition' until measured.",
            si: "හයිසන්බර්ග්ගේ අවිනිශ්චිතතා මූලධර්මය මඟින් අංශුවක පිහිටීම හා ගම්‍යතාව එකවර මැනිය නොහැකි බව පෙන්වයි. නිරීක්ෂණය කරන තුරු අංශුව 'Superposition' තත්ත්වයේ පවතී.",
            hi: "हाइजेनबर्ग का अनिश्चितता सिद्धांत कहता है कि स्थिति और गति एक साथ नहीं जानी जा सकती।",
            ta: "ஹைசன்பெர்க்கின் நிச்சயமற்ற தன்மை கொள்கை.",
            ar: "ينص مبدأ عدم اليقين على أن الموضع والزخم لا يمكن معرفتهما في نفس الوقت.",
            ur: "ہائزنبرگ کا غیر یقینی صورتحال کا اصول کہتا ہے کہ پوزیشن اور رفتار ایک ساتھ نہیں جانی جاسکتی۔",
            ko: "하이젠베르크의 불확정성 원리는 위치와 운동량을 동시에 알 수 없다고 말합니다.",
            ja: "ハイゼンベルクの不確定性原理によれば、位置と運動量は同時に知ることはできません。",
            zh: "海森堡的不确定性原理指出，位置和动量不能同时知道。",
            es: "El Principio de Incertidumbre de Heisenberg dicta que la posición y el momento no se pueden saber a la vez.",
            fr: "Le principe d'incertitude de Heisenberg stipule que la position et la quantité de mouvement ne peuvent être connues simultanément."
        },
        equation: "Δx · Δp ≥ h/4π",
        dhamma: {
            en: "<b class='text-[#00f3ff]'>Theravada:</b> Entanglement mirrors 'Paticca Samuppada' (Dependent Origination).<br><br><b class='text-[#ffd700]'>Mahayana:</b> 'Cittamatra' (Mind-Only). Reality is woven by mind.",
            si: "<b class='text-[#00f3ff]'>ථේරවාදය:</b> ක්වොන්ටම් පැටලීම යනු 'පටිච්ච සමුප්පාදයේ' භෞතික ස්වරූපයයි.<br><br><b class='text-[#ffd700]'>මහායානය:</b> විඥානවාදය. නිරීක්ෂණයකින් තොරව යථාර්ථයක් නැත.",
            hi: "थेरवाद: प्रतीत्यसमुत्पाद। महायान: चित्तमात्र (केवल मन)।",
            ta: "தேரவாதம்: சார்பு தோற்றம். மகாயானம்: மனம் மட்டுமே.",
            ar: "تيرافادا: النشأة المعتمدة. ماهايانا: العقل فقط.",
            ur: "تھیرواد: انحصار کی ابتدا۔ مہایان: صرف ذہن۔",
            ko: "상좌부: 연기법. 대승: 유식(唯識).",
            ja: "上座部: 縁起。大乗: 唯識。",
            zh: "上座部：缘起。大乘：唯识。",
            es: "Theravada: Origen Dependiente. Mahayana: Sólo Mente.",
            fr: "Theravada : Origine Dépendante. Mahayana : Esprit Seul."
        },
        sutra: { 
            en: "\"When this exists, that comes to be...\"", si: "\"මෙය ඇති කල්හි, මෙය වේ...\"", hi: "\"जब यह होता है, तो वह उत्पन्न होता है...\"", ta: "\"இது இருக்கும் போது, அது உருவாகிறது...\"", ar: "\"عندما يوجد هذا، يصبح ذلك...\"", ur: "\"جب یہ موجود ہوتا ہے، تو وہ پیدا ہوتا ہے...\"", ko: "\"이것이 있을 때, 저것이 있다...\"", ja: "\"これがあるとき、あれがある...\"", zh: "\"此有故彼有...\"", es: "\"Cuando esto existe, aquello llega a ser...\"", fr: "\"Quand ceci existe, cela vient à être...\""
        }
    },
    {
        id: "math_framework", icon: "fa-square-root-alt", simType: "SCHRODINGER",
        title: { en: "3. Math: Schrödinger Equation", si: "3. ගණිතමය රාමුව: ෂ්‍රෝඩිංගර් සමීකරණය", hi: "3. गणित: श्रोडिंगर समीकरण", ta: "3. கணிதம்: ஷ்ரோடிங்கர் சமன்பாடு", ar: "3. الرياضيات: معادلة شرودنغر", ur: "3. ریاضی: شروڈنگر مساوات", ko: "3. 수학: 슈뢰딩거 방정식", ja: "3. 数学: シュレーディンガー方程式", zh: "3. 数学：薛定谔方程", es: "3. Matemáticas: Ecuación de Schrödinger", fr: "3. Mathématiques : Équation de Schrödinger" },
        physics: {
            en: "The wavefunction (Ψ) encodes probabilities. The Schrödinger Equation dictates how this wave evolves over time.",
            si: "තරංග ශ්‍රිතය (Ψ) මඟින් පද්ධතියක සම්භාවිතා ව්‍යාප්තිය පෙන්වයි. ෂ්‍රෝඩිංගර් සමීකරණය මඟින් එය කාලයත් සමඟ වෙනස් වන අයුරු ගණනය කරයි.",
            hi: "तरंग फ़ंक्शन (Ψ) संभावनाओं को कूटबद्ध करता है।",
            ta: "அலை செயல்பாடு சாத்தியக்கூறுகளை குறியாக்குகிறது.",
            ar: "ترمز الدالة الموجية إلى الاحتمالات.",
            ur: "لہر کا فنکشن امکانات کو انکوڈ کرتا ہے۔",
            ko: "파동 함수는 확률을 암호화합니다.",
            ja: "波動関数は確率をエンコードします。",
            zh: "波函数编码概率。",
            es: "La función de onda codifica las probabilidades.",
            fr: "La fonction d'onde encode les probabilités."
        },
        equation: "HΨ = EΨ",
        dhamma: {
            en: "<b class='text-[#00f3ff]'>Theravada:</b> The wavefunction represents 'Kamma Vipaaka'—probabilities waiting to manifest.<br><br><b class='text-[#ffd700]'>Mahayana:</b> Indra's Net. Mathematical operators represent interconnected shifting of phenomena.",
            si: "<b class='text-[#00f3ff]'>ථේරවාදය:</b> තරංග ශ්‍රිතය යනු කර්ම විපාක ජාලයකි.<br><br><b class='text-[#ffd700]'>මහායානය:</b> ඉන්ද්‍රගේ දැල. සෑම කර්මකයක්ම (Operator) අනෙක් සියල්ල සමඟ සම්බන්ධ වී පවතී.",
            hi: "थेरवाद: कर्म विपाक। महायान: इंद्र का जाल।",
            ta: "தேரவாதம்: கர்ம விபாகம். மகாயானம்: இந்திரனின் வலை.",
            ar: "تيرافادا: شبكة الكرمة. ماهايانا: شبكة إندرا.",
            ur: "تھیرواد: کرما کا جال۔ مہایان: اندرا کا جال۔",
            ko: "상좌부: 업의 과보. 대승: 인드라망.",
            ja: "上座部: 業の果報。大乗: インドラ網。",
            zh: "上座部：业报。大乘：因陀罗网。",
            es: "Theravada: Red kármica. Mahayana: Red de Indra.",
            fr: "Theravada : Réseau karmique. Mahayana : Filet d'Indra."
        },
        sutra: { 
            en: "\"By mind the world is led...\"", si: "\"ලෝකය සිත විසින් මෙහෙයවනු ලැබේ...\"", hi: "\"मन द्वारा दुनिया का नेतृत्व किया जाता है...\"", ta: "\"மனதால் உலகம் வழிநடத்தப்படுகிறது...\"", ar: "\"بالعقل يقاد العالم...\"", ur: "\"دنیا کی رہنمائی ذہن کرتا ہے...\"", ko: "\"마음이 세상을 이끈다...\"", ja: "\"心によって世界は導かれる...\"", zh: "\"心为世间导...\"", es: "\"Por la mente el mundo es guiado...\"", fr: "\"Par l'esprit le monde est dirigé...\""
        }
    },
    {
        id: "atomic_physics", icon: "fa-atom", simType: "SPIN_ORBITALS",
        title: { en: "4. Atomic: Pauli Exclusion", si: "4. පරමාණුක: පෝලි මූලධර්මය", hi: "4. परमाणु: पाउली अपवर्जन", ta: "4. அணு: பாலி விலக்கு", ar: "4. الذرية: استبعاد باولي", ur: "4. اٹامک: پاؤلی کے اخراج", ko: "4. 원자: 파울리 배타 원리", ja: "4. 原子: パウリの排他原理", zh: "4. 原子：泡利不相容原理", es: "4. Atómica: Exclusión de Pauli", fr: "4. Atomique : Exclusion de Pauli" },
        physics: {
            en: "Pauli's Exclusion Principle dictates that no two identical fermions can occupy the exact same quantum state, giving matter solidity.",
            si: "පෝලිගේ බහිෂ්කරණ මූලධර්මය පවසන්නේ ෆර්මියෝන දෙකකට එකම ක්වොන්ටම් තත්ත්වයක පැවතිය නොහැකි බවයි. පදාර්ථයට ඝන ස්වභාවයක් ලැබෙන්නේ මේ නිසාවෙනි.",
            hi: "पाउली का सिद्धांत कहता है कि दो समान फर्मियन एक ही अवस्था में नहीं हो सकते।",
            ta: "பாலி விலக்குக் கொள்கை.",
            ar: "يملي مبدأ استبعاد باولي أن لا جسيمين متطابقين يمكن أن يشغلا نفس الحالة.",
            ur: "پاؤلی کے اخراج کا اصول بتاتا ہے کہ کوئی بھی دو ذرات ایک ہی حالت میں نہیں رہ سکتے۔",
            ko: "파울리 배타 원리는 물질에 단단함을 부여합니다.",
            ja: "パウリの排他原理は物質に硬さを与えます。",
            zh: "泡利不相容原理赋予了物质固态属性。",
            es: "El Principio de Exclusión de Pauli le da solidez a la materia.",
            fr: "Le principe d'exclusion de Pauli donne à la matière sa solidité."
        },
        equation: "S = (h/2π) √[s(s+1)]",
        dhamma: {
            en: "<b class='text-[#00f3ff]'>Theravada:</b> Paramatthas arise and cease rapidly in their own discrete domains.<br><br><b class='text-[#ffd700]'>Mahayana:</b> The 'solidity' is a functional illusion (Samvrti-satya).",
            si: "<b class='text-[#00f3ff]'>ථේරවාදය:</b> පරමාර්ථ ධර්මයන් ක්ෂණිකව ඉපිදෙමින් නිරුද්ධ වේ.<br><br><b class='text-[#ffd700]'>මහායානය:</b> පෝලි මූලධර්මය මඟින් මවන 'ඝනත්වය' යනු සම්මුති සත්‍යයකි (මායාවකි).",
            hi: "थेरवाद: परमार्थ। महायान: यह 'ठोसपन' एक कार्यात्मक भ्रम है।",
            ta: "தேரவாதம்: பரமார்த்தங்கள். மகாயானம்: திடத்தன்மை ஒரு மாயை.",
            ar: "تيرافادا: الحقائق المطلقة. ماهايانا: الصلابة وهم.",
            ur: "تھیرواد: مطلق حقائق۔ مہایان: ٹھوس پن ایک وہم ہے۔",
            ko: "상좌부: 구경법. 대승: '단단함'은 환상입니다.",
            ja: "上座部: 勝義法。大乗: 「硬さ」は幻想です。",
            zh: "上座部：胜义谛。大乘：“坚固性”是一种幻觉。",
            es: "Theravada: Realidades últimas. Mahayana: La solidez es una ilusión.",
            fr: "Theravada : Réalités ultimes. Mahayana : La solidité est une illusion."
        },
        sutra: { 
            en: "\"All conditioned things are impermanent...\"", si: "\"සබ්බේ සංඛාරා අනිච්චා...\"", hi: "\"सभी वातानुकूलित चीजें अस्थायी हैं...\"", ta: "\"எல்லா நிபந்தனையிடப்பட்ட விஷயங்களும் நிலையற்றவை...\"", ar: "\"كل الأشياء المشروطة غير دائمة...\"", ur: "\"تمام مشروط چیزیں عارضی ہیں...\"", ko: "\"모든 조건 지어진 것은 무상하다...\"", ja: "\"すべての条件付けられたものは無常である...\"", zh: "\"诸行无常...\"", es: "\"Todas las cosas condicionadas son impermanentes...\"", fr: "\"Toutes les choses conditionnées sont impermanentes...\""
        }
    },
    {
        id: "computing", icon: "fa-microchip", simType: "QUBIT_GATES",
        title: { en: "5. Computing: Qubits & Gates", si: "5. තොරතුරු: ක්වොන්ටම් පරිගණනය", hi: "5. कंप्यूटिंग: क्यूबिट्स और गेट्स", ta: "5. கணினி: கியூபிட்ஸ்", ar: "5. الحوسبة: الكيوبتات", ur: "5. کمپیوٹنگ: کیوبٹس", ko: "5. 컴퓨팅: 큐비트 및 게이트", ja: "5. コンピューティング: キュービットとゲート", zh: "5. 计算：量子比特", es: "5. Computación: Qubits y Puertas", fr: "5. Informatique : Qubits et Portes" },
        physics: {
            en: "Qubits utilize Superposition to be 0 AND 1 simultaneously. Quantum Gates manipulate these to perform parallel computations.",
            si: "Qubit එකකට Superposition හරහා 0 සහ 1 යන දෙකම එකවර නියෝජනය කළ හැක. ක්වොන්ටම් ද්වාර මෙම සම්භාවිතාවන් හසුරුවමින් ගණනය කිරීම් සිදු කරයි.",
            hi: "क्यूबिट्स एक साथ 0 और 1 होने के लिए सुपरपोजिशन का उपयोग करते हैं।",
            ta: "கியூபிட்ஸ் ஒரே நேரத்தில் 0 மற்றும் 1 ஆக இருக்கலாம்.",
            ar: "تستفيد الكيوبتات من التراكب لتكون 0 و 1 في وقت واحد.",
            ur: "کیوبٹس بیک وقت 0 اور 1 ہونے کے لیے سپر پوزیشن کا استعمال کرتے ہیں۔",
            ko: "큐비트는 중첩을 이용하여 동시에 0과 1이 될 수 있습니다.",
            ja: "キュービットは重ね合わせを利用して同時に0と1になります。",
            zh: "量子比特利用叠加态同时表示0和1。",
            es: "Los qubits usan la superposición para ser 0 y 1 a la vez.",
            fr: "Les qubits utilisent la superposition pour être simultanément 0 et 1."
        },
        equation: "|ψ⟩ = α|0⟩ + β|1⟩",
        dhamma: {
            en: "<b class='text-[#00f3ff]'>Theravada:</b> Resembles 'Citta Vithi'—billions of mind-moments processing complex information.<br><br><b class='text-[#ffd700]'>Mahayana:</b> Qubits encapsulate Nagarjuna's 'Middle Way' (Madhyamaka).",
            si: "<b class='text-[#00f3ff]'>ථේරවාදය:</b> Qubits වල දත්ත සැකසීම, බුදුදහමේ දැක්වෙන 'චිත්ත වීථි' ක්‍රියාවලියට සමානය.<br><br><b class='text-[#ffd700]'>මහායානය:</b> 0 ත් නොවන 1 ත් නොවන Qubit ස්වභාවය, නාගර්ජුනයන්ගේ 'මධ්‍යම ප්‍රතිපදාව' නිරූපණය කරයි.",
            hi: "थेरवाद: चित्त वीथि। महायान: मध्य मार्ग।",
            ta: "தேரவாதம்: சித்த வீதி. மகாயானம்: நடுத்தர வழி.",
            ar: "تيرافادا: لحظات العقل. ماهايانا: الطريق الأوسط.",
            ur: "تھیرواد: ذہن کے لمحات۔ مہایان: درمیانی راستہ۔",
            ko: "상좌부: 심찰나(心刹那). 대승: 중도(中道).",
            ja: "上座部: 心刹那。大乗: 中道。",
            zh: "上座部：心路历程。大乘：中观。",
            es: "Theravada: Momentos mentales. Mahayana: El Camino Medio.",
            fr: "Theravada : Moments de l'esprit. Mahayana : La Voie du Milieu."
        },
        sutra: { 
            en: "\"Not one, not two, not existing, not non-existing...\"", si: "\"එකක්ද නොවේ, දෙකක්ද නොවේ, පවතින්නේද නොවේ, නොපවතින්නේද නොවේ...\"", hi: "\"न एक, न दो, न विद्यमान, न अविद्यमान...\"", ta: "\"ஒன்று அல்ல, இரண்டு அல்ல...\"", ar: "\"ليس واحدًا، ليس اثنين...\"", ur: "\"نہ ایک، نہ دو، نہ موجود، نہ غیر موجود...\"", ko: "\"하나도 아니고 둘도 아니며...\"", ja: "\"一つでもなく二つでもなく...\"", zh: "\"不一不异，不生不灭...\"", es: "\"Ni uno, ni dos, ni existente, ni no existente...\"", fr: "\"Ni un, ni deux, ni existant, ni non-existant...\""
        }
    },
    {
        id: "qft", icon: "fa-network-wired", simType: "QFT_SIM",
        title: { en: "6. Advanced: Quantum Field Theory", si: "6. උසස් න්‍යායන්: ක්වොන්ටම් ක්ෂේත්‍ර න්‍යාය", hi: "6. उन्नत: क्वांटम फील्ड थ्योरी", ta: "6. மேம்பட்டது: குவாண்டம் களக் கோட்பாடு", ar: "6. متقدم: نظرية المجال الكمي", ur: "6. اعلی درجے کی: کوانٹم فیلڈ تھیوری", ko: "6. 고급: 양자장론", ja: "6. 上級: 場の量子論", zh: "6. 高级：量子场论", es: "6. Avanzado: Teoría Cuántica de Campos", fr: "6. Avancé : Théorie Quantique des Champs" },
        physics: {
            en: "In QFT, the universe is filled with fluid-like 'Fields'. Particles are simply localized vibrations within these cosmic fields.",
            si: "QFT වලට අනුව මුළු විශ්වයම 'ක්ෂේත්‍ර' (Fields) වලින් පිරී ඇත. ඉලෙක්ට්‍රෝනයක් යනු එම ක්ෂේත්‍රයක ඇතිවන තාවකාලික කම්පනයක් පමණි.",
            hi: "QFT में, कण इन लौकिक क्षेत्रों के भीतर केवल कंपन हैं।",
            ta: "QFT இல், பிரபஞ்சம் திரவம் போன்ற 'களங்களால்' நிரம்பியுள்ளது.",
            ar: "في نظرية المجال الكمي، الجسيمات هي مجرد اهتزازات في المجالات الكونية.",
            ur: "کیو ایف ٹی میں، ذرات ان کائناتی شعبوں کے اندر صرف کمپن ہیں۔",
            ko: "양자장론에서 입자는 우주적 장 내의 단순한 진동일 뿐입니다.",
            ja: "場の量子論では、粒子は宇宙の場の中の単なる振動です。",
            zh: "在量子场论中，粒子只是宇宙场中的局部振动。",
            es: "En la QFT, las partículas son simples vibraciones dentro de campos cósmicos.",
            fr: "En QFT, les particules sont simplement des vibrations dans des champs cosmiques."
        },
        equation: "L = ψ̄(iγ^μ∂_μ - m)ψ - 1/4 F_μν F^μν",
        dhamma: {
            en: "<b class='text-[#00f3ff]'>Theravada:</b> Experiencing the body not as matter, but as pure vibrations ('Udayabbaya').<br><br><b class='text-[#ffd700]'>Mahayana:</b> The Quantum Field IS 'Sunyata' (Emptiness). A pregnant void.",
            si: "<b class='text-[#00f3ff]'>ථේරවාදය:</b> ශරීරය පදාර්ථයක් නොව හුදු කම්පනයක් සහ තරංගයක් පමණක් බව ප්‍රත්‍යක්ෂ වීම ('උදයබ්බය ඥානය').<br><br><b class='text-[#ffd700]'>මහායානය:</b> ක්වොන්ටම් ක්ෂේත්‍රය යනුම 'ශූන්‍යතාවයයි'.",
            hi: "थेरवाद: शुद्ध कंपन (उदयब्बय)। महायान: क्वांटम क्षेत्र ही 'शून्यता' है।",
            ta: "தேரவாதம்: தூய அதிர்வுகள். மகாயானம்: குவாண்டம் களம் என்பது சூன்யதா.",
            ar: "تيرافادا: اهتزازات نقية. ماهايانا: المجال الكمي هو الفراغ.",
            ur: "تھیرواد: خالص کمپن۔ مہایان: کوانٹم فیلڈ شونیتا ہے۔",
            ko: "상좌부: 순수한 진동(생멸지). 대승: 양자장은 곧 '공'입니다.",
            ja: "上座部: 純粋な振動（生滅智）。大乗: 量子場は「空」である。",
            zh: "上座部：纯粹的振动（生灭智）。大乘：量子场即是“空”。",
            es: "Theravada: Vibraciones puras. Mahayana: El campo cuántico ES la Vacuidad.",
            fr: "Theravada : Vibrations pures. Mahayana : Le champ quantique EST la Vacuité."
        },
        sutra: { 
            en: "\"All phenomena are like a dream, a phantom, a bubble...\"", si: "\"සියලු සංස්කාරයෝ හීනයක්, මායාවක්, දිය බුබුලක් වැනිය...\"", hi: "\"सभी घटनाएं एक सपने, एक बुलबुले की तरह हैं...\"", ta: "\"எல்லா நிகழ்வுகளும் ஒரு கனவு போல...\"", ar: "\"كل الظواهر مثل الحلم، فقاعة...\"", ur: "\"تمام مظاہر ایک خواب، ایک بلبلے کی طرح ہیں...\"", ko: "\"모든 현상은 꿈과 같고 물거품과 같다...\"", ja: "\"すべての現象は夢や幻、泡のようなもの...\"", zh: "\"一切有为法，如梦幻泡影...\"", es: "\"Todos los fenómenos son como un sueño, una burbuja...\"", fr: "\"Tous les phénomènes sont comme un rêve, une bulle...\""
        }
    }
];

function getTr(obj, lang) { return obj[lang] || obj['en']; }