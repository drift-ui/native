import * as React from "react"
import { TextInput, View } from "react-native"
import { PlusIcon, XIcon } from "lucide-react-native"

import { useControllableState } from "@/registry/default/hooks/use-controllable-state"
import {
  createRow,
  findDuplicateKeys,
  pasteRows,
  type KeyValueRow,
} from "@/registry/default/lib/key-value-editor-utils"
import { cn } from "@/registry/default/lib/utils"
import { Button } from "@/registry/default/ui/button"
import { Icon } from "@/registry/default/ui/icon"
import { Input } from "@/registry/default/ui/input"
import { Text } from "@/registry/default/ui/text"

const EMPTY_ROWS: KeyValueRow[] = []

type TextInputHandle = React.ComponentRef<typeof TextInput>

function KeyValueEditor({
  value,
  defaultValue = EMPTY_ROWS,
  onValueChange,
  secretValues = false,
  keyLabel = "Key",
  valueLabel = "Value",
  keyPlaceholder = "KEY",
  valuePlaceholder = "Value",
  addLabel = "Add row",
  disabled = false,
  className,
  ...props
}: React.ComponentProps<typeof View> & {
  value?: KeyValueRow[]
  defaultValue?: KeyValueRow[]
  onValueChange?: (rows: KeyValueRow[]) => void
  secretValues?: boolean
  keyLabel?: string
  valueLabel?: string
  keyPlaceholder?: string
  valuePlaceholder?: string
  addLabel?: string
  disabled?: boolean
}) {
  const { value: rows, setValue: setRows } = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const keyInputs = React.useRef(new Map<string, TextInputHandle>())
  // Row whose key input gets focus after the next render.
  const pendingFocus = React.useRef<string | null>(null)
  const duplicates = findDuplicateKeys(rows)

  React.useLayoutEffect(() => {
    const id = pendingFocus.current
    if (id === null) return
    pendingFocus.current = null
    keyInputs.current.get(id)?.focus()
  })

  function update(id: string, patch: Partial<KeyValueRow>) {
    setRows(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)))
  }

  function addRow() {
    const row = createRow()
    pendingFocus.current = row.id
    setRows([...rows, row])
  }

  function removeRow(index: number) {
    pendingFocus.current = (rows[index + 1] ?? rows[index - 1])?.id ?? null
    setRows(rows.filter((_, rowIndex) => rowIndex !== index))
  }

  function submit(index: number) {
    if (index === rows.length - 1) addRow()
    else keyInputs.current.get(rows[index + 1].id)?.focus()
  }

  // React Native has no paste event: a newline, or text that grows by more
  // than one character at once, is treated as a paste.
  function changeKey(index: number, text: string) {
    const row = rows[index]
    if (text.includes("\n") || text.length - row.key.length > 1) {
      const appended = text.startsWith(row.key)
      // A paste over a selection replaced the old key, so drop it first.
      const base = appended
        ? rows
        : rows.map((r) => (r.id === row.id ? { ...r, key: "" } : r))
      const pasted = appended ? text.slice(row.key.length) : text
      const next = pasteRows(base, index, pasted)
      if (next) {
        pendingFocus.current = next.at(-1)?.id ?? null
        setRows(next)
        return
      }
    }
    update(row.id, { key: text })
  }

  return (
    <View
      role="group"
      className={cn("gap-2", className)}
      {...props}
    >
      {rows.length > 0 && (
        <View
          aria-hidden
          importantForAccessibility="no-hide-descendants"
          className="flex-row gap-2 pr-12"
        >
          <Text className="flex-1 text-xs font-medium text-muted-foreground">
            {keyLabel}
          </Text>
          <Text className="flex-1 text-xs font-medium text-muted-foreground">
            {valueLabel}
          </Text>
        </View>
      )}
      {rows.map((row, index) => {
        const number = index + 1
        const isDuplicate = duplicates.has(row.key.trim())
        return (
          <View key={row.id} className="gap-1">
            <View className="flex-row items-center gap-2">
              <Input
                ref={(input: unknown) => {
                  // unknown: the reusables Input types its ref as the TextInput class.
                  if (input) keyInputs.current.set(row.id, input as TextInputHandle)
                  else keyInputs.current.delete(row.id)
                }}
                aria-label={`${keyLabel} ${number}${isDuplicate ? ", duplicate key" : ""}`}
                placeholder={keyPlaceholder}
                value={row.key}
                editable={!disabled}
                autoCapitalize="characters"
                autoCorrect={false}
                spellCheck={false}
                // Multiline keeps newlines in pasted .env text; Enter still submits.
                multiline
                submitBehavior="submit"
                scrollEnabled={false}
                returnKeyType="next"
                className={cn(
                  "flex-1 pt-2.5 font-mono",
                  isDuplicate && "border-destructive"
                )}
                onChangeText={(text) => changeKey(index, text)}
                onSubmitEditing={() => submit(index)}
              />
              <Input
                aria-label={`${valueLabel} ${number}`}
                placeholder={valuePlaceholder}
                value={row.value}
                editable={!disabled}
                secureTextEntry={secretValues}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                submitBehavior="submit"
                returnKeyType="next"
                className="flex-1 font-mono"
                onChangeText={(text) => update(row.id, { value: text })}
                onSubmitEditing={() => submit(index)}
              />
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Remove row ${number}`}
                disabled={disabled}
                onPress={() => removeRow(index)}
              >
                <Icon as={XIcon} className="size-4 text-foreground" />
              </Button>
            </View>
            {isDuplicate && (
              <Text className="text-xs text-destructive">Duplicate key</Text>
            )}
          </View>
        )
      })}
      <Button
        variant="outline"
        size="sm"
        disabled={disabled}
        onPress={addRow}
        className="self-start"
      >
        <Icon as={PlusIcon} className="size-4 text-foreground" />
        <Text>{addLabel}</Text>
      </Button>
    </View>
  )
}

export { KeyValueEditor, type KeyValueRow }
