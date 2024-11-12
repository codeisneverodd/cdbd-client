import { TextField } from "@mui/material";
import { Fragment } from "react";
import { IData } from "@/redux/features/BlockData/blockDataSlice";

export const QnaShortAnswer = ({
  style,
  data,
}: {
  style: any;
  data: IData;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      textAlign: style?.textAlign || "left",
      margin: "16px",
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

        <TextField
          multiline
          rows={3}
          sx={{
            "& .MuiInputBase-root": {
              padding: "10px 12px",
              height: "auto !important",
              fontSize: "16px",
            },
          }}
          placeholder="답변을 입력하세요"
        />
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
