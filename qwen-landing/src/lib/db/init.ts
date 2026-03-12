import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('qwenresell.db');

// Enable WAL mode
sqlite.pragma('journal_mode = WAL');

// Create tables manually since we're using better-sqlite3 directly
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    company_name TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    status TEXT DEFAULT 'active'
  );
  
  CREATE TABLE IF NOT EXISTS waitlist (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    estimated_usage TEXT,
    use_case TEXT,
    status TEXT DEFAULT 'pending',
    created_at INTEGER,
    reviewed_at INTEGER,
    reviewed_by TEXT
  );
  
  CREATE TABLE IF NOT EXISTS api_keys (
    id TEXT PRIMARY KEY,
    key_id TEXT UNIQUE NOT NULL,
    key_secret_hash TEXT NOT NULL,
    user_id TEXT NOT NULL,
    name TEXT,
    last_used_at INTEGER,
    created_at INTEGER,
    expires_at INTEGER,
    revoked_at INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  
  CREATE TABLE IF NOT EXISTS usage_logs (
    id TEXT PRIMARY KEY,
    api_key_id TEXT NOT NULL,
    model TEXT NOT NULL,
    input_tokens INTEGER NOT NULL,
    output_tokens INTEGER NOT NULL,
    latency_ms INTEGER,
    timestamp INTEGER,
    FOREIGN KEY (api_key_id) REFERENCES api_keys(id)
  );
  
  CREATE INDEX IF NOT EXISTS idx_api_keys_key_id ON api_keys(key_id);
  CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
  CREATE INDEX IF NOT EXISTS idx_usage_logs_api_key_id ON usage_logs(api_key_id);
  CREATE INDEX IF NOT EXISTS idx_usage_logs_timestamp ON usage_logs(timestamp);
`);

console.log('Database initialized successfully!');
