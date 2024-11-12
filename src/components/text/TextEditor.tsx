"use client";
// import Mention from "@tiptap/extension-mention";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Extension } from "@tiptap/core";

export default function TextEditor({
  value,
  onSubmit,
  onClose,
  disabled = false,
  onChange,
  style,
  className
}: {
  value: string;
  onSubmit: (text: string) => void;
  onClose: () => void;
  disabled?: boolean;
  onChange?: (text: string) => void;
  style?: any;
  className?: string;
}) {
  const KeyDownHandler = Extension.create({
    addKeyboardShortcuts() {
      return {
        Enter: (e) => {
          if (e.editor.getText() === value) {
            // No changes made
            onClose();
            return true;
          }
          !disabled && onSubmit(e.editor.getText());
          return true;
        },
        Escape: () => {
          onClose();
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      KeyDownHandler,
      //   Mention.configure({
      //     HTMLAttributes: {
      //       class: 'mention',
      //     },
      //     suggestion,
      //   }),
    ],
    injectCSS: true,
    content: `${value}`,
    ...(onChange
      ? {
          onUpdate({ editor }) {
            onChange(editor.getText());
          },
        }
      : {}),
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContent
      // className="flex-1 p-1 mt-2 text-xs rounded-md max-h-40 overflow-scroll"
      editor={editor}
      style={style}
      className={className}
    />
  );
};
