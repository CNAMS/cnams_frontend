export type Language = 'en' | 'hi';

type Translations = {
  [key: string]: {
    en: string;
    hi: string;
  };
};

export const translations: Translations = {
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
};
