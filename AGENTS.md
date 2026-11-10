# AGENTS.md

Instructions for coding agents (Claude Code, Codex, Cursor, Copilot, Gemini and others) working in this repo. Humans should read [CONTRIBUTING.md](CONTRIBUTING.md); this file points at it rather than repeating it.

## Project

drift-ui native is a shadcn-compatible registry of React Native components: Expo SDK 58, React Native 0.88, NativeWind 4 with Tailwind CSS 3, Bun. Each component ports one from [drift-ui/ui](https://github.com/drift-ui/ui) and keeps its props. Primitives come from React Native Reusables, shared logic from the `@drift-ui` web registry.

Lead maintainer: [@localhostd3veloper](https://github.com/localhostd3veloper). The pilot is run by [@KomalSrinivasan](https://github.com/KomalSrinivasan). Repo: `drift-ui/native`. The pilot is tracked in drift-ui/ui#132.

## Commands

```bash
bun install
bun start                 # Expo dev server, i for iOS, a for Android
bun run registry:build    # regenerate public/r/*.json from registry.json
bun run typecheck
bun run lint
bun run test
bun run format
```

## Where things live

| Path                             | What                                                        |
| -------------------------------- | ----------------------------------------------------------- |
| `registry/default/ui/<name>.tsx` | Component source, plus React Native Reusables primitives    |
| `registry/default/lib/*.ts`      | Shared logic installed from `@drift-ui`. Never edit it here |
| `registry/default/hooks/*.ts`    | Hooks installed from `@drift-ui`. Never edit them here      |
| `registry.json`                  | Registry manifest read by `shadcn build`                    |
| `App.tsx`                        | Preview screen                                              |
| `tests/<name>.test.tsx`          | Jest suites (jest-expo, React Native Testing Library)       |
| `public/r/**/*.json`             | Build output, gitignored. Regenerate, never hand-edit       |

## Working on a GitHub issue

Use the `gh` CLI. If you are not authenticated, ask the human to run `gh auth login`.

### 1. Choose the issue

If you were given a number, use it. Otherwise list candidates and let the human pick:

```bash
gh issue list -R drift-ui/native --state open
```

Skip issues that already have an assignee or a linked open pull request (`gh issue view <n> --json assignees,closedByPullRequestsReferences`).

### 2. Read it fully

```bash
gh issue view <n> --comments
```

Read the web component in drift-ui/ui too: its source, its lib file and its tests. If the issue is ambiguous, ask in the conversation before writing code. Do not guess an API.

### 3. Claim it and branch

Ask the human before claiming, since it is visible to others. Maintainers assign themselves (`gh issue edit <n> --add-assignee @me`), others comment on the issue.

```bash
git switch main && git pull
git switch -c <type>/<n>-<short-slug>     # e.g. feat/4-tags-input, fix/7-kve-focus
```

### 4. Implement

Follow every step of [Porting a component](CONTRIBUTING.md#porting-a-component) and the [component guidelines](CONTRIBUTING.md#component-guidelines). The short version:

1. If the web component has a lib file, it needs a `registry:lib` item in drift-ui/ui first (`@drift-ui/<name>-utils`). That is a separate pull request in that repo
2. Install shared files with `bunx shadcn add @drift-ui/<item>` and primitives with `bunx shadcn add https://reactnativereusables.com/r/nativewind/<name>.json`. Never edit installed files
3. `registry/default/ui/<name>.tsx` with the web component's props
4. Entry in `registry.json`, at its alphabetical position
5. A demo in `App.tsx`
6. Tests in `tests/<name>.test.tsx`. React Native Testing Library 14 is async: `await render(...)` and `await fireEvent...`
7. A row in the README component table

Rules that reviewers enforce:

- Same props as the web component. Differences are listed in the pull request
- Controlled and uncontrolled support through `use-controllable-state`
- Accept `className` and spread remaining props onto the outer `View`
- Labels on every control, and `role` where React Native supports it
- Colors come from the theme variables in `global.css`, never hard-coded
- Keep the scope to the issue. No drive-by refactors

### 5. Verify

All of these must pass before you open a pull request:

```bash
bun run typecheck && bun run lint && bun run test && bun run registry:build
```

Run the preview with `bun start` on an iOS simulator or Android emulator, and check light and dark mode. Attach a screenshot to the pull request.

### 6. Commit and open the pull request

Commits follow [Conventional Commits](https://www.conventionalcommits.org), scoped to the component: `feat(tags-input): add React Native tags-input`. One logical change per commit.

Ask the human before pushing or opening the pull request. Then:

```bash
git push -u origin HEAD
gh pr create --title "feat(tags-input): add React Native tags-input" --body-file pr-body.md
```

Write `pr-body.md` outside the repo. Base it on [.github/pull_request_template.md](.github/pull_request_template.md) and tick only what you actually ran. `Closes #<n>` must be in the body, and link the drift-ui/ui pull request it depends on, if any.

## Expo has changed, do not trust your training data

Expo ships breaking changes every SDK release. Before writing code that touches an Expo or React Native API:

1. Read the major version of `expo` in `package.json`.
2. Fetch the matching docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, start from https://docs.expo.dev/llms.txt

Add packages with `bunx expo install <package>`, which picks SDK-compatible versions, not `bun add`. Expo Go only bundles its own native modules; a library with other native code needs a development build (`bunx expo run:ios`). Never create or edit `ios/` or `android/` by hand.

## Do not

- Push to `main` or force-push a shared branch
- Commit or hand-edit `public/r/*.json`
- Edit files installed from `@drift-ui` or React Native Reusables
- Add dependencies without saying why in the pull request
- Work on more than one issue in a single pull request
