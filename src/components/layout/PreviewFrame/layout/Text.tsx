// import TextEditor from "@/components/text/TextEditor";
import { changeStyle, changeText } from "@/redux/features/BlockData/blockDataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const TextBlockDefault = ({ style, id }: any) => {
  const dispatch = useAppDispatch();
  const {
    fontWeight,
    fontSize,
    fontFamily,
    textDecoration,
    textAlign,
    lineHeight,
    color,
    link,
    openInNewTab,
    background,
    border,
    borderWidth,
    borderRadius,
    padding,
    margin,
  } = style;

  const handleUpdate = (newContent: any) => {
    dispatch(
      changeStyle({
        id,
        style: {
          ...style,
          text: newContent,
        },
      })
    );
    dispatch(
      changeText({
        id,
        text: newContent,
      })
    );
  };

  const extensions = [StarterKit.configure({})];

  return (
    <div
      className="subtitle2 text-grey-400"
      style={{
        fontWeight,
        textDecoration,
        fontSize,
        fontFamily,
        textAlign,
        lineHeight,
        color,
        background: background === "image" ? "transparent" : background,
        border,
        borderWidth,
        borderRadius,
        padding,
        margin,
        cursor: link ? "pointer" : "default",
      }}
      onClick={() => {
        if (link) {
          const protocol = window.location.protocol;
          window.open(
            link.includes("http") ? link : protocol + "//" + link,
            openInNewTab ? "_blank" : "_self"
          );
        }
      }}
    >
      {/* <textarea
        value={style.text}
        className="w-full h-full"
        onChange={(e) => {
          handleUpdate(e.target.value);
        }}
      /> */}
      <EditorProvider
        // slotBefore={<></>}
        immediatelyRender={false}
        extensions={extensions}
        content={style.text}
        // onUpdate={(v) => {console.log("sadfasdfsad",v.editor.getText())}}
        onBlur={(v) => {
          handleUpdate(v.editor.getText());
        }}
      />
      {/* <TextEditor
        value="이 곳에서 텍스트를 입력하세요"
        onSubmit={() => {alert('submit')}}
        onClose={() => {alert('close')}}
      /> */}
    </div>
  );
};

export const TextBlock = () => (
  <p
    style={{
      fontSize: 20,
      color: "#dd2d01",
    }}
  >
    안녕하세요
  </p>
);
