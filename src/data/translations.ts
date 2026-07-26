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
  back: { en: 'Back', hi: 'वापस' },
  
  // Login Page
  loginSubtitle: { en: 'Sign in to monitor Anganwadi Centres', hi: 'आंगनवाड़ी केंद्रों की निगरानी के लिए साइन इन करें' },
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
  screeningStatus: { en: 'Screening Status', hi: 'जांच स्थिति' },
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
  supervisorRole: { en: 'Supervisor', hi: 'पर्यवेक्षक' },
  workerRole: { en: 'Worker', hi: 'कार्यकर्ता' },
  workerLoginSubtitle: { en: 'Sign in to update centre records', hi: 'केंद्र रिकॉर्ड अपडेट करने के लिए साइन इन करें' },
} satisfies Record<string, Entry>;

/** The union of every defined string key. */
export type TranslationKey = keyof typeof translations;
