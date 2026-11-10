# Contributing to drift-ui native

This repo ports [drift-ui](https://github.com/drift-ui/ui) components to React Native. People install them into their own Expo apps with the shadcn CLI, so what you write here runs in other people's products.

You don't need open source or React Native experience to start. A maintainer reads every pull request and will tell you what to change. Questions go on the issue or on [Discord][discord].

## Your first contribution

1. Pick an [open issue][issues], or a web component that has no native version yet and [request it][issue-templates].
2. Comment on the issue to claim it, after checking that nobody else has.
3. [Set up the project](#setup), make the change, and [open a pull request](#opening-a-pull-request).

> [!TIP]
> Start with a component whose web version only uses inputs and buttons. Anything with a popover anchored to the caret, drag and drop, or canvas drawing is a much bigger port.

## Setup

You need [Bun](https://bun.sh) 1.2 or newer, and either Xcode with an iOS simulator, Android Studio with an emulator, or Expo Go on a phone. [Fork the repo][fork], then clone your fork:

```bash
git clone https://github.com/<your-username>/native.git
cd native
bun install
bun start
```

Press `i` for iOS or `a` for Android. `App.tsx` is the preview screen.

## Porting a component

> [!TIP]
> Read the web component in [drift-ui/ui](https://github.com/drift-ui/ui/tree/main/registry/default/ui) and the native `key-value-editor.tsx` before you start, and match their structure.

| Step | File                                   | What goes in it                                                   |
| ---- | -------------------------------------- | ----------------------------------------------------------------- |
| 1    | drift-ui/ui `registry.json`            | A `registry:lib` item for the component's lib file, if it has one |
| 2    | `registry/default/lib/<name>-utils.ts` | Installed with `bunx shadcn add @drift-ui/<name>-utils`           |
| 3    | `registry/default/ui/<name>.tsx`       | The React Native component, with the web component's props        |
| 4    | `registry.json`                        | An item with its `dependencies` and `registryDependencies`        |
| 5    | `App.tsx`                              | A short, realistic demo on the preview screen                     |
| 6    | `tests/<name>.test.tsx`                | Tests for what a user does: typing, pressing, submitting          |
| 7    | `README.md`                            | A row in the component table                                      |

Step 1 is a pull request in drift-ui/ui, and it has to merge before this one can install from drift-ui.dev. Mention it in your pull request so the maintainers merge them in order.

<details>
<summary>Imports and registry dependencies</summary>

- Import through `@/registry/default/...`. The shadcn CLI rewrites these paths to the user's aliases on install.
- React Native Reusables primitives are listed by full URL, such as `https://reactnativereusables.com/r/nativewind/button.json`. Install them here with `bunx shadcn add <url>` and do not edit them.
- drift-ui items use the `@drift-ui/` prefix, such as `@drift-ui/use-controllable-state`. They come from the web registry and are never edited in this repo. A change to shared logic goes to drift-ui/ui.

</details>

### Component guidelines

| Area          | Rule                                                                                                                                |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| API           | Keep the web component's props and names. Drop only what has no native meaning, and say why in the pull request                     |
| State         | Support controlled and uncontrolled use through `use-controllable-state`                                                            |
| Props         | Spread remaining props onto the outer `View` and accept `className`                                                                 |
| Accessibility | Give every control an `aria-label` or visible label, set `role` where React Native supports it, and test with VoiceOver or TalkBack |
| Color         | Read colors from the theme variables in `global.css`. Do not hard-code colors                                                       |
| Platform gaps | When React Native lacks a web feature (paste events, `aria-invalid`), work around it and note the difference in the pull request    |

### Avoiding merge conflicts

Insert at the alphabetical position in `registry.json` and the README table. Appending makes two pull requests conflict at the same spot.

## Opening a pull request

1. Branch from `main` in your fork as `<type>/<issue>-<slug>`, for example `feat/4-tags-input`.
2. Run `bun run format`, then make sure `bun run typecheck`, `bun run lint` and `bun run test` pass.
3. Open the pull request and fill in the template. Put `Closes #<issue>` in the description, and add a screenshot from the simulator or a device.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org), with the component name as the scope:

```text
feat(key-value-editor): add React Native key-value-editor
fix(key-value-editor): keep focus after removing a row
```

> [!IMPORTANT]
> Commit with an email linked to your GitHub account so the commits are credited to you.

## Code style

Prettier and ESLint settle formatting. Tailwind classes are sorted by `prettier-plugin-tailwindcss`, so do not reorder them by hand.

## Working with coding agents

[AGENTS.md](AGENTS.md) holds the issue-to-pull-request workflow for coding agents. In Claude Code, run `/work-on-issue <number>`. Review agent output the same way you would review your own code.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).

[discord]: https://discord.gg/tJH3dC8Exz
[fork]: https://github.com/drift-ui/native/fork
[issues]: https://github.com/drift-ui/native/issues
[issue-templates]: https://github.com/drift-ui/native/issues/new/choose
