import { Editor, Plugin } from "obsidian";

export default class TextFunkPlugin extends Plugin {
  async onload() {
    // Command to join lines
    this.addCommand({
      id: "join-lines",
      name: "Join lines",
      editorCallback: (editor: Editor) => {
        joinLines(editor);
      },
    });

    // Command to remove empty lines
    this.addCommand({
      id: "remove-empty-lines",
      name: "Remove Empty Lines",
      editorCallback: (editor: Editor) => {
        removeEmptyLines(editor);
      },
    });

    // Command to remove consecutive empty lines
    this.addCommand({
      id: "remove-consecutive-empty-lines",
      name: "Remove Consecutive Empty Lines",
      editorCallback: (editor: Editor) => {
        removeConsecutiveEmptyLines(editor);
      },
    });

    // Command to trim leading and trailing spaces
    this.addCommand({
      id: "trim-leading-trailing-spaces",
      name: "Trim Leading and Trailing Spaces",
      editorCallback: (editor: Editor) => {
        trimLeadingTrailingSpaces(editor);
      },
    });
  }

  onunload() {
    // Clean up resources if needed
  }
}

// Function to join lines (only works on selected text)
function joinLines(editor: Editor) {
  const selectedText = editor.getSelection();
  if (!selectedText) return;

  const joinedText = selectedText.replace(/\n+/g, " ").replace(/\s+/g, " ");
  editor.replaceSelection(joinedText);
}

// Function to remove empty lines
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

// Function to remove consecutive empty lines
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

// Function to trim leading and trailing spaces
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
