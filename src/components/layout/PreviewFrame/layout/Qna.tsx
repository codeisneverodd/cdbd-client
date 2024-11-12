import {
  FormControlLabel,
  Checkbox,
  IconButton,
  Radio,
  MenuItem,
  ListItemText,
  Select,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextEditor from "@/components/text/TextEditor";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import Image from "next/image";
import iconDelete from "/public/images/icon-delete.svg";

// export const QnaCheckbox = ({style}:any) => {
//   const [selectedValue, setSelectedValue] = useState([0]);
//   const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

//   return (<div
//     style={{
//       display: "flex",
//       flexDirection: "column",
//       textAlign: style?.textAlign || "left",
//     }}
//   >
//     {/* <p
//       style={{
//         lineHeight: 1.6,
//         fontSize: 14,
//         fontWeight: 700,
//         marginBottom: 16,
//       }}
//     />
//     {/* <p
//       style={{
//         lineHeight: 1.6,
//         fontSize: "18px",
//         fontWeight: 400,
//         marginBottom: "10px",
//       }}
//     >
//       제목을 입력하세요
//     </p> */}
//     {/* <TextEditor
//       onSubmit={() => {}}
//       value={"제목을 입력하세요"}
//       onClose={() => {}}
//       style={{
//         lineHeight: 1.6,
//         fontSize: 14,
//         fontWeight: 700,
//         marginBottom: 16,
//       }}
//     /> */}
//     {/* <p
//       style={{
//         lineHeight: 1.6,
//         fontSize: "14px",
//         fontWeight: 400,
//         marginBottom: "10px",
//       }}
//     >
//       질문을 입력하세요
//     </p> */}
//     <TextEditor
//       onSubmit={(v) => {
//         // setSelectedValue([...selectedValue, v]);
//       }}
//       value={"질문을 입력하세요"}
//       onClose={() => {}}
//       style={{
//         lineHeight: 1.6,
//         fontSize: "14px",
//         fontWeight: 400,
//         marginBottom: "10px",
//       }}
//     />

//     <ul
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "10px",
//       }}
//     >
//       {selectedValue.map((_,index)=>(<li
//         key={index}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: "8px",
//         }}
//       >
//         <Checkbox
//           checked={selectedOptions.includes(index)}
//           size="small"
//           color="secondary"
//           sx={{ height: "18px", padding: 0 }}
//           onChange={(e, v)=>{
//             if(v) style?.multiple ? setSelectedOptions([...selectedOptions, index]) : setSelectedOptions([index]);
//             else setSelectedOptions(selectedOptions.filter((i)=>i !== index));
//           }}
//         />
//         <TextEditor
//           onSubmit={() => {}}
//           value={"option"+(index+1)}
//           onClose={() => {}}
//           style={{
//             flex: 1,
//             fontSize: 12
//           }}
//         />
//         <IconButton onClick={()=>{
//           setSelectedValue(selectedValue.filter((_, i)=>i !== index));
//         }}>
//           <Image src={iconDelete} alt="iconDelete" />
//         </IconButton>
//       </li>))}
//     </ul>
//     <IconButton
//       onClick={()=>{
//         setSelectedValue([...selectedValue, selectedValue.length]);
//       }}
//     >
//       <Add />
//     </IconButton>

//     <button
//       style={{
//         width: "100%",
//         lineHeight: 1,
//         padding: "14px",
//         borderRadius: "60px",
//         border: "1px solid var(--color-black)",
//         color: "var(--color-black)",
//         backgroundColor: "var(--color-white)",
//         marginTop: "16px",
//         fontSize: "16px",
//       }}
//     >
//       제출하기
//     </button>
//   </div>
// )}

// (
//   <div
//     style={{
//       display: "flex",
//       flexDirection: "column",
//     }}
//   >
//     <p
//       style={{
//         lineHeight: 1.6,
//         fontSize: 14,
//         fontWeight: 700,
//         marginBottom: 16,
//       }}
//     >
//       제목을 입력하세요
//     </p>
//     <p
//       style={{
//         lineHeight: 1.6,
//         fontSize: "14px",
//         fontWeight: 400,
//         marginBottom: "10px",
//       }}
//     >
//       질문을 입력하세요
//     </p>

//     <ul
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "10px",
//       }}
//     >
//       <li
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: "8px",
//         }}
//       >
//         <FormControlLabel
//           sx={{
//             "& span": {
//               fontSize: "12px",
//             },
//           }}
//           control={
//             <Checkbox size="small" color="secondary" sx={{ height: "18px" }} />
//           }
//           label="옵션1을(를) 입력하세요"
//         />

//         <IconButton>
//           <Image src={iconDelete} alt="iconDelete" />
//         </IconButton>
//       </li>
//       <li
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: "8px",
//         }}
//       >
//         <FormControlLabel
//           className="caption"
//           sx={{
//             "& span": {
//               fontSize: "12px",
//             },
//           }}
//           control={
//             <Checkbox size="small" color="secondary" sx={{ height: "18px" }} />
//           }
//           label="옵션2을(를) 입력하세요"
//         />
//       </li>
//       <li
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: "8px",
//         }}
//       >
//         <FormControlLabel
//           disabled
//           className="caption"
//           sx={{
//             "& span": {
//               fontSize: "12px",
//             },
//           }}
//           control={
//             <Checkbox size="small" color="secondary" sx={{ height: "18px" }} />
//           }
//           label="옵션 추가"
//         />
//       </li>
//     </ul>

//     <button
//       style={{
//         width: "100%",
//         lineHeight: 1,
//         padding: "14px",
//         borderRadius: "60px",
//         border: "1px solid var(--color-black)",
//         color: "var(--color-black)",
//         backgroundColor: "var(--color-white)",
//         marginTop: "16px",
//       }}
//     >
//       제출하기
//     </button>
//   </div>
// );

export const QnaRadio = ({style}: any) => {
  const [selectedValue, setSelectedValue] = useState([0]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  return (<div
    style={{
      display: "flex",
      flexDirection: "column",
      textAlign: style?.textAlign || "left",
    }}
  >
    {/* <p
      style={{
        lineHeight: 1.6,
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 16,
      }}
    >
      제목을 입력하세요
    </p> */}
    <TextEditor
      onSubmit={() => {}}
      value={"제목을 입력하세요"}
      onClose={() => {}}
      style={{
        lineHeight: 1.6,
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 16,
      }}
    />
    {/* <p
      style={{
        lineHeight: 1.6,
        fontSize: "14px",
        fontWeight: 400,
        marginBottom: "10px",
      }}
    >
      질문을 입력하세요
    </p> */}
    <TextEditor
      onSubmit={(v) => {
        // setSelectedValue([...selectedValue, v]);
      }}
      value={"질문을 입력하세요"}
      onClose={() => {}}
      style={{
        lineHeight: 1.6,
        fontSize: 18,
        fontWeight: 400,
        marginBottom: "10px",
      }}
    />

    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {selectedValue.map((_,index)=>(<li
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <Radio
          checked={selectedOptions.includes(index)}
          size="small"
          color="secondary"
          sx={{ height: "18px", padding: 0 }}
          onClick={()=>{
            style?.multiple ? setSelectedOptions([...selectedOptions, index]) : setSelectedOptions([index]);
          }}
        />
        <TextEditor
          onSubmit={() => {}}
          value={"option"+(index+1)}
          onClose={() => {}}
          style={{
            flex: 1,
            fontSize: 16
          }}
        />
      </li>))}
    </ul>
    {/* <IconButton
      onClick={()=>{
        setSelectedValue([...selectedValue, selectedValue.length]);
      }}
    >
      <Add />
    </IconButton> */}

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
)};

export const QnaSelect = ({style}:any) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      textAlign: style?.textAlign || "left",
    }}
  >
    {/* <p
      style={{
        lineHeight: 1.6,
        fontSize: "18px",
        fontWeight: 700,
        marginBottom: 16,
      }}
    >
      제목을 입력하세요
    </p> */}
    <TextEditor
      onSubmit={() => {}}
      value={"제목을 입력하세요"}
      onClose={() => {}}
      style={{
        lineHeight: 1.6,
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 16,
      }}
    />
    {/* <p
      style={{
        lineHeight: 1.6,
        fontSize: "18px",
        fontWeight: 400,
        marginBottom: "10px",
      }}
    >
      질문을 입력하세요
    </p> */}
    <TextEditor
      onSubmit={() => {}}
      value={"질문을 입력하세요"}
      onClose={() => {}}
      style={{
        lineHeight: 1.6,
        fontSize: "14px",
        fontWeight: 400,
        marginBottom: "10px",
      }}
    />

    <Select fullWidth size="small" IconComponent={KeyboardArrowDownIcon}>
      <MenuItem
        value={"option1"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>옵션1을(를) 입력하세요</span>
      </MenuItem>
      <MenuItem value={"option2"}>
        <ListItemText primary="옵션2를 입력하세요" />
      </MenuItem>
      <MenuItem value={"option3"} disabled>
        옵션 추가
      </MenuItem>
    </Select>

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

// export const QnaShortAnswer = ({style}:any) => (
//   <div
//     style={{
//       display: "flex",
//       flexDirection: "column",
//       textAlign: style?.textAlign || "left",
//     }}
//   >
//     {/* <p
//       style={{
//         lineHeight: 1.6,
//         fontSize: "18px",
//         fontWeight: 700,
//         marginBottom: 16,
//       }}
//     >
//       제목을 입력하세요
//     </p> */}
//     <TextEditor
//       onSubmit={(v) => {
//         // setSelectedValue([...selectedValue, v]);
//       }}
//       value={"질문을 입력하세요"}
//       onClose={() => {}}
//       style={{
//         lineHeight: 1.6,
//         fontSize: "14px",
//         fontWeight: 400,
//         marginBottom: "10px",
//       }}
//     />

//     {/* <TextField sx={{fontSize: "16px",}} placeholder="답변을 입력하세요" /> */}

//     <TextField
//       multiline
//       rows={3}
//       sx={{
//         "& .MuiInputBase-root": {
//           padding: "10px 12px",
//           height: "auto !important",
//           fontSize: "16px",
//         },
//       }}
//       placeholder="답변을 입력하세요"
//     />
    
//     <button
//       style={{
//         width: "100%",
//         lineHeight: 1,
//         padding: "14px",
//         borderRadius: "60px",
//         border: "1px solid var(--color-black)",
//         color: "var(--color-black)",
//         backgroundColor: "var(--color-white)",
//         marginTop: "16px",
//         fontSize: "16px",
//       }}
//     >
//       제출하기
//     </button>
//   </div>
// );

export const QnaLongAnswerSubjective = ({ style }: any) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      textAlign: style?.textAlign || "left",
    }}
  >
    <TextEditor
      onSubmit={() => {}}
      value={"질문을 입력하세요"}
      onClose={() => {}}
      style={{
        lineHeight: 1.6,
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 16,
      }}
    />
    <TextEditor
      onSubmit={() => {}}
      value={"질문을 입력하세요"}
      onClose={() => {}}
      style={{
        lineHeight: 1.6,
        fontSize: "18px",
        fontWeight: 400,
        marginBottom: "10px",
      }}
    />
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
      }}
    >
      {/* 제출하기 */}
      <TextEditor
        onSubmit={() => {}}
        value={"제출하기"}
        onClose={() => {}}
      />
    </button>
  </div>
);
