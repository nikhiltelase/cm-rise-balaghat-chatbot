// =====================================================
// CM Rise / Sandipani School — Complete Knowledge Base
// सांदीपनि विद्यालय — सम्पूर्ण ज्ञानकोष
// Last Updated: July 2026
// =====================================================

const SCHOOL_DATA = {

  // ─── मुख्य स्कूल की जानकारी (Primary School Info) ───
  general: {
    name: "CM Rise Government Veerangana Rani Durgawati Higher Secondary School",
    shortName: "CM Rise School Balaghat",
    newName: "महर्षि सांदीपनि विद्यालय (Maharishi Sandipani Vidyalaya)",
    address: "चित्रगुप्त नगर, बालाघाट, मध्य प्रदेश – 481001",
    district: "बालाघाट (Balaghat)",
    state: "मध्य प्रदेश (Madhya Pradesh)",
    pincode: "481001",
    phone: "07632-XXXXXX",
    email: "cmrisebalaghat@mp.gov.in",
    website: "https://www.vimarsh.mp.gov.in",
    principal: "डॉ. युवराज रहांगडाले (Dr. Yuvraj Rahangdale)",
    udiseCode: "23450122047",
    establishedYear: "CM Rise के तहत 2021 से अपग्रेड",
    schoolType: "शासकीय उत्कृष्ट उच्चतर माध्यमिक विद्यालय (Government Higher Secondary School)",
    board: "मध्य प्रदेश बोर्ड ऑफ सेकेंडरी एजुकेशन (MPBSE)",
    medium: "हिंदी और अंग्रेजी माध्यम (Hindi & English Medium)",
    motto: "गुणवत्तापूर्ण शिक्षा — हर बच्चे का अधिकार"
  },

  // ─── योजना का इतिहास और सांदीपनि नामकरण ───
  schemeHistory: {
    cmRiseLaunch: "वर्ष 2022-2023 में मुख्यमंत्री श्री शिवराज सिंह चौहान द्वारा 'CM Rise' योजना शुरू की गई।",
    objective: "निजी स्कूलों के एकाधिकार को समाप्त कर वैश्विक मानकों पर सरकारी शिक्षा को उन्नत करना।",
    totalSchoolsTarget: "9,095 से 9,200 सर्वसुविधायुक्त सरकारी विद्यालयों की स्थापना का लक्ष्य।",
    budget: "प्रथम चरण के लिए 2,519 करोड़ रुपये का बजट आवंटित।",
    enrollmentPhase1: "प्रथम चरण में 274 से 369 विद्यालय चालू, लगभग 2.5 से 3 लाख विद्यार्थियों ने प्रवेश लिया।",
    renaming: {
      announcement: "1 अप्रैल 2025 को मुख्यमंत्री डॉ. मोहन यादव ने 'स्कूल चलें हम' Praveshotsav-2025 में CM Rise स्कूलों का नाम 'महर्षि सांदीपनि विद्यालय' करने की घोषणा की।",
      reason: "औपनिवेशिक मानसिकता का त्याग कर भारतीय परिप्रेक्ष्य को शिक्षा में वापस लाना।",
      significance: "भगवान कृष्ण ने उज्जैन के महर्षि सांदीपनि के आश्रम में शिक्षा ग्रहण की थी। 5000 वर्ष पुरानी गुरुकुल परंपरा को पुनर्जीवित करना।"
    },
    target2026: "15 जुलाई 2026 तक 70 नए सांदीपनि विद्यालयों का उद्घाटन (46 स्कूल शिक्षा विभाग + 24 जनजातीय कार्य विभाग)।",
    guruPurnima: "प्रत्येक जिले के एक सांदीपनि विद्यालय में गुरु पूर्णिमा पर विज्ञान प्रदर्शनी और AI/Digital प्रोजेक्ट का प्रदर्शन।",
    pmShriLink: "यह योजना केंद्र की PM SHRI योजना और NEP 2020 से संरेखित है।"
  },

  // ─── स्कूल का समय (School Timings) ───
  timings: {
    summer: {
      label: "ग्रीष्मकालीन समय (Summer - April to September)",
      schoolStart: "सुबह 7:30 बजे",
      schoolEnd: "दोपहर 1:30 बजे",
      assembly: "सुबह 7:30 - 7:50 बजे",
      lunchBreak: "10:30 - 11:00 बजे",
      periodDuration: "40 मिनट"
    },
    winter: {
      label: "शीतकालीन समय (Winter - October to March)",
      schoolStart: "सुबह 10:00 बजे",
      schoolEnd: "शाम 4:00 बजे",
      assembly: "सुबह 10:00 - 10:20 बजे",
      lunchBreak: "12:30 - 1:00 बजे",
      periodDuration: "40 मिनट"
    },
    officeHours: "सोमवार से शनिवार, सुबह 10:00 से शाम 5:00 बजे तक",
    sunday: "रविवार को साप्ताहिक अवकाश"
  },

  // ─── बालाघाट जिले के सभी सांदीपनि/उत्कृष्ट विद्यालय ───
  districtSchools: [
    {
      block: "बालाघाट (Balaghat)",
      name: "शा. उत्कृष्ट उ.मा.वि. बालाघाट (Govt. HSS Excellence Balaghat)",
      udise: "23450122047",
      principal: "श्री आर.के. लटारे (R.K. Latare)",
      contact: "9926361755",
      type: "Co-ed",
      level: "Higher Secondary"
    },
    {
      block: "कटंगी (Katangi)",
      name: "शा. उत्कृष्ट उ.मा.वि. कटंगी (Govt. HSS Excellence Katangi)",
      udise: "23450312919",
      principal: "श्री एस.आर. रहांगडाले (S.R. Rahangdale)",
      contact: "9669549085",
      type: "Co-ed",
      level: "Higher Secondary"
    },
    {
      block: "खैरलांजी (Khairlanji)",
      name: "शा. उत्कृष्ट उ.मा.वि. खैरलांजी (Govt. HSS Excellence Khairlanji)",
      udise: "23450409112",
      principal: "श्री आर.के. आड़े (R.K. Aade)",
      contact: "9893231130",
      type: "Co-ed",
      level: "Higher Secondary (Class 9-12)"
    },
    {
      block: "किरनापुर (Kirnapur)",
      name: "शा. उत्कृष्ट उ.मा.वि. किरनापुर (Govt. HSS Excellence Kirnapur)",
      udise: "23450207513",
      principal: "श्रीमती अनीता तारन (Anita Taran)",
      contact: "9424663763",
      type: "Co-ed",
      level: "Higher Secondary",
      specialEducator: true
    },
    {
      block: "लालबर्रा (Lalburra)",
      name: "शा. उत्कृष्ट उ.मा.वि. लालबर्रा (Govt. HSS Excellence Lalburra)",
      udise: "23450615513",
      principal: "श्रीमती रश्मि झा (Rashmi Jha)",
      contact: "9009906533",
      type: "Co-ed",
      level: "Higher Secondary"
    },
    {
      block: "लांजी (Lanji)",
      name: "शा. उत्कृष्ट उ.मा.वि. लांजी (Govt. HSS Excellence Lanji)",
      udise: "23450801121",
      principal: "श्री प्रमोद कुमार भिमते (P.K. Bhimte)",
      contact: "9424371513",
      type: "Co-ed",
      level: "Higher Secondary"
    },
    {
      block: "वारासिवनी (Waraseoni)",
      name: "शा. उत्कृष्ट उ.मा.वि. टी.बी. वारासिवनी (Govt. HSS Excellence T.B. Waraseoni)",
      udise: "23450706733",
      principal: "श्री टी.के. गौतम (T.K. Goutam)",
      contact: "9407376483",
      address: "तुमड़ी, बालाघाट रोड, वारासिवनी – 481331 (हीरो शोरूम के सामने)",
      type: "Co-ed (सह-शिक्षा)",
      level: "उच्च प्राथमिक से उच्चतर माध्यमिक (Class 6-12)",
      teacherCount: "25 से अधिक उच्च प्रशिक्षित शिक्षक",
      nearby: "सेंट विद्या सागर कॉन्वेंट (CBSE), केशव इंग्लिश स्कूल, इंदिरा मेमोरियल कॉन्वेंट"
    },
    {
      block: "परसवाड़ा (Paraswada)",
      name: "शा. उत्कृष्ट उ.मा.वि. परसवाड़ा (Govt. HSS Excellence Paraswada)",
      udise: "23450502512",
      principal: "राज्य शिक्षा केंद्र डेटाबेस",
      contact: "-",
      type: "Co-ed",
      level: "Higher Secondary",
      specialEducator: true
    },
    {
      block: "बैहर (Baihar)",
      name: "शा. उत्कृष्ट उ.मा.वि. बैहर (Govt. HSS Excellence Baihar)",
      udise: "23450917406",
      principal: "राज्य शिक्षा केंद्र डेटाबेस",
      contact: "-",
      type: "Co-ed",
      level: "Higher Secondary",
      specialEducator: true
    },
    {
      block: "बिरसा (Birsa)",
      name: "शा. उ.मा.वि. कन्या बिरसा (Govt. HSS Girls Birsa)",
      udise: "23451009209",
      principal: "राज्य शिक्षा केंद्र डेटाबेस",
      contact: "-",
      type: "Girls",
      level: "Higher Secondary"
    },
    {
      block: "बालाघाट",
      name: "शासकीय नवीन उच्चतर माध्यमिक विद्यालय बालाघाट",
      udise: "23450122049",
      type: "Co-ed",
      level: "Higher Secondary",
      teachers: [
        { name: "श्री आशीष कुमार श्रीवास्तव", subject: "अंग्रेजी (English)" },
        { name: "श्री लोकेश मेश्राम", subject: "अंग्रेजी (English)" }
      ]
    },
    {
      block: "लालबर्रा / खमरिया",
      name: "शा. उ.मा.वि. खमरिया (Govt. HSS Khamariya)",
      udise: "23450602107",
      teachers: [
        { name: "सुश्री श्रद्धा मेश्राम", subject: "अंग्रेजी (English)" },
        { name: "सुश्री श्रद्धा चौहान", subject: "जीव विज्ञान (Biology)" }
      ]
    },
    {
      block: "बालाघाट",
      name: "शा. उ.मा.वि. बड़गांव (Govt. HSS Badgaon)",
      udise: "23450600506",
      teachers: [
        { name: "श्री विजय मिश्रा", subject: "अंग्रेजी (English)" }
      ]
    },
    {
      block: "बालाघाट",
      name: "सांदीपनि विद्यालय राजेगांव (Sandipani Vidyalaya Rajegaon)",
      udise: "-",
      type: "Co-ed",
      level: "Higher Secondary"
    }
  ],

  // ─── एकलव्य मॉडल आवासीय विद्यालय (EMRS) ───
  eklavyaSchools: [
    {
      name: "एकलव्य मॉडल आवासीय विद्यालय (EMRS) बैहर",
      location: "बैहर, बालाघाट",
      board: "CBSE",
      code: "481111",
      target: "जनजातीय छात्रों के लिए आवासीय शिक्षा"
    },
    {
      name: "एकलव्य मॉडल आवासीय विद्यालय (EMRS) उकवा",
      location: "उकवा, बालाघाट",
      board: "CBSE",
      code: "481105",
      target: "जनजातीय छात्रों के लिए आवासीय शिक्षा"
    }
  ],

  // ─── विशेष शिक्षक (Special Educators) — विशेष जरूरत वाले बच्चों के लिए ───
  specialEducation: {
    info: "राज्य शिक्षा केंद्र के 'Special Educator 2024-25' डेटाबेस के अनुसार बालाघाट में विशेष शिक्षक पदस्थ हैं:",
    schools: [
      { name: "शा. उत्कृष्ट उ.मा.वि. बैहर", udise: "23450917406" },
      { name: "शा. उ.मा.वि. कुम्हारी", udise: "23450109504" },
      { name: "शा. उ.मा.वि. मानेगांव", udise: "23451015508" },
      { name: "शा. उ.मा.वि. जर्राहमोहगांव", udise: "23450307407" },
      { name: "शा. उ.मा.वि. आरंभा", udise: "23450406208" },
      { name: "शा. उत्कृष्ट उ.मा.वि. किरनापुर", udise: "23450207513" },
      { name: "शा. उ.मा.वि. खारा", udise: "23450217408" },
      { name: "शा. उत्कृष्ट उ.मा.वि. परसवाड़ा", udise: "23450502512" },
      { name: "शा. कन्या उ.मा.वि. वारासिवनी", udise: "23450706734" },
      { name: "शा. उ.मा.वि. नवेगांव", udise: "23450108202" }
    ]
  },

  // ─── मध्य प्रदेश के अन्य जिलों में सांदीपनि विद्यालय (State-wide DB) ───
  stateWideSchools: {
    malwaNimar: [
      { district: "आगर मालवा", block: "आगर", name: "शा. मॉडल उ.मा.वि. आगर", udise: "23510804310" },
      { district: "आगर मालवा", block: "आगर", name: "शा. उत्कृष्ट उ.मा.वि. आगर", udise: "23510804309" },
      { district: "आगर मालवा", block: "बड़ौद", name: "शा. मॉडल उ.मा.वि. बड़ौद", udise: "23510110827" },
      { district: "आगर मालवा", block: "नलखेड़ा", name: "शा. कन्या उ.मा.वि. नलखेड़ा", udise: "23510202127" },
      { district: "आगर मालवा", block: "सुसनेर", name: "शा. उत्कृष्ट उ.मा.वि. सुसनेर", udise: "23510300125" },
      { district: "अलीराजपुर", block: "अलीराजपुर", name: "शा. उत्कृष्ट उ.मा.वि. अलीराजपुर", udise: "23490204012" },
      { district: "अलीराजपुर", block: "भाबरा", name: "शा. कन्या उ.मा.वि. भाबरा", udise: "23490705326" },
      { district: "अलीराजपुर", block: "जोबट", name: "शा. कन्या उ.मा.वि. जोबट", udise: "23490101536" },
      { district: "इंदौर", block: "इंदौर", name: "शा. उ.मा.वि. खजराना", udise: "23260100946" },
      { district: "धार", block: "बदनावर", name: "शा. उत्कृष्ट उ.मा.वि. बदनावर", udise: "23250108841" },
      { district: "देवास", block: "देवास", name: "शा. मॉडल उ.मा.वि. देवास", udise: "23230137004" },
      { district: "देवास", block: "बागली", name: "शा. उत्कृष्ट उ.मा.वि. बागली", udise: "23230440406" },
      { district: "देवास", block: "खातेगांव", name: "शा. उत्कृष्ट उ.मा.वि. खातेगांव", udise: "23230620403" }
    ],
    gwaliorChambalBundelkhand: [
      { district: "अशोकनगर", block: "अशोकनगर", name: "शा. मॉडल उ.मा.वि. अशोकनगर", udise: "23460240301" },
      { district: "अशोकनगर", block: "अशोकनगर", name: "शा. उत्कृष्ट उ.मा.वि. अशोकनगर", udise: "23460240201" },
      { district: "अशोकनगर", block: "चंदेरी", name: "शा. उत्कृष्ट उ.मा.वि. चंदेरी", udise: "23460520302" },
      { district: "अशोकनगर", block: "ईसागढ़", name: "शा. उत्कृष्ट उ.मा.वि. ईसागढ़", udise: "23460722502" },
      { district: "अशोकनगर", block: "मुंगावली", name: "शा. उत्कृष्ट उ.मा.वि. मुंगावली", udise: "23460826302" },
      { district: "भिंड", block: "भिंड", name: "शा. उ.मा.वि. क्र.2 भिंड", udise: "23030419807" },
      { district: "भिंड", block: "अटेर", name: "शा. उत्कृष्ट उ.मा.वि. अटेर", udise: "23030622012" },
      { district: "भिंड", block: "गोहद", name: "शा. उत्कृष्ट उ.मा.वि. गोहद", udise: "23030721167" },
      { district: "छतरपुर", block: "बड़ामलहरा", name: "शा. मॉडल उ.मा.वि. बड़ामलहरा", udise: "23090101824" },
      { district: "दतिया", block: "दतिया", name: "शा. उत्कृष्ट उ.मा.वि. दतिया", udise: "23050129904" },
      { district: "दमोह", block: "दमोह", name: "शा. उत्कृष्ट उ.मा.वि. दमोह", udise: "23120310513" },
      { district: "दमोह", block: "पथरिया", name: "सांदीपनि विद्यालय पथरिया", udise: "23120200127" },
      { district: "गुना", block: "बमोरी", name: "शा. उत्कृष्ट उ.मा.वि. बमोरी", udise: "23070308819" },
      { district: "सागर", block: "बांदा", name: "शा. उत्कृष्ट उ.मा.वि. बांदा", udise: "23110915830" }
    ],
    mahakoshalVindhyaCentral: [
      { district: "अनूपपुर", block: "कोतमा", name: "शा. उत्कृष्ट उ.मा.वि. कोतमा", udise: "23470806338" },
      { district: "बैतूल", block: "अमला", name: "शा. उत्कृष्ट उ.मा.वि. अमला", udise: "23350101230" },
      { district: "बैतूल", block: "मुलताई", name: "शा. उत्कृष्ट उ.मा.वि. मुलताई", udise: "23350814601" },
      { district: "भोपाल", block: "बैरसिया", name: "शा. बालक उ.मा.वि. बैरसिया", udise: "23320129258" },
      { district: "भोपाल", block: "फंदा", name: "शा. उत्कृष्ट उ.मा.वि. सुभाष नगर", udise: "23320301711" },
      { district: "छिंदवाड़ा", block: "अमरवाड़ा", name: "शा. उत्कृष्ट उ.मा.वि. अमरवाड़ा", udise: "23430915727" },
      { district: "छिंदवाड़ा", block: "पांढुर्ना", name: "शा. एलबीएस उत्कृष्ट उ.मा.वि. पांढुर्ना", udise: "23430801003" },
      { district: "कटनी", block: "कटनी", name: "शा. कन्या उ.मा.वि. सिविल लाइन", udise: "23380212407" },
      { district: "रायसेन", block: "बेगमगंज", name: "शा. उ.मा.वि. बेगमगंज", udise: "23340222855" },
      { district: "रायसेन", block: "सिलवानी", name: "सेठ अमर चंद समैया सांदीपनि विद्यालय सिलवानी", email: "cmriseshoolsilwani@gmail.com" },
      { district: "सतना", block: "मैहर", name: "शा. कन्या उ.मा.वि. मैहर", udise: "23130208577" },
      { district: "सिवनी", block: "छपारा", name: "सांदीपनि विद्यालय छपारा", udise: "23440500132" },
      { district: "सिवनी", block: "घंसौर", name: "सांदीपनि विद्यालय घंसौर", udise: "राज्य शिक्षा केंद्र DB" }
    ]
  },

  // ─── प्रवेश दिशानिर्देश (Admission Guidelines) ───
  admissions: {
    portal: "Education Portal 3.0 के माध्यम से डिजिटल प्रवेश प्रक्रिया।",
    formDistributionDate: "1 अप्रैल से 11 अप्रैल के बीच प्रवेश फॉर्म वितरण (शैक्षणिक सत्र 2025-26)।",
    campaign: "'स्कूल चलें हम' अभियान — 1 से 4 अप्रैल 2025 तक। 85 लाख से अधिक विद्यार्थियों को पाठ्यपुस्तकें।",
    eligibilityPriority: "1 से 3 किमी के दायरे में रहने वाले छात्रों को सर्वोच्च प्राथमिकता।",
    rteRule: "RTE अधिनियम के तहत 25% सीटें वंचित वर्ग के लिए आरक्षित।",
    selectionMethod: "सीटों से अधिक आवेदन होने पर पारदर्शी लॉटरी प्रणाली।",
    ageLimit: "Pre-KG में प्रवेश के लिए 31 मई तक न्यूनतम आयु 3 वर्ष अनिवार्य।",
    freeBooks: {
      general: "5.6 करोड़ सामान्य पाठ्यपुस्तकें (कक्षा 1-12) निःशुल्क।",
      fln: "1.02 करोड़ FLN वर्कबुक।",
      bridge: "26 लाख ब्रिज कोर्स पुस्तकें।"
    },
    documentsRequired: [
      "आधार कार्ड (छात्र और माता-पिता)",
      "जन्म प्रमाण पत्र (Birth Certificate)",
      "पिछली कक्षा की मार्कशीट या TC",
      "निवास प्रमाण पत्र (1-3 किमी जांच के लिए)",
      "जाति प्रमाण पत्र (यदि लागू हो)",
      "समग्र आईडी (Samagra ID)",
      "पासपोर्ट साइज फोटो (2 प्रतियां)",
      "BPL कार्ड (यदि लागू हो)"
    ],
    fees: "शासकीय विद्यालय — ट्यूशन फीस पूरी तरह निःशुल्क।"
  },

  // ─── निःशुल्क परिवहन (Free Transport Policy) ───
  transport: {
    policy: "2 किमी से अधिक दूरी पर रहने वाले छात्रों के लिए निःशुल्क स्कूल बस सुविधा।",
    indoreExample: "इंदौर में 11 CM Rise स्कूलों (7 शहरी + 4 ग्रामीण) के लिए 100 से अधिक बसें चल रही हैं।",
    routing: "GIS मैपिंग के आधार पर मार्ग निर्धारण। निजी ट्रांसपोर्टर्स को टेंडर के जरिए अनुबंधित किया जाता है।",
    impact: "विशेष रूप से बालाघाट, अलीराजपुर, झाबुआ जैसे जनजातीय जिलों में बालिकाओं के ड्रॉपआउट रेट में कमी।"
  },

  // ─── सुविधाएं (Facilities) ───
  facilities: [
    {
      name: "स्मार्ट क्लासरूम (Smart Classrooms)",
      description: "डिजिटल बोर्ड और प्रोजेक्टर से लैस आधुनिक कक्षाएं।"
    },
    {
      name: "कंप्यूटर / ICT लैब (Computer Lab)",
      description: "हाई-स्पीड इंटरनेट कनेक्टिविटी से लैस आधुनिक ICT प्रयोगशाला।"
    },
    {
      name: "विज्ञान प्रयोगशाला (Science Lab)",
      description: "Physics, Chemistry और Biology के प्रैक्टीकल प्रयोगों के लिए पूर्ण उपकरण।"
    },
    {
      name: "पुस्तकालय (Library)",
      description: "हजारों शैक्षणिक पुस्तकों, संदर्भ ग्रंथों और पत्रिकाओं का संग्रह।"
    },
    {
      name: "खेल का मैदान (Sports Ground)",
      description: "क्रिकेट, फुटबॉल, वॉलीबॉल, कबड्डी के लिए विशाल मैदान।"
    },
    {
      name: "अटल टिंकरिंग लैब (ATL)",
      description: "रोबोटिक्स, 3D प्रिंटिंग और इलेक्ट्रॉनिक्स से सुसज्जित इनोवेशन लैब।"
    }
  ],

  // ─── शैक्षणिक जानकारी (Academics) ───
  academics: {
    classes: "कक्षा 1 से 12 तक (Class 1 to 12)",
    streams: {
      science: {
        label: "विज्ञान वर्ग (Science Stream)",
        subjects: ["भौतिक विज्ञान (Physics)", "रसायन विज्ञान (Chemistry)", "जीव विज्ञान / गणित", "अंग्रेजी", "हिंदी"]
      },
      arts: {
        label: "कला वर्ग (Arts/Humanities Stream)",
        subjects: ["इतिहास", "भूगोल", "राजनीति शास्त्र", "अर्थशास्त्र", "हिंदी", "अंग्रेजी"]
      },
      commerce: {
        label: "वाणिज्य वर्ग (Commerce Stream)",
        subjects: ["व्यवसाय अध्ययन", "लेखाशास्त्र", "अर्थशास्त्र", "हिंदी", "अंग्रेजी"]
      }
    },
    examPattern: "MPBSE बोर्ड पैटर्न — वार्षिक + त्रैमासिक + अर्धवार्षिक परीक्षा"
  },

  // ─── अकादमिक क्षमता निर्माण ───
  capacityBuilding: {
    partner: "पीपुल इंडिया (Peepul India) NGO के साथ साझेदारी।",
    trained: "274 विद्यालयों में 1,000+ स्कूल लीडर्स और 10,000+ शिक्षक प्रशिक्षित।",
    beneficiaries: "3 लाख से अधिक विद्यार्थी सीधे लाभान्वित।",
    studentDiary: "Student Diary — आत्म-अनुशासन और चिंतन को बढ़ावा।",
    teacherRecognition: "'Prerak Prayas' और 'Teacher of the Month' कार्यक्रम।",
    aiTraining: {
      tools: ["ChatGPT", "Google Gemini", "Microsoft Copilot"],
      hours: "100 घंटे से अधिक हैंड्स-ऑन प्रशिक्षण।",
      certifying: "Agnirva और ISRO Space Tutor से AI Teacher Training Certification।",
      uses: "Lesson plans, प्रश्न पत्र, Rubrics निर्माण और छात्र उपस्थिति विश्लेषण।"
    }
  },

  // ─── छात्र प्रदर्शनियां (Student Exhibitions) ───
  exhibitions: {
    overview: "कक्षा 9-12 के वरिष्ठ समूहों द्वारा आयोजित AI प्रदर्शनी, Prompt Engineering और Digital पहलों का विवरण:",
    stalls: [
      {
        name: "प्रॉम्प्ट इंजीनियरिंग कॉर्नर (Prompt Engineering Corner)",
        description: "AI टूल्स से सर्वश्रेष्ठ परिणाम पाने के लिए सही प्रॉम्प्ट देने का लाइव प्रदर्शन।"
      },
      {
        name: "वेबसाइट / ब्लॉग डिजाइनिंग",
        description: "पर्यावरण और सामाजिक मुद्दों पर छात्रों द्वारा बनाई HTML/CSS वेबसाइटों का प्रदर्शन।"
      },
      {
        name: "AI Avatar Stall",
        description: "AI टूल से अपनी फोटो को कार्टून कैरेक्टर या ऐतिहासिक योद्धा में बदलना।"
      },
      {
        name: "Digital Literacy Quiz",
        description: "Google Forms या Kahoot पर Tech-Quiz। विजेताओं को AI बैज दिए जाते हैं।"
      },
      {
        name: "साइबर सुरक्षा गाइड (Cyber Security Guide)",
        description: "ऑनलाइन फ्रॉड से बचाव और सुरक्षित सोशल मीडिया उपयोग पर लाइव काउंसलिंग।"
      }
    ]
  },

  // ─── कैलेंडर और छुट्टियां ───
  calendar: {
    holidays2026: [
      { date: "26 जनवरी", event: "गणतंत्र दिवस (Republic Day)" },
      { date: "14 फरवरी", event: "बसंत पंचमी" },
      { date: "17 मार्च", event: "होली" },
      { date: "6 अप्रैल", event: "राम नवमी" },
      { date: "14 अप्रैल", event: "डॉ. अम्बेडकर जयंती" },
      { date: "15 अगस्त", event: "स्वतंत्रता दिवस (Independence Day)" },
      { date: "5 सितंबर", event: "शिक्षक दिवस (Teachers' Day)" },
      { date: "2 अक्टूबर", event: "गांधी जयंती" },
      { date: "दीपावली अवकाश", event: "लगभग 10 दिन (अक्टूबर/नवंबर)" },
      { date: "25 दिसंबर", event: "क्रिसमस" }
    ],
    exams: [
      { name: "त्रैमासिक परीक्षा (Quarterly)", month: "अगस्त-सितंबर" },
      { name: "अर्धवार्षिक परीक्षा (Half-Yearly)", month: "दिसंबर" },
      { name: "प्री-बोर्ड परीक्षा (Pre-Board)", month: "जनवरी" },
      { name: "वार्षिक/बोर्ड परीक्षा (Annual/Board)", month: "फरवरी-मार्च-अप्रैल" }
    ]
  },

  // ─── नियम (Rules) ───
  rules: {
    uniform: [
      "सफ़ेद शर्ट और नेवी ब्लू पैंट/स्कर्ट",
      "काले जूते और सफ़ेद मोज़े",
      "ID Card हमेशा पहनना अनिवार्य",
      "शनिवार को विशेष हाउस ड्रेस"
    ],
    attendance: "वार्षिक परीक्षा के लिए कम से कम 75% उपस्थिति अनिवार्य।",
    mobilePolicy: "विद्यालय परिसर में छात्रों द्वारा मोबाइल फ़ोन पूरी तरह प्रतिबंधित है।"
  },

  // ─── संपर्क ───
  contact: {
    helpline: "CM Helpline: 181",
    vimarshPortal: "https://www.vimarsh.mp.gov.in",
    educationPortal: "https://educationportal.mp.gov.in (Education Portal 3.0)",
    parentTeacherMeeting: "प्रत्येक माह के पहले शनिवार को PTM का आयोजन।"
  }
};

