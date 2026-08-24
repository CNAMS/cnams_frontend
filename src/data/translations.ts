export type Language = 'en' | 'hi' | 'mr' | 'gu';

/** Every string carries both locales. Hindi is primary, English the fallback. */
type Entry = { en: string; hi: string; mr: string; gu: string };

/**
 * `satisfies` rather than a type annotation, deliberately.
 *
 * Annotating this as `Translations` with an index signature widened the key
 * type to `string`, so `t('typoo')` type-checked fine and failed at runtime
 * with a console warning nobody reads. `satisfies` validates the shape while
 * preserving the literal keys, which makes TranslationKey a real union and a
 * missing or misspelled key a compile error.
 *
 * This is the web equivalent of NFR-16 on the app side, where hardcoded
 * user-facing strings fail the build.
 */
export const translations = {
  // Global & Headers
  appTitle: { en: 'Supervisor Dashboard', hi: 'पर्यवेक्षक डैशबोर्ड', mr: 'पर्यवेक्षक डॅशबोर्ड', gu: 'સુપરવાઇઝર ડેશબોર્ડ' },
  logout: { en: 'Logout', hi: 'लॉग आउट', mr: 'लॉगआउट करा', gu: 'લોગઆઉટ' },
  
  // Login Page
  pinLabel: { en: 'PIN / Password', hi: 'पिन / पासवर्ड', mr: 'पिन / पासवर्ड', gu: 'PIN / પાસવર્ડ' },
  mockLoginButton: { en: 'Mock Login', hi: 'मॉक लॉगिन', mr: 'मॉक लॉगिन', gu: 'મોક લોગિન' },

  // Home Page
  trackDOverview: { en: 'Track D - Overview', hi: 'ट्रैक D - अवलोकन', mr: 'ट्रॅक डी - विहंगावलोकन', gu: 'ટ્રેક ડી - વિહંગાવલોકન' },
  screenedThisMonth: { en: 'Screened This Month', hi: 'इस महीने जांच की गई', mr: 'या महिन्यात स्क्रीनिंग केले', gu: 'આ મહિને સ્ક્રીનીંગ કરેલ' },
  totalSamMam: { en: 'Total SAM/MAM', hi: 'कुल SAM/MAM', mr: 'एकूण SAM/MAM', gu: 'કુલ SAM/MAM' },
  nonReportingCentres: { en: 'Non-Reporting Centres', hi: 'रिपोर्ट न करने वाले केंद्र', mr: 'नॉन-रिपोर्टिंग केंद्रे', gu: 'નોન-રિપોર્ટિંગ કેન્દ્રો' },
  pendingReferrals: { en: 'Pending Referrals', hi: 'लंबित रेफरल', mr: 'प्रलंबित रेफरल्स', gu: 'બાકી રેફરલ્સ' },
  centresOverview: { en: 'Centres Overview', hi: 'केंद्र अवलोकन', mr: 'केंद्रांचे विहंगावलोकन', gu: 'કેન્દ્રોની ઝાંખી' },
  centre: { en: 'Centre', hi: 'केंद्र', mr: 'केंद्र', gu: 'કેન્દ્ર' },
  screened: { en: 'Screened', hi: 'जांच की गई', mr: 'स्क्रीनिंग केले', gu: 'સ્ક્રીનીંગ' },
  sam: { en: 'SAM', hi: 'SAM', mr: 'SAM', gu: 'એસએએમ' },
  mam: { en: 'MAM', hi: 'MAM', mr: 'MAM', gu: 'MAM' },
  viewAll: { en: 'View All', hi: 'सभी देखें', mr: 'सर्व पहा', gu: 'બધા જુઓ' },
  daysElapsed: { en: 'days elapsed', hi: 'दिन बीत गए', mr: 'दिवस गेले', gu: 'દિવસો વીતી ગયા' },
  noPendingReferrals: { en: 'No pending referrals.', hi: 'कोई लंबित रेफरल नहीं है।', mr: 'कोणतेही प्रलंबित संदर्भ नाहीत.', gu: 'કોઈ બાકી રેફરલ્સ નથી.' },

  // Referrals Page
  referralsListTitle: { en: 'Referrals Action List', hi: 'रेफरल कार्रवाई सूची', mr: 'संदर्भ क्रिया सूची', gu: 'રેફરલ્સ ક્રિયા યાદી' },
  referralsListSubtitle: { en: 'Flagged children pending action or outcome resolution', hi: 'कार्रवाई या परिणाम समाधान के लिए लंबित चिह्नित बच्चे', mr: 'प्रलंबित कृती किंवा निकाल निराकरण मुलांना ध्वजांकित केले', gu: 'ધ્વજાંકિત બાળકો બાકી ક્રિયા અથવા પરિણામ ઠરાવ' },
  filter: { en: 'Filter:', hi: 'फ़िल्टर:', mr: 'फिल्टर:', gu: 'ફિલ્ટર:' },
  all: { en: 'All', hi: 'सभी', mr: 'सर्व', gu: 'બધા' },
  daysPending: { en: 'Days Pending', hi: 'लंबित दिन', mr: 'प्रलंबित दिवस', gu: 'દિવસો બાકી' },
  childInitials: { en: 'Child Initials', hi: 'बच्चे के नाम के पहले अक्षर', mr: 'बाल आद्याक्षरे', gu: 'બાળ આદ્યાક્ષરો' },
  icdsId: { en: 'ICDS ID', hi: 'आईसीडीएस आईडी', mr: 'ICDS आयडी', gu: 'ICDS ID' },
  classification: { en: 'Classification', hi: 'वर्गीकरण', mr: 'वर्गीकरण', gu: 'વર્ગીકરણ' },
  referralState: { en: 'Referral State', hi: 'रेफरल स्थिति', mr: 'रेफरल राज्य', gu: 'રેફરલ રાજ્ય' },
  outcomeRecorded: { en: 'Outcome Recorded', hi: 'परिणाम दर्ज किया गया', mr: 'निकाल नोंदवला', gu: 'પરિણામ નોંધાયેલ' },
  referred: { en: 'Referred', hi: 'रेफर किया गया', mr: 'संदर्भित', gu: 'સંદર્ભિત' },
  notReferred: { en: 'Not Referred', hi: 'रेफर नहीं किया गया', mr: 'संदर्भित नाही', gu: 'સંદર્ભિત નથી' },
  resolved: { en: 'Resolved', hi: 'समाधान हो गया', mr: 'निराकरण केले', gu: 'ઉકેલાઈ' },
  pendingOutcome: { en: 'Pending Outcome', hi: 'परिणाम लंबित है', mr: 'प्रलंबित निकाल', gu: 'બાકી પરિણામ' },
  noFlaggedFound: { en: 'No matching flagged children found.', hi: 'कोई मेल खाने वाले चिह्नित बच्चे नहीं मिले।', mr: 'कोणतीही जुळणारी ध्वजांकित मुले आढळली नाहीत.', gu: 'કોઈ મેળ ખાતા ફ્લેગવાળા બાળકો મળ્યા નથી.' },

  // Centre Detail Page
  centreDrillDown: { en: 'Centre Drill-Down View', hi: 'केंद्र ड्रिल-डाउन दृश्य', mr: 'केंद्र ड्रिल-डाउन दृश्य', gu: 'કેન્દ્ર ડ્રિલ-ડાઉન વ્યૂ' },
  deviceHardware: { en: 'Device Hardware', hi: 'डिवाइस हार्डवेयर', mr: 'डिव्हाइस हार्डवेअर', gu: 'ઉપકરણ હાર્ડવેર' },
  status: { en: 'Status', hi: 'स्थिति', mr: 'स्थिती', gu: 'સ્થિતિ' },
  connected: { en: 'Connected', hi: 'जुड़ा हुआ', mr: 'जोडलेले', gu: 'કનેક્ટેડ' },
  calOverdue: { en: 'Cal. Overdue', hi: 'कैलिब्रेशन बाकी है', mr: 'कॅल. ओव्हरड्यू', gu: 'કેલ. મુદતવીતી' },
  disconnected: { en: 'Disconnected', hi: 'डिस्कनेक्ट हो गया', mr: 'डिस्कनेक्ट केले', gu: 'ડિસ્કનેક્ટ' },
  battery: { en: 'Battery', hi: 'बैटरी', mr: 'बॅटरी', gu: 'બેટરી' },
  serialNo: { en: 'Serial No', hi: 'सीरियल नंबर', mr: 'अनुक्रमांक', gu: 'સીરીયલ નં' },
  lastSynced: { en: 'Last Synced', hi: 'अंतिम सिंक', mr: 'शेवटचे समक्रमित', gu: 'છેલ્લે સમન્વયિત' },
  malnutritionSummary: { en: 'Malnutrition Summary', hi: 'कुपोषण सारांश', mr: 'कुपोषण सारांश', gu: 'કુપોષણ સારાંશ' },
  casesFromCriteria: { en: 'Cases determined from WHO Z-Score criteria', hi: 'WHO Z-स्कोर मानदंड से निर्धारित मामले', mr: 'डब्ल्यूएचओ झेड-स्कोअर निकषांवरून निर्धारित प्रकरणे', gu: 'ડબ્લ્યુએચઓ ઝેડ-સ્કોરના માપદંડો પરથી નિર્ધારિત કેસો' },
  lastReported: { en: 'Last reported:', hi: 'अंतिम रिपोर्ट:', mr: 'अंतिम अहवाल:', gu: 'છેલ્લે અહેવાલ:' },
  screeningHistory: { en: 'Screening History (Trend)', hi: 'जांच इतिहास (ट्रेंड)', mr: 'स्क्रीनिंग इतिहास (ट्रेंड)', gu: 'સ્ક્રિનિંગ ઇતિહાસ (ચલણ)' },
  noTrendData: { en: 'No trend data available.', hi: 'कोई ट्रेंड डेटा उपलब्ध नहीं है।', mr: 'कोणताही ट्रेंड डेटा उपलब्ध नाही.', gu: 'કોઈ ટ્રેન્ડ ડેટા ઉપલબ્ધ નથી.' },
  flaggedCases: { en: 'Flagged Cases (Attention Required)', hi: 'चिह्नित मामले (ध्यान देने की आवश्यकता)', mr: 'ध्वजांकित प्रकरणे (लक्ष आवश्यक)', gu: 'ફ્લેગ કરેલા કેસો (ધ્યાન જરૂરી)' },
  noFlaggedHere: { en: 'No flagged cases at this centre.', hi: 'इस केंद्र पर कोई चिह्नित मामले नहीं हैं।', mr: 'या केंद्रावर कोणतीही ध्वजांकित प्रकरणे नाहीत.', gu: 'આ કેન્દ્ર પર કોઈ ફ્લેગ કરેલા કેસ નથી.' },

  // Data Quality Page
  dataQualityTitle: { en: 'Diagnostics & Data Quality', hi: 'निदान और डेटा गुणवत्ता', mr: 'निदान आणि डेटा गुणवत्ता', gu: 'ડાયગ્નોસ્ટિક્સ અને ડેટા ગુણવત્તા' },
  dataQualitySubtitle: { en: 'Internal tracking & developer diagnostics panel', hi: 'आंतरिक ट्रैकिंग और डेवलपर डायग्नोस्टिक्स पैनल', mr: 'अंतर्गत ट्रॅकिंग आणि विकासक निदान पॅनेल', gu: 'આંતરિક ટ્રેકિંગ અને વિકાસકર્તા ડાયગ્નોસ્ટિક્સ પેનલ' },
  engineMismatches: { en: 'Engine Mismatches', hi: 'इंजन बेमेल', mr: 'इंजिन जुळत नाही', gu: 'એન્જિન મેળ ખાતું નથી' },
  implausibleValues: { en: 'Implausible Values', hi: 'असंभव मूल्य', mr: 'अकल्पनीय मूल्ये', gu: 'અકલ્પ્ય મૂલ્યો' },
  staleDevices7d: { en: 'Stale Devices (>7d)', hi: 'पुराने डिवाइस (>7d)', mr: 'जुनी उपकरणे (>7d)', gu: 'જૂના ઉપકરણો (>7d)' },
  diagnosticsLog: { en: 'Diagnostics Log', hi: 'डायग्नोस्टिक्स लॉग', mr: 'डायग्नोस्टिक्स लॉग', gu: 'ડાયગ્નોસ્ટિક્સ લોગ' },
  reevaluate: { en: 'Re-evaluate', hi: 'पुनर्मूल्यांकन', mr: 'पुनर्मूल्यांकन करा', gu: 'પુનઃમૂલ્યાંકન કરો' },
  reevaluateQueued: {
    en: 'Re-evaluation queued. The record will be reclassified on the next sync.',
    hi: 'पुनर्मूल्यांकन कतार में। अगली सिंक पर रिकॉर्ड का पुनर्वर्गीकरण होगा।', mr: 'पुनर्मूल्यांकन रांगेत. पुढील सिंकवर रेकॉर्डचे पुनर्वर्गीकरण केले जाईल.', gu: 'પુનઃમૂલ્યાંકન કતારબદ્ધ. આગામી સમન્વયન પર રેકોર્ડનું ફરીથી વર્ગીકરણ કરવામાં આવશે.',
  },
  staleDevicesTitle: { en: 'Stale Devices (No sync in 7+ days)', hi: 'पुराने डिवाइस (7+ दिनों में कोई सिंक नहीं)', mr: 'जुनी डिव्हाइसेस (७+ दिवसात सिंक नाही)', gu: 'જૂના ઉપકરણો (7+ દિવસમાં કોઈ સિંક નહીં)' },
  firmware: { en: 'Firmware', hi: 'फर्मवेयर', mr: 'फर्मवेअर', gu: 'ફર્મવેર' },
  noDataRecords: { en: 'No data quality diagnostic records logged.', hi: 'कोई डेटा गुणवत्ता डायग्नोस्टिक रिकॉर्ड लॉग नहीं किया गया।', mr: 'कोणतेही डेटा गुणवत्ता निदान रेकॉर्ड लॉग केलेले नाहीत.', gu: 'કોઈ ડેટા ગુણવત્તા ડાયગ્નોસ્ટિક રેકોર્ડ લોગ થયેલ નથી.' },
  noStaleDetected: { en: 'All devices are syncing regularly. No stale devices detected.', hi: 'सभी डिवाइस नियमित रूप से सिंक कर रहे हैं। कोई पुराने डिवाइस नहीं मिले।', mr: 'सर्व उपकरणे नियमितपणे समक्रमित होत आहेत. कोणतीही जुनी उपकरणे आढळली नाहीत.', gu: 'બધા ઉપકરણો નિયમિતપણે સમન્વયિત થાય છે. કોઈ જૂના ઉપકરણો મળ્યાં નથી.' },

  // Public Landing Page (Website)
  publicWebsiteTitle: { en: 'Child Nutrition Monitoring System', hi: 'बाल पोषण निगरानी प्रणाली', mr: 'बाल पोषण निरीक्षण प्रणाली', gu: 'બાળ પોષણ મોનિટરિંગ સિસ્ટમ' },
  publicWebsiteSubtitle: { en: 'Real-time tracking and analytics for Anganwadi centres across the region.', hi: 'क्षेत्र भर में आंगनवाड़ी केंद्रों के लिए वास्तविक समय ट्रैकिंग और विश्लेषण।', mr: 'संपूर्ण प्रदेशातील अंगणवाडी केंद्रांसाठी रिअल-टाइम ट्रॅकिंग आणि विश्लेषण.', gu: 'સમગ્ર પ્રદેશમાં આંગણવાડી કેન્દ્રો માટે રીઅલ-ટાઇમ ટ્રેકિંગ અને વિશ્લેષણ.' },
  systemOverview: { en: 'System Overview', hi: 'प्रणाली अवलोकन', mr: 'सिस्टम विहंगावलोकन', gu: 'સિસ્ટમ વિહંગાવલોકન' },
  totalCentresActive: { en: 'Active Centres', hi: 'सक्रिय केंद्र', mr: 'सक्रिय केंद्रे', gu: 'સક્રિય કેન્દ્રો' },
  childrenMonitored: { en: 'Children Monitored', hi: 'निगरानी किए गए बच्चे', mr: 'मुलांचे निरीक्षण केले', gu: 'બાળકોનું નિરીક્ષણ કર્યું' },
  loginPortalBtn: { en: 'Login to Portal', hi: 'पोर्टल में लॉगिन करें', mr: 'पोर्टलवर लॉगिन करा', gu: 'પોર્ટલ પર લોગિન કરો' },

  // ── Admin: configuration ─────────────────────────────────────────────────
  configSubtitle: { en: 'Reference data and operational settings', hi: 'संदर्भ डेटा और संचालन सेटिंग्स', mr: 'संदर्भ डेटा आणि ऑपरेशनल सेटिंग्ज', gu: 'સંદર્ભ ડેટા અને ઓપરેશનલ સેટિંગ્સ' },
  configClinical: { en: 'Clinical constants', hi: 'नैदानिक स्थिरांक', mr: 'क्लिनिकल स्थिरांक', gu: 'ક્લિનિકલ સ્થિરાંકો' },
  configClinicalHint: {
    en: 'These are not preferences. Every measurement records the engine version used, so a past z-score can be reproduced exactly — changing these from a settings screen would invalidate that history.',
    hi: 'ये प्राथमिकताएँ नहीं हैं। हर माप में प्रयुक्त इंजन संस्करण दर्ज होता है, ताकि पुराना ज़ेड-स्कोर हूबहू दोहराया जा सके — इन्हें सेटिंग्स से बदलना उस इतिहास को अमान्य कर देगा।', mr: 'ही प्राधान्ये नाहीत. प्रत्येक मोजमाप वापरलेली इंजिन आवृत्ती रेकॉर्ड करते, त्यामुळे मागील z-स्कोअर अचूकपणे पुनरुत्पादित केला जाऊ शकतो — सेटिंग्ज स्क्रीनवरून हे बदलल्यास तो इतिहास अवैध होईल.', gu: 'આ પસંદગીઓ નથી. દરેક માપન વપરાયેલ એન્જિન સંસ્કરણને રેકોર્ડ કરે છે, તેથી ભૂતકાળના z-સ્કોરને બરાબર પુનઃઉત્પાદિત કરી શકાય છે - સેટિંગ્સ સ્ક્રીનમાંથી આને બદલવાથી તે ઇતિહાસ અમાન્ય થઈ જશે.',
  },
  configOperational: { en: 'Operational settings', hi: 'संचालन सेटिंग्स', mr: 'ऑपरेशनल सेटिंग्ज', gu: 'ઓપરેશનલ સેટિંગ્સ' },
  configOperationalHint: {
    en: 'Thresholds the project team can tune without clinical review.',
    hi: 'वे सीमाएँ जिन्हें टीम नैदानिक समीक्षा के बिना बदल सकती है।', mr: 'क्लिनिकल पुनरावलोकनाशिवाय प्रकल्प कार्यसंघ ट्यून करू शकणारे थ्रेशोल्ड.', gu: 'ક્લિનિકલ સમીક્ષા વિના પ્રોજેક્ટ ટીમ ટ્યુન કરી શકે તે થ્રેશોલ્ડ.',
  },
  configEdit: { en: 'Edit', hi: 'बदलें', mr: 'संपादित करा', gu: 'સંપાદિત કરો' },
  cfgReferenceTables: { en: 'WHO reference tables', hi: 'WHO संदर्भ तालिकाएँ', mr: 'WHO संदर्भ सारणी', gu: 'WHO સંદર્ભ કોષ્ટકો' },
  cfgReferenceTablesHint: {
    en: 'The LMS growth standards every z-score is computed against.',
    hi: 'वे LMS विकास मानक जिनके आधार पर हर ज़ेड-स्कोर निकाला जाता है।', mr: 'प्रत्येक z-स्कोअरच्या विरूद्ध LMS वाढ मानकांची गणना केली जाते.', gu: 'દરેક z-સ્કોરની સામે LMS વૃદ્ધિના ધોરણોની ગણતરી કરવામાં આવે છે.',
  },
  cfgEngineVersion: { en: 'Z-score engine', hi: 'ज़ेड-स्कोर इंजन', mr: 'झेड-स्कोर इंजिन', gu: 'ઝેડ-સ્કોર એન્જિન' },
  cfgEngineVersionHint: {
    en: 'Stamped on every measurement row for reproducibility and audit.',
    hi: 'पुनरुत्पादन और ऑडिट हेतु हर माप पंक्ति पर दर्ज।', mr: 'पुनरुत्पादकता आणि ऑडिटसाठी प्रत्येक मापन पंक्तीवर शिक्का मारला जातो.', gu: 'પુનઃઉત્પાદનક્ષમતા અને ઓડિટ માટે દરેક માપન પંક્તિ પર સ્ટેમ્પ્ડ.',
  },
  cfgOverdueThreshold: { en: 'Overdue threshold', hi: 'विलंब सीमा', mr: 'ओव्हरड्यू थ्रेशोल्ड', gu: 'મુદતવીતી થ્રેશોલ્ડ' },
  cfgOverdueThresholdHint: {
    en: 'How long since the last measurement before a child is flagged overdue.',
    hi: 'अंतिम माप के कितने समय बाद बच्चा विलंबित माना जाए।', mr: 'मुलाच्या आधीचे शेवटचे मोजमाप किती काळापासून फ्लॅग केले गेले आहे.', gu: 'બાળકની છેલ્લી માપણી મુદતવીતી ફ્લેગ કરવામાં આવે તે પહેલાં કેટલા સમયથી.',
  },
  cfgSyncBatchSize: { en: 'Sync batch size', hi: 'सिंक बैच आकार', mr: 'बॅच आकार समक्रमित करा', gu: 'સમન્વયિત બેચ કદ' },
  cfgSyncBatchSizeHint: {
    en: 'Records sent to the server per batch.',
    hi: 'प्रति बैच सर्वर को भेजे गए रिकॉर्ड।', mr: 'प्रति बॅच सर्व्हरला पाठवलेले रेकॉर्ड.', gu: 'બેચ દીઠ સર્વરને મોકલવામાં આવેલ રેકોર્ડ્સ.',
  },
  cfgStaleDeviceDays: { en: 'Stale device threshold', hi: 'पुराना डिवाइस सीमा', mr: 'स्टेल डिव्हाइस थ्रेशोल्ड', gu: 'વાસી ઉપકરણ થ્રેશોલ્ડ' },
  cfgStaleDeviceDaysHint: {
    en: 'How long without a sync before a device is reported stale.',
    hi: 'कितने समय बिना सिंक रहने पर डिवाइस पुराना माना जाए।', mr: 'डिव्हाइस जुने झाल्याची तक्रार करण्यापूर्वी किती वेळ सिंक न करता.', gu: 'ઉપકરણ વાસી હોવાની જાણ થાય તે પહેલાં કેટલા સમય સુધી સમન્વયન વિના.',
  },
  configGateTitle: { en: 'Reference tables not yet loaded', hi: 'संदर्भ तालिकाएँ अभी लोड नहीं', mr: 'संदर्भ तक्ते अद्याप लोड केलेले नाहीत', gu: 'સંદર્ભ કોષ્ટકો હજી લોડ થયા નથી' },
  configGateBody: {
    en: 'The official WHO tables have not been installed on this deployment. Until they are, the engine reports every result as indeterminate — with the exception that oedema still forces a SAM classification. This is deliberate fail-safe behaviour, not a fault.',
    hi: 'इस परिनियोजन पर आधिकारिक WHO तालिकाएँ स्थापित नहीं हैं। तब तक इंजन हर परिणाम को अनिर्धारित बताता है — केवल सूजन होने पर SAM वर्गीकरण लागू रहता है। यह जानबूझकर बनाया गया सुरक्षित व्यवहार है, कोई खराबी नहीं।', mr: 'या तैनातीवर अधिकृत WHO टेबल स्थापित केलेले नाहीत. ते होईपर्यंत, इंजिन प्रत्येक परिणाम अनिश्चित म्हणून नोंदवते — अपवाद वगळता की एडेमा अजूनही SAM वर्गीकरणास भाग पाडते. हे मुद्दाम अयशस्वी-सुरक्षित वर्तन आहे, दोष नाही.', gu: 'આ જમાવટ પર સત્તાવાર WHO કોષ્ટકો સ્થાપિત કરવામાં આવ્યા નથી. જ્યાં સુધી તે ન હોય ત્યાં સુધી, એન્જિન દરેક પરિણામને અનિશ્ચિત તરીકે જણાવે છે - અપવાદ સિવાય કે એડીમા હજુ પણ SAM વર્ગીકરણને દબાણ કરે છે. આ ઇરાદાપૂર્વકનું નિષ્ફળ-સલામત વર્તન છે, દોષ નથી.',
  },

  // ── Admin: audit ─────────────────────────────────────────────────────────
  auditSubtitle: { en: 'Who changed what, and when', hi: 'किसने क्या बदला, और कब', mr: 'कोणी काय आणि केव्हा बदलले', gu: 'કોણે શું અને ક્યારે બદલ્યું' },
  auditRecent: { en: 'Recent activity', hi: 'हाल की गतिविधि', mr: 'अलीकडील क्रियाकलाप', gu: 'તાજેતરની પ્રવૃત્તિ' },
  auditEmpty: { en: 'No activity recorded.', hi: 'कोई गतिविधि दर्ज नहीं।', mr: 'कोणतीही गतिविधी रेकॉर्ड केलेली नाही.', gu: 'કોઈ પ્રવૃત્તિ રેકોર્ડ નથી.' },
  auditEmptyBody: {
    en: 'Approvals, measurements and consent changes will appear here.',
    hi: 'अनुमोदन, माप और सहमति परिवर्तन यहाँ दिखेंगे।', mr: 'मंजूरी, मोजमाप आणि संमती बदल येथे दिसतील.', gu: 'મંજૂરીઓ, માપન અને સંમતિ ફેરફારો અહીં દેખાશે.',
  },
  auditRetentionNote: {
    en: 'Audit entries are retained for the life of the programme and cannot be edited or deleted from this screen.',
    hi: 'ऑडिट प्रविष्टियाँ कार्यक्रम की पूरी अवधि तक रखी जाती हैं और इस स्क्रीन से न बदली जा सकती हैं न हटाई जा सकती हैं।', mr: 'ऑडिट एंट्री प्रोग्रामच्या आयुष्यासाठी ठेवल्या जातात आणि या स्क्रीनवरून संपादित किंवा हटवल्या जाऊ शकत नाहीत.', gu: 'ઓડિટ એન્ટ્રીઓ પ્રોગ્રામના જીવન માટે જાળવી રાખવામાં આવે છે અને આ સ્ક્રીનમાંથી સંપાદિત અથવા કાઢી શકાતી નથી.',
  },
  auditApprovedUser: { en: 'approved the account of', hi: 'ने खाता स्वीकृत किया —', mr: 'चे खाते मंजूर केले', gu: 'ના ખાતાને મંજૂરી આપી' },
  auditRecordedMeasurement: { en: 'recorded a measurement for', hi: 'ने माप दर्ज की —', mr: 'साठी मोजमाप नोंदवले', gu: 'માટે માપન રેકોર્ડ કર્યું' },
  auditRecordedOutcome: { en: 'recorded a referral outcome for', hi: 'ने रेफरल परिणाम दर्ज किया —', mr: 'साठी रेफरल परिणाम रेकॉर्ड केला', gu: 'માટે રેફરલ પરિણામ રેકોર્ડ કર્યું' },
  auditConsentWithdrawn: { en: 'processed a consent withdrawal for', hi: 'ने सहमति वापसी दर्ज की —', mr: 'साठी संमती मागे घेण्याची प्रक्रिया केली', gu: 'માટે સંમતિ પાછી ખેંચવાની પ્રક્રિયા કરી' },
  auditSuspendedUser: { en: 'suspended the account of', hi: 'ने खाता निलंबित किया —', mr: 'चे खाते निलंबित केले', gu: 'નું ખાતું સસ્પેન્ડ કર્યું' },
  auditReferenceTablesLoaded: { en: 'loaded reference tables', hi: 'ने संदर्भ तालिकाएँ लोड कीं —', mr: 'लोड केलेल्या संदर्भ सारण्या', gu: 'લોડ કરેલ સંદર્ભ કોષ્ટકો' },

  // ── Admin: app health (system performance, not children) ─────────────────
  appHealthSubtitle: { en: 'Adoption, sync and stability', hi: 'उपयोग, सिंक और स्थिरता', mr: 'दत्तक, समक्रमण आणि स्थिरता', gu: 'દત્તક, સુમેળ અને સ્થિરતા' },
  healthCrashFree: { en: 'Crash-free sessions', hi: 'बिना क्रैश सत्र', mr: 'क्रॅश-मुक्त सत्रे', gu: 'ક્રેશ-ફ્રી સત્રો' },
  healthSyncLatency: { en: 'Median sync time', hi: 'औसत सिंक समय', mr: 'मध्यम समक्रमण वेळ', gu: 'મધ્ય સમન્વયન સમય' },
  healthOutboxBacklog: { en: 'Outbox backlog', hi: 'आउटबॉक्स बैकलॉग', mr: 'आउटबॉक्स अनुशेष', gu: 'આઉટબોક્સ બેકલોગ' },
  healthOutboxHint: { en: 'records waiting', hi: 'रिकॉर्ड प्रतीक्षारत', mr: 'रेकॉर्ड प्रतीक्षा', gu: 'રેકોર્ડ રાહ જોઈ રહ્યા છે' },
  healthActiveDevices: { en: 'Active devices (7d)', hi: 'सक्रिय डिवाइस (7 दिन)', mr: 'सक्रिय उपकरणे (7d)', gu: 'સક્રિય ઉપકરણો (7d)' },
  healthDeadLetters: { en: 'Dead-lettered records', hi: 'विफल रिकॉर्ड', mr: 'मृत-अक्षर रेकॉर्ड', gu: 'ડેડ-લેટર રેકોર્ડ્સ' },
  healthDeadLettersHint: {
    en: 'Records the server rejected outright. These will never sync without someone intervening.',
    hi: 'सर्वर द्वारा अस्वीकृत रिकॉर्ड। किसी के हस्तक्षेप के बिना ये कभी सिंक नहीं होंगे।', mr: 'पूर्णपणे नाकारलेल्या सर्व्हरची नोंद करते. कोणीतरी हस्तक्षेप केल्याशिवाय हे कधीही समक्रमित होणार नाहीत.', gu: 'સર્વર સંપૂર્ણપણે નકારેલ રેકોર્ડ કરે છે. કોઈના હસ્તક્ષેપ વિના આ ક્યારેય સમન્વયિત થશે નહીં.',
  },
  healthSyncTitle: { en: 'Sync success this week', hi: 'इस सप्ताह सिंक सफलता', mr: 'या आठवड्यात समक्रमण यश', gu: 'આ અઠવાડિયે સિંક સફળતા' },
  healthSyncHint: {
    en: 'Batches delivered to the server each day, and how many failed.',
    hi: 'हर दिन सर्वर तक पहुँचे बैच, और कितने विफल हुए।', mr: 'प्रत्येक दिवशी सर्व्हरवर वितरित केलेल्या बॅचेस आणि किती अयशस्वी झाले.', gu: 'સર્વર પર દરરોજ વિતરિત થતી બેચ અને કેટલી નિષ્ફળ ગઈ.',
  },
  healthSynced: { en: 'Synced', hi: 'सिंक हुए', mr: 'समक्रमित', gu: 'સમન્વયિત' },
  healthFailed: { en: 'Failed', hi: 'विफल', mr: 'अयशस्वी', gu: 'નિષ્ફળ' },
  healthOfflineTitle: { en: 'Offline usage', hi: 'ऑफ़लाइन उपयोग', mr: 'ऑफलाइन वापर', gu: 'ઑફલાઇન ઉપયોગ' },
  healthOfflineHint: {
    en: 'A high share is expected and healthy — the field app is built to work without a network.',
    hi: 'अधिक हिस्सा अपेक्षित और सही है — फ़ील्ड ऐप बिना नेटवर्क चलने के लिए ही बना है।', mr: 'उच्च वाटा अपेक्षित आणि निरोगी आहे — फील्ड ॲप नेटवर्कशिवाय कार्य करण्यासाठी तयार केले आहे.', gu: 'ઉચ્ચ શેર અપેક્ષિત અને તંદુરસ્ત છે — ફીલ્ડ એપ્લિકેશન નેટવર્ક વિના કામ કરવા માટે બનાવવામાં આવી છે.',
  },
  healthOfflineSessions: { en: 'Sessions started offline', hi: 'ऑफ़लाइन शुरू हुए सत्र', mr: 'सत्र ऑफलाइन सुरू झाले', gu: 'સત્રો ઑફલાઇન શરૂ થયા' },
  healthVersionSpread: { en: 'App versions in the field', hi: 'फ़ील्ड में ऐप संस्करण', mr: 'फील्डमधील ॲप आवृत्त्या', gu: 'ક્ષેત્રમાં એપ્લિકેશન સંસ્કરણો' },
  healthCurrent: { en: 'Current', hi: 'वर्तमान', mr: 'चालू', gu: 'વર્તમાન' },
  healthDevices: { en: 'devices', hi: 'डिवाइस', mr: 'उपकरणे', gu: 'ઉપકરણો' },

  // ── Admin: programme analytics (child health outcomes) ───────────────────
  analyticsSubtitle: { en: 'Coverage and malnutrition outcomes', hi: 'कवरेज और कुपोषण परिणाम', mr: 'कव्हरेज आणि कुपोषण परिणाम', gu: 'કવરેજ અને કુપોષણના પરિણામો' },
  analyticsScreenedLatest: { en: 'Screened this month', hi: 'इस महीने जांच', mr: 'या महिन्यात स्क्रीनिंग केले', gu: 'આ મહિને સ્ક્રીનીંગ કરવામાં આવી છે' },
  analyticsSamChange: { en: 'SAM change', hi: 'SAM परिवर्तन', mr: 'SAM बदल', gu: 'SAM ફેરફાર' },
  analyticsSinceFeb: { en: 'since February', hi: 'फ़रवरी से', mr: 'फेब्रुवारी पासून', gu: 'ફેબ્રુઆરી થી' },
  analyticsCoverage: { en: 'Screening coverage', hi: 'जांच कवरेज', mr: 'स्क्रीनिंग कव्हरेज', gu: 'સ્ક્રીનીંગ કવરેજ' },
  analyticsCoverageHint: {
    en: 'Children measured each month across all centres.',
    hi: 'सभी केंद्रों पर हर महीने मापे गए बच्चे।', mr: 'प्रत्येक महिन्याला सर्व केंद्रांवर मुलांचे मोजमाप केले जाते.', gu: 'તમામ કેન્દ્રોમાં દર મહિને બાળકોનું માપન કરવામાં આવે છે.',
  },
  analyticsMalnutritionTrend: { en: 'SAM and MAM over time', hi: 'समय के साथ SAM और MAM', mr: 'कालांतराने SAM आणि MAM', gu: 'સમય જતાં SAM અને MAM' },
  analyticsTrendHint: {
    en: 'Falling counts with steady coverage indicate real improvement; falling counts with falling coverage may only mean fewer children were measured.',
    hi: 'कवरेज स्थिर रहते हुए संख्या घटे तो वास्तविक सुधार है; कवरेज भी घटे तो शायद केवल कम बच्चों की माप हुई।', mr: 'स्थिर कव्हरेजसह घसरण संख्या वास्तविक सुधारणा दर्शवते; घटत्या कव्हरेजसह घटत्या संख्येचा अर्थ फक्त कमी मुलांचे मोजमाप केले जाऊ शकते.', gu: 'સ્થિર કવરેજ સાથે ઘટતી સંખ્યા વાસ્તવિક સુધારો સૂચવે છે; ઘટતા કવરેજ સાથે ઘટતી ગણતરીનો અર્થ એ હોઈ શકે કે ઓછા બાળકોનું માપન કરવામાં આવ્યું હતું.',
  },
  analyticsCurrentMix: { en: 'Current classification mix', hi: 'वर्तमान वर्गीकरण वितरण', mr: 'वर्तमान वर्गीकरण मिश्रण', gu: 'વર્તમાન વર્ગીકરણ મિશ્રણ' },
  analyticsChildrenClassified: { en: 'children classified', hi: 'बच्चे वर्गीकृत', mr: 'मुले वर्गीकृत', gu: 'વર્ગીકૃત બાળકો' },
  analyticsChildren: { en: 'Children', hi: 'बच्चे', mr: 'मुले', gu: 'બાળકો' },

  // ── Admin: users ─────────────────────────────────────────────────────────
  adminUsersSubtitle: { en: 'Accounts, roles and approvals', hi: 'खाते, भूमिकाएँ और अनुमोदन', mr: 'खाती, भूमिका आणि मंजूरी', gu: 'એકાઉન્ટ્સ, ભૂમિકાઓ અને મંજૂરીઓ' },
  userAccounts: { en: 'Accounts', hi: 'खाते', mr: 'खाती', gu: 'એકાઉન્ટ્સ' },
  userActive: { en: 'Active', hi: 'सक्रिय', mr: 'सक्रिय', gu: 'સક્રિય' },
  userPending: { en: 'Pending', hi: 'लंबित', mr: 'प्रलंबित', gu: 'બાકી છે' },
  userPendingApproval: { en: 'Awaiting approval', hi: 'अनुमोदन प्रतीक्षित', mr: 'मंजुरीच्या प्रतीक्षेत', gu: 'મંજૂરીની રાહ જોઈ રહ્યું છે' },
  userSuspended: { en: 'Suspended', hi: 'निलंबित', mr: 'निलंबित', gu: 'સસ્પેન્ડ' },
  userApprovalQueue: { en: 'Approval queue', hi: 'अनुमोदन कतार', mr: 'मंजुरीची रांग', gu: 'મંજૂરીની કતાર' },
  userApprovalHint: {
    en: 'A user requests a role on sign-up; an administrator approves it and binds them to a centre, sector or child. No role is self-granted.',
    hi: 'उपयोगकर्ता साइन-अप पर भूमिका का अनुरोध करता है; प्रशासक उसे स्वीकृत कर केंद्र, सेक्टर या बच्चे से जोड़ता है। कोई भी भूमिका स्वयं नहीं ली जा सकती।', mr: 'साइन-अप करताना वापरकर्त्याने भूमिकेची विनंती केली; प्रशासक त्यास मान्यता देतो आणि त्यांना केंद्र, क्षेत्र किंवा मुलाशी जोडतो. कोणतीही भूमिका स्वत:ला दिली जात नाही.', gu: 'વપરાશકર્તા સાઇન-અપ પર ભૂમિકાની વિનંતી કરે છે; એડમિનિસ્ટ્રેટર તેને મંજૂર કરે છે અને તેમને કેન્દ્ર, ક્ષેત્ર અથવા બાળક સાથે જોડે છે. કોઈ ભૂમિકા સ્વ-મંજૂર નથી.',
  },
  userNoPending: { en: 'Nothing awaiting approval.', hi: 'कोई अनुमोदन प्रतीक्षित नहीं।', mr: 'मंजुरीच्या प्रतीक्षेत काहीही नाही.', gu: 'મંજૂરીની રાહ જોઈ રહ્યું નથી.' },
  userNoPendingBody: {
    en: 'New sign-ups appear here for you to approve and scope.',
    hi: 'नए साइन-अप यहाँ दिखेंगे, जिन्हें आप स्वीकृत कर दायरा तय करेंगे।', mr: 'नवीन साइन-अप तुमच्या मंजूरीसाठी आणि व्याप्तीसाठी येथे दिसतात.', gu: 'તમારા માટે મંજૂર અને અવકાશ માટે નવા સાઇન-અપ્સ અહીં દેખાય છે.',
  },
  userRequesting: { en: 'Requesting', hi: 'अनुरोधित भूमिका', mr: 'विनंती करत आहे', gu: 'વિનંતી કરી રહ્યા છે' },
  userApprovedToast: { en: 'account approved', hi: 'खाता स्वीकृत', mr: 'खाते मंजूर', gu: 'એકાઉન્ટ મંજૂર' },
  userRejectedToast: { en: 'request rejected', hi: 'अनुरोध अस्वीकृत', mr: 'विनंती नाकारली', gu: 'વિનંતી નકારી' },
  userApprove: { en: 'Approve', hi: 'स्वीकृत', mr: 'मंजूर करा', gu: 'મંજૂર' },
  userReject: { en: 'Reject', hi: 'अस्वीकृत', mr: 'नकार द्या', gu: 'અસ્વીકાર કરો' },
  userDirectory: { en: 'All accounts', hi: 'सभी खाते', mr: 'सर्व खाती', gu: 'બધા એકાઉન્ટ્સ' },
  userName: { en: 'Name', hi: 'नाम', mr: 'नाव', gu: 'નામ' },
  userScope: { en: 'Scope', hi: 'दायरा', mr: 'व्याप्ती', gu: 'અવકાશ' },
  userSignInMethod: { en: 'Sign-in', hi: 'साइन-इन', mr: 'साइन इन करा', gu: 'સાઇન ઇન કરો' },
  userNoAccounts: { en: 'No accounts yet.', hi: 'अभी कोई खाता नहीं।', mr: 'अद्याप कोणतीही खाती नाहीत.', gu: 'હજુ સુધી કોઈ એકાઉન્ટ નથી.' },
  authGoogle: { en: 'Google', hi: 'Google', mr: 'Google', gu: 'Google' },
  authPhoneOtp: { en: 'Phone OTP', hi: 'फ़ोन OTP', mr: 'फोन OTP', gu: 'ફોન OTP' },
  authEmailOtp: { en: 'Email OTP', hi: 'ईमेल OTP', mr: 'ईमेल OTP', gu: 'ઈમેલ OTP' },
  authPin: { en: 'Offline PIN', hi: 'ऑफ़लाइन पिन', mr: 'ऑफलाइन पिन', gu: 'ઑફલાઇન PIN' },

  // ── Parent growth card ───────────────────────────────────────────────────
  growthCardSubtitle: { en: 'Print or share your child’s growth record', hi: 'अपने बच्चे का विकास रिकॉर्ड प्रिंट या साझा करें', mr: 'तुमच्या मुलाच्या वाढीचा रेकॉर्ड छापा किंवा शेअर करा', gu: 'તમારા બાળકનો વિકાસ રેકોર્ડ છાપો અથવા શેર કરો' },
  growthCardTitle: { en: 'Child growth card', hi: 'बाल विकास कार्ड', mr: 'बाल वाढ कार्ड', gu: 'બાળ વૃદ્ધિ કાર્ડ' },
  growthCardWeightTrend: { en: 'Weight over time', hi: 'समय के साथ वज़न', mr: 'कालांतराने वजन', gu: 'સમય જતાં વજન' },
  growthCardWeightHint: {
    en: 'Each point is one monthly measurement at your Anganwadi centre.',
    hi: 'हर बिंदु आपके आंगनवाड़ी केंद्र पर हुई एक मासिक माप है।', mr: 'प्रत्येक बिंदू तुमच्या अंगणवाडी केंद्रात एक मासिक मोजमाप आहे.', gu: 'દરેક બિંદુ તમારા આંગણવાડી કેન્દ્રમાં એક માસિક માપન છે.',
  },
  growthCardFooter: {
    en: 'Bring this card to your next visit. If you have any concern about your child’s growth, speak to your Anganwadi worker or ANM.',
    hi: 'अगली बार आते समय यह कार्ड साथ लाएँ। अपने बच्चे के विकास को लेकर कोई भी चिंता हो तो अपनी आंगनवाड़ी कार्यकर्ता या ANM से बात करें।', mr: 'तुमच्या पुढील भेटीसाठी हे कार्ड आणा. तुम्हाला तुमच्या मुलाच्या वाढीबद्दल काही चिंता असल्यास, तुमच्या अंगणवाडी सेविका किंवा ANM शी बोला.', gu: 'તમારી આગામી મુલાકાત માટે આ કાર્ડ લાવો. જો તમને તમારા બાળકના વિકાસ અંગે કોઈ ચિંતા હોય, તો તમારા આંગણવાડી કાર્યકર અથવા ANM સાથે વાત કરો.',
  },
  growthCardOpen: { en: 'Open card', hi: 'कार्ड खोलें', mr: 'कार्ड उघडा', gu: 'કાર્ડ ખોલો' },
  parentTrendHint: {
    en: 'Your child’s weight at each monthly visit.',
    hi: 'हर मासिक भेंट पर आपके बच्चे का वज़न।', mr: 'प्रत्येक मासिक भेटीत तुमच्या मुलाचे वजन.', gu: 'દરેક માસિક મુલાકાત વખતે તમારા બાળકનું વજન.',
  },
  growthCardPrint: { en: 'Print', hi: 'प्रिंट करें', mr: 'छापा', gu: 'છાપો' },
  growthCardShare: { en: 'Share', hi: 'साझा करें', mr: 'शेअर करा', gu: 'શેર કરો' },

  // ── Measurement capture ──────────────────────────────────────────────────
  measureSubtitle: { en: 'Record a growth measurement', hi: 'विकास माप दर्ज करें', mr: 'वाढ मोजमाप नोंदवा', gu: 'વૃદ્ધિ માપન રેકોર્ડ કરો' },
  measureProgress: { en: 'Capture progress', hi: 'माप प्रगति', mr: 'प्रगती कॅप्चर करा', gu: 'કેપ્ચર પ્રગતિ' },
  measureStep: { en: 'Step', hi: 'चरण', mr: 'पायरी', gu: 'પગલું' },
  measureStep_child: { en: 'Choose child', hi: 'बच्चा चुनें', mr: 'मूल निवडा', gu: 'બાળકને પસંદ કરો' },
  measureStep_weight: { en: 'Weight and length', hi: 'वज़न और लंबाई', mr: 'वजन आणि लांबी', gu: 'વજન અને લંબાઈ' },
  measureStep_muac: { en: 'MUAC and oedema', hi: 'MUAC और सूजन', mr: 'MUAC आणि एडेमा', gu: 'MUAC અને એડીમા' },
  measureStep_result: { en: 'Result', hi: 'परिणाम', mr: 'परिणाम', gu: 'પરિણામ' },
  measurePickChild: { en: 'Which child?', hi: 'कौन सा बच्चा?', mr: 'कोणते मूल?', gu: 'કયું બાળક?' },
  measurePickChildHint: {
    en: 'Only children with recorded consent are listed.',
    hi: 'केवल वे बच्चे सूचीबद्ध हैं जिनकी सहमति दर्ज है।', mr: 'फक्त रेकॉर्ड केलेली संमती असलेली मुले सूचीबद्ध आहेत.', gu: 'માત્ર રેકોર્ડેડ સંમતિ ધરાવતાં બાળકો જ સૂચિબદ્ધ છે.',
  },
  measureWeightLength: { en: 'Weight and length', hi: 'वज़न और लंबाई', mr: 'वजन आणि लांबी', gu: 'વજન અને લંબાઈ' },
  measureMuacOedema: { en: 'MUAC and oedema', hi: 'MUAC और सूजन', mr: 'MUAC आणि एडेमा', gu: 'MUAC અને એડીમા' },
  measureWeight: { en: 'Weight', hi: 'वज़न', mr: 'वजन', gu: 'વજન' },
  measureLength: { en: 'Length (lying down)', hi: 'लंबाई (लिटाकर)', mr: 'लांबी (आडवे)', gu: 'લંબાઈ (નીચે સૂવું)' },
  measureHeight: { en: 'Height (standing)', hi: 'ऊँचाई (खड़े होकर)', mr: 'उंची (उभे)', gu: 'ઊંચાઈ (સ્થાયી)' },
  measureLengthHint: {
    en: 'Under 24 months — measure lying down.',
    hi: '24 माह से कम — लिटाकर मापें।', mr: '24 महिन्यांपेक्षा कमी - खाली पडून मोजा.', gu: '24 મહિનાથી ઓછી ઉંમરના - નીચે પડેલા માપો.',
  },
  measureHeightHint: {
    en: '24 months and over — measure standing.',
    hi: '24 माह या अधिक — खड़े होकर मापें।', mr: '24 महिने आणि त्याहून अधिक - स्थिती मोजा.', gu: '24 મહિના અને તેથી વધુ - સ્ટેન્ડિંગ માપો.',
  },
  measureManualFallback: {
    en: 'No measuring device is paired with this portal. Enter the readings from the device manually — the same values it would have sent.',
    hi: 'इस पोर्टल से कोई माप उपकरण जुड़ा नहीं है। उपकरण पर दिखे मान स्वयं दर्ज करें — वही मान जो वह भेजता।', mr: 'या पोर्टलसोबत कोणतेही मोजमाप यंत्र जोडलेले नाही. डिव्हाइसमधून रीडिंग मॅन्युअली एंटर करा — तीच व्हॅल्यूज त्याने पाठवली असती.', gu: 'આ પોર્ટલ સાથે કોઈ માપન ઉપકરણ જોડાયેલું નથી. ઉપકરણમાંથી મેન્યુઅલી રીડિંગ્સ દાખલ કરો — તે જ મૂલ્યો જે તેણે મોકલ્યા હશે.',
  },
  measureOedema: { en: 'Bilateral pitting oedema', hi: 'दोनों पैरों में गड्ढेदार सूजन', mr: 'द्विपक्षीय पिटिंग एडेमा', gu: 'દ્વિપક્ષીય પિટિંગ એડીમા' },
  measureOedemaHint: {
    en: 'Press both feet for 3 seconds. If a dent remains, oedema is present.',
    hi: 'दोनों पैरों को 3 सेकंड दबाएँ। यदि गड्ढा रह जाए, तो सूजन मौजूद है।', mr: 'दोन्ही पाय 3 सेकंद दाबा. डेंट राहिल्यास, एडेमा असतो.', gu: 'બંને પગને 3 સેકન્ડ માટે દબાવો. જો ડેન્ટ રહે છે, તો એડીમા હાજર છે.',
  },
  measureBack: { en: 'Back', hi: 'पीछे', mr: 'मागे', gu: 'પાછળ' },
  measureNext: { en: 'Next', hi: 'आगे', mr: 'पुढे', gu: 'આગળ' },
  measureNextChild: { en: 'Measure next child', hi: 'अगले बच्चे की माप', mr: 'पुढील मुलाचे मोजमाप करा', gu: 'આગામી બાળકને માપો' },
  resultRecorded: { en: 'Readings recorded', hi: 'दर्ज मान', mr: 'वाचन रेकॉर्ड केले', gu: 'વાંચન રેકોર્ડ કર્યું' },
  resultIndeterminate: {
    en: 'The WHO reference tables are not yet loaded on this system, so no z-score can be computed. The readings are saved and will be classified once the tables are in place.',
    hi: 'इस प्रणाली पर WHO संदर्भ तालिकाएँ अभी लोड नहीं हैं, इसलिए ज़ेड-स्कोर नहीं निकाला जा सकता। मान सुरक्षित हैं और तालिकाएँ आते ही वर्गीकरण हो जाएगा।', mr: 'WHO संदर्भ तक्ते अद्याप या प्रणालीवर लोड केलेले नाहीत, त्यामुळे कोणत्याही z-स्कोअरची गणना केली जाऊ शकत नाही. वाचन जतन केले जातात आणि एकदा टेबल्स जागेवर आल्यावर त्यांचे वर्गीकरण केले जाईल.', gu: 'WHO સંદર્ભ કોષ્ટકો હજી સુધી આ સિસ્ટમ પર લોડ થયા નથી, તેથી કોઈ z-સ્કોરની ગણતરી કરી શકાતી નથી. રીડિંગ્સ સાચવવામાં આવે છે અને એકવાર કોષ્ટકો સ્થાને આવી જાય પછી તેનું વર્ગીકરણ કરવામાં આવશે.',
  },
  resultOedemaSam: {
    en: 'Bilateral pitting oedema is present. Under WHO rules this is classified as severe acute malnutrition regardless of any measurement.',
    hi: 'दोनों पैरों में गड्ढेदार सूजन मौजूद है। WHO नियमों के अनुसार यह किसी भी माप से स्वतंत्र रूप से गंभीर तीव्र कुपोषण माना जाता है।', mr: 'द्विपक्षीय पिटिंग एडेमा उपस्थित आहे. डब्ल्यूएचओच्या नियमांनुसार हे कोणत्याही मोजमापाची पर्वा न करता तीव्र तीव्र कुपोषण म्हणून वर्गीकृत आहे.', gu: 'દ્વિપક્ષીય પિટિંગ એડીમા હાજર છે. WHO ના નિયમો હેઠળ આને કોઈપણ માપને ધ્યાનમાં લીધા વિના ગંભીર તીવ્ર કુપોષણ તરીકે વર્ગીકૃત કરવામાં આવે છે.',
  },
  resultReferralAdvice: {
    en: 'It is advised that this child be shown to the ANM.',
    hi: 'इस बच्चे को ANM को दिखाने की सलाह दी जाती है।', mr: 'या मुलाला ANM ला दाखवण्याचा सल्ला देण्यात आला आहे.', gu: 'સલાહ આપવામાં આવે છે કે આ બાળકને ANMને બતાવવામાં આવે.',
  },
  yes: { en: 'Yes', hi: 'हाँ', mr: 'होय', gu: 'હા' },
  no: { en: 'No', hi: 'नहीं', mr: 'नाही', gu: 'ના' },

  // ── Child roster ─────────────────────────────────────────────────────────
  rosterSubtitle: { en: 'Children registered at your centre', hi: 'आपके केंद्र पर पंजीकृत बच्चे', mr: 'मुलांनी तुमच्या केंद्रावर नोंदणी केली', gu: 'બાળકો તમારા કેન્દ્રમાં નોંધાયેલા છે' },
  rosterRegistered: { en: 'Registered', hi: 'पंजीकृत', mr: 'नोंदणीकृत', gu: 'નોંધાયેલ' },
  rosterOverdue: { en: 'Overdue', hi: 'विलंबित', mr: 'ओव्हरड्यू', gu: 'મુદતવીતી' },
  rosterFlagged: { en: 'Flagged', hi: 'चिह्नित', mr: 'ध्वजांकित', gu: 'ધ્વજવંદન' },
  rosterNoConsent: { en: 'No consent', hi: 'सहमति नहीं', mr: 'संमती नाही', gu: 'કોઈ સંમતિ નથી' },
  rosterSearchPlaceholder: {
    en: 'Search by initials or ICDS ID',
    hi: 'नाम के पहले अक्षर या आईसीडीएस आईडी से खोजें', mr: 'आद्याक्षरे किंवा ICDS ID द्वारे शोधा', gu: 'પ્રારંભિક અથવા ICDS ID દ્વારા શોધો',
  },
  rosterClearSearch: { en: 'Clear search', hi: 'खोज साफ़ करें', mr: 'शोध साफ करा', gu: 'શોધ સાફ કરો' },
  rosterClearFilters: { en: 'Clear filters', hi: 'फ़िल्टर हटाएँ', mr: 'फिल्टर साफ करा', gu: 'ફિલ્ટર્સ સાફ કરો' },
  rosterNoMatches: { en: 'No children match.', hi: 'कोई बच्चा मेल नहीं खाता।', mr: 'मुले जुळत नाहीत.', gu: 'કોઈ બાળકો મેળ ખાતા નથી.' },
  rosterNoMatchesBody: {
    en: 'Try a different search term, or clear the filters to see the whole roster.',
    hi: 'कोई दूसरा खोज शब्द आज़माएँ, या पूरी सूची देखने के लिए फ़िल्टर हटाएँ।', mr: 'भिन्न शोध संज्ञा वापरून पहा किंवा संपूर्ण रोस्टर पाहण्यासाठी फिल्टर साफ करा.', gu: 'અલગ શોધ શબ્દનો પ્રયાસ કરો અથવા સંપૂર્ણ રોસ્ટર જોવા માટે ફિલ્ટર્સ સાફ કરો.',
  },
  rosterResultsAnnounce: { en: 'children shown', hi: 'बच्चे दिख रहे हैं', mr: 'मुले दर्शविली', gu: 'બાળકો બતાવ્યા' },
  rosterLastMeasured: { en: 'Last measured', hi: 'अंतिम माप', mr: 'शेवटचे मोजले', gu: 'છેલ્લે માપ્યું' },
  rosterNever: { en: 'Never', hi: 'कभी नहीं', mr: 'कधीच नाही', gu: 'ક્યારેય નહીં' },
  sexMale: { en: 'Boy', hi: 'लड़का', mr: 'मुलगा', gu: 'છોકરો' },
  sexFemale: { en: 'Girl', hi: 'लड़की', mr: 'मुलगी', gu: 'છોકરી' },
  months: { en: 'months', hi: 'माह', mr: 'महिने', gu: 'મહિનાઓ' },
  dobEstimated: { en: 'DOB estimated', hi: 'जन्मतिथि अनुमानित', mr: 'डीओबीचा अंदाज', gu: 'DOB નો અંદાજ' },
  dobMonthOnly: { en: 'DOB month only', hi: 'जन्म माह ही ज्ञात', mr: 'फक्त DOB महिना', gu: 'માત્ર DOB મહિનો' },
  oedemaPresent: { en: 'Oedema present — classified SAM', hi: 'सूजन मौजूद — SAM वर्गीकृत', mr: 'एडेमा उपस्थित — वर्गीकृत SAM', gu: 'એડીમા હાજર — વર્ગીકૃત SAM' },
  waz: { en: 'WAZ', hi: 'WAZ', mr: 'WAZ', gu: 'WAZ' },
  muac: { en: 'MUAC', hi: 'MUAC', mr: 'MUAC', gu: 'MUAC' },
  consentMissingNote: {
    en: 'Consent not yet recorded — this child cannot be measured.',
    hi: 'सहमति अभी दर्ज नहीं — इस बच्चे की माप नहीं ली जा सकती।', mr: 'संमती अद्याप रेकॉर्ड केलेली नाही — या मुलाचे मोजमाप केले जाऊ शकत नाही.', gu: 'સંમતિ હજુ સુધી રેકોર્ડ કરવામાં આવી નથી — આ બાળકને માપી શકાતું નથી.',
  },
  consentWithdrawnNote: {
    en: 'Consent withdrawn — this child has been removed from screening.',
    hi: 'सहमति वापस ली गई — इस बच्चे को जांच से हटा दिया गया है।', mr: 'संमती मागे घेतली — या मुलाला स्क्रीनिंगमधून काढून टाकण्यात आले आहे.', gu: 'સંમતિ પાછી ખેંચી લેવામાં આવી છે - આ બાળકને સ્ક્રીનીંગમાંથી દૂર કરવામાં આવ્યું છે.',
  },

  // ── Settings ─────────────────────────────────────────────────────────────
  settingsSubtitle: { en: 'Language, appearance and account', hi: 'भाषा, रूप और खाता', mr: 'भाषा, देखावा आणि खाते', gu: 'ભાષા, દેખાવ અને એકાઉન્ટ' },
  settingsGeneral: { en: 'General', hi: 'सामान्य', mr: 'सामान्य', gu: 'જનરલ' },
  settingsLanguage: { en: 'Language', hi: 'भाषा', mr: 'भाषा', gu: 'ભાષા' },
  settingsLanguageHint: {
    en: 'Applies immediately and is remembered next time you visit.',
    hi: 'तुरंत लागू होती है और अगली बार याद रखी जाती है।', mr: 'ताबडतोब लागू होते आणि तुम्ही पुढच्या वेळी भेट देता तेव्हा लक्षात ठेवले जाते.', gu: 'તરત જ લાગુ થાય છે અને જ્યારે તમે આગલી મુલાકાત લો ત્યારે યાદ રાખવામાં આવે છે.',
  },
  settingsTheme: { en: 'Appearance', hi: 'रूप', mr: 'देखावा', gu: 'દેખાવ' },
  settingsThemeHint: {
    en: 'Light, dark, or follow your device setting.',
    hi: 'उजला, गहरा, या अपने डिवाइस की सेटिंग के अनुसार।', mr: 'फिकट, गडद किंवा तुमचे डिव्हाइस सेटिंग फॉलो करा.', gu: 'આછું, શ્યામ અથવા તમારા ઉપકરણ સેટિંગને અનુસરો.',
  },
  settingsRole: { en: 'Role', hi: 'भूमिका', mr: 'भूमिका', gu: 'ભૂમિકા' },
  settingsRoleHint: {
    en: 'Development only — switching roles previews each dashboard and theme. With real sign-in your role comes from your account.',
    hi: 'केवल विकास हेतु — भूमिका बदलकर हर डैशबोर्ड और थीम देखी जा सकती है। वास्तविक साइन-इन के बाद भूमिका आपके खाते से तय होगी।', mr: 'केवळ विकास — भूमिका बदलणे प्रत्येक डॅशबोर्ड आणि थीमचे पूर्वावलोकन करते. वास्तविक साइन-इनसह तुमची भूमिका तुमच्या खात्यातून येते.', gu: 'માત્ર વિકાસ — ભૂમિકાઓને સ્વિચ કરવાથી દરેક ડેશબોર્ડ અને થીમનું પૂર્વાવલોકન થાય છે. વાસ્તવિક સાઇન-ઇન સાથે તમારી ભૂમિકા તમારા એકાઉન્ટમાંથી આવે છે.',
  },
  settingsPrivacy: { en: 'Data & privacy', hi: 'डेटा और गोपनीयता', mr: 'डेटा आणि गोपनीयता', gu: 'ડેટા અને ગોપનીયતા' },
  settingsPrivacyBody: {
    en: 'Children are shown by initials and ICDS ID only — never full names. Measurement data is governed by the consent recorded for each child, and a withdrawn consent removes that child from screening lists.',
    hi: 'बच्चों को केवल नाम के पहले अक्षर और आईसीडीएस आईडी से दिखाया जाता है — कभी पूरा नाम नहीं। माप डेटा हर बच्चे के लिए दर्ज सहमति से नियंत्रित होता है, और सहमति वापस लेने पर बच्चा जांच सूची से हट जाता है।', mr: 'मुलांना फक्त आद्याक्षरे आणि ICDS ID द्वारे दाखवले जाते — कधीही पूर्ण नावे नाहीत. मापन डेटा प्रत्येक मुलासाठी रेकॉर्ड केलेल्या संमतीने नियंत्रित केला जातो आणि मागे घेतलेली संमती त्या मुलाला स्क्रीनिंग सूचीमधून काढून टाकते.', gu: 'બાળકોને ફક્ત આદ્યાક્ષરો અને ICDS ID દ્વારા બતાવવામાં આવે છે - ક્યારેય સંપૂર્ણ નામો નહીં. માપન ડેટા દરેક બાળક માટે રેકોર્ડ કરેલી સંમતિ દ્વારા સંચાલિત થાય છે, અને પાછી ખેંચેલી સંમતિ તે બાળકને સ્ક્રીનીંગ સૂચિમાંથી દૂર કરે છે.',
  },
  settingsAbout: { en: 'About', hi: 'परिचय', mr: 'बद्दल', gu: 'વિશે' },
  aboutPortalVersion: { en: 'Portal version', hi: 'पोर्टल संस्करण', mr: 'पोर्टल आवृत्ती', gu: 'પોર્ટલ સંસ્કરણ' },
  aboutEngine: { en: 'Reference tables', hi: 'संदर्भ तालिकाएँ', mr: 'संदर्भ सारण्या', gu: 'સંદર્ભ કોષ્ટકો' },
  aboutMockNotice: {
    en: 'This portal currently runs on sample data. No live centre records are shown.',
    hi: 'यह पोर्टल अभी नमूना डेटा पर चलता है। कोई वास्तविक केंद्र रिकॉर्ड नहीं दिखाया जाता।', mr: 'हे पोर्टल सध्या नमुना डेटावर चालते. कोणतेही थेट केंद्र रेकॉर्ड दाखवले जात नाहीत.', gu: 'આ પોર્ટલ હાલમાં સેમ્પલ ડેટા પર ચાલે છે. કોઈ જીવંત કેન્દ્ર રેકોર્ડ્સ બતાવવામાં આવ્યાં નથી.',
  },

  // ── Error boundary ───────────────────────────────────────────────────────
  errorTitle: { en: 'Something went wrong', hi: 'कुछ गड़बड़ हो गई', mr: 'काहीतरी चूक झाली', gu: 'કંઈક ખોટું થયું' },
  errorBody: {
    en: 'This page could not be displayed. Your data has not been lost — nothing on this screen changes records.',
    hi: 'यह पृष्ठ नहीं दिखाया जा सका। आपका डेटा सुरक्षित है — इस स्क्रीन से कोई रिकॉर्ड नहीं बदलता।', mr: 'हे पृष्ठ प्रदर्शित केले जाऊ शकत नाही. तुमचा डेटा गमावला नाही — या स्क्रीनवरील काहीही रेकॉर्ड बदलत नाही.', gu: 'આ પૃષ્ઠ પ્રદર્શિત કરી શકાયું નથી. તમારો ડેટા ખોવાઈ ગયો નથી — આ સ્ક્રીન પર કંઈપણ રેકોર્ડમાં ફેરફાર કરતું નથી.',
  },
  errorReference: { en: 'Reference:', hi: 'संदर्भ:', mr: 'संदर्भ:', gu: 'સંદર્ભ:' },
  errorRetry: { en: 'Try again', hi: 'फिर से कोशिश करें', mr: 'पुन्हा प्रयत्न करा', gu: 'ફરી પ્રયાસ કરો' },

  // ── Not found ────────────────────────────────────────────────────────────
  notFoundTitle: { en: 'Page not found', hi: 'पृष्ठ नहीं मिला', mr: 'पृष्ठ आढळले नाही', gu: 'પૃષ્ઠ મળ્યું નથી' },
  notFoundBody: {
    en: 'This page does not exist, or the centre you were looking for has been removed.',
    hi: 'यह पृष्ठ मौजूद नहीं है, या आप जिस केंद्र को खोज रहे थे उसे हटा दिया गया है।', mr: 'हे पृष्ठ अस्तित्वात नाही किंवा तुम्ही शोधत असलेले केंद्र काढले गेले आहे.', gu: 'આ પૃષ્ઠ અસ્તિત્વમાં નથી, અથવા તમે જે કેન્દ્ર શોધી રહ્યા હતા તે દૂર કરવામાં આવ્યું છે.',
  },
  backToHome: { en: 'Back to home', hi: 'होम पर वापस', mr: 'घरी परत', gu: 'ઘરે પાછા' },

  // ── AWW / worker home ────────────────────────────────────────────────────
  workerDashboard: { en: 'My centre', hi: 'मेरा केंद्र', mr: 'माझे केंद्र', gu: 'મારું કેન્દ્ર' },
  todayAtCentre: { en: 'This month at your centre', hi: 'इस महीने आपके केंद्र पर', mr: 'या महिन्यात तुमच्या केंद्रावर', gu: 'આ મહિને તમારા કેન્દ્રમાં' },
  newMeasurement: { en: 'New measurement', hi: 'नई माप', mr: 'नवीन मोजमाप', gu: 'નવું માપન' },
  newMeasurementHint: {
    en: 'Measurements are captured on the field device.',
    hi: 'माप फ़ील्ड डिवाइस पर दर्ज की जाती है।', mr: 'फील्ड डिव्हाइसवर मोजमाप कॅप्चर केले जातात.', gu: 'માપ ફિલ્ડ ઉપકરણ પર કેપ્ચર કરવામાં આવે છે.',
  },
  syncBacklog: { en: 'Waiting to sync', hi: 'सिंक बाकी', mr: 'सिंक होण्याची प्रतीक्षा करत आहे', gu: 'સિંક થવાની રાહ જોઈ રહ્યાં છીએ' },
  syncBacklogHint: { en: 'records in outbox', hi: 'आउटबॉक्स में रिकॉर्ड', mr: 'आउटबॉक्समध्ये रेकॉर्ड', gu: 'આઉટબોક્સમાં રેકોર્ડ' },

  // ── Doctor ───────────────────────────────────────────────────────────────
  doctorInbox: { en: 'Case inbox', hi: 'मामला इनबॉक्स', mr: 'केस इनबॉक्स', gu: 'કેસ ઇનબોક્સ' },
  doctorInboxSubtitle: {
    en: 'Children referred to you, awaiting an outcome',
    hi: 'आपको रेफर किए गए बच्चे, परिणाम की प्रतीक्षा में', mr: 'मुलांनी तुम्हाला संदर्भित केले आहे, निकालाची वाट पाहत आहेत', gu: 'પરિણામની રાહ જોઈને બાળકોએ તમારો ઉલ્લેખ કર્યો',
  },
  caseList: { en: 'Referred cases', hi: 'रेफर किए गए मामले', mr: 'संदर्भित प्रकरणे', gu: 'સંદર્ભિત કેસો' },
  casesReferred: { en: 'Referred to you', hi: 'आपको रेफर किए गए', mr: 'तुमचा संदर्भ दिला', gu: 'તમારો ઉલ્લેખ કર્યો' },
  awaitingOutcome: { en: 'Awaiting outcome', hi: 'परिणाम की प्रतीक्षा', mr: 'निकालाच्या प्रतीक्षेत', gu: 'પરિણામની રાહ જોઈ રહ્યા છીએ' },
  recordOutcome: { en: 'Record outcome', hi: 'परिणाम दर्ज करें', mr: 'निकाल नोंदवा', gu: 'રેકોર્ડ પરિણામ' },
  outcomeAttended: { en: 'Attended', hi: 'उपस्थित हुए', mr: 'हजेरी लावली', gu: 'હાજરી આપી હતી' },
  outcomeAttendedHint: {
    en: 'The child was brought and was seen.',
    hi: 'बच्चे को लाया गया और देखा गया।', mr: 'मुलाला आणून पाहिलं.', gu: 'બાળકને લાવવામાં આવ્યો અને તેને જોવામાં આવ્યો.',
  },
  outcomeNotAttended: { en: 'Did not attend', hi: 'नहीं आए', mr: 'हजर राहिले नाही', gu: 'હાજરી આપી ન હતી' },
  outcomeNotAttendedHint: {
    en: 'The referral was made but the child was not brought.',
    hi: 'रेफरल किया गया लेकिन बच्चे को नहीं लाया गया।', mr: 'रेफरल केले पण मुलाला आणले नाही.', gu: 'રેફરલ કરવામાં આવ્યો હતો પરંતુ બાળકને લાવવામાં આવ્યો ન હતો.',
  },
  outcomeUnknown: { en: 'Unknown', hi: 'पता नहीं', mr: 'अज्ञात', gu: 'અજ્ઞાત' },
  outcomeUnknownHint: {
    en: 'The family could not be traced. Recording this is better than guessing.',
    hi: 'परिवार का पता नहीं चल सका। अनुमान लगाने से बेहतर है यही दर्ज करना।', mr: 'कुटुंबाचा शोध लागू शकला नाही. अंदाज लावण्यापेक्षा हे रेकॉर्ड करणे चांगले आहे.', gu: 'પરિવારનો પત્તો લાગ્યો ન હતો. અનુમાન લગાવવા કરતાં આને રેકોર્ડ કરવું વધુ સારું છે.',
  },
  save: { en: 'Save', hi: 'सहेजें', mr: 'जतन करा', gu: 'સાચવો' },
  cancel: { en: 'Cancel', hi: 'रद्द करें', mr: 'रद्द करा', gu: 'રદ કરો' },
  close: { en: 'Close', hi: 'बंद करें', mr: 'बंद करा', gu: 'બંધ કરો' },
  noCasesReferred: { en: 'No cases referred to you.', hi: 'आपको कोई मामला रेफर नहीं किया गया है।', mr: 'कोणतीही प्रकरणे तुम्हाला संदर्भित केलेली नाहीत.', gu: 'તમને સંદર્ભિત કોઈ કેસ નથી.' },
  noCasesReferredBody: {
    en: 'Referred children appear here as soon as a worker flags them.',
    hi: 'कार्यकर्ता द्वारा चिह्नित किए जाते ही रेफर किए गए बच्चे यहाँ दिखेंगे।', mr: 'एका कामगाराने त्यांना झेंडा लावताच संदर्भित मुले येथे दिसतात.', gu: 'સંદર્ભિત બાળકો અહીં દેખાય છે કે તરત જ કોઈ કાર્યકર તેમને ફ્લેગ કરે છે.',
  },

  // ── Parent ───────────────────────────────────────────────────────────────
  myChild: { en: 'My child', hi: 'मेरा बच्चा', mr: 'माझ्या मुलाला', gu: 'મારા બાળક' },
  parentStatusNormal: {
    en: 'Your child is growing well. Keep attending the regular monthly measurement at your Anganwadi centre.',
    hi: 'आपका बच्चा अच्छी तरह बढ़ रहा है। अपने आंगनवाड़ी केंद्र पर हर महीने होने वाली नियमित माप के लिए आते रहें।', mr: 'तुमचे मूल चांगले वाढत आहे. तुमच्या अंगणवाडी केंद्रात नियमित मासिक मोजमापासाठी उपस्थित रहा.', gu: 'તમારું બાળક સારી રીતે વિકાસ કરી રહ્યું છે. તમારા આંગણવાડી કેન્દ્રમાં નિયમિત માસિક માપણીમાં હાજરી આપતા રહો.',
  },
  nextVisit: { en: 'Next measurement', hi: 'अगली माप', mr: 'पुढील मापन', gu: 'આગામી માપન' },
  nextVisitHint: { en: 'Next month at your centre', hi: 'अगले महीने आपके केंद्र पर', mr: 'पुढच्या महिन्यात तुमच्या केंद्रावर', gu: 'આગામી મહિને તમારા કેન્દ્રમાં' },
  growthCardHint: {
    en: 'A printable card showing your child’s growth over time.',
    hi: 'समय के साथ आपके बच्चे के विकास को दर्शाने वाला प्रिंट करने योग्य कार्ड।', mr: 'तुमच्या मुलाची कालांतराने वाढ दर्शवणारे प्रिंट करण्यायोग्य कार्ड.', gu: 'સમય જતાં તમારા બાળકની વૃદ્ધિ દર્શાવતું છાપવાયોગ્ય કાર્ડ.',
  },

  // ── Admin console ────────────────────────────────────────────────────────
  adminConsole: { en: 'Admin console', hi: 'प्रशासक कंसोल', mr: 'ॲडमिन कन्सोल', gu: 'એડમિન કન્સોલ' },
  adminConsoleSubtitle: {
    en: 'Users, centres, configuration and system health',
    hi: 'उपयोगकर्ता, केंद्र, विन्यास और सिस्टम स्वास्थ्य', mr: 'वापरकर्ते, केंद्रे, कॉन्फिगरेशन आणि सिस्टम आरोग्य', gu: 'વપરાશકર્તાઓ, કેન્દ્રો, ગોઠવણી અને સિસ્ટમ આરોગ્ય',
  },
  manage: { en: 'Manage', hi: 'प्रबंधन', mr: 'व्यवस्थापित करा', gu: 'વ્યવસ્થા કરો' },
  manageHint: {
    en: 'Each area opens its own page rather than crowding this one.',
    hi: 'हर क्षेत्र इस पृष्ठ को भरने के बजाय अपना अलग पृष्ठ खोलता है।', mr: 'या भागात गर्दी करण्यापेक्षा प्रत्येक क्षेत्र स्वतःचे पृष्ठ उघडते.', gu: 'દરેક વિસ્તાર આમાં ભીડ કરવાને બદલે તેનું પોતાનું પૃષ્ઠ ખોલે છે.',
  },
  activeUsers: { en: 'Active users', hi: 'सक्रिय उपयोगकर्ता', mr: 'सक्रिय वापरकर्ते', gu: 'સક્રિય વપરાશકર્તાઓ' },
  devicesOnline: { en: 'Devices online', hi: 'ऑनलाइन डिवाइस', mr: 'उपकरणे ऑनलाइन', gu: 'ઉપકરણો ઓનલાઇન' },
  deadLetters: { en: 'Sync dead-letters', hi: 'सिंक विफल रिकॉर्ड', mr: 'मृत अक्षरे समक्रमित करा', gu: 'ડેડ-લેટર્સ સિંક કરો' },
  adminUsersHint: { en: 'Accounts, roles and approvals', hi: 'खाते, भूमिकाएँ और अनुमोदन', mr: 'खाती, भूमिका आणि मंजूरी', gu: 'એકાઉન્ટ્સ, ભૂમિકાઓ અને મંજૂરીઓ' },
  adminProgramHint: {
    en: 'Coverage and SAM/MAM trends — child health outcomes',
    hi: 'कवरेज और SAM/MAM रुझान — बाल स्वास्थ्य परिणाम', mr: 'कव्हरेज आणि SAM/MAM ट्रेंड - बाल आरोग्य परिणाम', gu: 'કવરેજ અને SAM/MAM વલણો - બાળ આરોગ્ય પરિણામો',
  },
  adminAppHealthHint: {
    en: 'Adoption, sync health, crashes — system performance',
    hi: 'उपयोग, सिंक स्वास्थ्य, क्रैश — सिस्टम प्रदर्शन', mr: 'दत्तक, समक्रमण आरोग्य, क्रॅश — सिस्टम कार्यप्रदर्शन', gu: 'દત્તક, સમન્વયન આરોગ્ય, ક્રેશ્સ — સિસ્ટમ કામગીરી',
  },
  adminConfigHint: { en: 'Reference data and settings', hi: 'संदर्भ डेटा और सेटिंग्स', mr: 'संदर्भ डेटा आणि सेटिंग्ज', gu: 'સંદર્ભ ડેટા અને સેટિંગ્સ' },
  adminAudit: { en: 'Audit log', hi: 'ऑडिट लॉग', mr: 'ऑडिट लॉग', gu: 'ઓડિટ લોગ' },
  adminAuditHint: { en: 'Who changed what, and when', hi: 'किसने क्या बदला, और कब', mr: 'कोणी काय आणि केव्हा बदलले', gu: 'કોણે શું અને ક્યારે બદલ્યું' },

  // ── Centres ──────────────────────────────────────────────────────────────
  noFlaggedHereBody: {
    en: 'No child at this centre currently meets the SAM or MAM criteria.',
    hi: 'इस केंद्र का कोई भी बच्चा वर्तमान में SAM या MAM मानदंड पूरा नहीं करता।', mr: 'या केंद्रातील कोणतेही मूल सध्या SAM किंवा MAM निकष पूर्ण करत नाही.', gu: 'આ કેન્દ્રમાં હાલમાં કોઈપણ બાળક SAM અથવા MAM માપદંડોને પૂર્ણ કરતું નથી.',
  },
  centresSubtitle: {
    en: 'Every Anganwadi centre in your sector',
    hi: 'आपके सेक्टर के सभी आंगनवाड़ी केंद्र', mr: 'तुमच्या सेक्टरमधील प्रत्येक अंगणवाडी केंद्र', gu: 'તમારા સેક્ટરમાં દરેક આંગણવાડી કેન્દ્ર',
  },

  // ── Diagnostics ──────────────────────────────────────────────────────────
  diagnosticsLogHint: {
    en: 'Records where the on-device and server z-score engines disagreed, or a measurement fell outside biological plausibility.',
    hi: 'ऐसे रिकॉर्ड जहाँ डिवाइस और सर्वर के ज़ेड-स्कोर इंजन असहमत थे, या माप जैविक रूप से असंभव था।', mr: 'रेकॉर्ड जेथे ऑन-डिव्हाइस आणि सर्व्हर z-स्कोअर इंजिन असहमत आहेत, किंवा मोजमाप जैविक योग्यतेच्या बाहेर पडले आहे.', gu: 'રેકોર્ડ કે જ્યાં ઓન-ડિવાઈસ અને સર્વર z-સ્કોર એન્જિન અસંમત હતા, અથવા માપ જૈવિક બુદ્ધિગમ્યતાની બહાર પડી ગયું હતું.',
  },
  noDataRecordsBody: {
    en: 'The on-device and server engines agree on every measurement recorded so far.',
    hi: 'अब तक दर्ज हर माप पर डिवाइस और सर्वर इंजन सहमत हैं।', mr: 'ऑन-डिव्हाइस आणि सर्व्हर इंजिन आतापर्यंत रेकॉर्ड केलेल्या प्रत्येक मापनावर सहमत आहेत.', gu: 'ઓન-ડિવાઈસ અને સર્વર એન્જીન અત્યાર સુધી નોંધાયેલા દરેક માપ પર સંમત છે.',
  },
  noStaleDetectedBody: {
    en: 'Every device has synced within the last seven days.',
    hi: 'हर डिवाइस ने पिछले सात दिनों में सिंक किया है।', mr: 'प्रत्येक डिव्हाइस मागील सात दिवसात समक्रमित झाले आहे.', gu: 'દરેક ઉપકરણ છેલ્લા સાત દિવસમાં સમન્વયિત થયું છે.',
  },
  batteryDead: { en: 'dead', hi: 'खाली', mr: 'मृत', gu: 'મૃત' },
  daysAgo: { en: 'days ago', hi: 'दिन पहले', mr: 'दिवसांपूर्वी', gu: 'દિવસો પહેલા' },

  // ── Referrals ────────────────────────────────────────────────────────────
  flaggedChildren: { en: 'flagged children', hi: 'चिह्नित बच्चे', mr: 'ध्वजांकित मुले', gu: 'ધ્વજવંદન બાળકો' },
  overdue: { en: 'overdue', hi: 'विलंबित', mr: 'अतिदेय', gu: 'મુદતવીતી' },
  sortAsc: { en: 'oldest last', hi: 'पुराने अंत में', mr: 'सर्वात जुने शेवटचे', gu: 'સૌથી જૂનું છેલ્લું' },
  sortDesc: { en: 'oldest first', hi: 'पुराने पहले', mr: 'सर्वात जुने प्रथम', gu: 'સૌથી જૂનું પ્રથમ' },
  tryClearingFilter: {
    en: 'No children match this filter. Clear it to see all flagged cases.',
    hi: 'इस फ़िल्टर से कोई बच्चा मेल नहीं खाता। सभी चिह्नित मामले देखने के लिए इसे हटाएँ।', mr: 'कोणतीही मुले या फिल्टरशी जुळत नाहीत. सर्व ध्वजांकित प्रकरणे पाहण्यासाठी ते साफ करा.', gu: 'કોઈ બાળકો આ ફિલ્ટર સાથે મેળ ખાતા નથી. બધા ફ્લેગ કરેલા કેસ જોવા માટે તેને સાફ કરો.',
  },

  // ── Supervisor dashboard ─────────────────────────────────────────────────
  sectorOverview: { en: 'Sector overview', hi: 'सेक्टर अवलोकन', mr: 'सेक्टर विहंगावलोकन', gu: 'ક્ષેત્રની ઝાંખી' },
  noCentres: { en: 'No centres assigned yet.', hi: 'अभी तक कोई केंद्र आवंटित नहीं है।', mr: 'अद्याप कोणतेही केंद्र नियुक्त केलेले नाहीत.', gu: 'હજુ સુધી કોઈ કેન્દ્રો સોંપવામાં આવ્યા નથી.' },
  noPendingReferralsBody: {
    en: 'Every flagged child has been referred and an outcome recorded.',
    hi: 'हर चिह्नित बच्चे को रेफर किया जा चुका है और परिणाम दर्ज है।', mr: 'प्रत्येक ध्वजांकित मुलाला संदर्भित केले गेले आहे आणि निकाल नोंदवला गेला आहे.', gu: 'દરેક ધ્વજાંકિત બાળકને સંદર્ભિત કરવામાં આવ્યો છે અને પરિણામ રેકોર્ડ કરવામાં આવ્યું છે.',
  },

  // ── Sign-in ──────────────────────────────────────────────────────────────
  signIn: { en: 'Sign in', hi: 'साइन इन करें', mr: 'साइन इन करा', gu: 'સાઇન ઇન કરો' },
  signingIn: { en: 'Signing in…', hi: 'साइन इन हो रहा है…', mr: 'साइन इन करत आहे...', gu: 'સાઇન ઇન કરી રહ્યાં છીએ...' },
  pinTooShort: {
    en: 'Enter at least 4 digits.',
    hi: 'कम से कम 4 अंक दर्ज करें।', mr: 'किमान 4 अंक प्रविष्ट करा.', gu: 'ઓછામાં ઓછા 4 અંકો દાખલ કરો.',
  },
  mockAuthNotice: {
    en: 'Demonstration sign-in. Real authentication (Google, phone OTP, email OTP and the offline PIN) arrives with the identity service.',
    hi: 'प्रदर्शन हेतु साइन इन। वास्तविक प्रमाणीकरण (Google, फ़ोन OTP, ईमेल OTP और ऑफ़लाइन पिन) पहचान सेवा के साथ आएगा।', mr: 'प्रात्यक्षिक साइन-इन. वास्तविक प्रमाणीकरण (Google, फोन OTP, ईमेल OTP आणि ऑफलाइन पिन) ओळख सेवेसह येते.', gu: 'પ્રદર્શન સાઇન-ઇન. વાસ્તવિક પ્રમાણીકરણ (Google, ફોન OTP, ઇમેઇલ OTP અને ઑફલાઇન PIN) ઓળખ સેવા સાથે આવે છે.',
  },

  // ── Brand & landing page ─────────────────────────────────────────────────
  ankurTagline: { en: 'Every child, growing well', hi: 'हर बच्चा, स्वस्थ विकास', mr: 'प्रत्येक मूल, चांगले वाढते', gu: 'દરેક બાળક, સારી રીતે વૃદ્ધિ પામે છે' },
  whatItDoes: { en: 'What the system does', hi: 'यह प्रणाली क्या करती है', mr: 'यंत्रणा काय करते', gu: 'તંત્ર શું કરે છે' },
  featureOfflineTitle: { en: 'Works offline', hi: 'ऑफ़लाइन काम करता है', mr: 'ऑफलाइन कार्य करते', gu: 'ઑફલાઇન કામ કરે છે' },
  featureOfflineBody: {
    en: 'Workers register children and record measurements with no network at all. Data syncs on its own once a connection returns.',
    hi: 'कार्यकर्ता बिना नेटवर्क के बच्चों का पंजीकरण और माप दर्ज करते हैं। कनेक्शन लौटते ही डेटा स्वयं सिंक हो जाता है।', mr: 'कामगार मुलांची नोंदणी करतात आणि कोणत्याही नेटवर्कशिवाय मोजमाप रेकॉर्ड करतात. एकदा कनेक्शन परत आल्यावर डेटा स्वतःच सिंक होतो.', gu: 'કામદારો બાળકોની નોંધણી કરે છે અને કોઈ નેટવર્ક વિના માપ રેકોર્ડ કરે છે. એકવાર કનેક્શન પાછું આવે ત્યારે ડેટા તેના પોતાના પર સમન્વયિત થાય છે.',
  },
  featureZScoreTitle: { en: 'WHO z-scores on device', hi: 'डिवाइस पर WHO ज़ेड-स्कोर', mr: 'डिव्हाइसवर WHO z-स्कोअर', gu: 'ઉપકરણ પર WHO z-સ્કોર્સ' },
  featureZScoreBody: {
    en: 'Weight, height and MUAC are classified against WHO growth standards on the phone itself, so the result is immediate.',
    hi: 'वज़न, लंबाई और MUAC को फ़ोन पर ही WHO मानकों के आधार पर वर्गीकृत किया जाता है, इसलिए परिणाम तुरंत मिलता है।', mr: 'वजन, उंची आणि MUAC चे वर्गीकरण फोनवरच WHO च्या वाढीच्या मानकांनुसार केले जाते, त्यामुळे परिणाम त्वरित होतो.', gu: 'વજન, ઊંચાઈ અને MUAC ને ફોન પર જ WHO વૃદ્ધિ ધોરણો વિરુદ્ધ વર્ગીકૃત કરવામાં આવે છે, તેથી પરિણામ તાત્કાલિક છે.',
  },
  featureReferralTitle: { en: 'Referrals tracked to outcome', hi: 'रेफरल का परिणाम तक अनुसरण', mr: 'रेफरल्स निकालाचा मागोवा घेतला', gu: 'રેફરલ્સ પરિણામ પર નજર રાખે છે' },
  featureReferralBody: {
    en: 'Every flagged child is followed from the moment of referral until an outcome is recorded — nothing is left open.',
    hi: 'हर चिह्नित बच्चे का रेफरल से लेकर परिणाम दर्ज होने तक अनुसरण किया जाता है — कुछ भी अधूरा नहीं छोड़ा जाता।', mr: 'रेफरलच्या क्षणापासून निकाल रेकॉर्ड होईपर्यंत प्रत्येक ध्वजांकित मुलाचे अनुसरण केले जाते — काहीही उघडे ठेवले जात नाही.', gu: 'દરેક ફ્લેગ કરેલા બાળકને રેફરલની ક્ષણથી પરિણામ નોંધાય ત્યાં સુધી અનુસરવામાં આવે છે — કંઈપણ ખુલ્લું છોડવામાં આવતું નથી.',
  },
  whoItsFor: { en: 'Who it’s for', hi: 'यह किसके लिए है', mr: 'ते कोणासाठी आहे', gu: 'તે કોના માટે છે' },
  whoItsForHint: {
    en: 'One system, five views — each role sees only what it needs, and only the children it is responsible for.',
    hi: 'एक प्रणाली, पाँच दृश्य — हर भूमिका को केवल वही दिखता है जिसकी उसे ज़रूरत है, और केवल वे बच्चे जिनकी वह ज़िम्मेदार है।', mr: 'एक प्रणाली, पाच दृश्ये - प्रत्येक भूमिका फक्त त्याला काय हवे आहे ते पाहते आणि केवळ मुलांसाठी ती जबाबदार असते.', gu: 'એક સિસ્ટમ, પાંચ મંતવ્યો — દરેક ભૂમિકા માત્ર તેને જેની જરૂર છે તે જ જુએ છે, અને તે ફક્ત બાળકો માટે જ જવાબદાર છે.',
  },
  roleAwwBlurb: {
    en: 'Registers children, records measurements and acts on results — entirely offline.',
    hi: 'बच्चों का पंजीकरण, माप दर्ज करना और परिणाम पर कार्रवाई — पूरी तरह ऑफ़लाइन।', mr: 'मुलांची नोंदणी करते, मोजमाप नोंदवते आणि परिणामांवर कार्य करते — पूर्णपणे ऑफलाइन.', gu: 'બાળકોની નોંધણી કરે છે, માપન રેકોર્ડ કરે છે અને પરિણામો પર કાર્ય કરે છે — સંપૂર્ણપણે ઑફલાઇન.',
  },
  roleSupervisorBlurb: {
    en: 'Oversees every centre in a sector: coverage, flagged cases and referral follow-up.',
    hi: 'सेक्टर के हर केंद्र की निगरानी: कवरेज, चिह्नित मामले और रेफरल अनुवर्तन।', mr: 'क्षेत्रातील प्रत्येक केंद्रावर देखरेख करते: कव्हरेज, ध्वजांकित प्रकरणे आणि संदर्भ पाठपुरावा.', gu: 'સેક્ટરમાં દરેક કેન્દ્રની દેખરેખ રાખે છે: કવરેજ, ફ્લેગ કરેલા કેસ અને રેફરલ ફોલો-અપ.',
  },
  roleDoctorBlurb: {
    en: 'Receives referred cases with the child’s growth history, and records the outcome.',
    hi: 'बच्चे के विकास इतिहास सहित रेफर किए गए मामले प्राप्त करते हैं, और परिणाम दर्ज करते हैं।', mr: 'मुलाच्या वाढीच्या इतिहासासह संदर्भित प्रकरणे प्राप्त करतात आणि निकाल नोंदवतात.', gu: 'બાળકના વિકાસના ઇતિહાસ સાથે સંદર્ભિત કેસ મેળવે છે અને પરિણામ રેકોર્ડ કરે છે.',
  },
  roleParentBlurb: {
    en: 'Follows their own child’s growth in plain language, with a card they can keep.',
    hi: 'सरल भाषा में अपने बच्चे का विकास देखते हैं, साथ में रखने योग्य कार्ड भी।', mr: 'ते ठेवू शकतील अशा कार्डसह त्यांच्या स्वतःच्या मुलाच्या वाढीचे साध्या भाषेत अनुसरण करतात.', gu: 'તેઓ રાખી શકે તેવા કાર્ડ વડે સાદી ભાષામાં તેમના પોતાના બાળકના વિકાસને અનુસરે છે.',
  },
  roleAdminBlurb: {
    en: 'Runs the system: accounts, centres, configuration and both analytics views.',
    hi: 'प्रणाली का संचालन: खाते, केंद्र, विन्यास और दोनों विश्लेषण दृश्य।', mr: 'सिस्टम चालवते: खाती, केंद्रे, कॉन्फिगरेशन आणि दोन्ही विश्लेषण दृश्ये.', gu: 'સિસ્ટમ ચલાવે છે: એકાઉન્ટ્સ, કેન્દ્રો, ગોઠવણી અને બંને વિશ્લેષણાત્મક દૃશ્યો.',
  },
  footerLine: {
    en: 'Ankur — Child Growth Management System, Track D supervisory portal.',
    hi: 'अंकुर — बाल विकास प्रबंधन प्रणाली, ट्रैक D पर्यवेक्षी पोर्टल।', mr: 'अंकुर - चाइल्ड ग्रोथ मॅनेजमेंट सिस्टम, ट्रॅक डी सुपरवायझरी पोर्टल.', gu: 'અંકુર - ચાઇલ્ડ ગ્રોથ મેનેજમેન્ટ સિસ્ટમ, ટ્રેક ડી સુપરવાઇઝરી પોર્ટલ.',
  },

  // ── Navigation (role-driven shell, EX4) ──────────────────────────────────
  navHome: { en: 'Home', hi: 'होम', mr: 'घर', gu: 'ઘર' },
  navChildren: { en: 'Children', hi: 'बच्चे', mr: 'मुले', gu: 'બાળકો' },
  navMeasure: { en: 'Measure', hi: 'मापें', mr: 'मोजणे', gu: 'માપ' },
  navOverview: { en: 'Overview', hi: 'अवलोकन', mr: 'विहंगावलोकन', gu: 'વિહંગાવલોકન' },
  navCentres: { en: 'Centres', hi: 'केंद्र', mr: 'केंद्रे', gu: 'કેન્દ્રો' },
  navReferrals: { en: 'Referrals', hi: 'रेफरल', mr: 'संदर्भ', gu: 'રેફરલ્સ' },
  navDiagnostics: { en: 'Diagnostics', hi: 'निदान', mr: 'निदान', gu: 'ડાયગ્નોસ્ટિક્સ' },
  navCases: { en: 'Cases', hi: 'मामले', mr: 'प्रकरणे', gu: 'કેસો' },
  navMyChild: { en: 'My Child', hi: 'मेरा बच्चा', mr: 'माझे मूल', gu: 'માય ચાઈલ્ડ' },
  navGrowthCard: { en: 'Growth Card', hi: 'विकास कार्ड', mr: 'ग्रोथ कार्ड', gu: 'ગ્રોથ કાર્ડ' },
  navConsole: { en: 'Console', hi: 'कंसोल', mr: 'कन्सोल', gu: 'કન્સોલ' },
  navUsers: { en: 'Users', hi: 'उपयोगकर्ता', mr: 'वापरकर्ते', gu: 'વપરાશકર્તાઓ' },
  navAnalytics: { en: 'Program Analytics', hi: 'कार्यक्रम विश्लेषण', mr: 'कार्यक्रम विश्लेषण', gu: 'પ્રોગ્રામ એનાલિટિક્સ' },
  navAppHealth: { en: 'App Health', hi: 'ऐप स्वास्थ्य', mr: 'ॲप आरोग्य', gu: 'એપ્લિકેશન આરોગ્ય' },
  navConfig: { en: 'Configuration', hi: 'विन्यास', mr: 'कॉन्फिगरेशन', gu: 'રૂપરેખાંકન' },
  navDeviceManager: { en: 'Device Manager', hi: 'उपकरण प्रबंधन', mr: 'डिव्हाइस व्यवस्थापक', gu: 'ઉપકરણ સંચાલક' },
  navSettings: { en: 'Settings', hi: 'सेटिंग्स', mr: 'सेटिंग्ज', gu: 'સેટિંગ્સ' },
  navComingSoon: { en: 'Soon', hi: 'जल्द', mr: 'लवकरच', gu: 'ટૂંક સમયમાં' },
  navMenu: { en: 'Menu', hi: 'मेन्यू', mr: 'मेनू', gu: 'મેનુ' },
  breadcrumbLabel: { en: 'Breadcrumb', hi: 'पथ', mr: 'ब्रेडक्रंब', gu: 'બ્રેડક્રમ્બ' },
  navPrimary: { en: 'Primary', hi: 'मुख्य', mr: 'प्राथमिक', gu: 'પ્રાથમિક' },
  centreDetailCrumb: { en: 'Centre detail', hi: 'केंद्र विवरण', mr: 'केंद्र तपशील', gu: 'કેન્દ્ર વિગત' },
  navCloseMenu: { en: 'Close menu', hi: 'मेन्यू बंद करें', mr: 'मेनू बंद करा', gu: 'મેનુ બંધ કરો' },
  skipToContent: { en: 'Skip to main content', hi: 'मुख्य सामग्री पर जाएँ', mr: 'मुख्य सामग्रीवर जा', gu: 'મુખ્ય સામગ્રી પર જાઓ' },

  // ── Role names (ANKUR_EXPERIENCE_ROADMAP §1) ─────────────────────────────
  roleAww: { en: 'Anganwadi Worker', hi: 'आंगनवाड़ी कार्यकर्ता', mr: 'अंगणवाडी सेविका', gu: 'આંગણવાડી કાર્યકર' },
  roleSupervisor: { en: 'Supervisor', hi: 'पर्यवेक्षक', mr: 'पर्यवेक्षक', gu: 'સુપરવાઇઝર' },
  roleDoctor: { en: 'Doctor', hi: 'चिकित्सक', mr: 'डॉक्टर', gu: 'ડોક્ટર' },
  roleParent: { en: 'Parent', hi: 'अभिभावक', mr: 'पालक', gu: 'પિતૃ' },
  roleAdmin: { en: 'Administrator', hi: 'प्रशासक', mr: 'प्रशासक', gu: 'સંચાલક' },

  // ── Appearance ───────────────────────────────────────────────────────────
  themeLight: { en: 'Light', hi: 'उजला', mr: 'प्रकाश', gu: 'પ્રકાશ' },
  themeDark: { en: 'Dark', hi: 'गहरा', mr: 'गडद', gu: 'શ્યામ' },
  themeSystem: { en: 'System', hi: 'सिस्टम', mr: 'प्रणाली', gu: 'સિસ્ટમ' },
  toggleTheme: { en: 'Change theme', hi: 'थीम बदलें', mr: 'थीम बदला', gu: 'થીમ બદલો' },

  // Honesty marker for surfaces showing illustrative figures rather than live
  // data. Mirrors SampleChip / l10n.sampleData in the mobile app.
  sampleData: { en: 'Sample data', hi: 'नमूना डेटा', mr: 'नमुना डेटा', gu: 'નમૂના ડેટા' },

  // Growth classification labels.
  // These pair with src/theme/classification.ts — the word half of the
  // "colour + word + icon" rule. Hindi wording follows the app's hi.arb so a
  // supervisor reads the same term on the phone and in the portal.
  classNormal: { en: 'Normal', hi: 'सामान्य', mr: 'सामान्य', gu: 'સામાન્ય' },
  classOverweight: { en: 'Overweight', hi: 'अधिक वजन', mr: 'जास्त वजन', gu: 'વધારે વજન' },
  classMam: { en: 'MAM', hi: 'मध्यम कुपोषण', mr: 'MAM', gu: 'MAM' },
  classSam: { en: 'SAM', hi: 'गंभीर कुपोषण', mr: 'SAM', gu: 'એસએએમ' },
  classIndeterminate: { en: 'Indeterminate', hi: 'अनिर्धारित', mr: 'अनिश्चित', gu: 'અનિશ્ચિત' },

  // Dual Role Login
  selectRole: { en: 'Select Your Role', hi: 'अपनी भूमिका चुनें', mr: 'तुमची भूमिका निवडा', gu: 'તમારી ભૂમિકા પસંદ કરો' },
} satisfies Record<string, Entry>;

/** The union of every defined string key. */
export type TranslationKey = keyof typeof translations;
