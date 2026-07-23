export interface CentreData {
  id: string;
  name: string;
  screenedThisMonth: number;
  samCases: number;
  mamCases: number;
  lastReported: string; // ISO date string
  deviceStatus: 'connected' | 'disconnected' | 'calibration_overdue';
  lastSync: string; // ISO date string
  batteryPercentage: number;
  firmwareVersion: string;
  serialNumber: string;
  screeningTrend: { month: string; screened: number }[];
}

export interface FlaggedChild {
  id: string;
  icdsId: string; // PII rule: show ICDS ID only
  initials: string; // PII rule: show initials only
  centreId: string;
  centreName: string;
  status: 'SAM' | 'MAM';
  daysElapsed: number;
  referred: boolean;
  outcomeRecorded: boolean;
}

export interface DataQualityRecord {
  id: string;
  centreName: string;
  childIcdsId: string;
  type: 'engine_mismatch' | 'implausible_value';
  details: string;
  timestamp: string;
}

export const mockCentres: CentreData[] = [
  {
    id: 'c1',
    name: 'AWC North-1',
    screenedThisMonth: 42,
    samCases: 1,
    mamCases: 3,
    lastReported: new Date().toISOString(),
    deviceStatus: 'connected',
    lastSync: new Date().toISOString(),
    batteryPercentage: 85,
    firmwareVersion: 'v1.0.4',
    serialNumber: 'SN-AWCN1-04',
    screeningTrend: [
      { month: 'Mar', screened: 30 },
      { month: 'Apr', screened: 35 },
      { month: 'May', screened: 40 },
      { month: 'Jun', screened: 42 },
    ]
  },
  {
    id: 'c2',
    name: 'AWC North-2',
    screenedThisMonth: 38,
    samCases: 0,
    mamCases: 2,
    lastReported: new Date().toISOString(),
    deviceStatus: 'calibration_overdue',
    lastSync: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    batteryPercentage: 45,
    firmwareVersion: 'v1.0.3',
    serialNumber: 'SN-AWCN2-03',
    screeningTrend: [
      { month: 'Mar', screened: 25 },
      { month: 'Apr', screened: 28 },
      { month: 'May', screened: 32 },
      { month: 'Jun', screened: 38 },
    ]
  },
  {
    id: 'c3',
    name: 'AWC East-1',
    screenedThisMonth: 0,
    samCases: 0,
    mamCases: 0,
    lastReported: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), // 35 days ago (non-reporting)
    deviceStatus: 'disconnected',
    lastSync: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    batteryPercentage: 0,
    firmwareVersion: 'v1.0.2',
    serialNumber: 'SN-AWCE1-02',
    screeningTrend: [
      { month: 'Mar', screened: 20 },
      { month: 'Apr', screened: 15 },
      { month: 'May', screened: 0 },
      { month: 'Jun', screened: 0 },
    ]
  },
  {
    id: 'c4',
    name: 'AWC East-2',
    screenedThisMonth: 55,
    samCases: 2,
    mamCases: 5,
    lastReported: new Date().toISOString(),
    deviceStatus: 'connected',
    lastSync: new Date().toISOString(),
    batteryPercentage: 92,
    firmwareVersion: 'v1.0.4',
    serialNumber: 'SN-AWCE2-05',
    screeningTrend: [
      { month: 'Mar', screened: 45 },
      { month: 'Apr', screened: 50 },
      { month: 'May', screened: 48 },
      { month: 'Jun', screened: 55 },
    ]
  }
];

export const mockFlaggedChildren: FlaggedChild[] = [
  {
    id: 'child-1',
    icdsId: 'ICDS-9912-A',
    initials: 'R. K.',
    centreId: 'c1',
    centreName: 'AWC North-1',
    status: 'SAM',
    daysElapsed: 4,
    referred: false,
    outcomeRecorded: false,
  },
  {
    id: 'child-2',
    icdsId: 'ICDS-8823-B',
    initials: 'M. S.',
    centreId: 'c4',
    centreName: 'AWC East-2',
    status: 'MAM',
    daysElapsed: 12,
    referred: true,
    outcomeRecorded: false, // Referred but no outcome recorded yet
  },
  {
    id: 'child-3',
    icdsId: 'ICDS-7734-C',
    initials: 'P. D.',
    centreId: 'c4',
    centreName: 'AWC East-2',
    status: 'SAM',
    daysElapsed: 1,
    referred: false,
    outcomeRecorded: false,
  },
  {
    id: 'child-4',
    icdsId: 'ICDS-6645-D',
    initials: 'S. N.',
    centreId: 'c2',
    centreName: 'AWC North-2',
    status: 'MAM',
    daysElapsed: 25,
    referred: false,
    outcomeRecorded: false,
  }
];

export const mockDataQualityRecords: DataQualityRecord[] = [
  {
    id: 'dq-1',
    centreName: 'AWC North-1',
    childIcdsId: 'ICDS-9912-A',
    type: 'engine_mismatch',
    details: 'Client computed WAZ -2.1 (MAM), Server computed -3.2 (SAM). Rescaling out-of-bounds error.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'dq-2',
    centreName: 'AWC East-2',
    childIcdsId: 'ICDS-1234-X',
    type: 'implausible_value',
    details: 'Height recorded as 180cm for 12-month-old child (biologically implausible, > 5 SD).',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// Helper functions to get aggregated data
export const getDashboardMetrics = () => {
  const totalScreened = mockCentres.reduce((sum, c) => sum + c.screenedThisMonth, 0);
  const totalSam = mockCentres.reduce((sum, c) => sum + c.samCases, 0);
  const totalMam = mockCentres.reduce((sum, c) => sum + c.mamCases, 0);
  
  // Non-reporting if lastReported is more than 30 days ago
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const nonReportingCentres = mockCentres.filter(c => new Date(c.lastReported) < thirtyDaysAgo);

  const pendingReferrals = mockFlaggedChildren.filter(c => !c.referred || !c.outcomeRecorded);

  return {
    totalScreened,
    totalSam,
    totalMam,
    nonReportingCentres,
    pendingReferrals,
    centres: mockCentres,
  };
};

export const getCentreById = (id: string) => {
  return mockCentres.find(c => c.id === id);
};

export const getChildrenByCentre = (centreId: string) => {
  return mockFlaggedChildren.filter(c => c.centreId === centreId);
};
