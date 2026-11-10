# drift-ui native

React Native versions of [drift-ui](https://github.com/drift-ui/ui) components, installed with the shadcn CLI into Expo apps that use NativeWind. The pilot is tracked in [drift-ui/ui#132](https://github.com/drift-ui/ui/issues/132).

Status: scaffold only. No components yet.

## Stack

Expo SDK 58, React Native 0.88, NativeWind 4 with Tailwind CSS 3, Bun.

Pure logic (parsing, state machines) is shared with the web registry: native items depend on the `@drift-ui` lib items instead of copying them, and only add the React Native rendering layer.

## Commands

```bash
bun install
bun start                 # Expo dev server
bun run typecheck
bun run registry:build    # regenerate public/r/*.json from registry.json
```

## Layout

| Path                         | What                                   |
| ---------------------------- | -------------------------------------- |
| `registry/default/ui/`       | Component source, the thing users install |
| `registry/default/lib/`      | Native-only logic, if any              |
| `registry.json`              | Registry manifest read by `shadcn build` |
| `App.tsx`                    | Preview app                            |

## License

MIT
