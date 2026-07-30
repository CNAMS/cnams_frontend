import type { GrowthClass } from '@/theme/classification';
import type { TranslationKey } from '@/data/translations';

/**
 * Roster, identity and telemetry mocks for the surfaces that the original
 * mockData.ts never covered — the child roster, user accounts, the audit
 * trail, programme analytics and app health.
 *
 * Kept in a separate module rather than appended to mockData.ts so the two can
 * be replaced independently when a real API lands: mockData.ts maps onto the
 * supervisor/centre aggregates, this maps onto roster + admin.
 *
 * PII rules carried over from mockData.ts and the consent model: children are
 * identified by initials and an ICDS ID only. No full names, no guardian
 * contact details, nothing that identifies a child on a shared screen.
 */

/* ══════════════════════════════════════════════════════════════════════════
   Child roster (FR-APP-5)
   ══════════════════════════════════════════════════════════════════════════ */

export type DobPrecision = 'exact' | 'month' | 'estimated';
export type ConsentState = 'none' | 'given' | 'withdrawn';

export interface RosterChild {
  id: string;
  icdsId: string;
  initials: string;
  sex: 'M' | 'F';
  ageMonths: number;
  /** Never hidden in the UI — an estimated DOB changes how a z-score reads. */
  dobPrecision: DobPrecision;
  consent: ConsentState;
  centreId: string;
  lastMeasuredIso: string | null;
  latestClass: GrowthClass;
  /** Latest weight-for-age z-score, null when never measured. */
  waz: number | null;
  muacMm: number | null;
  oedema: boolean;
}

const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

export const mockRoster: RosterChild[] = [
  {
    id: 'ch-1', icdsId: 'ICDS-9912-A', initials: 'R. K.', sex: 'M', ageMonths: 26,
    dobPrecision: 'exact', consent: 'given', centreId: 'c1',
    lastMeasuredIso: daysAgo(4), latestClass: 'sam', waz: -3.2, muacMm: 112, oedema: false,
  },
  {
    id: 'ch-2', icdsId: 'ICDS-8823-B', initials: 'M. S.', sex: 'F', ageMonths: 14,
    dobPrecision: 'month', consent: 'given', centreId: 'c4',
    lastMeasuredIso: daysAgo(12), latestClass: 'mam', waz: -2.3, muacMm: 121, oedema: false,
  },
  {
    id: 'ch-3', icdsId: 'ICDS-7734-C', initials: 'P. D.', sex: 'M', ageMonths: 31,
    dobPrecision: 'exact', consent: 'given', centreId: 'c4',
    lastMeasuredIso: daysAgo(1), latestClass: 'sam', waz: -3.6, muacMm: 108, oedema: true,
  },
  {
    id: 'ch-4', icdsId: 'ICDS-6645-D', initials: 'S. N.', sex: 'F', ageMonths: 8,
    dobPrecision: 'estimated', consent: 'given', centreId: 'c2',
    lastMeasuredIso: daysAgo(25), latestClass: 'mam', waz: -2.1, muacMm: 124, oedema: false,
  },
  {
    id: 'ch-5', icdsId: 'ICDS-5521-E', initials: 'A. B.', sex: 'M', ageMonths: 19,
    dobPrecision: 'exact', consent: 'given', centreId: 'c1',
    lastMeasuredIso: daysAgo(3), latestClass: 'normal', waz: -0.4, muacMm: 148, oedema: false,
  },
  {
    id: 'ch-6', icdsId: 'ICDS-4417-F', initials: 'K. J.', sex: 'F', ageMonths: 41,
    dobPrecision: 'exact', consent: 'given', centreId: 'c1',
    lastMeasuredIso: daysAgo(6), latestClass: 'normal', waz: 0.3, muacMm: 155, oedema: false,
  },
  {
    id: 'ch-7', icdsId: 'ICDS-3390-G', initials: 'T. R.', sex: 'M', ageMonths: 11,
    dobPrecision: 'month', consent: 'given', centreId: 'c1',
    lastMeasuredIso: daysAgo(2), latestClass: 'overweight', waz: 2.4, muacMm: 162, oedema: false,
  },
  {
    id: 'ch-8', icdsId: 'ICDS-2286-H', initials: 'N. P.', sex: 'F', ageMonths: 5,
    dobPrecision: 'estimated', consent: 'none', centreId: 'c1',
    // Never measured: consent has not been captured, so no z-score exists.
    lastMeasuredIso: null, latestClass: 'indeterminate', waz: null, muacMm: null, oedema: false,
  },
  {
    id: 'ch-9', icdsId: 'ICDS-1172-J', initials: 'V. G.', sex: 'M', ageMonths: 35,
    dobPrecision: 'exact', consent: 'given', centreId: 'c1',
    lastMeasuredIso: daysAgo(48), latestClass: 'normal', waz: -1.1, muacMm: 141, oedema: false,
  },
  {
    id: 'ch-10', icdsId: 'ICDS-0068-K', initials: 'L. M.', sex: 'F', ageMonths: 22,
    dobPrecision: 'exact', consent: 'withdrawn', centreId: 'c1',
    lastMeasuredIso: daysAgo(60), latestClass: 'indeterminate', waz: null, muacMm: null, oedema: false,
  },
];