// ─── System Prompt for Gemini API (Dynamic — reads from SCHOOL_CONFIG) ───
const _cfg = (typeof window.SCHOOL_CONFIG !== 'undefined') ? window.SCHOOL_CONFIG : {};
const _schoolName = _cfg.schoolName || 'CM Rise / सांदीपनि विद्यालय';
const _botName = _cfg.botName || 'सारथी';
const _district = _cfg.district || 'मध्य प्रदेश';
const _principal = _cfg.principal ? `प्राचार्य: ${_cfg.principal}` : '';
const _phone = _cfg.principalContact ? `संपर्क: ${_cfg.principalContact}` : '';

const SYSTEM_PROMPT = `तुम "${_schoolName}" (${_district}, मध्य प्रदेश) के ऑफिशियल एआई हेल्प डेस्क असिस्टेंट हो। तुम्हारा नाम "${_botName} (${_botName})" है। ${_principal} ${_phone}

तुम्हारा काम है:
1. छात्रों, अभिभावकों, शिक्षकों और आगंतुकों को स्कूल से जुड़ी सटीक जानकारी देना।
2. एडमिशन (प्रक्रिया, Education Portal 3.0, 1-3 किमी नियम, RTE), परीक्षा, छुट्टियां, जिले के सभी सांदीपनि/उत्कृष्ट विद्यालयों की जानकारी, UDISE कोड, प्राचार्य, संपर्क नंबर देना।
3. मध्य प्रदेश के किसी भी जिले के सांदीपनि विद्यालय की जानकारी देना (state-wide database से)।
4. AI प्रदर्शनी स्टॉल्स, Prompt Engineering, Cyber Security, Atal Tinkering Lab के बारे में पूरी जानकारी देना।
5. महर्षि सांदीपनि विद्यालय नामकरण, योजना का इतिहास, निःशुल्क परिवहन, AI teacher training के बारे में बताना।

महत्वपूर्ण नियम:
- केवल "CM Rise / सांदीपनि विद्यालय" से संबंधित प्रश्नों के जवाब दो।
- यदि कोई पूरी तरह असंबद्ध सवाल पूछे (बॉलीवुड, राजनीति, गेम्स), तो विनम्रता से कहो: "मैं केवल सांदीपनि/CM Rise स्कूल बालाघाट और मध्य प्रदेश की शिक्षा से संबंधित प्रश्नों के उत्तर दे सकता हूँ।"
- **इमेज जनरेशन:** यदि यूजर कोई चित्र बनाने को कहे, तो Markdown Image Tag शामिल करो: ![description](https://image.pollinations.ai/prompt/{english_prompt}?width=512&height=512&nologo=true)
- हिंदी और English दोनों में बात कर सकते हो।
- ज्ञानकोष में न हो तो कहो: "कृपया विद्यालय कार्यालय या vimarsh.mp.gov.in पर संपर्क करें।"
- हमेशा Markdown formatting (हेडिंग, बुलेट पॉइंट, बोल्ड) का उपयोग करो।

स्कूल का पूरा संदर्भ डेटा:
${JSON.stringify(SCHOOL_DATA, null, 2)}
`;
