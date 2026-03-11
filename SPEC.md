# SPEC.md - QwenResell Backend System

## 1. Feature Overview

### Feature Name
QwenResell Backend API System

### Description
A comprehensive backend system for the QwenResell platform enabling B2B customers to purchase and consume Qwen API tokens. The system provides user authentication, API key management, waitlist management, usage tracking, and a customer dashboard.

### Business Requirement
QwenResell acts as an API reseller for Alibaba's Qwen LLM tokens, offering enterprise customers up to 92% savings compared to Anthropic/OpenAI. The backend must:

1. **User Management**: Allow customers to sign up, authenticate, and manage their accounts
2. **API Key Management**: Generate, manage, and rotate customer API keys for accessing Qwen APIs
3. **Waitlist System**: Manage enterprise waitlist with approval workflow
4. **Usage Tracking**: Track token usage per customer for billing purposes
5. **Dashboard**: Provide customers with usage analytics and account management

### Business Goal Alignment
- Enable B2B customer onboarding flow (waitlist → approved → active)
- Provide self-service API key management reducing support overhead
- Track usage for accurate billing and quota enforcement
- Build trust through transparent usage reporting

---

## 2. Use Cases

### UC-1: Customer Waitlist Signup
- User visits landing page and clicks "Join Waitlist"
- User submits email, company name, estimated monthly token usage
- System stores submission in waitlist with "pending" status
- Admin can review and approve/deny requests

### UC-2: User Authentication
- Approved waitlist users receive signup link
- User creates account with email/password
- User logs in to access dashboard
- JWT tokens manage session state

### UC-3: API Key Management
- User generates API key from dashboard
- System returns secret key (shown once) and key ID
- User can revoke/create multiple keys
- Keys are hashed before storage for security

### UC-4: Qwen API Proxy
- Customer makes API request with their key
- System validates key, tracks usage
- System forwards request to Qwen upstream API
- Response returned to customer with usage deducted

### UC-5: Usage Dashboard
- User views token usage by model/time period
- Visual charts show consumption trends
- Quota limits and remaining balance displayed

---

## 3. Technical Architecture

