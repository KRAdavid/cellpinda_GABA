CREATE TABLE IF NOT EXISTS members (id TEXT PRIMARY KEY, user_handle TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL, consent_at INTEGER NOT NULL, policy_version TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS member_credentials (id TEXT PRIMARY KEY, member_id TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE, public_key TEXT NOT NULL, counter INTEGER NOT NULL, transports TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS member_sessions (token_hash TEXT PRIMARY KEY, member_id TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE, authenticated_at INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS member_sessions_expiry ON member_sessions(expires_at);
CREATE TABLE IF NOT EXISTS member_auth_challenges (token_hash TEXT PRIMARY KEY, kind TEXT NOT NULL, challenge TEXT NOT NULL, member_id TEXT, user_handle TEXT, expires_at INTEGER NOT NULL, origin TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS member_records (member_id TEXT PRIMARY KEY REFERENCES members(id) ON DELETE CASCADE, record TEXT, revision INTEGER NOT NULL, consent_at INTEGER, policy_version TEXT);
CREATE TABLE IF NOT EXISTS member_record_archives (id TEXT PRIMARY KEY, member_id TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE, record TEXT NOT NULL, source_revision INTEGER NOT NULL, created_at INTEGER NOT NULL, consent_at INTEGER NOT NULL, policy_version TEXT NOT NULL, UNIQUE(member_id,source_revision));
CREATE INDEX IF NOT EXISTS member_archives_owner_created ON member_record_archives(member_id,created_at);
