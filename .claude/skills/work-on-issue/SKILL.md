---
name: work-on-issue
description: Pick up a drift-ui native GitHub issue and take it to an open pull request. Use when asked to work on, fix, port or pick up an issue, when given an issue number or URL, or when asked what to work on next.
argument-hint: "[issue-number]"
---

# Work on an issue

Issue: $ARGUMENTS

Follow "Working on a GitHub issue" in `AGENTS.md` step by step. This skill adds the order of operations and the checkpoints.

1. **Choose.** If no issue number was given, list open issues in drift-ui/native, show the top five with labels, and ask which one to take. Stop until the human answers.
2. **Understand.** `gh issue view <n> --comments`, then read the web component, its lib file and its tests in drift-ui/ui. Summarize the ask in three lines, list the files you expect to touch, and name the web features that have no React Native equivalent. If anything about the API is unclear, ask now.
3. **Claim and branch.** Ask before assigning or commenting. Create `<type>/<n>-<slug>` from an up-to-date `main`.
4. **Shared logic first.** If the web component has a lib file without its own `registry:lib` item, that item is a pull request in drift-ui/ui. Ask before opening it.
5. **Implement.** Work through the seven-step checklist in AGENTS.md. Track each step as a todo so none is skipped. For a bug, write the failing test first.
6. **Verify.** Run typecheck, lint, test and `registry:build`, then run the preview on a simulator. Fix failures and re-run until clean. Report anything you could not check, such as Android or a real device.
7. **Show the work.** Before pushing, summarize the diff (`git diff main --stat`), the verification results and the differences from the web component, and ask whether to push and open the pull request.
8. **Open the pull request.** Use the template, include `Closes #<n>` and any drift-ui/ui pull request it depends on, tick only checks that ran, and give the human the URL.