### 3.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Next.js)                      │
│  Landing Page │ Dashboard │ API Key Management │ Analytics  │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js API Routes                       │
│  /api/auth/*    /api/keys/*   /api/usage/*   /api/waitlist │
└────────────────────────────┬────────────────────────────────┘
                             │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐    ┌───────────┐   ┌──────────┐
        │ Database │    │  Upstream  │   │   Auth   │
        │ (SQLite) │    │ Qwen API   │   │  (JWT)   │
        └──────────┘    └───────────┘   └──────────┘
```

### 3.2 Technology Stack

| Component | Technology | Version | Rationale |
|-----------|------------|---------|-----------|
| Runtime | Node.js | 20.x LTS | Next.js requirement |
| Framework | Next.js | 16.x | Existing project |
| Database | SQLite | 3.x | Zero-config, file-based, no external deps |
| ORM | Drizzle ORM | ^0.29 | Lightweight, type-safe, SQL-like syntax |
| Auth | JWT + bcrypt | ^11 / ^5 | Stateless, industry standard |
| Validation | Zod | ^3 | TypeScript-first schema validation |
| API Docs | Swagger/OpenAPI | - | Auto-generated from routes |

### 3.3 Database Schema

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  company_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active' -- active, suspended
);

-- Waitlist table
CREATE TABLE waitlist (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  estimated_usage TEXT, -- e.g., "1B tokens/month"
  use_case TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, denied
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  reviewed_at DATETIME,
  reviewed_by TEXT
);

-- API Keys table
CREATE TABLE api_keys (
  id TEXT PRIMARY KEY,
  key_id TEXT UNIQUE NOT NULL, -- Public identifier
  key_secret_hash TEXT NOT NULL, -- Hashed secret
  user_id TEXT NOT NULL,
  name TEXT, -- e.g., "Production", "Development"
  last_used_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  revoked_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Usage logs table
CREATE TABLE usage_logs (
  id TEXT PRIMARY KEY,
  api_key_id TEXT NOT NULL,
  model TEXT NOT NULL, -- qwen-max, qwen-plus, etc.
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  latency_ms INTEGER,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (api_key_id) REFERENCES api_keys(id)
);

-- API Keys index for fast lookups
CREATE INDEX idx_api_keys_key_id ON api_keys(key_id);
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_usage_logs_api_key_id ON usage_logs(api_key_id);
CREATE INDEX idx_usage_logs_timestamp ON usage_logs(timestamp);
```

### 3.4 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | User registration |
| POST | /api/auth/login | User login |
| POST | /api/auth/logout | User logout |
| GET | /api/auth/me | Get current user |
| POST | /api/waitlist | Submit waitlist application |
| GET | /api/waitlist | List waitlist (admin) |
| PATCH | /api/waitlist/:id | Update waitlist status (admin) |
| GET | /api/keys | List user's API keys |
| POST | /api/keys | Create new API key |
| DELETE | /api/keys/:id | Revoke API key |
| GET | /api/usage | Get usage statistics |
| GET | /api/usage/daily | Daily usage breakdown |
| GET | /api/usage/models | Usage by model breakdown |

### 3.5 Security Requirements

1. **Password Security**: bcrypt hashing with cost factor 12
2. **API Key Security**: 
   - Secrets hashed with bcrypt before storage
   - Secrets shown only once at creation time
   - Rate limiting on key validation
3. **JWT Tokens**:
   - Access token: 15 min expiry
   - Refresh token: 7 day expiry (stored in httpOnly cookie)
4. **Input Validation**: All inputs validated with Zod schemas
5. **SQL Injection**: Parameterized queries via Drizzle ORM
6. **CORS**: Restricted to known origins

---

## 4. Implementation Plan

### Phase 1: Database & Infrastructure
- [ ] Set up Drizzle ORM with SQLite
- [ ] Create database schema/migrations
- [ ] Set up database connection singleton

### Phase 2: Authentication
- [ ] Implement user registration with validation
- [ ] Implement password hashing with bcrypt
- [ ] Implement JWT token generation/validation
- [ ] Implement login/logout endpoints
- [ ] Create auth middleware for protected routes

### Phase 3: Waitlist System
- [ ] Implement waitlist submission
- [ ] Implement waitlist listing (admin)
- [ ] Implement waitlist approval/denial

### Phase 4: API Key Management
- [ ] Implement API key generation (secure random)
- [ ] Implement key storage with hashing
- [ ] Implement key listing/revocation
- [ ] Implement key validation middleware

### Phase 5: Usage Tracking
- [ ] Implement usage logging on API calls
- [ ] Implement usage aggregation queries
- [ ] Create usage dashboard endpoints

### Phase 6: Qwen API Proxy
- [ ] Implement proxy endpoint
- [ ] Add key validation
- [ ] Add usage tracking
- [ ] Forward to upstream Qwen API

---

## 5. Open Questions & Solutions

### Q1: How to handle database in serverless environment?
**Solution**: Use SQLite with better-sqlite3 for development. For production serverless (Vercel/Cloudflare), use Prisma with Turso or Drizzle with Turso (libSQL).

### Q2: How to secure API keys in production?
**Solution**: Store encrypted at rest. Use environment variables for encryption keys. Implement key rotation workflow.

### Q3: How to handle rate limiting?
**Solution**: Implement in-memory rate limiter for single-instance. For distributed, use Redis.

### Q4: How to handle upstream Qwen API failures?
**Solution**: Implement retry with exponential backoff. Cache responses where appropriate. Return meaningful error messages to customers.

---

## 6. Acceptance Criteria

- [ ] Users can register and login
- [ ] JWT authentication works correctly
- [ ] Waitlist submissions are stored
- [ ] Admin can approve/deny waitlist
- [ ] Users can create and revoke API keys
- [ ] API keys are stored securely (hashed)
- [ ] Usage is tracked on API calls
- [ ] Usage dashboard shows accurate data
- [ ] All endpoints return proper error codes
- [ ] Input validation prevents invalid data
- [ ] Passwords are properly hashed
- [ ] API secrets are not stored in plaintext
