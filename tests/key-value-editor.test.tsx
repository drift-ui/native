import { fireEvent, render, screen } from "@testing-library/react-native"

import {
  KeyValueEditor,
  type KeyValueRow,
} from "@/registry/default/ui/key-value-editor"

const rows: KeyValueRow[] = [
  { id: "a", key: "HOST", value: "localhost" },
  { id: "b", key: "PORT", value: "5432" },
]

async function setup(initial = rows) {
  const onValueChange = jest.fn()
  await render(
    <KeyValueEditor defaultValue={initial} onValueChange={onValueChange} />
  )
  const last = () => onValueChange.mock.calls.at(-1)?.[0] as KeyValueRow[]
  return { onValueChange, last }
}

test("edits a key and a value", async () => {
  const { last } = await setup()
  await fireEvent.changeText(screen.getByLabelText("Key 1"), "HOSTNAME")
  await fireEvent.changeText(screen.getByLabelText("Value 2"), "5433")
  expect(last().map((r) => [r.key, r.value])).toEqual([
    ["HOSTNAME", "localhost"],
    ["PORT", "5433"],
  ])
})

test("adds and removes rows", async () => {
  const { last } = await setup()
  await fireEvent.press(screen.getByText("Add row"))
  expect(last()).toHaveLength(3)
  await fireEvent.press(screen.getByLabelText("Remove row 1"))
  expect(last().map((r) => r.key)).toEqual(["PORT", ""])
})

test("Enter on the last row adds a row", async () => {
  const { last } = await setup()
  await fireEvent(screen.getByLabelText("Key 2"), "submitEditing")
  expect(last()).toHaveLength(3)
})

test("pasted .env text becomes rows", async () => {
  const { last } = await setup([{ id: "a", key: "", value: "" }])
  await fireEvent.changeText(screen.getByLabelText("Key 1"), "A=1\nB=2")
  expect(last().map((r) => [r.key, r.value])).toEqual([
    ["A", "1"],
    ["B", "2"],
  ])
})

test("flags duplicate keys", async () => {
  await setup([
    { id: "a", key: "A", value: "" },
    { id: "b", key: "A", value: "" },
  ])
  expect(screen.getAllByText("Duplicate key")).toHaveLength(2)
  expect(screen.getByLabelText("Key 1, duplicate key")).toBeTruthy()
})

test("masks values when secretValues is set", async () => {
  await render(<KeyValueEditor defaultValue={rows} secretValues />)
  expect(screen.getByLabelText("Value 1").props.secureTextEntry).toBe(true)
})
