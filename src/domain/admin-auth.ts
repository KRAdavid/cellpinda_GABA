export type AdminRole = 'operator' | 'editor' | 'reviewer' | 'approver';
export type AdminAction = 'read' | 'edit' | 'review' | 'approve';

export type AdminRoleTokens = Partial<Record<Exclude<AdminRole, 'operator'>, string>>;

const ROLE_ORDER: Exclude<AdminRole, 'operator'>[] = ['editor', 'reviewer', 'approver'];

/**
 * Parse the optional ADMIN_ROLE_TOKENS JSON secret without ever returning
 * unknown roles or short credentials. The legacy ADMIN_TOKEN remains a
 * break-glass operator credential and is handled by the caller.
 */
export function parseAdminRoleTokens(value: unknown): AdminRoleTokens {
  let parsed: unknown = value;
  if (typeof value === 'string') {
    try { parsed = JSON.parse(value); } catch { return {}; }
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
  const result: AdminRoleTokens = {};
  for (const role of ROLE_ORDER) {
    const token = (parsed as Record<string, unknown>)[role];
    if (typeof token === 'string' && token.length >= 32 && token.length <= 256) result[role] = token;
  }
  return result;
}

export function adminRoleForToken(
  actual: string | null | undefined,
  legacyToken: unknown,
  configured: unknown,
  matches: (actual: string | null | undefined, expected: unknown) => boolean,
): AdminRole | null {
  if (typeof actual !== 'string' || actual.length < 32) return null;
  const roleTokens = parseAdminRoleTokens(configured);
  for (const role of ROLE_ORDER) if (roleTokens[role] && matches(actual, roleTokens[role])) return role;
  if (matches(actual, legacyToken)) return 'operator';
  return null;
}

export function adminAction(method: string, pathname: string, payload?: unknown): AdminAction {
  if (method === 'GET' || method === 'HEAD') return 'read';
  const status = payload && typeof payload === 'object' && !Array.isArray(payload)
    ? (payload as Record<string, unknown>).status
    : undefined;
  if (status === 'approved') return 'approve';
  if (status === 'hold') return 'review';
  if (pathname.endsWith('/decision')) return 'review';
  return 'edit';
}

export function adminRoleAllows(role: AdminRole, action: AdminAction): boolean {
  if (role === 'operator' || action === 'read') return true;
  if (action === 'edit') return role === 'editor';
  if (action === 'review') return role === 'reviewer' || role === 'approver';
  return role === 'approver';
}

export function adminRoleLabel(role: AdminRole): string {
  return ({ operator: '운영자', editor: '편집자', reviewer: '검토자', approver: '승인자' } as const)[role];
}

export function adminRoleCapabilities(role: AdminRole): AdminAction[] {
  return (['read', 'edit', 'review', 'approve'] as AdminAction[]).filter(action => adminRoleAllows(role, action));
}
