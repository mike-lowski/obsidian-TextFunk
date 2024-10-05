# TextFunk Plufing for Obsidian

### Function Descriptions:

#### 1. **Join Lines (`joinLines`)**
This function joins all the selected lines into a single line by replacing newline characters (`\n`) with a space. It operates only on selected text, so if no text is selected, it does nothing.

- **Use Case**: Ideal for removing line breaks from paragraphs or merging multiple lines of selected text into one line.
- **Behavior**:
  - If text is selected, all newlines in the selection will be replaced by a space.
  - If no text is selected, the function will not alter the document.

```typescript
function joinLines(editor: Editor) {
  const selectedText = editor.getSelection();
  if (!selectedText) return;

  const joinedText = selectedText.replace(/\n+/g, " ").replace(/\s+/g, " ");
  editor.replaceSelection(joinedText);
}
```

---

#### 2. **Remove Empty Lines (`removeEmptyLines`)**
This function removes all empty lines from the selected text. If no text is selected, it will remove empty lines from the entire document.

- **Use Case**: Useful for cleaning up documents or code by removing unnecessary blank lines.
- **Behavior**:
  - Removes all empty lines (or lines containing only spaces) from the selected text.
  - If no text is selected, it will remove all empty lines from the entire document.

```typescript
function removeEmptyLines(editor: Editor) {
  const selectedText = editor.getSelection();
  if (selectedText) {
    const cleanedText = selectedText
      .split("\n")
      .filter(line => line.trim() !== "")
      .join("\n");
    editor.replaceSelection(cleanedText);
  } else {
    const entireText = editor.getValue();
    const cleanedText = entireText
      .split("\n")
      .filter(line => line.trim() !== "")
      .join("\n");
    editor.setValue(cleanedText);
  }
}
```

---

#### 3. **Remove Consecutive Empty Lines (`removeConsecutiveEmptyLines`)**
This function removes consecutive empty lines, collapsing multiple empty lines into a single empty line. It works on the selected text, or the entire document if no text is selected.

- **Use Case**: Useful for tidying up documents with multiple consecutive blank lines, reducing them to a single blank line.
- **Behavior**:
  - Removes consecutive empty lines, leaving at most one empty line between blocks of text.
  - Works on the selected text or the entire document if no text is selected.

```typescript
function removeConsecutiveEmptyLines(editor: Editor) {
  const selectedText = editor.getSelection();
  if (selectedText) {
    const cleanedText = selectedText
      .split("\n")
      .filter((line, index, lines) => 
        !(line.trim() === "" && lines[index - 1]?.trim() === "")
      )
      .join("\n");
    editor.replaceSelection(cleanedText);
  } else {
    const entireText = editor.getValue();
    const cleanedText = entireText
      .split("\n")
      .filter((line, index, lines) => 
        !(line.trim() === "" && lines[index - 1]?.trim() === "")
      )
      .join("\n");
    editor.setValue(cleanedText);
  }
}
```

---

#### 4. **Trim Leading and Trailing Spaces (`trimLeadingTrailingSpaces`)**
This function trims leading and trailing spaces from each line of the selected text. If no text is selected, it will trim spaces from all lines in the document.

- **Use Case**: Useful for cleaning up documents by removing unnecessary spaces at the beginning and end of each line.
- **Behavior**:
  - Trims leading and trailing spaces from each line in the selected text.
  - If no text is selected, trims spaces from all lines in the document.

```typescript
function trimLeadingTrailingSpaces(editor: Editor) {
  const selectedText = editor.getSelection();
  if (selectedText) {
    const trimmedText = selectedText
      .split("\n")
      .map(line => line.trim())
      .join("\n");
    editor.replaceSelection(trimmedText);
  } else {
    const entireText = editor.getValue();
    const trimmedText = entireText
      .split("\n")
      .map(line => line.trim())
      .join("\n");
    editor.setValue(trimmedText);
  }
}
```

---

### How to Use These Functions:
Each function is registered as a command in the Obsidian editor. You can trigger them either via the command palette or assign a keyboard shortcut for quick access.

### Command List:
1. **Join Lines**: Joins selected lines into one, replacing newlines with a space.
2. **Remove Empty Lines**: Removes all empty lines from selected text, or the entire document if nothing is selected.
3. **Remove Consecutive Empty Lines**: Collapses multiple consecutive empty lines into a single empty line in the selected text or entire document.
4. **Trim Leading and Trailing Spaces**: Removes unnecessary leading and trailing spaces from each line in the selection, or from all lines in the document if nothing is selected.
