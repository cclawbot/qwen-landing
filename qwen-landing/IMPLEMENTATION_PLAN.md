# Implementation Plan - QwenResell Backend System

## Overview
This implementation plan breaks down the backend system into small, focused tasks. Each task should be completable in one commit with proper TDD approach.

---

## Phase 1: Database & Infrastructure

### Task 1.1: Install Database Dependencies
- **Name**: Install Drizzle ORM and SQLite dependencies
- **Description**: Install drizzle-orm, drizzle-kit, better-sqlite3, and related TypeScript types
- **Status**: ✅ COMPLETED
- **Blocked by**: None
- **Blocks**: 1.2
- **Tests**: None (installation only)

### Task 1.2: Create Database Schema
- **Name**: Create Drizzle database schema
- **Description**: Define all tables (users, waitlist, api_keys, usage_logs) in src/lib/db/schema.ts
- **Status**: ✅ COMPLETED
- **Blocked by**: 1.1
- **Blocks**: 1.3
- **Tests**: Type-check passes

### Task 1.3: Create Database Connection
- **Name**: Set up SQLite database connection
- **Description**: Create database client singleton in src/lib/db/index.ts with migrations support
- **Status**: ✅ COMPLETED
- **Blocked by**: 1.2
- **Blocks**: 1.4
- **Tests**: None (infrastructure)

### Task 1.4: Create Migration Script
- **Name**: Create database migration script
- **Description**: Add npm script to run migrations and initialize database
- **Status**: ✅ COMPLETED
- **Blocked by**: 1.3
- **Blocks**: Phase 2
- **Tests**: Migration runs without error

---

## Phase 2: Authentication

### Task 2.1: Install Auth Dependencies
- **Name**: Install bcrypt and jsonwebtoken
- **Description**: Install bcryptjs and @types/bcryptjs, jsonwebtoken and @types/jsonwebtoken
- **Status**: ✅ COMPLETED
- **Blocked by**: None
- **Blocks**: 2.2
- **Tests**: None

### Task 2.2: Create User Registration Endpoint
- **Name**: POST /api/auth/register
- **Description**: Create registration endpoint with email/password validation, password hashing
- **Status**: ✅ COMPLETED
- **Blocked by**: 1.4, 2.1
- **Blocks**: 2.3
- **Tests**: 
  - Unit: validate email format, password strength
  - Integration: registration success, duplicate email error

### Task 2.3: Create Login Endpoint
- **Name**: POST /api/auth/login
- **Description**: Create login endpoint with credential verification, JWT token generation
- **Status**: ✅ COMPLETED
- **Blocked by**: 2.2
- **Blocks**: 2.4
- **Tests**:
  - Integration: login success, wrong password error

### Task 2.4: Create Auth Middleware
- **Name**: JWT validation middleware
- **Description**: Create middleware to validate JWT tokens and attach user to request
- **Status**: ✅ COMPLETED
- **Blocked by**: 2.3
- **Blocks**: 2.5
- **Tests**: Unit tests for token validation

### Task 2.5: Create Get Current User Endpoint
- **Name**: GET /api/auth/me
- **Description**: Return current authenticated user profile
- **Status**: ✅ COMPLETED
- **Blocked by**: 2.4
- **Blocks**: Phase 3
- **Tests**: Integration test with valid/invalid token

### Task 2.6: Create Logout Endpoint
- **Name**: POST /api/auth/logout
- **Description**: Clear auth cookies and invalidate session
- **Status**: ✅ COMPLETED
- **Blocked by**: 2.4
- **Blocks**: None
- **Tests**: Integration test clears cookies

---

## Phase 3: Waitlist System

### Task 3.1: Create Waitlist Submission Endpoint
- **Name**: POST /api/waitlist
- **Description**: Allow users to submit waitlist application with email, company, usage
- **Status**: ✅ COMPLETED
- **Blocked by**: 2.4
- **Blocks**: 3.2
- **Tests**:
  - Unit: validate required fields
  - Integration: submission success, duplicate email error

### Task 3.2: Create Waitlist Admin Endpoints
- **Name**: GET /api/waitlist (admin), PATCH /api/waitlist/:id
- **Description**: List all waitlist applications, approve/deny functionality
- **Status**: ✅ COMPLETED
- **Blocked by**: 3.1
- **Blocks**: Phase 4
- **Tests**: Integration tests for admin operations

---

## Phase 4: API Key Management

### Task 4.1: Create API Key Generation Utility
- **Name**: Secure random key generator
- **Description**: Create utility to generate secure random key_id and key_secret
- **Status**: ✅ COMPLETED
- **Blocked by**: 2.4
- **Blocks**: 4.2
- **Tests**: Unit tests verify key format and uniqueness

### Task 4.2: Create List API Keys Endpoint
- **Name**: GET /api/keys
- **Description**: List all API keys for authenticated user (without secrets)
- **Status**: ✅ COMPLETED
- **Blocked by**: 4.1
- **Blocks**: 4.3
- **Tests**: Integration test returns keys without secrets