/** Overdue = no measurement in 30 days, or never measured with consent given. */
export const OVERDUE_DAYS = 30;

export function isOverdue(child: RosterChild): boolean {
  if (child.consent !== 'given') return false; // cannot measure without consent
  if (!child.lastMeasuredIso) return true;
  return Date.now() - new Date(child.lastMeasuredIso).getTime() > OVERDUE_DAYS * 86400000;
}

export function daysSinceMeasured(child: RosterChild): number | null {
  if (!child.lastMeasuredIso) return null;
  return Math.floor((Date.now() - new Date(child.lastMeasuredIso).getTime()) / 86400000);
}

/* ══════════════════════════════════════════════════════════════════════════
   Users & roles (EX2 — role approval is an Admin action)
   ══════════════════════════════════════════════════════════════════════════ */

export type UserStatus = 'active' | 'pending' | 'suspended';

export interface AppUser {
  id: string;
  name: string;
  role: 'aww' | 'supervisor' | 'doctor' | 'parent' | 'admin';
  /** Centre, sector or child scope, depending on the role. */
  scope: string;
  status: UserStatus;
  lastActiveIso: string | null;
  signInMethod: 'google' | 'phone_otp' | 'email_otp' | 'pin';
}

export const mockUsers: AppUser[] = [
  { id: 'u-1', name: 'Sunita Devi', role: 'aww', scope: 'AWC North-1', status: 'active', lastActiveIso: daysAgo(0), signInMethod: 'pin' },
  { id: 'u-2', name: 'Rekha Kumari', role: 'aww', scope: 'AWC North-2', status: 'active', lastActiveIso: daysAgo(2), signInMethod: 'pin' },
  { id: 'u-3', name: 'Anil Verma', role: 'supervisor', scope: 'Sector 4', status: 'active', lastActiveIso: daysAgo(0), signInMethod: 'google' },
  { id: 'u-4', name: 'Dr. Meera Nair', role: 'doctor', scope: 'PHC Rampur', status: 'active', lastActiveIso: daysAgo(1), signInMethod: 'google' },
  { id: 'u-5', name: 'Kavita Sharma', role: 'parent', scope: 'ICDS-9912-A', status: 'active', lastActiveIso: daysAgo(5), signInMethod: 'phone_otp' },
  { id: 'u-6', name: 'Ramesh Yadav', role: 'aww', scope: 'AWC East-1', status: 'pending', lastActiveIso: null, signInMethod: 'phone_otp' },
  { id: 'u-7', name: 'Dr. S. Iyer', role: 'doctor', scope: 'NRC Sitapur', status: 'pending', lastActiveIso: null, signInMethod: 'email_otp' },
  { id: 'u-8', name: 'Pranav Shukla', role: 'admin', scope: 'All', status: 'active', lastActiveIso: daysAgo(0), signInMethod: 'google' },
  { id: 'u-9', name: 'Old Account', role: 'aww', scope: 'AWC East-2', status: 'suspended', lastActiveIso: daysAgo(120), signInMethod: 'pin' },
];

/* ══════════════════════════════════════════════════════════════════════════
   Audit trail (FR-SRV-8 / admin audit view)
   ══════════════════════════════════════════════════════════════════════════ */

export interface AuditEntry {
  id: string;
  actor: string;
  /** Translation key, not an English sentence — the log localises too. */
  action: TranslationKey;
  target: string;
  timestampIso: string;
  severity: 'info' | 'warning';
}

