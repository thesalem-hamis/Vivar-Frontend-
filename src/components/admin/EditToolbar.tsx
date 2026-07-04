import { useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  Code,
  Minus,
} from "lucide-react";

const btnBase =
  "p-2 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-[#0E292F] transition-colors disabled:opacity-30 disabled:pointer-events-none";
const btnActive = "bg-[#0E292F]/10 text-[#0E292F]";

export default function EditorToolbar({
  editor,
  onInsertImage,
  uploadingInlineImage,
}: {
  editor: Editor | null;
  onInsertImage: (file: File) => void;
  uploadingInlineImage: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  if (!editor) return null;

  const setLink = () => {
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run();
      setShowLinkInput(false);
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();
    setLinkUrl("");
    setShowLinkInput(false);
  };

  return (
    <div className="border border-neutral-200 border-b-0 rounded-t-lg bg-neutral-50 px-2 py-1.5 flex flex-wrap items-center gap-0.5 sticky top-0 z-10">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btnBase} ${editor.isActive("bold") ? btnActive : ""}`}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btnBase} ${editor.isActive("italic") ? btnActive : ""}`}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${btnBase} ${editor.isActive("underline") ? btnActive : ""}`}
        title="Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${btnBase} ${editor.isActive("strike") ? btnActive : ""}`}
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-neutral-200 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${btnBase} ${editor.isActive("heading", { level: 2 }) ? btnActive : ""}`}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${btnBase} ${editor.isActive("heading", { level: 3 }) ? btnActive : ""}`}
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-neutral-200 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btnBase} ${editor.isActive("bulletList") ? btnActive : ""}`}
        title="Bullet list"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${btnBase} ${editor.isActive("orderedList") ? btnActive : ""}`}
        title="Numbered list"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${btnBase} ${editor.isActive("blockquote") ? btnActive : ""}`}
        title="Quote"
      >
        <Quote className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${btnBase} ${editor.isActive("codeBlock") ? btnActive : ""}`}
        title="Code block"
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={btnBase}
        title="Divider"
      >
        <Minus className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-neutral-200 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`${btnBase} ${editor.isActive({ textAlign: "left" }) ? btnActive : ""}`}
        title="Align left"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`${btnBase} ${editor.isActive({ textAlign: "center" }) ? btnActive : ""}`}
        title="Align center"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`${btnBase} ${editor.isActive({ textAlign: "right" }) ? btnActive : ""}`}
        title="Align right"
      >
        <AlignRight className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-neutral-200 mx-1" />

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setLinkUrl(editor.getAttributes("link").href || "");
            setShowLinkInput((s) => !s);
          }}
          className={`${btnBase} ${editor.isActive("link") ? btnActive : ""}`}
          title="Link"
        >
          <Link2 className="w-4 h-4" />
        </button>
        {showLinkInput && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg p-2 flex gap-1.5 z-20 w-64">
            <input
              autoFocus
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), setLink())
              }
              placeholder="https://..."
              className="flex-1 px-2 py-1 text-xs border border-neutral-200 rounded outline-none focus:border-[#0E292F]"
            />
            <button
              type="button"
              onClick={setLink}
              className="text-xs font-semibold px-2 bg-[#0E292F] text-white rounded"
            >
              Set
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploadingInlineImage}
        className={btnBase}
        title="Insert image"
      >
        <ImageIcon className="w-4 h-4" />
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onInsertImage(file);
          e.target.value = "";
        }}
      />

      <div className="w-px h-5 bg-neutral-200 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={btnBase}
        title="Undo"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={btnBase}
        title="Redo"
      >
        <Redo2 className="w-4 h-4" />
      </button>

      {uploadingInlineImage && (
        <span className="text-[11px] text-neutral-400 ml-1 animate-pulse">
          Uploading image…
        </span>
      )}
    </div>
  );
}