### Task 4.3: Create Create API Key Endpoint
- **Name**: POST /api/keys
- **Description**: Generate new API key, hash secret, store in database, return secret once
- **Status**: ✅ COMPLETED
- **Blocked by**: 4.2
- **Blocks**: 4.4
- **Tests**:
  - Integration: key created, secret returned once

### Task 4.4: Create Revoke API Key Endpoint
- **Name**: DELETE /api/keys/:id
- **Description**: Mark API key as revoked (soft delete)
- **Status**: ✅ COMPLETED
- **Blocked by**: 4.3
- **Blocks**: Phase 5
- **Tests**: Integration test key revoked successfully

---

## Phase 5: Usage Tracking

### Task 5.1: Create Usage Logging Endpoint
- **Name**: POST /api/usage/log
- **Description**: Log API usage (called internally by proxy)
- **Status**: ✅ COMPLETED
- **Blocked by**: 4.4
- **Blocks**: 5.2
- **Tests**: Unit tests for logging function

### Task 5.2: Create Usage Aggregation Queries
- **Name**: Usage statistics queries
- **Description**: Create Drizzle queries for daily/model usage aggregation
- **Status**: ✅ COMPLETED
- **Blocked by**: 5.1
- **Blocks**: 5.3
- **Tests**: Unit tests verify aggregation correctness

### Task 5.3: Create Usage Dashboard Endpoints
- **Name**: GET /api/usage, GET /api/usage/daily, GET /api/usage/models
- **Description**: Return usage statistics for dashboard
- **Status**: ✅ COMPLETED
- **Blocked by**: 5.2
- **Blocks**: Phase 6
- **Tests**: Integration tests return correct data

---

## Phase 6: Qwen API Proxy

### Task 6.1: Create API Key Validation Middleware
- **Name**: Validate X-API-Key header
- **Description**: Middleware to validate API key from request header
- **Status**: ✅ COMPLETED
- **Blocked by**: 5.3
- **Blocks**: 6.2
- **Tests**: Unit tests for key validation

### Task 6.2: Create Qwen Proxy Endpoint
- **Name**: POST /api/proxy/qwen
- **Description**: Proxy endpoint that validates key, logs usage, forwards to Qwen API
- **Status**: ✅ COMPLETED
- **Blocked by**: 6.1
- **Blocks**: 6.3
- **Tests**:
  - Integration: valid key works, invalid key rejected

### Task 6.3: Add Error Handling and Retries
- **Name**: Robust error handling
- **Description**: Add retry logic, proper error responses, upstream failure handling
- **Status**: ✅ COMPLETED
- **Blocked by**: 6.2
- **Blocks**: Phase 7 (Complete)
- **Tests**: Integration tests for error scenarios

---

## Phase 7: Validation & Testing

### Task 7.1: Add Zod Validation Schemas
- **Name**: Input validation for all endpoints
- **Description**: Add Zod schemas for request validation
- **Status**: ✅ COMPLETED
- **Blocked by**: Phase 6
- **Blocks**: 7.2
- **Tests**: Unit tests for each schema

### Task 7.2: Create E2E Test Suite
- **Name**: Browser-based E2E tests
- **Description**: Use Playwright to test critical user flows
- **Status**: ✅ COMPLETED
- **Blocked by**: 7.1
- **Blocks**: None (Complete)
- **Tests**: E2E tests pass

---

## Task Dependencies Graph

```
Phase 1 (Infrastructure)
├── 1.1 ──→ 1.2 ──→ 1.3 ──→ 1.4 ──→ Phase 2

Phase 2 (Auth)
├── 2.1 ──→ 2.2 ──→ 2.3 ──→ 2.4 ──→ 2.5 ──→ Phase 3
                     ↑──────┘ (login needs register)

Phase 3 (Waitlist)
├── 3.1 ──→ 3.2 ──→ Phase 4

Phase 4 (API Keys)
├── 4.1 ──→ 4.2 ──→ 4.3 ──→ 4.4 ──→ Phase 5

Phase 5 (Usage)
├── 5.1 ──→ 5.2 ──→ 5.3 ──→ Phase 6

Phase 6 (Proxy)
├── 6.1 ──→ 6.2 ──→ 6.3 ──→ Phase 7

Phase 7 (Validation)
└── 7.1 ──→ 7.2 ──→ Complete
```

---

## Priority Order (Recommended)

The most important unblocked tasks to start:

1. **Task 1.1**: Install dependencies (quick start)
2. **Task 1.2**: Create schema (foundation)
3. **Task 2.1**: Install auth dependencies
4. **Task 2.2**: Registration endpoint (core flow)
5. **Task 2.3**: Login endpoint (core flow)

---

## Notes

- All tasks should use TDD: write test first (red), implement code (green), refactor
- Each task = one commit with focused changes
- Run quality checks (lint, type-check, build) after each task
- Browser test after any UI-related changes
- Update progress.txt after each task completion
