# Security Policy

## Supported versions

Basil (`basil-ui`) is pre-1.0 and under active development. Security fixes are
released against the **latest published version** on the `0.x` line. We do not
backport fixes to older `0.x` releases — please upgrade to the newest version
to receive security updates.

| Version | Supported          |
| ------- | ------------------ |
| latest `0.x` | ✅ |
| older `0.x`  | ❌ |

## Reporting a vulnerability

Please **do not** report security vulnerabilities through public GitHub issues,
pull requests, or discussions.

Instead, email **security@basil-ui.dev** with:

- A description of the vulnerability and its potential impact.
- Steps to reproduce, or a proof-of-concept, if available.
- The affected version(s) and environment.
- Any suggested remediation, if you have one.

If you prefer, you may also use GitHub's private
[**Security Advisories**](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
to report privately.

## What to expect

- **Acknowledgement** within **3 business days**.
- An initial **assessment and severity triage** within **7 business days**.
- Coordinated disclosure: we will work with you on a fix and a disclosure
  timeline, and credit you in the advisory unless you prefer to remain anonymous.

Because Basil is a client-side component library (no server, no data handling),
the most likely classes of issues are XSS via unsanitized props, dependency
vulnerabilities, or unsafe DOM handling. Reports in these areas are especially
welcome.

Thank you for helping keep Basil and its users safe.
