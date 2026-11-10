# drift-ui native

React Native versions of [drift-ui](https://github.com/drift-ui/ui) components, installed with the shadcn CLI into Expo apps that use NativeWind. They keep the props of the web components, so a screen built with drift-ui on the web reads the same on iOS and Android.

The project is a pilot, tracked in [drift-ui/ui#132](https://github.com/drift-ui/ui/issues/132). Expect the list below to grow one component at a time.

## Components

| Category | Components         | Web version                                                      |
| -------- | ------------------ | ---------------------------------------------------------------- |
| Inputs   | `key-value-editor` | [drift-ui.dev](https://drift-ui.dev/components/key-value-editor) |

## Usage

The components need an Expo app with [NativeWind 4](https://www.nativewind.dev) and Tailwind CSS 3, set up the way [React Native Reusables](https://reactnativereusables.com/docs/installation/manual) describes, including its theme variables in `global.css`. Then run `npx shadcn init` so the project has a `components.json`.

Install a component from this registry by URL. The registry will be served at `native.drift-ui.dev`. Until that site is live, build it locally with `bun run registry:build` and pass the path to the JSON file instead.

```bash
npx shadcn add https://native.drift-ui.dev/r/key-value-editor.json
```

Registry dependencies are installed with it: React Native Reusables primitives such as `button` and `input`, and drift-ui's shared logic such as `@drift-ui/key-value-editor-utils`. The shared logic is the same file the web component uses, so parsing and validation behave identically on both platforms.

## Develop

```bash
git clone https://github.com/drift-ui/native.git
cd native
bun install
bun start
```

Press `i` for the iOS simulator or `a` for Android, or scan the QR code with Expo Go. `App.tsx` is the preview screen.

| Command                  | What it does                                   |
| ------------------------ | ---------------------------------------------- |
| `bun start`              | Start the Expo dev server                      |
| `bun run registry:build` | Rebuild `public/r/*.json` from `registry.json` |
| `bun run test`           | Run the Jest suite                             |
| `bun run typecheck`      | Type-check with `tsc --noEmit`                 |
| `bun run lint`           | Run ESLint through `expo lint`                 |
| `bun run format`         | Format with Prettier                           |

## Layout

```text
registry.json                  item manifest read by `shadcn build`
registry/default/ui/*.tsx      component source, plus React Native Reusables primitives
registry/default/lib/*.ts      installed from @drift-ui, never edited here
registry/default/hooks/*.ts    installed from @drift-ui, never edited here
App.tsx                        preview screen
tests/                         Jest suites (jest-expo, React Native Testing Library)
public/r/*.json                gitignored build output
```

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, the steps to port a component, and the commit conventions. Coding agents start from [AGENTS.md](AGENTS.md). Bugs and component requests go in the [issues](https://github.com/drift-ui/native/issues/new/choose).

## License

[MIT](LICENSE)
