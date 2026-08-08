export type Language = 'en' | 'hi' | 'mr';

/** Every string carries both locales. Hindi is primary, English the fallback. */
type Entry = { en: string; hi: string; mr: string };

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
  appTitle: { en: 'Supervisor Dashboard', hi: 'पर्यवेक्षक डैशबोर्ड', mr: 'पर्यवेक्षक डॅशबोर्ड' },
  logout: { en: 'Logout', hi: 'लॉग आउट', mr: 'लॉगआउट करा' },
  
  // Login Page
  pinLabel: { en: 'PIN / Password', hi: 'पिन / पासवर्ड', mr: 'पिन / पासवर्ड' },
  mockLoginButton: { en: 'Mock Login', hi: 'मॉक लॉगिन', mr: 'मॉक लॉगिन' },

  // Home Page
  trackDOverview: { en: 'Track D - Overview', hi: 'ट्रैक D - अवलोकन', mr: 'ट्रॅक डी - विहंगावलोकन' },
  screenedThisMonth: { en: 'Screened This Month', hi: 'इस महीने जांच की गई', mr: 'या महिन्यात स्क्रीनिंग केले' },
  totalSamMam: { en: 'Total SAM/MAM', hi: 'कुल SAM/MAM', mr: 'एकूण SAM/MAM' },
  nonReportingCentres: { en: 'Non-Reporting Centres', hi: 'रिपोर्ट न करने वाले केंद्र', mr: 'नॉन-रिपोर्टिंग केंद्रे' },
  pendingReferrals: { en: 'Pending Referrals', hi: 'लंबित रेफरल', mr: 'प्रलंबित रेफरल्स' },
  centresOverview: { en: 'Centres Overview', hi: 'केंद्र अवलोकन', mr: 'केंद्रांचे विहंगावलोकन' },
  centre: { en: 'Centre', hi: 'केंद्र', mr: 'केंद्र' },
  screened: { en: 'Screened', hi: 'जांच की गई', mr: 'स्क्रीनिंग केले' },
  sam: { en: 'SAM', hi: 'SAM', mr: 'SAM' },
  mam: { en: 'MAM', hi: 'MAM', mr: 'MAM' },
  viewAll: { en: 'View All', hi: 'सभी देखें', mr: 'सर्व पहा' },
  daysElapsed: { en: 'days elapsed', hi: 'दिन बीत गए', mr: 'दिवस गेले' },
  noPendingReferrals: { en: 'No pending referrals.', hi: 'कोई लंबित रेफरल नहीं है।', mr: 'कोणतेही प्रलंबित संदर्भ नाहीत.' },

  // Referrals Page
  referralsListTitle: { en: 'Referrals Action List', hi: 'रेफरल कार्रवाई सूची', mr: 'संदर्भ क्रिया सूची' },
  referralsListSubtitle: { en: 'Flagged children pending action or outcome resolution', hi: 'कार्रवाई या परिणाम समाधान के लिए लंबित चिह्नित बच्चे', mr: 'प्रलंबित कृती किंवा निकाल निराकरण मुलांना ध्वजांकित केले' },
  filter: { en: 'Filter:', hi: 'फ़िल्टर:', mr: 'फिल्टर:' },
  all: { en: 'All', hi: 'सभी', mr: 'सर्व' },
  daysPending: { en: 'Days Pending', hi: 'लंबित दिन', mr: 'प्रलंबित दिवस' },
  childInitials: { en: 'Child Initials', hi: 'बच्चे के नाम के पहले अक्षर', mr: 'बाल आद्याक्षरे' },
  icdsId: { en: 'ICDS ID', hi: 'आईसीडीएस आईडी', mr: 'ICDS आयडी' },
  classification: { en: 'Classification', hi: 'वर्गीकरण', mr: 'वर्गीकरण' },
  referralState: { en: 'Referral State', hi: 'रेफरल स्थिति', mr: 'रेफरल राज्य' },
  outcomeRecorded: { en: 'Outcome Recorded', hi: 'परिणाम दर्ज किया गया', mr: 'निकाल नोंदवला' },
  referred: { en: 'Referred', hi: 'रेफर किया गया', mr: 'संदर्भित' },
  notReferred: { en: 'Not Referred', hi: 'रेफर नहीं किया गया', mr: 'संदर्भित नाही' },
  resolved: { en: 'Resolved', hi: 'समाधान हो गया', mr: 'निराकरण केले' },
  pendingOutcome: { en: 'Pending Outcome', hi: 'परिणाम लंबित है', mr: 'प्रलंबित निकाल' },
  noFlaggedFound: { en: 'No matching flagged children found.', hi: 'कोई मेल खाने वाले चिह्नित बच्चे नहीं मिले।', mr: 'कोणतीही जुळणारी ध्वजांकित मुले आढळली नाहीत.' },

  // Centre Detail Page
  centreDrillDown: { en: 'Centre Drill-Down View', hi: 'केंद्र ड्रिल-डाउन दृश्य', mr: 'केंद्र ड्रिल-डाउन दृश्य' },
  deviceHardware: { en: 'Device Hardware', hi: 'डिवाइस हार्डवेयर', mr: 'डिव्हाइस हार्डवेअर' },
  status: { en: 'Status', hi: 'स्थिति', mr: 'स्थिती' },
  connected: { en: 'Connected', hi: 'जुड़ा हुआ', mr: 'जोडलेले' },
  calOverdue: { en: 'Cal. Overdue', hi: 'कैलिब्रेशन बाकी है', mr: 'कॅल. ओव्हरड्यू' },
  disconnected: { en: 'Disconnected', hi: 'डिस्कनेक्ट हो गया', mr: 'डिस्कनेक्ट केले' },
  battery: { en: 'Battery', hi: 'बैटरी', mr: 'बॅटरी' },
  serialNo: { en: 'Serial No', hi: 'सीरियल नंबर', mr: 'अनुक्रमांक' },
  lastSynced: { en: 'Last Synced', hi: 'अंतिम सिंक', mr: 'शेवटचे समक्रमित' },
  malnutritionSummary: { en: 'Malnutrition Summary', hi: 'कुपोषण सारांश', mr: 'कुपोषण सारांश' },
  casesFromCriteria: { en: 'Cases determined from WHO Z-Score criteria', hi: 'WHO Z-स्कोर मानदंड से निर्धारित मामले', mr: 'डब्ल्यूएचओ झेड-स्कोअर निकषांवरून निर्धारित प्रकरणे' },
  lastReported: { en: 'Last reported:', hi: 'अंतिम रिपोर्ट:', mr: 'अंतिम अहवाल:' },
  screeningHistory: { en: 'Screening History (Trend)', hi: 'जांच इतिहास (ट्रेंड)', mr: 'स्क्रीनिंग इतिहास (ट्रेंड)' },
  noTrendData: { en: 'No trend data available.', hi: 'कोई ट्रेंड डेटा उपलब्ध नहीं है।', mr: 'कोणताही ट्रेंड डेटा उपलब्ध नाही.' },
  flaggedCases: { en: 'Flagged Cases (Attention Required)', hi: 'चिह्नित मामले (ध्यान देने की आवश्यकता)', mr: 'ध्वजांकित प्रकरणे (लक्ष आवश्यक)' },
  noFlaggedHere: { en: 'No flagged cases at this centre.', hi: 'इस केंद्र पर कोई चिह्नित मामले नहीं हैं।', mr: 'या केंद्रावर कोणतीही ध्वजांकित प्रकरणे नाहीत.' },

  // Data Quality Page
  dataQualityTitle: { en: 'Diagnostics & Data Quality', hi: 'निदान और डेटा गुणवत्ता', mr: 'निदान आणि डेटा गुणवत्ता' },
  dataQualitySubtitle: { en: 'Internal tracking & developer diagnostics panel', hi: 'आंतरिक ट्रैकिंग और डेवलपर डायग्नोस्टिक्स पैनल', mr: 'अंतर्गत ट्रॅकिंग आणि विकासक निदान पॅनेल' },
  engineMismatches: { en: 'Engine Mismatches', hi: 'इंजन बेमेल', mr: 'इंजिन जुळत नाही' },
  implausibleValues: { en: 'Implausible Values', hi: 'असंभव मूल्य', mr: 'अकल्पनीय मूल्ये' },
  staleDevices7d: { en: 'Stale Devices (>7d)', hi: 'पुराने डिवाइस (>7d)', mr: 'जुनी उपकरणे (>7d)' },
  diagnosticsLog: { en: 'Diagnostics Log', hi: 'डायग्नोस्टिक्स लॉग', mr: 'डायग्नोस्टिक्स लॉग' },
  reevaluate: { en: 'Re-evaluate', hi: 'पुनर्मूल्यांकन', mr: 'पुनर्मूल्यांकन करा' },
  reevaluateQueued: {
    en: 'Re-evaluation queued. The record will be reclassified on the next sync.',
    hi: 'पुनर्मूल्यांकन कतार में। अगली सिंक पर रिकॉर्ड का पुनर्वर्गीकरण होगा।', mr: 'पुनर्मूल्यांकन रांगेत. पुढील सिंकवर रेकॉर्डचे पुनर्वर्गीकरण केले जाईल.',
  },
  staleDevicesTitle: { en: 'Stale Devices (No sync in 7+ days)', hi: 'पुराने डिवाइस (7+ दिनों में कोई सिंक नहीं)', mr: 'जुनी डिव्हाइसेस (७+ दिवसात सिंक नाही)' },
  firmware: { en: 'Firmware', hi: 'फर्मवेयर', mr: 'फर्मवेअर' },
  noDataRecords: { en: 'No data quality diagnostic records logged.', hi: 'कोई डेटा गुणवत्ता डायग्नोस्टिक रिकॉर्ड लॉग नहीं किया गया।', mr: 'कोणतेही डेटा गुणवत्ता निदान रेकॉर्ड लॉग केलेले नाहीत.' },
  noStaleDetected: { en: 'All devices are syncing regularly. No stale devices detected.', hi: 'सभी डिवाइस नियमित रूप से सिंक कर रहे हैं। कोई पुराने डिवाइस नहीं मिले।', mr: 'सर्व उपकरणे नियमितपणे समक्रमित होत आहेत. कोणतीही जुनी उपकरणे आढळली नाहीत.' },

  // Public Landing Page (Website)
  publicWebsiteTitle: { en: 'Child Nutrition Monitoring System', hi: 'बाल पोषण निगरानी प्रणाली', mr: 'बाल पोषण निरीक्षण प्रणाली' },
  publicWebsiteSubtitle: { en: 'Real-time tracking and analytics for Anganwadi centres across the region.', hi: 'क्षेत्र भर में आंगनवाड़ी केंद्रों के लिए वास्तविक समय ट्रैकिंग और विश्लेषण।', mr: 'संपूर्ण प्रदेशातील अंगणवाडी केंद्रांसाठी रिअल-टाइम ट्रॅकिंग आणि विश्लेषण.' },
  systemOverview: { en: 'System Overview', hi: 'प्रणाली अवलोकन', mr: 'सिस्टम विहंगावलोकन' },
  totalCentresActive: { en: 'Active Centres', hi: 'सक्रिय केंद्र', mr: 'सक्रिय केंद्रे' },
  childrenMonitored: { en: 'Children Monitored', hi: 'निगरानी किए गए बच्चे', mr: 'मुलांचे निरीक्षण केले' },
  loginPortalBtn: { en: 'Login to Portal', hi: 'पोर्टल में लॉगिन करें', mr: 'पोर्टलवर लॉगिन करा' },

  // ── Admin: configuration ─────────────────────────────────────────────────
  configSubtitle: { en: 'Reference data and operational settings', hi: 'संदर्भ डेटा और संचालन सेटिंग्स', mr: 'संदर्भ डेटा आणि ऑपरेशनल सेटिंग्ज' },
  configClinical: { en: 'Clinical constants', hi: 'नैदानिक स्थिरांक', mr: 'क्लिनिकल स्थिरांक' },
  configClinicalHint: {
    en: 'These are not preferences. Every measurement records the engine version used, so a past z-score can be reproduced exactly — changing these from a settings screen would invalidate that history.',
    hi: 'ये प्राथमिकताएँ नहीं हैं। हर माप में प्रयुक्त इंजन संस्करण दर्ज होता है, ताकि पुराना ज़ेड-स्कोर हूबहू दोहराया जा सके — इन्हें सेटिंग्स से बदलना उस इतिहास को अमान्य कर देगा।', mr: 'ही प्राधान्ये नाहीत. प्रत्येक मोजमाप वापरलेली इंजिन आवृत्ती रेकॉर्ड करते, त्यामुळे मागील z-स्कोअर अचूकपणे पुनरुत्पादित केला जाऊ शकतो — सेटिंग्ज स्क्रीनवरून हे बदलल्यास तो इतिहास अवैध होईल.',
  },
  configOperational: { en: 'Operational settings', hi: 'संचालन सेटिंग्स', mr: 'ऑपरेशनल सेटिंग्ज' },
  configOperationalHint: {
    en: 'Thresholds the project team can tune without clinical review.',
    hi: 'वे सीमाएँ जिन्हें टीम नैदानिक समीक्षा के बिना बदल सकती है।', mr: 'क्लिनिकल पुनरावलोकनाशिवाय प्रकल्प कार्यसंघ ट्यून करू शकणारे थ्रेशोल्ड.',
  },
  configEdit: { en: 'Edit', hi: 'बदलें', mr: 'संपादित करा' },
  cfgReferenceTables: { en: 'WHO reference tables', hi: 'WHO संदर्भ तालिकाएँ', mr: 'WHO संदर्भ सारणी' },
  cfgReferenceTablesHint: {
    en: 'The LMS growth standards every z-score is computed against.',
    hi: 'वे LMS विकास मानक जिनके आधार पर हर ज़ेड-स्कोर निकाला जाता है।', mr: 'प्रत्येक z-स्कोअरच्या विरूद्ध LMS वाढ मानकांची गणना केली जाते.',
  },
  cfgEngineVersion: { en: 'Z-score engine', hi: 'ज़ेड-स्कोर इंजन', mr: 'झेड-स्कोर इंजिन' },
  cfgEngineVersionHint: {
    en: 'Stamped on every measurement row for reproducibility and audit.',
    hi: 'पुनरुत्पादन और ऑडिट हेतु हर माप पंक्ति पर दर्ज।', mr: 'पुनरुत्पादकता आणि ऑडिटसाठी प्रत्येक मापन पंक्तीवर शिक्का मारला जातो.',
  },
  cfgOverdueThreshold: { en: 'Overdue threshold', hi: 'विलंब सीमा', mr: 'ओव्हरड्यू थ्रेशोल्ड' },
  cfgOverdueThresholdHint: {
    en: 'How long since the last measurement before a child is flagged overdue.',
    hi: 'अंतिम माप के कितने समय बाद बच्चा विलंबित माना जाए।', mr: 'मुलाच्या आधीचे शेवटचे मोजमाप किती काळापासून फ्लॅग केले गेले आहे.',
  },
  cfgSyncBatchSize: { en: 'Sync batch size', hi: 'सिंक बैच आकार', mr: 'बॅच आकार समक्रमित करा' },
  cfgSyncBatchSizeHint: {
    en: 'Records sent to the server per batch.',
    hi: 'प्रति बैच सर्वर को भेजे गए रिकॉर्ड।', mr: 'प्रति बॅच सर्व्हरला पाठवलेले रेकॉर्ड.',
  },
  cfgStaleDeviceDays: { en: 'Stale device threshold', hi: 'पुराना डिवाइस सीमा', mr: 'स्टेल डिव्हाइस थ्रेशोल्ड' },
  cfgStaleDeviceDaysHint: {
    en: 'How long without a sync before a device is reported stale.',
    hi: 'कितने समय बिना सिंक रहने पर डिवाइस पुराना माना जाए।', mr: 'डिव्हाइस जुने झाल्याची तक्रार करण्यापूर्वी किती वेळ सिंक न करता.',
  },
  configGateTitle: { en: 'Reference tables not yet loaded', hi: 'संदर्भ तालिकाएँ अभी लोड नहीं', mr: 'संदर्भ तक्ते अद्याप लोड केलेले नाहीत' },
  configGateBody: {
    en: 'The official WHO tables have not been installed on this deployment. Until they are, the engine reports every result as indeterminate — with the exception that oedema still forces a SAM classification. This is deliberate fail-safe behaviour, not a fault.',
    hi: 'इस परिनियोजन पर आधिकारिक WHO तालिकाएँ स्थापित नहीं हैं। तब तक इंजन हर परिणाम को अनिर्धारित बताता है — केवल सूजन होने पर SAM वर्गीकरण लागू रहता है। यह जानबूझकर बनाया गया सुरक्षित व्यवहार है, कोई खराबी नहीं।', mr: 'या तैनातीवर अधिकृत WHO टेबल स्थापित केलेले नाहीत. ते होईपर्यंत, इंजिन प्रत्येक परिणाम अनिश्चित म्हणून नोंदवते — अपवाद वगळता की एडेमा अजूनही SAM वर्गीकरणास भाग पाडते. हे मुद्दाम अयशस्वी-सुरक्षित वर्तन आहे, दोष नाही.',
  },

  // ── Admin: audit ─────────────────────────────────────────────────────────
  auditSubtitle: { en: 'Who changed what, and when', hi: 'किसने क्या बदला, और कब', mr: 'कोणी काय आणि केव्हा बदलले' },
  auditRecent: { en: 'Recent activity', hi: 'हाल की गतिविधि', mr: 'अलीकडील क्रियाकलाप' },
  auditEmpty: { en: 'No activity recorded.', hi: 'कोई गतिविधि दर्ज नहीं।', mr: 'कोणतीही गतिविधी रेकॉर्ड केलेली नाही.' },
  auditEmptyBody: {
    en: 'Approvals, measurements and consent changes will appear here.',
    hi: 'अनुमोदन, माप और सहमति परिवर्तन यहाँ दिखेंगे।', mr: 'मंजूरी, मोजमाप आणि संमती बदल येथे दिसतील.',
  },
  auditRetentionNote: {
    en: 'Audit entries are retained for the life of the programme and cannot be edited or deleted from this screen.',
    hi: 'ऑडिट प्रविष्टियाँ कार्यक्रम की पूरी अवधि तक रखी जाती हैं और इस स्क्रीन से न बदली जा सकती हैं न हटाई जा सकती हैं।', mr: 'ऑडिट एंट्री प्रोग्रामच्या आयुष्यासाठी ठेवल्या जातात आणि या स्क्रीनवरून संपादित किंवा हटवल्या जाऊ शकत नाहीत.',
  },
  auditApprovedUser: { en: 'approved the account of', hi: 'ने खाता स्वीकृत किया —', mr: 'चे खाते मंजूर केले' },
  auditRecordedMeasurement: { en: 'recorded a measurement for', hi: 'ने माप दर्ज की —', mr: 'साठी मोजमाप नोंदवले' },
  auditRecordedOutcome: { en: 'recorded a referral outcome for', hi: 'ने रेफरल परिणाम दर्ज किया —', mr: 'साठी रेफरल परिणाम रेकॉर्ड केला' },
  auditConsentWithdrawn: { en: 'processed a consent withdrawal for', hi: 'ने सहमति वापसी दर्ज की —', mr: 'साठी संमती मागे घेण्याची प्रक्रिया केली' },
  auditSuspendedUser: { en: 'suspended the account of', hi: 'ने खाता निलंबित किया —', mr: 'चे खाते निलंबित केले' },
  auditReferenceTablesLoaded: { en: 'loaded reference tables', hi: 'ने संदर्भ तालिकाएँ लोड कीं —', mr: 'लोड केलेल्या संदर्भ सारण्या' },

  // ── Admin: app health (system performance, not children) ─────────────────
  appHealthSubtitle: { en: 'Adoption, sync and stability', hi: 'उपयोग, सिंक और स्थिरता', mr: 'दत्तक, समक्रमण आणि स्थिरता' },
  healthCrashFree: { en: 'Crash-free sessions', hi: 'बिना क्रैश सत्र', mr: 'क्रॅश-मुक्त सत्रे' },
  healthSyncLatency: { en: 'Median sync time', hi: 'औसत सिंक समय', mr: 'मध्यम समक्रमण वेळ' },
  healthOutboxBacklog: { en: 'Outbox backlog', hi: 'आउटबॉक्स बैकलॉग', mr: 'आउटबॉक्स अनुशेष' },
  healthOutboxHint: { en: 'records waiting', hi: 'रिकॉर्ड प्रतीक्षारत', mr: 'रेकॉर्ड प्रतीक्षा' },
  healthActiveDevices: { en: 'Active devices (7d)', hi: 'सक्रिय डिवाइस (7 दिन)', mr: 'सक्रिय उपकरणे (7d)' },
  healthDeadLetters: { en: 'Dead-lettered records', hi: 'विफल रिकॉर्ड', mr: 'मृत-अक्षर रेकॉर्ड' },
  healthDeadLettersHint: {
    en: 'Records the server rejected outright. These will never sync without someone intervening.',
    hi: 'सर्वर द्वारा अस्वीकृत रिकॉर्ड। किसी के हस्तक्षेप के बिना ये कभी सिंक नहीं होंगे।', mr: 'पूर्णपणे नाकारलेल्या सर्व्हरची नोंद करते. कोणीतरी हस्तक्षेप केल्याशिवाय हे कधीही समक्रमित होणार नाहीत.',
  },
  healthSyncTitle: { en: 'Sync success this week', hi: 'इस सप्ताह सिंक सफलता', mr: 'या आठवड्यात समक्रमण यश' },
  healthSyncHint: {
    en: 'Batches delivered to the server each day, and how many failed.',
    hi: 'हर दिन सर्वर तक पहुँचे बैच, और कितने विफल हुए।', mr: 'प्रत्येक दिवशी सर्व्हरवर वितरित केलेल्या बॅचेस आणि किती अयशस्वी झाले.',
  },
  healthSynced: { en: 'Synced', hi: 'सिंक हुए', mr: 'समक्रमित' },
  healthFailed: { en: 'Failed', hi: 'विफल', mr: 'अयशस्वी' },
  healthOfflineTitle: { en: 'Offline usage', hi: 'ऑफ़लाइन उपयोग', mr: 'ऑफलाइन वापर' },
  healthOfflineHint: {
    en: 'A high share is expected and healthy — the field app is built to work without a network.',
    hi: 'अधिक हिस्सा अपेक्षित और सही है — फ़ील्ड ऐप बिना नेटवर्क चलने के लिए ही बना है।', mr: 'उच्च वाटा अपेक्षित आणि निरोगी आहे — फील्ड ॲप नेटवर्कशिवाय कार्य करण्यासाठी तयार केले आहे.',
  },
  healthOfflineSessions: { en: 'Sessions started offline', hi: 'ऑफ़लाइन शुरू हुए सत्र', mr: 'सत्र ऑफलाइन सुरू झाले' },
  healthVersionSpread: { en: 'App versions in the field', hi: 'फ़ील्ड में ऐप संस्करण', mr: 'फील्डमधील ॲप आवृत्त्या' },
  healthCurrent: { en: 'Current', hi: 'वर्तमान', mr: 'चालू' },
  healthDevices: { en: 'devices', hi: 'डिवाइस', mr: 'उपकरणे' },

  // ── Admin: programme analytics (child health outcomes) ───────────────────
  analyticsSubtitle: { en: 'Coverage and malnutrition outcomes', hi: 'कवरेज और कुपोषण परिणाम', mr: 'कव्हरेज आणि कुपोषण परिणाम' },
  analyticsScreenedLatest: { en: 'Screened this month', hi: 'इस महीने जांच', mr: 'या महिन्यात स्क्रीनिंग केले' },
  analyticsSamChange: { en: 'SAM change', hi: 'SAM परिवर्तन', mr: 'SAM बदल' },
  analyticsSinceFeb: { en: 'since February', hi: 'फ़रवरी से', mr: 'फेब्रुवारी पासून' },
  analyticsCoverage: { en: 'Screening coverage', hi: 'जांच कवरेज', mr: 'स्क्रीनिंग कव्हरेज' },
  analyticsCoverageHint: {
    en: 'Children measured each month across all centres.',
    hi: 'सभी केंद्रों पर हर महीने मापे गए बच्चे।', mr: 'प्रत्येक महिन्याला सर्व केंद्रांवर मुलांचे मोजमाप केले जाते.',
  },
  analyticsMalnutritionTrend: { en: 'SAM and MAM over time', hi: 'समय के साथ SAM और MAM', mr: 'कालांतराने SAM आणि MAM' },
  analyticsTrendHint: {
    en: 'Falling counts with steady coverage indicate real improvement; falling counts with falling coverage may only mean fewer children were measured.',
    hi: 'कवरेज स्थिर रहते हुए संख्या घटे तो वास्तविक सुधार है; कवरेज भी घटे तो शायद केवल कम बच्चों की माप हुई।', mr: 'स्थिर कव्हरेजसह घसरण संख्या वास्तविक सुधारणा दर्शवते; घटत्या कव्हरेजसह घटत्या संख्येचा अर्थ फक्त कमी मुलांचे मोजमाप केले जाऊ शकते.',
  },
  analyticsCurrentMix: { en: 'Current classification mix', hi: 'वर्तमान वर्गीकरण वितरण', mr: 'वर्तमान वर्गीकरण मिश्रण' },
  analyticsChildrenClassified: { en: 'children classified', hi: 'बच्चे वर्गीकृत', mr: 'मुले वर्गीकृत' },
  analyticsChildren: { en: 'Children', hi: 'बच्चे', mr: 'मुले' },

  // ── Admin: users ─────────────────────────────────────────────────────────
  adminUsersSubtitle: { en: 'Accounts, roles and approvals', hi: 'खाते, भूमिकाएँ और अनुमोदन', mr: 'खाती, भूमिका आणि मंजूरी' },
  userAccounts: { en: 'Accounts', hi: 'खाते', mr: 'खाती' },
  userActive: { en: 'Active', hi: 'सक्रिय', mr: 'सक्रिय' },
  userPending: { en: 'Pending', hi: 'लंबित', mr: 'प्रलंबित' },
  userPendingApproval: { en: 'Awaiting approval', hi: 'अनुमोदन प्रतीक्षित', mr: 'मंजुरीच्या प्रतीक्षेत' },
  userSuspended: { en: 'Suspended', hi: 'निलंबित', mr: 'निलंबित' },
  userApprovalQueue: { en: 'Approval queue', hi: 'अनुमोदन कतार', mr: 'मंजुरीची रांग' },
  userApprovalHint: {
    en: 'A user requests a role on sign-up; an administrator approves it and binds them to a centre, sector or child. No role is self-granted.',
    hi: 'उपयोगकर्ता साइन-अप पर भूमिका का अनुरोध करता है; प्रशासक उसे स्वीकृत कर केंद्र, सेक्टर या बच्चे से जोड़ता है। कोई भी भूमिका स्वयं नहीं ली जा सकती।', mr: 'साइन-अप करताना वापरकर्त्याने भूमिकेची विनंती केली; प्रशासक त्यास मान्यता देतो आणि त्यांना केंद्र, क्षेत्र किंवा मुलाशी जोडतो. कोणतीही भूमिका स्वत:ला दिली जात नाही.',
  },
  userNoPending: { en: 'Nothing awaiting approval.', hi: 'कोई अनुमोदन प्रतीक्षित नहीं।', mr: 'मंजुरीच्या प्रतीक्षेत काहीही नाही.' },
  userNoPendingBody: {
    en: 'New sign-ups appear here for you to approve and scope.',
    hi: 'नए साइन-अप यहाँ दिखेंगे, जिन्हें आप स्वीकृत कर दायरा तय करेंगे।', mr: 'नवीन साइन-अप तुमच्या मंजूरीसाठी आणि व्याप्तीसाठी येथे दिसतात.',
  },
  userRequesting: { en: 'Requesting', hi: 'अनुरोधित भूमिका', mr: 'विनंती करत आहे' },
  userApprovedToast: { en: 'account approved', hi: 'खाता स्वीकृत', mr: 'खाते मंजूर' },
  userRejectedToast: { en: 'request rejected', hi: 'अनुरोध अस्वीकृत', mr: 'विनंती नाकारली' },
  userApprove: { en: 'Approve', hi: 'स्वीकृत', mr: 'मंजूर करा' },
  userReject: { en: 'Reject', hi: 'अस्वीकृत', mr: 'नकार द्या' },
  userDirectory: { en: 'All accounts', hi: 'सभी खाते', mr: 'सर्व खाती' },
  userName: { en: 'Name', hi: 'नाम', mr: 'नाव' },
  userScope: { en: 'Scope', hi: 'दायरा', mr: 'व्याप्ती' },
  userSignInMethod: { en: 'Sign-in', hi: 'साइन-इन', mr: 'साइन इन करा' },
  userNoAccounts: { en: 'No accounts yet.', hi: 'अभी कोई खाता नहीं।', mr: 'अद्याप कोणतीही खाती नाहीत.' },
  authGoogle: { en: 'Google', hi: 'Google', mr: 'Google' },
  authPhoneOtp: { en: 'Phone OTP', hi: 'फ़ोन OTP', mr: 'फोन OTP' },
  authEmailOtp: { en: 'Email OTP', hi: 'ईमेल OTP', mr: 'ईमेल OTP' },
  authPin: { en: 'Offline PIN', hi: 'ऑफ़लाइन पिन', mr: 'ऑफलाइन पिन' },

  // ── Parent growth card ───────────────────────────────────────────────────
  growthCardSubtitle: { en: 'Print or share your child’s growth record', hi: 'अपने बच्चे का विकास रिकॉर्ड प्रिंट या साझा करें', mr: 'तुमच्या मुलाच्या वाढीचा रेकॉर्ड छापा किंवा शेअर करा' },
  growthCardTitle: { en: 'Child growth card', hi: 'बाल विकास कार्ड', mr: 'बाल वाढ कार्ड' },
  growthCardWeightTrend: { en: 'Weight over time', hi: 'समय के साथ वज़न', mr: 'कालांतराने वजन' },
  growthCardWeightHint: {
    en: 'Each point is one monthly measurement at your Anganwadi centre.',
    hi: 'हर बिंदु आपके आंगनवाड़ी केंद्र पर हुई एक मासिक माप है।', mr: 'प्रत्येक बिंदू तुमच्या अंगणवाडी केंद्रात एक मासिक मोजमाप आहे.',
  },
  growthCardFooter: {
    en: 'Bring this card to your next visit. If you have any concern about your child’s growth, speak to your Anganwadi worker or ANM.',
    hi: 'अगली बार आते समय यह कार्ड साथ लाएँ। अपने बच्चे के विकास को लेकर कोई भी चिंता हो तो अपनी आंगनवाड़ी कार्यकर्ता या ANM से बात करें।', mr: 'तुमच्या पुढील भेटीसाठी हे कार्ड आणा. तुम्हाला तुमच्या मुलाच्या वाढीबद्दल काही चिंता असल्यास, तुमच्या अंगणवाडी सेविका किंवा ANM शी बोला.',
  },
  growthCardOpen: { en: 'Open card', hi: 'कार्ड खोलें', mr: 'कार्ड उघडा' },
  parentTrendHint: {
    en: 'Your child’s weight at each monthly visit.',
    hi: 'हर मासिक भेंट पर आपके बच्चे का वज़न।', mr: 'प्रत्येक मासिक भेटीत तुमच्या मुलाचे वजन.',
  },
  growthCardPrint: { en: 'Print', hi: 'प्रिंट करें', mr: 'छापा' },
  growthCardShare: { en: 'Share', hi: 'साझा करें', mr: 'शेअर करा' },

  // ── Measurement capture ──────────────────────────────────────────────────
  measureSubtitle: { en: 'Record a growth measurement', hi: 'विकास माप दर्ज करें', mr: 'वाढ मोजमाप नोंदवा' },
  measureProgress: { en: 'Capture progress', hi: 'माप प्रगति', mr: 'प्रगती कॅप्चर करा' },
  measureStep: { en: 'Step', hi: 'चरण', mr: 'पायरी' },
  measureStep_child: { en: 'Choose child', hi: 'बच्चा चुनें', mr: 'मूल निवडा' },
  measureStep_weight: { en: 'Weight and length', hi: 'वज़न और लंबाई', mr: 'वजन आणि लांबी' },
  measureStep_muac: { en: 'MUAC and oedema', hi: 'MUAC और सूजन', mr: 'MUAC आणि एडेमा' },
  measureStep_result: { en: 'Result', hi: 'परिणाम', mr: 'परिणाम' },
  measurePickChild: { en: 'Which child?', hi: 'कौन सा बच्चा?', mr: 'कोणते मूल?' },
  measurePickChildHint: {
    en: 'Only children with recorded consent are listed.',
    hi: 'केवल वे बच्चे सूचीबद्ध हैं जिनकी सहमति दर्ज है।', mr: 'फक्त रेकॉर्ड केलेली संमती असलेली मुले सूचीबद्ध आहेत.',
  },
  measureWeightLength: { en: 'Weight and length', hi: 'वज़न और लंबाई', mr: 'वजन आणि लांबी' },
  measureMuacOedema: { en: 'MUAC and oedema', hi: 'MUAC और सूजन', mr: 'MUAC आणि एडेमा' },
  measureWeight: { en: 'Weight', hi: 'वज़न', mr: 'वजन' },
  measureLength: { en: 'Length (lying down)', hi: 'लंबाई (लिटाकर)', mr: 'लांबी (आडवे)' },
  measureHeight: { en: 'Height (standing)', hi: 'ऊँचाई (खड़े होकर)', mr: 'उंची (उभे)' },
  measureLengthHint: {
    en: 'Under 24 months — measure lying down.',
    hi: '24 माह से कम — लिटाकर मापें।', mr: '24 महिन्यांपेक्षा कमी - खाली पडून मोजा.',
  },
  measureHeightHint: {
    en: '24 months and over — measure standing.',
    hi: '24 माह या अधिक — खड़े होकर मापें।', mr: '24 महिने आणि त्याहून अधिक - स्थिती मोजा.',
  },
  measureManualFallback: {
    en: 'No measuring device is paired with this portal. Enter the readings from the device manually — the same values it would have sent.',
    hi: 'इस पोर्टल से कोई माप उपकरण जुड़ा नहीं है। उपकरण पर दिखे मान स्वयं दर्ज करें — वही मान जो वह भेजता।', mr: 'या पोर्टलसोबत कोणतेही मोजमाप यंत्र जोडलेले नाही. डिव्हाइसमधून रीडिंग मॅन्युअली एंटर करा — तीच व्हॅल्यूज त्याने पाठवली असती.',
  },
  measureOedema: { en: 'Bilateral pitting oedema', hi: 'दोनों पैरों में गड्ढेदार सूजन', mr: 'द्विपक्षीय पिटिंग एडेमा' },
  measureOedemaHint: {
    en: 'Press both feet for 3 seconds. If a dent remains, oedema is present.',
    hi: 'दोनों पैरों को 3 सेकंड दबाएँ। यदि गड्ढा रह जाए, तो सूजन मौजूद है।', mr: 'दोन्ही पाय 3 सेकंद दाबा. डेंट राहिल्यास, एडेमा असतो.',
  },
  measureBack: { en: 'Back', hi: 'पीछे', mr: 'मागे' },
  measureNext: { en: 'Next', hi: 'आगे', mr: 'पुढे' },
  measureNextChild: { en: 'Measure next child', hi: 'अगले बच्चे की माप', mr: 'पुढील मुलाचे मोजमाप करा' },
  resultRecorded: { en: 'Readings recorded', hi: 'दर्ज मान', mr: 'वाचन रेकॉर्ड केले' },
  resultIndeterminate: {
    en: 'The WHO reference tables are not yet loaded on this system, so no z-score can be computed. The readings are saved and will be classified once the tables are in place.',
    hi: 'इस प्रणाली पर WHO संदर्भ तालिकाएँ अभी लोड नहीं हैं, इसलिए ज़ेड-स्कोर नहीं निकाला जा सकता। मान सुरक्षित हैं और तालिकाएँ आते ही वर्गीकरण हो जाएगा।', mr: 'WHO संदर्भ तक्ते अद्याप या प्रणालीवर लोड केलेले नाहीत, त्यामुळे कोणत्याही z-स्कोअरची गणना केली जाऊ शकत नाही. वाचन जतन केले जातात आणि एकदा टेबल्स जागेवर आल्यावर त्यांचे वर्गीकरण केले जाईल.',
  },
  resultOedemaSam: {
    en: 'Bilateral pitting oedema is present. Under WHO rules this is classified as severe acute malnutrition regardless of any measurement.',
    hi: 'दोनों पैरों में गड्ढेदार सूजन मौजूद है। WHO नियमों के अनुसार यह किसी भी माप से स्वतंत्र रूप से गंभीर तीव्र कुपोषण माना जाता है।', mr: 'द्विपक्षीय पिटिंग एडेमा उपस्थित आहे. डब्ल्यूएचओच्या नियमांनुसार हे कोणत्याही मोजमापाची पर्वा न करता तीव्र तीव्र कुपोषण म्हणून वर्गीकृत आहे.',
  },
  resultReferralAdvice: {
    en: 'It is advised that this child be shown to the ANM.',
    hi: 'इस बच्चे को ANM को दिखाने की सलाह दी जाती है।', mr: 'या मुलाला ANM ला दाखवण्याचा सल्ला देण्यात आला आहे.',
  },
  yes: { en: 'Yes', hi: 'हाँ', mr: 'होय' },
  no: { en: 'No', hi: 'नहीं', mr: 'नाही' },

  // ── Child roster ─────────────────────────────────────────────────────────
  rosterSubtitle: { en: 'Children registered at your centre', hi: 'आपके केंद्र पर पंजीकृत बच्चे', mr: 'मुलांनी तुमच्या केंद्रावर नोंदणी केली' },
  rosterRegistered: { en: 'Registered', hi: 'पंजीकृत', mr: 'नोंदणीकृत' },
  rosterOverdue: { en: 'Overdue', hi: 'विलंबित', mr: 'ओव्हरड्यू' },
  rosterFlagged: { en: 'Flagged', hi: 'चिह्नित', mr: 'ध्वजांकित' },
  rosterNoConsent: { en: 'No consent', hi: 'सहमति नहीं', mr: 'संमती नाही' },
  rosterSearchPlaceholder: {
    en: 'Search by initials or ICDS ID',
    hi: 'नाम के पहले अक्षर या आईसीडीएस आईडी से खोजें', mr: 'आद्याक्षरे किंवा ICDS ID द्वारे शोधा',
  },
  rosterClearSearch: { en: 'Clear search', hi: 'खोज साफ़ करें', mr: 'शोध साफ करा' },
  rosterClearFilters: { en: 'Clear filters', hi: 'फ़िल्टर हटाएँ', mr: 'फिल्टर साफ करा' },
  rosterNoMatches: { en: 'No children match.', hi: 'कोई बच्चा मेल नहीं खाता।', mr: 'मुले जुळत नाहीत.' },
  rosterNoMatchesBody: {
    en: 'Try a different search term, or clear the filters to see the whole roster.',
    hi: 'कोई दूसरा खोज शब्द आज़माएँ, या पूरी सूची देखने के लिए फ़िल्टर हटाएँ।', mr: 'भिन्न शोध संज्ञा वापरून पहा किंवा संपूर्ण रोस्टर पाहण्यासाठी फिल्टर साफ करा.',
  },
  rosterResultsAnnounce: { en: 'children shown', hi: 'बच्चे दिख रहे हैं', mr: 'मुले दर्शविली' },
  rosterLastMeasured: { en: 'Last measured', hi: 'अंतिम माप', mr: 'शेवटचे मोजले' },
  rosterNever: { en: 'Never', hi: 'कभी नहीं', mr: 'कधीच नाही' },
  sexMale: { en: 'Boy', hi: 'लड़का', mr: 'मुलगा' },
  sexFemale: { en: 'Girl', hi: 'लड़की', mr: 'मुलगी' },
  months: { en: 'months', hi: 'माह', mr: 'महिने' },
  dobEstimated: { en: 'DOB estimated', hi: 'जन्मतिथि अनुमानित', mr: 'डीओबीचा अंदाज' },
  dobMonthOnly: { en: 'DOB month only', hi: 'जन्म माह ही ज्ञात', mr: 'फक्त DOB महिना' },
  oedemaPresent: { en: 'Oedema present — classified SAM', hi: 'सूजन मौजूद — SAM वर्गीकृत', mr: 'एडेमा उपस्थित — वर्गीकृत SAM' },
  waz: { en: 'WAZ', hi: 'WAZ', mr: 'WAZ' },
  muac: { en: 'MUAC', hi: 'MUAC', mr: 'MUAC' },
  consentMissingNote: {
    en: 'Consent not yet recorded — this child cannot be measured.',
    hi: 'सहमति अभी दर्ज नहीं — इस बच्चे की माप नहीं ली जा सकती।', mr: 'संमती अद्याप रेकॉर्ड केलेली नाही — या मुलाचे मोजमाप केले जाऊ शकत नाही.',
  },
  consentWithdrawnNote: {
    en: 'Consent withdrawn — this child has been removed from screening.',
    hi: 'सहमति वापस ली गई — इस बच्चे को जांच से हटा दिया गया है।', mr: 'संमती मागे घेतली — या मुलाला स्क्रीनिंगमधून काढून टाकण्यात आले आहे.',
  },

  // ── Settings ─────────────────────────────────────────────────────────────
  settingsSubtitle: { en: 'Language, appearance and account', hi: 'भाषा, रूप और खाता', mr: 'भाषा, देखावा आणि खाते' },
  settingsGeneral: { en: 'General', hi: 'सामान्य', mr: 'सामान्य' },
  settingsLanguage: { en: 'Language', hi: 'भाषा', mr: 'भाषा' },
  settingsLanguageHint: {
    en: 'Applies immediately and is remembered next time you visit.',
    hi: 'तुरंत लागू होती है और अगली बार याद रखी जाती है।', mr: 'ताबडतोब लागू होते आणि तुम्ही पुढच्या वेळी भेट देता तेव्हा लक्षात ठेवले जाते.',
  },
  settingsTheme: { en: 'Appearance', hi: 'रूप', mr: 'देखावा' },
  settingsThemeHint: {
    en: 'Light, dark, or follow your device setting.',
    hi: 'उजला, गहरा, या अपने डिवाइस की सेटिंग के अनुसार।', mr: 'फिकट, गडद किंवा तुमचे डिव्हाइस सेटिंग फॉलो करा.',
  },
  settingsRole: { en: 'Role', hi: 'भूमिका', mr: 'भूमिका' },
  settingsRoleHint: {
    en: 'Development only — switching roles previews each dashboard and theme. With real sign-in your role comes from your account.',
    hi: 'केवल विकास हेतु — भूमिका बदलकर हर डैशबोर्ड और थीम देखी जा सकती है। वास्तविक साइन-इन के बाद भूमिका आपके खाते से तय होगी।', mr: 'केवळ विकास — भूमिका बदलणे प्रत्येक डॅशबोर्ड आणि थीमचे पूर्वावलोकन करते. वास्तविक साइन-इनसह तुमची भूमिका तुमच्या खात्यातून येते.',
  },
  settingsPrivacy: { en: 'Data & privacy', hi: 'डेटा और गोपनीयता', mr: 'डेटा आणि गोपनीयता' },
  settingsPrivacyBody: {
    en: 'Children are shown by initials and ICDS ID only — never full names. Measurement data is governed by the consent recorded for each child, and a withdrawn consent removes that child from screening lists.',
    hi: 'बच्चों को केवल नाम के पहले अक्षर और आईसीडीएस आईडी से दिखाया जाता है — कभी पूरा नाम नहीं। माप डेटा हर बच्चे के लिए दर्ज सहमति से नियंत्रित होता है, और सहमति वापस लेने पर बच्चा जांच सूची से हट जाता है।', mr: 'मुलांना फक्त आद्याक्षरे आणि ICDS ID द्वारे दाखवले जाते — कधीही पूर्ण नावे नाहीत. मापन डेटा प्रत्येक मुलासाठी रेकॉर्ड केलेल्या संमतीने नियंत्रित केला जातो आणि मागे घेतलेली संमती त्या मुलाला स्क्रीनिंग सूचीमधून काढून टाकते.',
  },
  settingsAbout: { en: 'About', hi: 'परिचय', mr: 'बद्दल' },
  aboutPortalVersion: { en: 'Portal version', hi: 'पोर्टल संस्करण', mr: 'पोर्टल आवृत्ती' },
  aboutEngine: { en: 'Reference tables', hi: 'संदर्भ तालिकाएँ', mr: 'संदर्भ सारण्या' },
  aboutMockNotice: {
    en: 'This portal currently runs on sample data. No live centre records are shown.',
    hi: 'यह पोर्टल अभी नमूना डेटा पर चलता है। कोई वास्तविक केंद्र रिकॉर्ड नहीं दिखाया जाता।', mr: 'हे पोर्टल सध्या नमुना डेटावर चालते. कोणतेही थेट केंद्र रेकॉर्ड दाखवले जात नाहीत.',
  },

  // ── Error boundary ───────────────────────────────────────────────────────
  errorTitle: { en: 'Something went wrong', hi: 'कुछ गड़बड़ हो गई', mr: 'काहीतरी चूक झाली' },
  errorBody: {
    en: 'This page could not be displayed. Your data has not been lost — nothing on this screen changes records.',
    hi: 'यह पृष्ठ नहीं दिखाया जा सका। आपका डेटा सुरक्षित है — इस स्क्रीन से कोई रिकॉर्ड नहीं बदलता।', mr: 'हे पृष्ठ प्रदर्शित केले जाऊ शकत नाही. तुमचा डेटा गमावला नाही — या स्क्रीनवरील काहीही रेकॉर्ड बदलत नाही.',
  },
  errorReference: { en: 'Reference:', hi: 'संदर्भ:', mr: 'संदर्भ:' },
  errorRetry: { en: 'Try again', hi: 'फिर से कोशिश करें', mr: 'पुन्हा प्रयत्न करा' },

  // ── Not found ────────────────────────────────────────────────────────────
  notFoundTitle: { en: 'Page not found', hi: 'पृष्ठ नहीं मिला', mr: 'पृष्ठ आढळले नाही' },
  notFoundBody: {
    en: 'This page does not exist, or the centre you were looking for has been removed.',
    hi: 'यह पृष्ठ मौजूद नहीं है, या आप जिस केंद्र को खोज रहे थे उसे हटा दिया गया है।', mr: 'हे पृष्ठ अस्तित्वात नाही किंवा तुम्ही शोधत असलेले केंद्र काढले गेले आहे.',
  },
  backToHome: { en: 'Back to home', hi: 'होम पर वापस', mr: 'घरी परत' },

  // ── AWW / worker home ────────────────────────────────────────────────────
  workerDashboard: { en: 'My centre', hi: 'मेरा केंद्र', mr: 'माझे केंद्र' },
  todayAtCentre: { en: 'This month at your centre', hi: 'इस महीने आपके केंद्र पर', mr: 'या महिन्यात तुमच्या केंद्रावर' },
  newMeasurement: { en: 'New measurement', hi: 'नई माप', mr: 'नवीन मोजमाप' },
  newMeasurementHint: {
    en: 'Measurements are captured on the field device.',
    hi: 'माप फ़ील्ड डिवाइस पर दर्ज की जाती है।', mr: 'फील्ड डिव्हाइसवर मोजमाप कॅप्चर केले जातात.',
  },
  syncBacklog: { en: 'Waiting to sync', hi: 'सिंक बाकी', mr: 'सिंक होण्याची प्रतीक्षा करत आहे' },
  syncBacklogHint: { en: 'records in outbox', hi: 'आउटबॉक्स में रिकॉर्ड', mr: 'आउटबॉक्समध्ये रेकॉर्ड' },

  // ── Doctor ───────────────────────────────────────────────────────────────
  doctorInbox: { en: 'Case inbox', hi: 'मामला इनबॉक्स', mr: 'केस इनबॉक्स' },
  doctorInboxSubtitle: {
    en: 'Children referred to you, awaiting an outcome',
    hi: 'आपको रेफर किए गए बच्चे, परिणाम की प्रतीक्षा में', mr: 'मुलांनी तुम्हाला संदर्भित केले आहे, निकालाची वाट पाहत आहेत',
  },
  caseList: { en: 'Referred cases', hi: 'रेफर किए गए मामले', mr: 'संदर्भित प्रकरणे' },
  casesReferred: { en: 'Referred to you', hi: 'आपको रेफर किए गए', mr: 'तुमचा संदर्भ दिला' },
  awaitingOutcome: { en: 'Awaiting outcome', hi: 'परिणाम की प्रतीक्षा', mr: 'निकालाच्या प्रतीक्षेत' },
  recordOutcome: { en: 'Record outcome', hi: 'परिणाम दर्ज करें', mr: 'निकाल नोंदवा' },
  outcomeAttended: { en: 'Attended', hi: 'उपस्थित हुए', mr: 'हजेरी लावली' },
  outcomeAttendedHint: {
    en: 'The child was brought and was seen.',
    hi: 'बच्चे को लाया गया और देखा गया।', mr: 'मुलाला आणून पाहिलं.',
  },
  outcomeNotAttended: { en: 'Did not attend', hi: 'नहीं आए', mr: 'हजर राहिले नाही' },
  outcomeNotAttendedHint: {
    en: 'The referral was made but the child was not brought.',
    hi: 'रेफरल किया गया लेकिन बच्चे को नहीं लाया गया।', mr: 'रेफरल केले पण मुलाला आणले नाही.',
  },
  outcomeUnknown: { en: 'Unknown', hi: 'पता नहीं', mr: 'अज्ञात' },
  outcomeUnknownHint: {
    en: 'The family could not be traced. Recording this is better than guessing.',
    hi: 'परिवार का पता नहीं चल सका। अनुमान लगाने से बेहतर है यही दर्ज करना।', mr: 'कुटुंबाचा शोध लागू शकला नाही. अंदाज लावण्यापेक्षा हे रेकॉर्ड करणे चांगले आहे.',
  },
  save: { en: 'Save', hi: 'सहेजें', mr: 'जतन करा' },
  cancel: { en: 'Cancel', hi: 'रद्द करें', mr: 'रद्द करा' },
  close: { en: 'Close', hi: 'बंद करें', mr: 'बंद करा' },
  noCasesReferred: { en: 'No cases referred to you.', hi: 'आपको कोई मामला रेफर नहीं किया गया है।', mr: 'कोणतीही प्रकरणे तुम्हाला संदर्भित केलेली नाहीत.' },
  noCasesReferredBody: {
    en: 'Referred children appear here as soon as a worker flags them.',
    hi: 'कार्यकर्ता द्वारा चिह्नित किए जाते ही रेफर किए गए बच्चे यहाँ दिखेंगे।', mr: 'एका कामगाराने त्यांना झेंडा लावताच संदर्भित मुले येथे दिसतात.',
  },

  // ── Parent ───────────────────────────────────────────────────────────────
  myChild: { en: 'My child', hi: 'मेरा बच्चा', mr: 'माझ्या मुलाला' },
  parentStatusNormal: {
    en: 'Your child is growing well. Keep attending the regular monthly measurement at your Anganwadi centre.',
    hi: 'आपका बच्चा अच्छी तरह बढ़ रहा है। अपने आंगनवाड़ी केंद्र पर हर महीने होने वाली नियमित माप के लिए आते रहें।', mr: 'तुमचे मूल चांगले वाढत आहे. तुमच्या अंगणवाडी केंद्रात नियमित मासिक मोजमापासाठी उपस्थित रहा.',
  },
  nextVisit: { en: 'Next measurement', hi: 'अगली माप', mr: 'पुढील मापन' },
  nextVisitHint: { en: 'Next month at your centre', hi: 'अगले महीने आपके केंद्र पर', mr: 'पुढच्या महिन्यात तुमच्या केंद्रावर' },
  growthCardHint: {
    en: 'A printable card showing your child’s growth over time.',
    hi: 'समय के साथ आपके बच्चे के विकास को दर्शाने वाला प्रिंट करने योग्य कार्ड।', mr: 'तुमच्या मुलाची कालांतराने वाढ दर्शवणारे प्रिंट करण्यायोग्य कार्ड.',
  },

  // ── Admin console ────────────────────────────────────────────────────────
  adminConsole: { en: 'Admin console', hi: 'प्रशासक कंसोल', mr: 'ॲडमिन कन्सोल' },
  adminConsoleSubtitle: {
    en: 'Users, centres, configuration and system health',
    hi: 'उपयोगकर्ता, केंद्र, विन्यास और सिस्टम स्वास्थ्य', mr: 'वापरकर्ते, केंद्रे, कॉन्फिगरेशन आणि सिस्टम आरोग्य',
  },
  manage: { en: 'Manage', hi: 'प्रबंधन', mr: 'व्यवस्थापित करा' },
  manageHint: {
    en: 'Each area opens its own page rather than crowding this one.',
    hi: 'हर क्षेत्र इस पृष्ठ को भरने के बजाय अपना अलग पृष्ठ खोलता है।', mr: 'या भागात गर्दी करण्यापेक्षा प्रत्येक क्षेत्र स्वतःचे पृष्ठ उघडते.',
  },
  activeUsers: { en: 'Active users', hi: 'सक्रिय उपयोगकर्ता', mr: 'सक्रिय वापरकर्ते' },
  devicesOnline: { en: 'Devices online', hi: 'ऑनलाइन डिवाइस', mr: 'उपकरणे ऑनलाइन' },
  deadLetters: { en: 'Sync dead-letters', hi: 'सिंक विफल रिकॉर्ड', mr: 'मृत अक्षरे समक्रमित करा' },
  adminUsersHint: { en: 'Accounts, roles and approvals', hi: 'खाते, भूमिकाएँ और अनुमोदन', mr: 'खाती, भूमिका आणि मंजूरी' },
  adminProgramHint: {
    en: 'Coverage and SAM/MAM trends — child health outcomes',
    hi: 'कवरेज और SAM/MAM रुझान — बाल स्वास्थ्य परिणाम', mr: 'कव्हरेज आणि SAM/MAM ट्रेंड - बाल आरोग्य परिणाम',
  },
  adminAppHealthHint: {
    en: 'Adoption, sync health, crashes — system performance',
    hi: 'उपयोग, सिंक स्वास्थ्य, क्रैश — सिस्टम प्रदर्शन', mr: 'दत्तक, समक्रमण आरोग्य, क्रॅश — सिस्टम कार्यप्रदर्शन',
  },
  adminConfigHint: { en: 'Reference data and settings', hi: 'संदर्भ डेटा और सेटिंग्स', mr: 'संदर्भ डेटा आणि सेटिंग्ज' },
  adminAudit: { en: 'Audit log', hi: 'ऑडिट लॉग', mr: 'ऑडिट लॉग' },
  adminAuditHint: { en: 'Who changed what, and when', hi: 'किसने क्या बदला, और कब', mr: 'कोणी काय आणि केव्हा बदलले' },

  // ── Centres ──────────────────────────────────────────────────────────────
  noFlaggedHereBody: {
    en: 'No child at this centre currently meets the SAM or MAM criteria.',
    hi: 'इस केंद्र का कोई भी बच्चा वर्तमान में SAM या MAM मानदंड पूरा नहीं करता।', mr: 'या केंद्रातील कोणतेही मूल सध्या SAM किंवा MAM निकष पूर्ण करत नाही.',
  },
  centresSubtitle: {
    en: 'Every Anganwadi centre in your sector',
    hi: 'आपके सेक्टर के सभी आंगनवाड़ी केंद्र', mr: 'तुमच्या सेक्टरमधील प्रत्येक अंगणवाडी केंद्र',
  },

  // ── Diagnostics ──────────────────────────────────────────────────────────
  diagnosticsLogHint: {
    en: 'Records where the on-device and server z-score engines disagreed, or a measurement fell outside biological plausibility.',
    hi: 'ऐसे रिकॉर्ड जहाँ डिवाइस और सर्वर के ज़ेड-स्कोर इंजन असहमत थे, या माप जैविक रूप से असंभव था।', mr: 'रेकॉर्ड जेथे ऑन-डिव्हाइस आणि सर्व्हर z-स्कोअर इंजिन असहमत आहेत, किंवा मोजमाप जैविक योग्यतेच्या बाहेर पडले आहे.',
  },
  noDataRecordsBody: {
    en: 'The on-device and server engines agree on every measurement recorded so far.',
    hi: 'अब तक दर्ज हर माप पर डिवाइस और सर्वर इंजन सहमत हैं।', mr: 'ऑन-डिव्हाइस आणि सर्व्हर इंजिन आतापर्यंत रेकॉर्ड केलेल्या प्रत्येक मापनावर सहमत आहेत.',
  },
  noStaleDetectedBody: {
    en: 'Every device has synced within the last seven days.',
    hi: 'हर डिवाइस ने पिछले सात दिनों में सिंक किया है।', mr: 'प्रत्येक डिव्हाइस मागील सात दिवसात समक्रमित झाले आहे.',
  },
  batteryDead: { en: 'dead', hi: 'खाली', mr: 'मृत' },
  daysAgo: { en: 'days ago', hi: 'दिन पहले', mr: 'दिवसांपूर्वी' },

  // ── Referrals ────────────────────────────────────────────────────────────
  flaggedChildren: { en: 'flagged children', hi: 'चिह्नित बच्चे', mr: 'ध्वजांकित मुले' },
  overdue: { en: 'overdue', hi: 'विलंबित', mr: 'अतिदेय' },
  sortAsc: { en: 'oldest last', hi: 'पुराने अंत में', mr: 'सर्वात जुने शेवटचे' },
  sortDesc: { en: 'oldest first', hi: 'पुराने पहले', mr: 'सर्वात जुने प्रथम' },
  tryClearingFilter: {
    en: 'No children match this filter. Clear it to see all flagged cases.',
    hi: 'इस फ़िल्टर से कोई बच्चा मेल नहीं खाता। सभी चिह्नित मामले देखने के लिए इसे हटाएँ।', mr: 'कोणतीही मुले या फिल्टरशी जुळत नाहीत. सर्व ध्वजांकित प्रकरणे पाहण्यासाठी ते साफ करा.',
  },

  // ── Supervisor dashboard ─────────────────────────────────────────────────
  sectorOverview: { en: 'Sector overview', hi: 'सेक्टर अवलोकन', mr: 'सेक्टर विहंगावलोकन' },
  noCentres: { en: 'No centres assigned yet.', hi: 'अभी तक कोई केंद्र आवंटित नहीं है।', mr: 'अद्याप कोणतेही केंद्र नियुक्त केलेले नाहीत.' },
  noPendingReferralsBody: {
    en: 'Every flagged child has been referred and an outcome recorded.',
    hi: 'हर चिह्नित बच्चे को रेफर किया जा चुका है और परिणाम दर्ज है।', mr: 'प्रत्येक ध्वजांकित मुलाला संदर्भित केले गेले आहे आणि निकाल नोंदवला गेला आहे.',
  },

  // ── Sign-in ──────────────────────────────────────────────────────────────
  signIn: { en: 'Sign in', hi: 'साइन इन करें', mr: 'साइन इन करा' },
  signingIn: { en: 'Signing in…', hi: 'साइन इन हो रहा है…', mr: 'साइन इन करत आहे...' },
  pinTooShort: {
    en: 'Enter at least 4 digits.',
    hi: 'कम से कम 4 अंक दर्ज करें।', mr: 'किमान 4 अंक प्रविष्ट करा.',
  },
  mockAuthNotice: {
    en: 'Demonstration sign-in. Real authentication (Google, phone OTP, email OTP and the offline PIN) arrives with the identity service.',
    hi: 'प्रदर्शन हेतु साइन इन। वास्तविक प्रमाणीकरण (Google, फ़ोन OTP, ईमेल OTP और ऑफ़लाइन पिन) पहचान सेवा के साथ आएगा।', mr: 'प्रात्यक्षिक साइन-इन. वास्तविक प्रमाणीकरण (Google, फोन OTP, ईमेल OTP आणि ऑफलाइन पिन) ओळख सेवेसह येते.',
  },

  // ── Brand & landing page ─────────────────────────────────────────────────
  ankurTagline: { en: 'Every child, growing well', hi: 'हर बच्चा, स्वस्थ विकास', mr: 'प्रत्येक मूल, चांगले वाढते' },
  whatItDoes: { en: 'What the system does', hi: 'यह प्रणाली क्या करती है', mr: 'यंत्रणा काय करते' },
  featureOfflineTitle: { en: 'Works offline', hi: 'ऑफ़लाइन काम करता है', mr: 'ऑफलाइन कार्य करते' },
  featureOfflineBody: {
    en: 'Workers register children and record measurements with no network at all. Data syncs on its own once a connection returns.',
    hi: 'कार्यकर्ता बिना नेटवर्क के बच्चों का पंजीकरण और माप दर्ज करते हैं। कनेक्शन लौटते ही डेटा स्वयं सिंक हो जाता है।', mr: 'कामगार मुलांची नोंदणी करतात आणि कोणत्याही नेटवर्कशिवाय मोजमाप रेकॉर्ड करतात. एकदा कनेक्शन परत आल्यावर डेटा स्वतःच सिंक होतो.',
  },
  featureZScoreTitle: { en: 'WHO z-scores on device', hi: 'डिवाइस पर WHO ज़ेड-स्कोर', mr: 'डिव्हाइसवर WHO z-स्कोअर' },
  featureZScoreBody: {
    en: 'Weight, height and MUAC are classified against WHO growth standards on the phone itself, so the result is immediate.',
    hi: 'वज़न, लंबाई और MUAC को फ़ोन पर ही WHO मानकों के आधार पर वर्गीकृत किया जाता है, इसलिए परिणाम तुरंत मिलता है।', mr: 'वजन, उंची आणि MUAC चे वर्गीकरण फोनवरच WHO च्या वाढीच्या मानकांनुसार केले जाते, त्यामुळे परिणाम त्वरित होतो.',
  },
  featureReferralTitle: { en: 'Referrals tracked to outcome', hi: 'रेफरल का परिणाम तक अनुसरण', mr: 'रेफरल्स निकालाचा मागोवा घेतला' },
  featureReferralBody: {
    en: 'Every flagged child is followed from the moment of referral until an outcome is recorded — nothing is left open.',
    hi: 'हर चिह्नित बच्चे का रेफरल से लेकर परिणाम दर्ज होने तक अनुसरण किया जाता है — कुछ भी अधूरा नहीं छोड़ा जाता।', mr: 'रेफरलच्या क्षणापासून निकाल रेकॉर्ड होईपर्यंत प्रत्येक ध्वजांकित मुलाचे अनुसरण केले जाते — काहीही उघडे ठेवले जात नाही.',
  },
  whoItsFor: { en: 'Who it’s for', hi: 'यह किसके लिए है', mr: 'ते कोणासाठी आहे' },
  whoItsForHint: {
    en: 'One system, five views — each role sees only what it needs, and only the children it is responsible for.',
    hi: 'एक प्रणाली, पाँच दृश्य — हर भूमिका को केवल वही दिखता है जिसकी उसे ज़रूरत है, और केवल वे बच्चे जिनकी वह ज़िम्मेदार है।', mr: 'एक प्रणाली, पाच दृश्ये - प्रत्येक भूमिका फक्त त्याला काय हवे आहे ते पाहते आणि केवळ मुलांसाठी ती जबाबदार असते.',
  },
  roleAwwBlurb: {
    en: 'Registers children, records measurements and acts on results — entirely offline.',
    hi: 'बच्चों का पंजीकरण, माप दर्ज करना और परिणाम पर कार्रवाई — पूरी तरह ऑफ़लाइन।', mr: 'मुलांची नोंदणी करते, मोजमाप नोंदवते आणि परिणामांवर कार्य करते — पूर्णपणे ऑफलाइन.',
  },
  roleSupervisorBlurb: {
    en: 'Oversees every centre in a sector: coverage, flagged cases and referral follow-up.',
    hi: 'सेक्टर के हर केंद्र की निगरानी: कवरेज, चिह्नित मामले और रेफरल अनुवर्तन।', mr: 'क्षेत्रातील प्रत्येक केंद्रावर देखरेख करते: कव्हरेज, ध्वजांकित प्रकरणे आणि संदर्भ पाठपुरावा.',
  },
  roleDoctorBlurb: {
    en: 'Receives referred cases with the child’s growth history, and records the outcome.',
    hi: 'बच्चे के विकास इतिहास सहित रेफर किए गए मामले प्राप्त करते हैं, और परिणाम दर्ज करते हैं।', mr: 'मुलाच्या वाढीच्या इतिहासासह संदर्भित प्रकरणे प्राप्त करतात आणि निकाल नोंदवतात.',
  },
  roleParentBlurb: {
    en: 'Follows their own child’s growth in plain language, with a card they can keep.',
    hi: 'सरल भाषा में अपने बच्चे का विकास देखते हैं, साथ में रखने योग्य कार्ड भी।', mr: 'ते ठेवू शकतील अशा कार्डसह त्यांच्या स्वतःच्या मुलाच्या वाढीचे साध्या भाषेत अनुसरण करतात.',
  },
  roleAdminBlurb: {
    en: 'Runs the system: accounts, centres, configuration and both analytics views.',
    hi: 'प्रणाली का संचालन: खाते, केंद्र, विन्यास और दोनों विश्लेषण दृश्य।', mr: 'सिस्टम चालवते: खाती, केंद्रे, कॉन्फिगरेशन आणि दोन्ही विश्लेषण दृश्ये.',
  },
  footerLine: {
    en: 'Ankur — Child Growth Management System, Track D supervisory portal.',
    hi: 'अंकुर — बाल विकास प्रबंधन प्रणाली, ट्रैक D पर्यवेक्षी पोर्टल।', mr: 'अंकुर - चाइल्ड ग्रोथ मॅनेजमेंट सिस्टम, ट्रॅक डी सुपरवायझरी पोर्टल.',
  },

  // ── Navigation (role-driven shell, EX4) ──────────────────────────────────
  navHome: { en: 'Home', hi: 'होम', mr: 'घर' },
  navChildren: { en: 'Children', hi: 'बच्चे', mr: 'मुले' },
  navMeasure: { en: 'Measure', hi: 'मापें', mr: 'मोजणे' },
  navOverview: { en: 'Overview', hi: 'अवलोकन', mr: 'विहंगावलोकन' },
  navCentres: { en: 'Centres', hi: 'केंद्र', mr: 'केंद्रे' },
  navReferrals: { en: 'Referrals', hi: 'रेफरल', mr: 'संदर्भ' },
  navDiagnostics: { en: 'Diagnostics', hi: 'निदान', mr: 'निदान' },
  navCases: { en: 'Cases', hi: 'मामले', mr: 'प्रकरणे' },
  navMyChild: { en: 'My Child', hi: 'मेरा बच्चा', mr: 'माझे मूल' },
  navGrowthCard: { en: 'Growth Card', hi: 'विकास कार्ड', mr: 'ग्रोथ कार्ड' },
  navConsole: { en: 'Console', hi: 'कंसोल', mr: 'कन्सोल' },
  navUsers: { en: 'Users', hi: 'उपयोगकर्ता', mr: 'वापरकर्ते' },
  navAnalytics: { en: 'Program Analytics', hi: 'कार्यक्रम विश्लेषण', mr: 'कार्यक्रम विश्लेषण' },
  navAppHealth: { en: 'App Health', hi: 'ऐप स्वास्थ्य', mr: 'ॲप आरोग्य' },
  navConfig: { en: 'Configuration', hi: 'विन्यास', mr: 'कॉन्फिगरेशन' },
  navSettings: { en: 'Settings', hi: 'सेटिंग्स', mr: 'सेटिंग्ज' },
  navComingSoon: { en: 'Soon', hi: 'जल्द', mr: 'लवकरच' },
  navMenu: { en: 'Menu', hi: 'मेन्यू', mr: 'मेनू' },
  breadcrumbLabel: { en: 'Breadcrumb', hi: 'पथ', mr: 'ब्रेडक्रंब' },
  navPrimary: { en: 'Primary', hi: 'मुख्य', mr: 'प्राथमिक' },
  centreDetailCrumb: { en: 'Centre detail', hi: 'केंद्र विवरण', mr: 'केंद्र तपशील' },
  navCloseMenu: { en: 'Close menu', hi: 'मेन्यू बंद करें', mr: 'मेनू बंद करा' },
  skipToContent: { en: 'Skip to main content', hi: 'मुख्य सामग्री पर जाएँ', mr: 'मुख्य सामग्रीवर जा' },

  // ── Role names (ANKUR_EXPERIENCE_ROADMAP §1) ─────────────────────────────
  roleAww: { en: 'Anganwadi Worker', hi: 'आंगनवाड़ी कार्यकर्ता', mr: 'अंगणवाडी सेविका' },
  roleSupervisor: { en: 'Supervisor', hi: 'पर्यवेक्षक', mr: 'पर्यवेक्षक' },
  roleDoctor: { en: 'Doctor', hi: 'चिकित्सक', mr: 'डॉक्टर' },
  roleParent: { en: 'Parent', hi: 'अभिभावक', mr: 'पालक' },
  roleAdmin: { en: 'Administrator', hi: 'प्रशासक', mr: 'प्रशासक' },

  // ── Appearance ───────────────────────────────────────────────────────────
  themeLight: { en: 'Light', hi: 'उजला', mr: 'प्रकाश' },
  themeDark: { en: 'Dark', hi: 'गहरा', mr: 'गडद' },
  themeSystem: { en: 'System', hi: 'सिस्टम', mr: 'प्रणाली' },
  toggleTheme: { en: 'Change theme', hi: 'थीम बदलें', mr: 'थीम बदला' },

  // Honesty marker for surfaces showing illustrative figures rather than live
  // data. Mirrors SampleChip / l10n.sampleData in the mobile app.
  sampleData: { en: 'Sample data', hi: 'नमूना डेटा', mr: 'नमुना डेटा' },

  // Growth classification labels.
  // These pair with src/theme/classification.ts — the word half of the
  // "colour + word + icon" rule. Hindi wording follows the app's hi.arb so a
  // supervisor reads the same term on the phone and in the portal.
  classNormal: { en: 'Normal', hi: 'सामान्य', mr: 'सामान्य' },
  classOverweight: { en: 'Overweight', hi: 'अधिक वजन', mr: 'जास्त वजन' },
  classMam: { en: 'MAM', hi: 'मध्यम कुपोषण', mr: 'MAM' },
  classSam: { en: 'SAM', hi: 'गंभीर कुपोषण', mr: 'SAM' },
  classIndeterminate: { en: 'Indeterminate', hi: 'अनिर्धारित', mr: 'अनिश्चित' },

  // Dual Role Login
  selectRole: { en: 'Select Your Role', hi: 'अपनी भूमिका चुनें', mr: 'तुमची भूमिका निवडा' },
} satisfies Record<string, Entry>;

/** The union of every defined string key. */
export type TranslationKey = keyof typeof translations;
