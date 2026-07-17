# Contributing Guidelines

Thanks for contributing to the college website project! Follow these rules so we can move fast without breaking things.

## 🔒 Golden Rules
1. **Never push directly to `main`.** All work goes through `develop` via PR.
2. **One feature per branch.** Don't mix unrelated tasks in one PR.
3. **Every PR needs at least 1 reviewer approval** before merging.
4. **Keep `develop` always working.** Never merge something broken.
5. **Post a daily one-line update** in the team chat (even just "working on X").

## 🌱 Branch Naming
- `feature/<task-name>` — new feature, e.g. `feature/contact-form`
- `fix/<bug-name>` — bug fix, e.g. `fix/mobile-nav`
- `docs/<name>` — documentation only

## 📝 Commit Message Format
Use a prefix so history stays readable:
- `feat: add homepage hero section`
- `fix: correct mobile responsiveness on navbar`
- `docs: update README setup steps`
- `style: adjust spacing on about page`

## 🔄 Step-by-Step Workflow
1. Pull the latest `develop`: `git checkout develop && git pull`
2. Create your branch: `git checkout -b feature/your-task`
3. Make your changes, commit often with clear messages.
4. Push: `git push origin feature/your-task`
5. Open a Pull Request → base `develop`, compare `feature/your-task`.
6. Fill out the PR template (what changed, screenshots if UI).
7. Tag the GitHub Manager (or any reviewer) for review.
8. Address review comments, then it gets merged.

## ✅ Before Opening a PR
- [ ] Code runs locally without errors
- [ ] No unrelated files included
- [ ] Mobile responsiveness checked (if UI change)
- [ ] Linked to the GitHub Issue it resolves

## 🐛 Reporting Bugs
Use the Bug Report issue template. Include steps to reproduce, expected vs actual behavior, and screenshots if possible.

## 💬 Communication
- Daily async standup in Discord/WhatsApp group.
- Blocked on something? Say so immediately — don't sit silently for days.
