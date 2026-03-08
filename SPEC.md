# SPEC.md - Contact Form with Validation

## Feature Name
**Contact Form with Validation**

## Business Requirement
Replace the basic waitlist form with a fully validated contact form that captures name, email, company, and message. The form should provide immediate feedback on invalid inputs and show success state on submission.

## Business Goal Alignment
- **Primary**: Increase lead quality by requiring more information
- **Secondary**: Reduce bounce rate with better UX through real-time validation

## In-Scope
- Name field (required, min 2 characters)
- Email field (required, valid email format)
- Company field (required)
- Message field (optional, max 500 characters)
- Real-time validation feedback
- Submit button with loading state
- Success message after submission
- Form reset after success
- Responsive design matching existing dark theme
- Character counter for message field

## Out-of-Scope
- Backend submission (form data logged to console only)
- Email confirmation
- ReCAPTCHA/integrity checks
- Dark/light mode toggle

## Technical Details
- **Component**: `src/components/ContactForm.tsx`
- **Styling**: Tailwind CSS (matching existing dark theme)
- **State**: React useState for form fields and validation
- **Validation**: Custom validation functions (no external library)

### Validation Rules
| Field | Rules |
|-------|-------|
| Name | Required, min 2 characters, max 100 characters |
| Email | Required, valid email regex pattern |
| Company | Required, min 2 characters, max 100 characters |
| Message | Optional, max 500 characters |

### Form States
1. **Empty**: Initial state with placeholder text
2. **Error**: Red border, error message below field
3. **Valid**: Green border (shown after first blur)
4. **Submitting**: Button disabled, loading spinner
5. **Success**: Green checkmark, "Thank you" message, form resets after 3 seconds

## Implementation Plan
1. Create `src/components/ContactForm.tsx`
2. Add validation logic with real-time feedback
3. Style to match existing dark theme
4. Add to page.tsx replacing the simple form in #waitlist
5. Test with various inputs

## Acceptance Criteria
- [ ] Name field shows error when empty or < 2 chars
- [ ] Email field shows error when empty or invalid format
- [ ] Company field shows error when empty or < 2 chars
- [ ] Message field shows character count (X/500)
- [ ] Error messages appear in red below invalid fields
- [ ] Submit button shows loading state during submission
- [ ] Success message displays after valid submission
- [ ] Form resets to empty state after success
- [ ] Mobile responsive (stacks vertically on small screens)
- [ ] Matches existing dark theme styling
