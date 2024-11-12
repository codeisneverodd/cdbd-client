import { Checkbox } from "@mui/material";
import TextEditor from "@/components/text/TextEditor";
import { Fragment } from "react";
import { IData } from "@/redux/features/BlockData/blockDataSlice";

export const QnaCheckbox = ({ style, data }: { style: any; data: IData }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: style?.textAlign || "left",
      }}
    >
      {data.question?.map((question, index) => (
        <Fragment key={question.title + index}>
          <p
            style={{
              lineHeight: 1.6,
              fontSize: "14px",
              fontWeight: 400,
              marginBottom: "10px",
            }}
          >
            {question.title}
          </p>

          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {question.options.map((option, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <Checkbox
                  defaultChecked={option.checked}
                  size="small"
                  color="secondary"
                  sx={{ height: "18px", padding: 0 }}
                />
                <TextEditor
                  onSubmit={() => {}}
                  value={option.title}
                  onClose={() => {}}
                  style={{
                    flex: 1,
                    fontSize: 12,
                  }}
                />
              </li>
            ))}
          </ul>
        </Fragment>
      ))}

      <button
        style={{
          width: "100%",
          lineHeight: 1,
          padding: "14px",
          borderRadius: "60px",
          border: "1px solid var(--color-black)",
          color: "var(--color-black)",
          backgroundColor: "var(--color-white)",
          marginTop: "16px",
          fontSize: "16px",
        }}
      >
        제출하기
      </button>
    </div>
  );
};
