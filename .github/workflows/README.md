# GitHub Workflows

This folder contains lightweight GitHub Actions workflows used for repo maintenance and PR triage.

## What’s in here

### `auto-assign-maintainer.yml`
Auto-assigns the maintainer to new pull requests so PRs reliably land in the maintainer’s queue and can trigger GitHub Mobile iOS push notifications via **Assignments**.

**Triggers**
- `pull_request_target`:
  - `opened`
  - `ready_for_review`
  - `reopened` — enabled so reopened PRs are (re)assigned to the maintainer

**What it does**
- Uses the GitHub API to add the maintainer as an **assignee** on the PR.
- No code checkout, no build/test steps, no secrets used.

**Why assignment instead of CODEOWNERS / auto-request-review**
- CODEOWNERS can imply broad code ownership semantics and can create duplicate/unclear automation paths.
- Auto-request-review is not a reliable self-test (review cannot be requested from the PR author).
- Assignment is explicit “triage / to-do queue” metadata without changing review policy.

## Configuration

1. In `.github/workflows/auto-assign-maintainer.yml`, set the maintainer’s GitHub username in the assignee/assignees configuration so new PRs are assigned to the correct maintainer.
2. Ensure workflow permissions allow the action to write assignees:
   - Workflow uses minimal scope: `permissions: issues: write`
   - (PRs are treated as issues for assignment purposes.)

## Mobile notifications (iOS)

To receive push notifications:
- GitHub iOS app → Settings → Notifications → enable
  - **Assignments to issues or pull requests**

> Note: “Watching” a repo does not guarantee push notifications for every new PR. Assignment is used as the reliable push hook.

## Security model (important)

This workflow uses `pull_request_target` so it can run for PRs from forks with a write-capable token (needed to assign maintainers).

Safety constraints we intentionally keep:
- ✅ No checkout of PR code
- ✅ No shell commands
- ✅ No secrets
- ✅ Minimal permissions (`issues: write`)
- ✅ Script uses a fixed assignee (does not interpret PR content as code)

Tradeoff:
- Any external PR (including from forks) can trigger the assignment action.
  - Worst-case impact (under current design) is mostly notification/workflow spam and metadata churn.

Optional hardening knobs (if needed later):
- Skip drafts until `ready_for_review`
- Skip if already assigned
- Add `concurrency` + short timeouts
- Gate to trusted contributors using `author_association` (reduces drive-by spam but may block first-time contributors)

## How to test

1. Open a PR (including from a fork) or mark a draft PR as **Ready for review**.
2. Confirm the maintainer appears under **Assignees**.
3. Confirm iOS push notifications (if enabled) arrive under **Assignments**.

## Disabling

To disable the automation:
- Remove or rename `auto-assign-maintainer.yml`, or
- Remove the triggers under `on:`.

---
Maintainer note: Please keep this workflow API-only. Adding checkout/build steps under `pull_request_target` can introduce security risks.
