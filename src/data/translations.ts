export type Language = 'en' | 'hi';

/** Every string carries both locales. Hindi is primary, English the fallback. */
type Entry = { en: string; hi: string };

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
  appTitle: { en: 'Supervisor Dashboard', hi: 'पर्यवेक्षक डैशबोर्ड' },
  logout: { en: 'Logout', hi: 'लॉग आउट' },
  
  // Login Page
  pinLabel: { en: 'PIN / Password', hi: 'पिन / पासवर्ड' },
  mockLoginButton: { en: 'Mock Login', hi: 'मॉक लॉगिन' },

  // Home Page
  trackDOverview: { en: 'Track D - Overview', hi: 'ट्रैक D - अवलोकन' },
  screenedThisMonth: { en: 'Screened This Month', hi: 'इस महीने जांच की गई' },
  totalSamMam: { en: 'Total SAM/MAM', hi: 'कुल SAM/MAM' },
  nonReportingCentres: { en: 'Non-Reporting Centres', hi: 'रिपोर्ट न करने वाले केंद्र' },
  pendingReferrals: { en: 'Pending Referrals', hi: 'लंबित रेफरल' },
  centresOverview: { en: 'Centres Overview', hi: 'केंद्र अवलोकन' },
  centre: { en: 'Centre', hi: 'केंद्र' },
  screened: { en: 'Screened', hi: 'जांच की गई' },
  sam: { en: 'SAM', hi: 'SAM' },
  mam: { en: 'MAM', hi: 'MAM' },
  viewAll: { en: 'View All', hi: 'सभी देखें' },
  daysElapsed: { en: 'days elapsed', hi: 'दिन बीत गए' },
  noPendingReferrals: { en: 'No pending referrals.', hi: 'कोई लंबित रेफरल नहीं है।' },

  // Referrals Page
  referralsListTitle: { en: 'Referrals Action List', hi: 'रेफरल कार्रवाई सूची' },
  referralsListSubtitle: { en: 'Flagged children pending action or outcome resolution', hi: 'कार्रवाई या परिणाम समाधान के लिए लंबित चिह्नित बच्चे' },
  filter: { en: 'Filter:', hi: 'फ़िल्टर:' },
  all: { en: 'All', hi: 'सभी' },
  daysPending: { en: 'Days Pending', hi: 'लंबित दिन' },
  childInitials: { en: 'Child Initials', hi: 'बच्चे के नाम के पहले अक्षर' },
  icdsId: { en: 'ICDS ID', hi: 'आईसीडीएस आईडी' },
  classification: { en: 'Classification', hi: 'वर्गीकरण' },
  referralState: { en: 'Referral State', hi: 'रेफरल स्थिति' },
  outcomeRecorded: { en: 'Outcome Recorded', hi: 'परिणाम दर्ज किया गया' },
  referred: { en: 'Referred', hi: 'रेफर किया गया' },
  notReferred: { en: 'Not Referred', hi: 'रेफर नहीं किया गया' },
  resolved: { en: 'Resolved', hi: 'समाधान हो गया' },
  pendingOutcome: { en: 'Pending Outcome', hi: 'परिणाम लंबित है' },
  noFlaggedFound: { en: 'No matching flagged children found.', hi: 'कोई मेल खाने वाले चिह्नित बच्चे नहीं मिले।' },

  // Centre Detail Page
  centreDrillDown: { en: 'Centre Drill-Down View', hi: 'केंद्र ड्रिल-डाउन दृश्य' },
  deviceHardware: { en: 'Device Hardware', hi: 'डिवाइस हार्डवेयर' },
  status: { en: 'Status', hi: 'स्थिति' },
  connected: { en: 'Connected', hi: 'जुड़ा हुआ' },
  calOverdue: { en: 'Cal. Overdue', hi: 'कैलिब्रेशन बाकी है' },
  disconnected: { en: 'Disconnected', hi: 'डिस्कनेक्ट हो गया' },
  battery: { en: 'Battery', hi: 'बैटरी' },
  serialNo: { en: 'Serial No', hi: 'सीरियल नंबर' },
  lastSynced: { en: 'Last Synced', hi: 'अंतिम सिंक' },
  malnutritionSummary: { en: 'Malnutrition Summary', hi: 'कुपोषण सारांश' },
  casesFromCriteria: { en: 'Cases determined from WHO Z-Score criteria', hi: 'WHO Z-स्कोर मानदंड से निर्धारित मामले' },
  lastReported: { en: 'Last reported:', hi: 'अंतिम रिपोर्ट:' },
  screeningHistory: { en: 'Screening History (Trend)', hi: 'जांच इतिहास (ट्रेंड)' },
  noTrendData: { en: 'No trend data available.', hi: 'कोई ट्रेंड डेटा उपलब्ध नहीं है।' },
  flaggedCases: { en: 'Flagged Cases (Attention Required)', hi: 'चिह्नित मामले (ध्यान देने की आवश्यकता)' },
  noFlaggedHere: { en: 'No flagged cases at this centre.', hi: 'इस केंद्र पर कोई चिह्नित मामले नहीं हैं।' },

  // Data Quality Page
  dataQualityTitle: { en: 'Diagnostics & Data Quality', hi: 'निदान और डेटा गुणवत्ता' },
  dataQualitySubtitle: { en: 'Internal tracking & developer diagnostics panel', hi: 'आंतरिक ट्रैकिंग और डेवलपर डायग्नोस्टिक्स पैनल' },
  engineMismatches: { en: 'Engine Mismatches', hi: 'इंजन बेमेल' },
  implausibleValues: { en: 'Implausible Values', hi: 'असंभव मूल्य' },
  staleDevices7d: { en: 'Stale Devices (>7d)', hi: 'पुराने डिवाइस (>7d)' },
  diagnosticsLog: { en: 'Diagnostics Log', hi: 'डायग्नोस्टिक्स लॉग' },
  reevaluate: { en: 'Re-evaluate', hi: 'पुनर्मूल्यांकन' },
  staleDevicesTitle: { en: 'Stale Devices (No sync in 7+ days)', hi: 'पुराने डिवाइस (7+ दिनों में कोई सिंक नहीं)' },
  firmware: { en: 'Firmware', hi: 'फर्मवेयर' },
  noDataRecords: { en: 'No data quality diagnostic records logged.', hi: 'कोई डेटा गुणवत्ता डायग्नोस्टिक रिकॉर्ड लॉग नहीं किया गया।' },
  noStaleDetected: { en: 'All devices are syncing regularly. No stale devices detected.', hi: 'सभी डिवाइस नियमित रूप से सिंक कर रहे हैं। कोई पुराने डिवाइस नहीं मिले।' },

  // Public Landing Page (Website)
  publicWebsiteTitle: { en: 'Child Nutrition Monitoring System', hi: 'बाल पोषण निगरानी प्रणाली' },
  publicWebsiteSubtitle: { en: 'Real-time tracking and analytics for Anganwadi centres across the region.', hi: 'क्षेत्र भर में आंगनवाड़ी केंद्रों के लिए वास्तविक समय ट्रैकिंग और विश्लेषण।' },
  systemOverview: { en: 'System Overview', hi: 'प्रणाली अवलोकन' },
  totalCentresActive: { en: 'Active Centres', hi: 'सक्रिय केंद्र' },
  childrenMonitored: { en: 'Children Monitored', hi: 'निगरानी किए गए बच्चे' },
  loginPortalBtn: { en: 'Login to Portal', hi: 'पोर्टल में लॉगिन करें' },

  // ── Admin: configuration ─────────────────────────────────────────────────
  configSubtitle: { en: 'Reference data and operational settings', hi: 'संदर्भ डेटा और संचालन सेटिंग्स' },
  configClinical: { en: 'Clinical constants', hi: 'नैदानिक स्थिरांक' },
  configClinicalHint: {
    en: 'These are not preferences. Every measurement records the engine version used, so a past z-score can be reproduced exactly — changing these from a settings screen would invalidate that history.',
    hi: 'ये प्राथमिकताएँ नहीं हैं। हर माप में प्रयुक्त इंजन संस्करण दर्ज होता है, ताकि पुराना ज़ेड-स्कोर हूबहू दोहराया जा सके — इन्हें सेटिंग्स से बदलना उस इतिहास को अमान्य कर देगा।',
  },
  configOperational: { en: 'Operational settings', hi: 'संचालन सेटिंग्स' },
  configOperationalHint: {
    en: 'Thresholds the project team can tune without clinical review.',
    hi: 'वे सीमाएँ जिन्हें टीम नैदानिक समीक्षा के बिना बदल सकती है।',
  },
  configEdit: { en: 'Edit', hi: 'बदलें' },
  cfgReferenceTables: { en: 'WHO reference tables', hi: 'WHO संदर्भ तालिकाएँ' },
  cfgReferenceTablesHint: {
    en: 'The LMS growth standards every z-score is computed against.',
    hi: 'वे LMS विकास मानक जिनके आधार पर हर ज़ेड-स्कोर निकाला जाता है।',
  },
  cfgEngineVersion: { en: 'Z-score engine', hi: 'ज़ेड-स्कोर इंजन' },
  cfgEngineVersionHint: {
    en: 'Stamped on every measurement row for reproducibility and audit.',
    hi: 'पुनरुत्पादन और ऑडिट हेतु हर माप पंक्ति पर दर्ज।',
  },
  cfgOverdueThreshold: { en: 'Overdue threshold', hi: 'विलंब सीमा' },
  cfgOverdueThresholdHint: {
    en: 'How long since the last measurement before a child is flagged overdue.',
    hi: 'अंतिम माप के कितने समय बाद बच्चा विलंबित माना जाए।',
  },
  cfgSyncBatchSize: { en: 'Sync batch size', hi: 'सिंक बैच आकार' },
  cfgSyncBatchSizeHint: {
    en: 'Records sent to the server per batch.',
    hi: 'प्रति बैच सर्वर को भेजे गए रिकॉर्ड।',
  },
  cfgStaleDeviceDays: { en: 'Stale device threshold', hi: 'पुराना डिवाइस सीमा' },
  cfgStaleDeviceDaysHint: {
    en: 'How long without a sync before a device is reported stale.',
    hi: 'कितने समय बिना सिंक रहने पर डिवाइस पुराना माना जाए।',
  },
  configGateTitle: { en: 'Reference tables not yet loaded', hi: 'संदर्भ तालिकाएँ अभी लोड नहीं' },
  configGateBody: {
    en: 'The official WHO tables have not been installed on this deployment. Until they are, the engine reports every result as indeterminate — with the exception that oedema still forces a SAM classification. This is deliberate fail-safe behaviour, not a fault.',
    hi: 'इस परिनियोजन पर आधिकारिक WHO तालिकाएँ स्थापित नहीं हैं। तब तक इंजन हर परिणाम को अनिर्धारित बताता है — केवल सूजन होने पर SAM वर्गीकरण लागू रहता है। यह जानबूझकर बनाया गया सुरक्षित व्यवहार है, कोई खराबी नहीं।',
  },

  // ── Admin: audit ─────────────────────────────────────────────────────────
  auditSubtitle: { en: 'Who changed what, and when', hi: 'किसने क्या बदला, और कब' },
  auditRecent: { en: 'Recent activity', hi: 'हाल की गतिविधि' },
  auditEmpty: { en: 'No activity recorded.', hi: 'कोई गतिविधि दर्ज नहीं।' },
  auditEmptyBody: {
    en: 'Approvals, measurements and consent changes will appear here.',
    hi: 'अनुमोदन, माप और सहमति परिवर्तन यहाँ दिखेंगे।',
  },
  auditRetentionNote: {
    en: 'Audit entries are retained for the life of the programme and cannot be edited or deleted from this screen.',
    hi: 'ऑडिट प्रविष्टियाँ कार्यक्रम की पूरी अवधि तक रखी जाती हैं और इस स्क्रीन से न बदली जा सकती हैं न हटाई जा सकती हैं।',
  },
  auditApprovedUser: { en: 'approved the account of', hi: 'ने खाता स्वीकृत किया —' },
  auditRecordedMeasurement: { en: 'recorded a measurement for', hi: 'ने माप दर्ज की —' },
  auditRecordedOutcome: { en: 'recorded a referral outcome for', hi: 'ने रेफरल परिणाम दर्ज किया —' },
  auditConsentWithdrawn: { en: 'processed a consent withdrawal for', hi: 'ने सहमति वापसी दर्ज की —' },
  auditSuspendedUser: { en: 'suspended the account of', hi: 'ने खाता निलंबित किया —' },
  auditReferenceTablesLoaded: { en: 'loaded reference tables', hi: 'ने संदर्भ तालिकाएँ लोड कीं —' },

  // ── Admin: app health (system performance, not children) ─────────────────
  appHealthSubtitle: { en: 'Adoption, sync and stability', hi: 'उपयोग, सिंक और स्थिरता' },
  healthCrashFree: { en: 'Crash-free sessions', hi: 'बिना क्रैश सत्र' },
  healthSyncLatency: { en: 'Median sync time', hi: 'औसत सिंक समय' },
  healthOutboxBacklog: { en: 'Outbox backlog', hi: 'आउटबॉक्स बैकलॉग' },
  healthOutboxHint: { en: 'records waiting', hi: 'रिकॉर्ड प्रतीक्षारत' },
  healthActiveDevices: { en: 'Active devices (7d)', hi: 'सक्रिय डिवाइस (7 दिन)' },
  healthDeadLetters: { en: 'Dead-lettered records', hi: 'विफल रिकॉर्ड' },
  healthDeadLettersHint: {
    en: 'Records the server rejected outright. These will never sync without someone intervening.',
    hi: 'सर्वर द्वारा अस्वीकृत रिकॉर्ड। किसी के हस्तक्षेप के बिना ये कभी सिंक नहीं होंगे।',
  },
  healthSyncTitle: { en: 'Sync success this week', hi: 'इस सप्ताह सिंक सफलता' },
  healthSyncHint: {
    en: 'Batches delivered to the server each day, and how many failed.',
    hi: 'हर दिन सर्वर तक पहुँचे बैच, और कितने विफल हुए।',
  },
  healthSynced: { en: 'Synced', hi: 'सिंक हुए' },
  healthFailed: { en: 'Failed', hi: 'विफल' },
  healthOfflineTitle: { en: 'Offline usage', hi: 'ऑफ़लाइन उपयोग' },
  healthOfflineHint: {
    en: 'A high share is expected and healthy — the field app is built to work without a network.',
    hi: 'अधिक हिस्सा अपेक्षित और सही है — फ़ील्ड ऐप बिना नेटवर्क चलने के लिए ही बना है।',
  },
  healthOfflineSessions: { en: 'Sessions started offline', hi: 'ऑफ़लाइन शुरू हुए सत्र' },
  healthVersionSpread: { en: 'App versions in the field', hi: 'फ़ील्ड में ऐप संस्करण' },
  healthCurrent: { en: 'Current', hi: 'वर्तमान' },
  healthDevices: { en: 'devices', hi: 'डिवाइस' },

  // ── Admin: programme analytics (child health outcomes) ───────────────────
  analyticsSubtitle: { en: 'Coverage and malnutrition outcomes', hi: 'कवरेज और कुपोषण परिणाम' },
  analyticsScreenedLatest: { en: 'Screened this month', hi: 'इस महीने जांच' },
  analyticsSamChange: { en: 'SAM change', hi: 'SAM परिवर्तन' },
  analyticsSinceFeb: { en: 'since February', hi: 'फ़रवरी से' },
  analyticsCoverage: { en: 'Screening coverage', hi: 'जांच कवरेज' },
  analyticsCoverageHint: {
    en: 'Children measured each month across all centres.',
    hi: 'सभी केंद्रों पर हर महीने मापे गए बच्चे।',
  },
  analyticsMalnutritionTrend: { en: 'SAM and MAM over time', hi: 'समय के साथ SAM और MAM' },
  analyticsTrendHint: {
    en: 'Falling counts with steady coverage indicate real improvement; falling counts with falling coverage may only mean fewer children were measured.',
    hi: 'कवरेज स्थिर रहते हुए संख्या घटे तो वास्तविक सुधार है; कवरेज भी घटे तो शायद केवल कम बच्चों की माप हुई।',
  },
  analyticsCurrentMix: { en: 'Current classification mix', hi: 'वर्तमान वर्गीकरण वितरण' },
  analyticsChildrenClassified: { en: 'children classified', hi: 'बच्चे वर्गीकृत' },
  analyticsChildren: { en: 'Children', hi: 'बच्चे' },

  // ── Admin: users ─────────────────────────────────────────────────────────
  adminUsersSubtitle: { en: 'Accounts, roles and approvals', hi: 'खाते, भूमिकाएँ और अनुमोदन' },
  userAccounts: { en: 'Accounts', hi: 'खाते' },
  userActive: { en: 'Active', hi: 'सक्रिय' },
  userPending: { en: 'Pending', hi: 'लंबित' },
  userPendingApproval: { en: 'Awaiting approval', hi: 'अनुमोदन प्रतीक्षित' },
  userSuspended: { en: 'Suspended', hi: 'निलंबित' },
  userApprovalQueue: { en: 'Approval queue', hi: 'अनुमोदन कतार' },
  userApprovalHint: {
    en: 'A user requests a role on sign-up; an administrator approves it and binds them to a centre, sector or child. No role is self-granted.',
    hi: 'उपयोगकर्ता साइन-अप पर भूमिका का अनुरोध करता है; प्रशासक उसे स्वीकृत कर केंद्र, सेक्टर या बच्चे से जोड़ता है। कोई भी भूमिका स्वयं नहीं ली जा सकती।',
  },
  userNoPending: { en: 'Nothing awaiting approval.', hi: 'कोई अनुमोदन प्रतीक्षित नहीं।' },
  userNoPendingBody: {
    en: 'New sign-ups appear here for you to approve and scope.',
    hi: 'नए साइन-अप यहाँ दिखेंगे, जिन्हें आप स्वीकृत कर दायरा तय करेंगे।',
  },
  userRequesting: { en: 'Requesting', hi: 'अनुरोधित भूमिका' },
  userApprove: { en: 'Approve', hi: 'स्वीकृत' },
  userReject: { en: 'Reject', hi: 'अस्वीकृत' },
  userDirectory: { en: 'All accounts', hi: 'सभी खाते' },
  userName: { en: 'Name', hi: 'नाम' },
  userScope: { en: 'Scope', hi: 'दायरा' },
  userSignInMethod: { en: 'Sign-in', hi: 'साइन-इन' },
  userNoAccounts: { en: 'No accounts yet.', hi: 'अभी कोई खाता नहीं।' },
  authGoogle: { en: 'Google', hi: 'Google' },
  authPhoneOtp: { en: 'Phone OTP', hi: 'फ़ोन OTP' },
  authEmailOtp: { en: 'Email OTP', hi: 'ईमेल OTP' },
  authPin: { en: 'Offline PIN', hi: 'ऑफ़लाइन पिन' },

  // ── Parent growth card ───────────────────────────────────────────────────
  growthCardSubtitle: { en: 'Print or share your child’s growth record', hi: 'अपने बच्चे का विकास रिकॉर्ड प्रिंट या साझा करें' },
  growthCardTitle: { en: 'Child growth card', hi: 'बाल विकास कार्ड' },
  growthCardWeightTrend: { en: 'Weight over time', hi: 'समय के साथ वज़न' },
  growthCardWeightHint: {
    en: 'Each point is one monthly measurement at your Anganwadi centre.',
    hi: 'हर बिंदु आपके आंगनवाड़ी केंद्र पर हुई एक मासिक माप है।',
  },
  growthCardFooter: {
    en: 'Bring this card to your next visit. If you have any concern about your child’s growth, speak to your Anganwadi worker or ANM.',
    hi: 'अगली बार आते समय यह कार्ड साथ लाएँ। अपने बच्चे के विकास को लेकर कोई भी चिंता हो तो अपनी आंगनवाड़ी कार्यकर्ता या ANM से बात करें।',
  },
  growthCardOpen: { en: 'Open card', hi: 'कार्ड खोलें' },
  parentTrendHint: {
    en: 'Your child’s weight at each monthly visit.',
    hi: 'हर मासिक भेंट पर आपके बच्चे का वज़न।',
  },
  growthCardPrint: { en: 'Print', hi: 'प्रिंट करें' },
  growthCardShare: { en: 'Share', hi: 'साझा करें' },

  // ── Measurement capture ──────────────────────────────────────────────────
  measureSubtitle: { en: 'Record a growth measurement', hi: 'विकास माप दर्ज करें' },
  measureProgress: { en: 'Capture progress', hi: 'माप प्रगति' },
  measureStep: { en: 'Step', hi: 'चरण' },
  measureStep_child: { en: 'Choose child', hi: 'बच्चा चुनें' },
  measureStep_weight: { en: 'Weight and length', hi: 'वज़न और लंबाई' },
  measureStep_muac: { en: 'MUAC and oedema', hi: 'MUAC और सूजन' },
  measureStep_result: { en: 'Result', hi: 'परिणाम' },
  measurePickChild: { en: 'Which child?', hi: 'कौन सा बच्चा?' },
  measurePickChildHint: {
    en: 'Only children with recorded consent are listed.',
    hi: 'केवल वे बच्चे सूचीबद्ध हैं जिनकी सहमति दर्ज है।',
  },
  measureWeightLength: { en: 'Weight and length', hi: 'वज़न और लंबाई' },
  measureMuacOedema: { en: 'MUAC and oedema', hi: 'MUAC और सूजन' },
  measureWeight: { en: 'Weight', hi: 'वज़न' },
  measureLength: { en: 'Length (lying down)', hi: 'लंबाई (लिटाकर)' },
  measureHeight: { en: 'Height (standing)', hi: 'ऊँचाई (खड़े होकर)' },
  measureLengthHint: {
    en: 'Under 24 months — measure lying down.',
    hi: '24 माह से कम — लिटाकर मापें।',
  },
  measureHeightHint: {
    en: '24 months and over — measure standing.',
    hi: '24 माह या अधिक — खड़े होकर मापें।',
  },
  measureManualFallback: {
    en: 'No measuring device is paired with this portal. Enter the readings from the device manually — the same values it would have sent.',
    hi: 'इस पोर्टल से कोई माप उपकरण जुड़ा नहीं है। उपकरण पर दिखे मान स्वयं दर्ज करें — वही मान जो वह भेजता।',
  },
  measureOedema: { en: 'Bilateral pitting oedema', hi: 'दोनों पैरों में गड्ढेदार सूजन' },
  measureOedemaHint: {
    en: 'Press both feet for 3 seconds. If a dent remains, oedema is present.',
    hi: 'दोनों पैरों को 3 सेकंड दबाएँ। यदि गड्ढा रह जाए, तो सूजन मौजूद है।',
  },
  measureBack: { en: 'Back', hi: 'पीछे' },
  measureNext: { en: 'Next', hi: 'आगे' },
  measureNextChild: { en: 'Measure next child', hi: 'अगले बच्चे की माप' },
  resultRecorded: { en: 'Readings recorded', hi: 'दर्ज मान' },
  resultIndeterminate: {
    en: 'The WHO reference tables are not yet loaded on this system, so no z-score can be computed. The readings are saved and will be classified once the tables are in place.',
    hi: 'इस प्रणाली पर WHO संदर्भ तालिकाएँ अभी लोड नहीं हैं, इसलिए ज़ेड-स्कोर नहीं निकाला जा सकता। मान सुरक्षित हैं और तालिकाएँ आते ही वर्गीकरण हो जाएगा।',
  },
  resultOedemaSam: {
    en: 'Bilateral pitting oedema is present. Under WHO rules this is classified as severe acute malnutrition regardless of any measurement.',
    hi: 'दोनों पैरों में गड्ढेदार सूजन मौजूद है। WHO नियमों के अनुसार यह किसी भी माप से स्वतंत्र रूप से गंभीर तीव्र कुपोषण माना जाता है।',
  },
  resultReferralAdvice: {
    en: 'It is advised that this child be shown to the ANM.',
    hi: 'इस बच्चे को ANM को दिखाने की सलाह दी जाती है।',
  },
  yes: { en: 'Yes', hi: 'हाँ' },
  no: { en: 'No', hi: 'नहीं' },

  // ── Child roster ─────────────────────────────────────────────────────────
  rosterSubtitle: { en: 'Children registered at your centre', hi: 'आपके केंद्र पर पंजीकृत बच्चे' },
  rosterRegistered: { en: 'Registered', hi: 'पंजीकृत' },
  rosterOverdue: { en: 'Overdue', hi: 'विलंबित' },
  rosterFlagged: { en: 'Flagged', hi: 'चिह्नित' },
  rosterNoConsent: { en: 'No consent', hi: 'सहमति नहीं' },
  rosterSearchPlaceholder: {
    en: 'Search by initials or ICDS ID',
    hi: 'नाम के पहले अक्षर या आईसीडीएस आईडी से खोजें',
  },
  rosterClearSearch: { en: 'Clear search', hi: 'खोज साफ़ करें' },
  rosterClearFilters: { en: 'Clear filters', hi: 'फ़िल्टर हटाएँ' },
  rosterNoMatches: { en: 'No children match.', hi: 'कोई बच्चा मेल नहीं खाता।' },
  rosterNoMatchesBody: {
    en: 'Try a different search term, or clear the filters to see the whole roster.',
    hi: 'कोई दूसरा खोज शब्द आज़माएँ, या पूरी सूची देखने के लिए फ़िल्टर हटाएँ।',
  },
  rosterLastMeasured: { en: 'Last measured', hi: 'अंतिम माप' },
  rosterNever: { en: 'Never', hi: 'कभी नहीं' },
  sexMale: { en: 'Boy', hi: 'लड़का' },
  sexFemale: { en: 'Girl', hi: 'लड़की' },
  months: { en: 'months', hi: 'माह' },
  dobEstimated: { en: 'DOB estimated', hi: 'जन्मतिथि अनुमानित' },
  dobMonthOnly: { en: 'DOB month only', hi: 'जन्म माह ही ज्ञात' },
  oedemaPresent: { en: 'Oedema present — classified SAM', hi: 'सूजन मौजूद — SAM वर्गीकृत' },
  waz: { en: 'WAZ', hi: 'WAZ' },
  muac: { en: 'MUAC', hi: 'MUAC' },
  consentMissingNote: {
    en: 'Consent not yet recorded — this child cannot be measured.',
    hi: 'सहमति अभी दर्ज नहीं — इस बच्चे की माप नहीं ली जा सकती।',
  },
  consentWithdrawnNote: {
    en: 'Consent withdrawn — this child has been removed from screening.',
    hi: 'सहमति वापस ली गई — इस बच्चे को जांच से हटा दिया गया है।',
  },

  // ── Settings ─────────────────────────────────────────────────────────────
  settingsSubtitle: { en: 'Language, appearance and account', hi: 'भाषा, रूप और खाता' },
  settingsGeneral: { en: 'General', hi: 'सामान्य' },
  settingsLanguage: { en: 'Language', hi: 'भाषा' },
  settingsLanguageHint: {
    en: 'Applies immediately and is remembered next time you visit.',
    hi: 'तुरंत लागू होती है और अगली बार याद रखी जाती है।',
  },
  settingsTheme: { en: 'Appearance', hi: 'रूप' },
  settingsThemeHint: {
    en: 'Light, dark, or follow your device setting.',
    hi: 'उजला, गहरा, या अपने डिवाइस की सेटिंग के अनुसार।',
  },
  settingsRole: { en: 'Role', hi: 'भूमिका' },
  settingsRoleHint: {
    en: 'Development only — switching roles previews each dashboard and theme. With real sign-in your role comes from your account.',
    hi: 'केवल विकास हेतु — भूमिका बदलकर हर डैशबोर्ड और थीम देखी जा सकती है। वास्तविक साइन-इन के बाद भूमिका आपके खाते से तय होगी।',
  },
  settingsPrivacy: { en: 'Data & privacy', hi: 'डेटा और गोपनीयता' },
  settingsPrivacyBody: {
    en: 'Children are shown by initials and ICDS ID only — never full names. Measurement data is governed by the consent recorded for each child, and a withdrawn consent removes that child from screening lists.',
    hi: 'बच्चों को केवल नाम के पहले अक्षर और आईसीडीएस आईडी से दिखाया जाता है — कभी पूरा नाम नहीं। माप डेटा हर बच्चे के लिए दर्ज सहमति से नियंत्रित होता है, और सहमति वापस लेने पर बच्चा जांच सूची से हट जाता है।',
  },
  settingsAbout: { en: 'About', hi: 'परिचय' },
  aboutPortalVersion: { en: 'Portal version', hi: 'पोर्टल संस्करण' },
  aboutEngine: { en: 'Reference tables', hi: 'संदर्भ तालिकाएँ' },
  aboutMockNotice: {
    en: 'This portal currently runs on sample data. No live centre records are shown.',
    hi: 'यह पोर्टल अभी नमूना डेटा पर चलता है। कोई वास्तविक केंद्र रिकॉर्ड नहीं दिखाया जाता।',
  },

  // ── Error boundary ───────────────────────────────────────────────────────
  errorTitle: { en: 'Something went wrong', hi: 'कुछ गड़बड़ हो गई' },
  errorBody: {
    en: 'This page could not be displayed. Your data has not been lost — nothing on this screen changes records.',
    hi: 'यह पृष्ठ नहीं दिखाया जा सका। आपका डेटा सुरक्षित है — इस स्क्रीन से कोई रिकॉर्ड नहीं बदलता।',
  },
  errorReference: { en: 'Reference:', hi: 'संदर्भ:' },
  errorRetry: { en: 'Try again', hi: 'फिर से कोशिश करें' },

  // ── Not found ────────────────────────────────────────────────────────────
  notFoundTitle: { en: 'Page not found', hi: 'पृष्ठ नहीं मिला' },
  notFoundBody: {
    en: 'This page does not exist, or the centre you were looking for has been removed.',
    hi: 'यह पृष्ठ मौजूद नहीं है, या आप जिस केंद्र को खोज रहे थे उसे हटा दिया गया है।',
  },
  backToHome: { en: 'Back to home', hi: 'होम पर वापस' },

  // ── AWW / worker home ────────────────────────────────────────────────────
  workerDashboard: { en: 'My centre', hi: 'मेरा केंद्र' },
  todayAtCentre: { en: 'This month at your centre', hi: 'इस महीने आपके केंद्र पर' },
  newMeasurement: { en: 'New measurement', hi: 'नई माप' },
  newMeasurementHint: {
    en: 'Measurements are captured on the field device.',
    hi: 'माप फ़ील्ड डिवाइस पर दर्ज की जाती है।',
  },
  syncBacklog: { en: 'Waiting to sync', hi: 'सिंक बाकी' },
  syncBacklogHint: { en: 'records in outbox', hi: 'आउटबॉक्स में रिकॉर्ड' },

  // ── Doctor ───────────────────────────────────────────────────────────────
  doctorInbox: { en: 'Case inbox', hi: 'मामला इनबॉक्स' },
  doctorInboxSubtitle: {
    en: 'Children referred to you, awaiting an outcome',
    hi: 'आपको रेफर किए गए बच्चे, परिणाम की प्रतीक्षा में',
  },
  caseList: { en: 'Referred cases', hi: 'रेफर किए गए मामले' },
  casesReferred: { en: 'Referred to you', hi: 'आपको रेफर किए गए' },
  awaitingOutcome: { en: 'Awaiting outcome', hi: 'परिणाम की प्रतीक्षा' },
  recordOutcome: { en: 'Record outcome', hi: 'परिणाम दर्ज करें' },
  noCasesReferred: { en: 'No cases referred to you.', hi: 'आपको कोई मामला रेफर नहीं किया गया है।' },
  noCasesReferredBody: {
    en: 'Referred children appear here as soon as a worker flags them.',
    hi: 'कार्यकर्ता द्वारा चिह्नित किए जाते ही रेफर किए गए बच्चे यहाँ दिखेंगे।',
  },

  // ── Parent ───────────────────────────────────────────────────────────────
  myChild: { en: 'My child', hi: 'मेरा बच्चा' },
  parentStatusNormal: {
    en: 'Your child is growing well. Keep attending the regular monthly measurement at your Anganwadi centre.',
    hi: 'आपका बच्चा अच्छी तरह बढ़ रहा है। अपने आंगनवाड़ी केंद्र पर हर महीने होने वाली नियमित माप के लिए आते रहें।',
  },
  nextVisit: { en: 'Next measurement', hi: 'अगली माप' },
  nextVisitHint: { en: 'Next month at your centre', hi: 'अगले महीने आपके केंद्र पर' },
  growthCardHint: {
    en: 'A printable card showing your child’s growth over time.',
    hi: 'समय के साथ आपके बच्चे के विकास को दर्शाने वाला प्रिंट करने योग्य कार्ड।',
  },

  // ── Admin console ────────────────────────────────────────────────────────
  adminConsole: { en: 'Admin console', hi: 'प्रशासक कंसोल' },
  adminConsoleSubtitle: {
    en: 'Users, centres, configuration and system health',
    hi: 'उपयोगकर्ता, केंद्र, विन्यास और सिस्टम स्वास्थ्य',
  },
  manage: { en: 'Manage', hi: 'प्रबंधन' },
  manageHint: {
    en: 'Each area opens its own page rather than crowding this one.',
    hi: 'हर क्षेत्र इस पृष्ठ को भरने के बजाय अपना अलग पृष्ठ खोलता है।',
  },
  activeUsers: { en: 'Active users', hi: 'सक्रिय उपयोगकर्ता' },
  devicesOnline: { en: 'Devices online', hi: 'ऑनलाइन डिवाइस' },
  deadLetters: { en: 'Sync dead-letters', hi: 'सिंक विफल रिकॉर्ड' },
  adminUsersHint: { en: 'Accounts, roles and approvals', hi: 'खाते, भूमिकाएँ और अनुमोदन' },
  adminProgramHint: {
    en: 'Coverage and SAM/MAM trends — child health outcomes',
    hi: 'कवरेज और SAM/MAM रुझान — बाल स्वास्थ्य परिणाम',
  },
  adminAppHealthHint: {
    en: 'Adoption, sync health, crashes — system performance',
    hi: 'उपयोग, सिंक स्वास्थ्य, क्रैश — सिस्टम प्रदर्शन',
  },
  adminConfigHint: { en: 'Reference data and settings', hi: 'संदर्भ डेटा और सेटिंग्स' },
  adminAudit: { en: 'Audit log', hi: 'ऑडिट लॉग' },
  adminAuditHint: { en: 'Who changed what, and when', hi: 'किसने क्या बदला, और कब' },

  // ── Centres ──────────────────────────────────────────────────────────────
  noFlaggedHereBody: {
    en: 'No child at this centre currently meets the SAM or MAM criteria.',
    hi: 'इस केंद्र का कोई भी बच्चा वर्तमान में SAM या MAM मानदंड पूरा नहीं करता।',
  },
  centresSubtitle: {
    en: 'Every Anganwadi centre in your sector',
    hi: 'आपके सेक्टर के सभी आंगनवाड़ी केंद्र',
  },

  // ── Diagnostics ──────────────────────────────────────────────────────────
  diagnosticsLogHint: {
    en: 'Records where the on-device and server z-score engines disagreed, or a measurement fell outside biological plausibility.',
    hi: 'ऐसे रिकॉर्ड जहाँ डिवाइस और सर्वर के ज़ेड-स्कोर इंजन असहमत थे, या माप जैविक रूप से असंभव था।',
  },
  noDataRecordsBody: {
    en: 'The on-device and server engines agree on every measurement recorded so far.',
    hi: 'अब तक दर्ज हर माप पर डिवाइस और सर्वर इंजन सहमत हैं।',
  },
  noStaleDetectedBody: {
    en: 'Every device has synced within the last seven days.',
    hi: 'हर डिवाइस ने पिछले सात दिनों में सिंक किया है।',
  },
  batteryDead: { en: 'dead', hi: 'खाली' },
  daysAgo: { en: 'days ago', hi: 'दिन पहले' },

  // ── Referrals ────────────────────────────────────────────────────────────
  flaggedChildren: { en: 'flagged children', hi: 'चिह्नित बच्चे' },
  overdue: { en: 'overdue', hi: 'विलंबित' },
  sortAsc: { en: 'oldest last', hi: 'पुराने अंत में' },
  sortDesc: { en: 'oldest first', hi: 'पुराने पहले' },
  tryClearingFilter: {
    en: 'No children match this filter. Clear it to see all flagged cases.',
    hi: 'इस फ़िल्टर से कोई बच्चा मेल नहीं खाता। सभी चिह्नित मामले देखने के लिए इसे हटाएँ।',
  },

  // ── Supervisor dashboard ─────────────────────────────────────────────────
  sectorOverview: { en: 'Sector overview', hi: 'सेक्टर अवलोकन' },
  noCentres: { en: 'No centres assigned yet.', hi: 'अभी तक कोई केंद्र आवंटित नहीं है।' },
  noPendingReferralsBody: {
    en: 'Every flagged child has been referred and an outcome recorded.',
    hi: 'हर चिह्नित बच्चे को रेफर किया जा चुका है और परिणाम दर्ज है।',
  },

  // ── Sign-in ──────────────────────────────────────────────────────────────
  signIn: { en: 'Sign in', hi: 'साइन इन करें' },
  signingIn: { en: 'Signing in…', hi: 'साइन इन हो रहा है…' },
  pinTooShort: {
    en: 'Enter at least 4 digits.',
    hi: 'कम से कम 4 अंक दर्ज करें।',
  },
  mockAuthNotice: {
    en: 'Demonstration sign-in. Real authentication (Google, phone OTP, email OTP and the offline PIN) arrives with the identity service.',
    hi: 'प्रदर्शन हेतु साइन इन। वास्तविक प्रमाणीकरण (Google, फ़ोन OTP, ईमेल OTP और ऑफ़लाइन पिन) पहचान सेवा के साथ आएगा।',
  },

  // ── Brand & landing page ─────────────────────────────────────────────────
  ankurTagline: { en: 'Every child, growing well', hi: 'हर बच्चा, स्वस्थ विकास' },
  whatItDoes: { en: 'What the system does', hi: 'यह प्रणाली क्या करती है' },
  featureOfflineTitle: { en: 'Works offline', hi: 'ऑफ़लाइन काम करता है' },
  featureOfflineBody: {
    en: 'Workers register children and record measurements with no network at all. Data syncs on its own once a connection returns.',
    hi: 'कार्यकर्ता बिना नेटवर्क के बच्चों का पंजीकरण और माप दर्ज करते हैं। कनेक्शन लौटते ही डेटा स्वयं सिंक हो जाता है।',
  },
  featureZScoreTitle: { en: 'WHO z-scores on device', hi: 'डिवाइस पर WHO ज़ेड-स्कोर' },
  featureZScoreBody: {
    en: 'Weight, height and MUAC are classified against WHO growth standards on the phone itself, so the result is immediate.',
    hi: 'वज़न, लंबाई और MUAC को फ़ोन पर ही WHO मानकों के आधार पर वर्गीकृत किया जाता है, इसलिए परिणाम तुरंत मिलता है।',
  },
  featureReferralTitle: { en: 'Referrals tracked to outcome', hi: 'रेफरल का परिणाम तक अनुसरण' },
  featureReferralBody: {
    en: 'Every flagged child is followed from the moment of referral until an outcome is recorded — nothing is left open.',
    hi: 'हर चिह्नित बच्चे का रेफरल से लेकर परिणाम दर्ज होने तक अनुसरण किया जाता है — कुछ भी अधूरा नहीं छोड़ा जाता।',
  },
  whoItsFor: { en: 'Who it’s for', hi: 'यह किसके लिए है' },
  whoItsForHint: {
    en: 'One system, five views — each role sees only what it needs, and only the children it is responsible for.',
    hi: 'एक प्रणाली, पाँच दृश्य — हर भूमिका को केवल वही दिखता है जिसकी उसे ज़रूरत है, और केवल वे बच्चे जिनकी वह ज़िम्मेदार है।',
  },
  roleAwwBlurb: {
    en: 'Registers children, records measurements and acts on results — entirely offline.',
    hi: 'बच्चों का पंजीकरण, माप दर्ज करना और परिणाम पर कार्रवाई — पूरी तरह ऑफ़लाइन।',
  },
  roleSupervisorBlurb: {
    en: 'Oversees every centre in a sector: coverage, flagged cases and referral follow-up.',
    hi: 'सेक्टर के हर केंद्र की निगरानी: कवरेज, चिह्नित मामले और रेफरल अनुवर्तन।',
  },
  roleDoctorBlurb: {
    en: 'Receives referred cases with the child’s growth history, and records the outcome.',
    hi: 'बच्चे के विकास इतिहास सहित रेफर किए गए मामले प्राप्त करते हैं, और परिणाम दर्ज करते हैं।',
  },
  roleParentBlurb: {
    en: 'Follows their own child’s growth in plain language, with a card they can keep.',
    hi: 'सरल भाषा में अपने बच्चे का विकास देखते हैं, साथ में रखने योग्य कार्ड भी।',
  },
  roleAdminBlurb: {
    en: 'Runs the system: accounts, centres, configuration and both analytics views.',
    hi: 'प्रणाली का संचालन: खाते, केंद्र, विन्यास और दोनों विश्लेषण दृश्य।',
  },
  footerLine: {
    en: 'Ankur — Child Growth Management System, Track D supervisory portal.',
    hi: 'अंकुर — बाल विकास प्रबंधन प्रणाली, ट्रैक D पर्यवेक्षी पोर्टल।',
  },

  // ── Navigation (role-driven shell, EX4) ──────────────────────────────────
  navHome: { en: 'Home', hi: 'होम' },
  navChildren: { en: 'Children', hi: 'बच्चे' },
  navMeasure: { en: 'Measure', hi: 'मापें' },
  navOverview: { en: 'Overview', hi: 'अवलोकन' },
  navCentres: { en: 'Centres', hi: 'केंद्र' },
  navReferrals: { en: 'Referrals', hi: 'रेफरल' },
  navDiagnostics: { en: 'Diagnostics', hi: 'निदान' },
  navCases: { en: 'Cases', hi: 'मामले' },
  navMyChild: { en: 'My Child', hi: 'मेरा बच्चा' },
  navGrowthCard: { en: 'Growth Card', hi: 'विकास कार्ड' },
  navConsole: { en: 'Console', hi: 'कंसोल' },
  navUsers: { en: 'Users', hi: 'उपयोगकर्ता' },
  navAnalytics: { en: 'Program Analytics', hi: 'कार्यक्रम विश्लेषण' },
  navAppHealth: { en: 'App Health', hi: 'ऐप स्वास्थ्य' },
  navConfig: { en: 'Configuration', hi: 'विन्यास' },
  navSettings: { en: 'Settings', hi: 'सेटिंग्स' },
  navComingSoon: { en: 'Soon', hi: 'जल्द' },
  navMenu: { en: 'Menu', hi: 'मेन्यू' },
  navCloseMenu: { en: 'Close menu', hi: 'मेन्यू बंद करें' },
  skipToContent: { en: 'Skip to main content', hi: 'मुख्य सामग्री पर जाएँ' },

  // ── Role names (ANKUR_EXPERIENCE_ROADMAP §1) ─────────────────────────────
  roleAww: { en: 'Anganwadi Worker', hi: 'आंगनवाड़ी कार्यकर्ता' },
  roleSupervisor: { en: 'Supervisor', hi: 'पर्यवेक्षक' },
  roleDoctor: { en: 'Doctor', hi: 'चिकित्सक' },
  roleParent: { en: 'Parent', hi: 'अभिभावक' },
  roleAdmin: { en: 'Administrator', hi: 'प्रशासक' },

  // ── Appearance ───────────────────────────────────────────────────────────
  themeLight: { en: 'Light', hi: 'उजला' },
  themeDark: { en: 'Dark', hi: 'गहरा' },
  themeSystem: { en: 'System', hi: 'सिस्टम' },
  toggleTheme: { en: 'Change theme', hi: 'थीम बदलें' },

  // Honesty marker for surfaces showing illustrative figures rather than live
  // data. Mirrors SampleChip / l10n.sampleData in the mobile app.
  sampleData: { en: 'Sample data', hi: 'नमूना डेटा' },

  // Growth classification labels.
  // These pair with src/theme/classification.ts — the word half of the
  // "colour + word + icon" rule. Hindi wording follows the app's hi.arb so a
  // supervisor reads the same term on the phone and in the portal.
  classNormal: { en: 'Normal', hi: 'सामान्य' },
  classOverweight: { en: 'Overweight', hi: 'अधिक वजन' },
  classMam: { en: 'MAM', hi: 'मध्यम कुपोषण' },
  classSam: { en: 'SAM', hi: 'गंभीर कुपोषण' },
  classIndeterminate: { en: 'Indeterminate', hi: 'अनिर्धारित' },

  // Dual Role Login
  selectRole: { en: 'Select Your Role', hi: 'अपनी भूमिका चुनें' },
} satisfies Record<string, Entry>;

/** The union of every defined string key. */
export type TranslationKey = keyof typeof translations;