export const mockAuditLog: AuditEntry[] = [
  { id: 'a-1', actor: 'Anil Verma', action: 'auditApprovedUser', target: 'Ramesh Yadav', timestampIso: daysAgo(0), severity: 'info' },
  { id: 'a-2', actor: 'Sunita Devi', action: 'auditRecordedMeasurement', target: 'ICDS-9912-A', timestampIso: daysAgo(0), severity: 'info' },
  { id: 'a-3', actor: 'Dr. Meera Nair', action: 'auditRecordedOutcome', target: 'ICDS-8823-B', timestampIso: daysAgo(1), severity: 'info' },
  { id: 'a-4', actor: 'System', action: 'auditConsentWithdrawn', target: 'ICDS-0068-K', timestampIso: daysAgo(2), severity: 'warning' },
  { id: 'a-5', actor: 'Pranav Shukla', action: 'auditSuspendedUser', target: 'Old Account', timestampIso: daysAgo(4), severity: 'warning' },
  { id: 'a-6', actor: 'System', action: 'auditReferenceTablesLoaded', target: 'WHO LMS v2006', timestampIso: daysAgo(9), severity: 'info' },
];

/* ══════════════════════════════════════════════════════════════════════════
   Programme analytics — child health outcomes
   ══════════════════════════════════════════════════════════════════════════ */

export const mockProgrammeTrend = [
  { month: 'Feb', screened: 120, sam: 5, mam: 18 },
  { month: 'Mar', screened: 138, sam: 4, mam: 16 },
  { month: 'Apr', screened: 152, sam: 6, mam: 21 },
  { month: 'May', screened: 149, sam: 3, mam: 14 },
  { month: 'Jun', screened: 168, sam: 3, mam: 12 },
  { month: 'Jul', screened: 175, sam: 2, mam: 10 },
];

export const mockClassBreakdown: { growthClass: GrowthClass; count: number }[] = [
  { growthClass: 'normal', count: 118 },
  { growthClass: 'mam', count: 10 },
  { growthClass: 'sam', count: 2 },
  { growthClass: 'overweight', count: 6 },
  { growthClass: 'indeterminate', count: 4 },
];

/* ══════════════════════════════════════════════════════════════════════════
   App health — system performance, NOT children (§EX3 keeps these separate)
   ══════════════════════════════════════════════════════════════════════════ */

export const mockSyncHealth = [
  { day: 'Mon', synced: 42, failed: 1 },
  { day: 'Tue', synced: 55, failed: 0 },
  { day: 'Wed', synced: 38, failed: 3 },
  { day: 'Thu', synced: 61, failed: 0 },
  { day: 'Fri', synced: 47, failed: 2 },
  { day: 'Sat', synced: 22, failed: 0 },
  { day: 'Sun', synced: 9, failed: 0 },
];

export interface AppVersionShare {
  version: string;
  devices: number;
  current: boolean;
}

export const mockVersionSpread: AppVersionShare[] = [
  { version: 'v1.0.4', devices: 2, current: true },
  { version: 'v1.0.3', devices: 1, current: false },
  { version: 'v1.0.2', devices: 1, current: false },
];

export const mockAppHealth = {
  crashFreeSessionsPct: 99.2,
  medianSyncLatencyMs: 840,
  outboxBacklog: 6,
  deadLetters: 0,
  activeDevices7d: 4,
  offlineSessionsPct: 68,
};

/* ══════════════════════════════════════════════════════════════════════════
   Configuration / reference data
   ══════════════════════════════════════════════════════════════════════════ */

export interface ConfigItem {
  id: string;
  labelKey: TranslationKey;
  value: string;
  descriptionKey: TranslationKey;
  /** Locked settings are clinical constants, not preferences. */
  locked?: boolean;
}

export const mockConfig: ConfigItem[] = [
  { id: 'cfg-1', labelKey: 'cfgReferenceTables', value: 'WHO LMS 2006', descriptionKey: 'cfgReferenceTablesHint', locked: true },
  { id: 'cfg-2', labelKey: 'cfgEngineVersion', value: 'zscore-engine v1.2.0', descriptionKey: 'cfgEngineVersionHint', locked: true },
  { id: 'cfg-3', labelKey: 'cfgOverdueThreshold', value: `${OVERDUE_DAYS} days`, descriptionKey: 'cfgOverdueThresholdHint' },
  { id: 'cfg-4', labelKey: 'cfgSyncBatchSize', value: '50 records', descriptionKey: 'cfgSyncBatchSizeHint' },
  { id: 'cfg-5', labelKey: 'cfgStaleDeviceDays', value: '7 days', descriptionKey: 'cfgStaleDeviceDaysHint' },
];
