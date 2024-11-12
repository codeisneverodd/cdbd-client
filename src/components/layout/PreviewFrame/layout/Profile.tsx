import styles from "../styles.module.scss";

// import { ButtonSecondary } from "@/components/Buttons";
import Image from "next/image";

const iconProfileDefault = "/images/icon-profile-default.svg";
import iconProfileBadge from "/public/images/profile-badge.svg";
const iconProfileMan = "/images/profile-man.svg";
import sampleImage from "/public/images/sample-image.jpg";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import { showModal } from "@/redux/features/Modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export const ProfileDefaultDefault = ({
  style,
  id,
}: {
  style: any;
  id?: string;
}) => {
  const {
    borderRadius,
    profilePoster,
    profileImage,
    textAlign,
    structure,
    fontFamily,
    fontWeight,
    textDecoration,
    color,
    nameFontSize,
    descriptionFontSize,
    aspectRatio,
    size
  } = style;
  const dispatch = useAppDispatch();

  const handlePosterImageUpload = (e: any) => {
    e.stopPropagation();
    dispatch(
      showModal({
        modalType: "addImage",
        fieldToSet: "profilePoster",
        forBlockId: id,
      })
    );
  };

  const handleProfileImageUpload = (e: any) => {
    e.stopPropagation();
    dispatch(
      showModal({
        modalType: "addImage",
        fieldToSet: "profileImage",
        forBlockId: id,
      })
    );
  };

  const extensions = [StarterKit.configure({})];

  const handleNameUpdate = (newContent: any) => {
    dispatch(
      changeStyle({
        id,
        style: {
          ...style,
          name: newContent,
        },
      })
    );
  };

  const handleDescriptionUpdate = (newContent: any) => {
    dispatch(
      changeStyle({
        id,
        style: {
          ...style,
          description: newContent,
        },
      })
    );
  };

  return (
    <>
      {structure?.includes("poster") && (
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", // option: size
            height: "auto",
            aspectRatio: "16/9", // option: ratio
            objectFit: "cover",
            borderRadius: 0, // option: corner
            ...(profilePoster
              ? {
                  backgroundImage: `url(${profilePoster})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { background: "var(--color-grey-50)" }),
            overflow: "hidden",
          }}
          onClick={handlePosterImageUpload}
        >
          {!profilePoster && (
            <ButtonSecondary onClick={handlePosterImageUpload}>
              이미지 업로드하기
            </ButtonSecondary>
          )}
        </div>
      )}
      <div
        style={{
          marginTop:
            structure.includes("poster") && structure.includes("profile")
              ? "-52px"
              : "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // gap: "16px",
          width: "100%",
          position: "relative",
        }}
      >
        {structure.includes("profile") && (
          <>
            <div
              style={{
                cursor: "pointer",
                position: "relative",
                // overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: size ? (size+"%"):100,
                maxHeight: size ? (size+"%"):100,
                // borderRadius: "50%",
                marginBottom: "16px,",
                aspectRatio
              }}
              onClick={handleProfileImageUpload}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profileImage ?? iconProfileDefault}
                className="object-cover h-full w-full"
                style={borderRadius!==undefined ? { borderRadius: `${borderRadius}px` } : { borderRadius: "9999px"}}
                alt="iconProfileDefault"
              />

              <span
                style={{
                  position: "absolute",
                  right: "-8px",
                  bottom: 0,
                }}
              >
                <Image src={iconProfileBadge} alt="iconProfileBadge" />
              </span>
            </div>
          </>
        )}

        {structure.includes("name") && (
          <p
            className="mt-4 mb-1"
            style={{
              fontSize: nameFontSize??"24px",
              lineHeight: 1.4,
              // fontWeight: 700,
              textAlign,
              fontFamily,
              fontWeight: fontWeight ?? 700,
              textDecoration,
              color
            }}
          >
            <EditorProvider
              // slotBefore={<></>}
              immediatelyRender={false}
              extensions={extensions}
              content={style.name}
              // onUpdate={(v) => {console.log("sadfasdfsad",v.editor.getText())}}
              onBlur={(v) => {
                handleNameUpdate(v.editor.getText());
              }}
            />
          </p>
        )}
        {structure.includes("description") && (
          <p
            style={{
              fontSize: descriptionFontSize??"18px",
              lineHeight: 1.4,
              fontWeight: fontWeight ?? 700,
              textAlign,
              fontFamily,
              textDecoration,
              color
            }}
          >
            <EditorProvider
              // slotBefore={<></>}
              immediatelyRender={false}
              extensions={extensions}
              content={style.description}
              // onUpdate={(v) => {console.log("sadfasdfsad",v.editor.getText())}}
              onBlur={(v) => {
                handleDescriptionUpdate(v.editor.getHTML());
              }}
            />
          </p>
        )}
      </div>
    </>
  );
};

// export const ProfileDefault = () => (
//   <>
//     <div
//       className={styles.editable}
//       style={{
//         position: "relative",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%", // option: size
//         height: "auto",
//         aspectRatio: "16/9", // option: ratio
//         objectFit: "cover",
//         borderRadius: 0, // option: corner
//         backgroundColor: "var(--color-grey-50)",
//         overflow: "hidden",
//       }}
//     >
//       <ButtonSecondary>이미지 업로드하기</ButtonSecondary>
//       <Image
//         style={{
//           position: "absolute",
//           display: "block",
//           width: "100%",
//           height: "auto",
//         }}
//         src={sampleImage}
//         alt="sampleImage"
//       />
//     </div>
//     <div
//       style={{
//         marginTop: "-52px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "16px",
//         width: "100%",
//         position: "relative",
//       }}
//     >
//       <div
//         style={{
//           position: "relative",
//         }}
//       >
//         <div
//           className={styles.editable}
//           style={{
//             cursor: "pointer",

//             overflow: "hidden",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100px",
//             height: "100px",
//             borderRadius: "50%",
//             marginBottom: "16px,",
//           }}
//         >
//           <Image src={sampleImage} alt="sampleImage" />
//         </div>
//         <span
//           style={{
//             position: "absolute",
//             right: "-8px",
//             bottom: 0,
//           }}
//         >
//           <Image src={iconProfileBadge} alt="iconProfileBadge" />
//         </span>
//       </div>

//       <p
//         style={{
//           fontSize: "24px",
//           lineHeight: 1.4,
//           fontWeight: 700,
//           textAlign: "center",
//         }}
//       >
//         이름
//       </p>
//       <p
//         style={{
//           fontSize: "18px",
//           lineHeight: 1.4,
//           fontWeight: 700,
//           textAlign: "center",
//         }}
//       >
//         간단한 소개글을
//         <br />
//         입력해 보세요
//       </p>
//     </div>
//   </>
// );

export const ProfileCoverDefault = ({
  style,
  id,
}: {
  style: any;
  id?: string;
}) => {
  const {
    borderRadius,
    profilePoster,
    profileImage,
    textAlign,
    structure,
    fontFamily,
    fontWeight,
    textDecoration,
    color,
    nameFontSize,
    descriptionFontSize,
    aspectRatio,
    size
  } = style;
  const dispatch = useAppDispatch();

  const handlePosterImageUpload = (e: any) => {
    e.stopPropagation();
    dispatch(
      showModal({
        modalType: "addImage",
        fieldToSet: "profilePoster",
        forBlockId: id,
      })
    );
  };

  const handleProfileImageUpload = (e: any) => {
    e.stopPropagation();
    dispatch(
      showModal({
        modalType: "addImage",
        fieldToSet: "profileImage",
        forBlockId: id,
      })
    );
  };

  const extensions = [StarterKit.configure({})];

  const handleNameUpdate = (newContent: any) => {
    dispatch(
      changeStyle({
        id,
        style: {
          ...style,
          name: newContent,
        },
      })
    );
  };

  const handleDescriptionUpdate = (newContent: any) => {
    dispatch(
      changeStyle({
        id,
        style: {
          ...style,
          description: newContent,
        },
      })
    );
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // option: size
        height: "auto",
        aspectRatio: "1/1", // option: ratio
        objectFit: "cover",
        borderRadius: 0, // option: corner
        ...(profilePoster
          ? {
              backgroundImage: `url(${profilePoster})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { background: "var(--color-grey-50)" }),
        overflow: "hidden",
        boxShadow: "inset 0px 185px 66px -55px rgba(0, 0, 0, 0.5)", // inner shadow
        ...(structure.includes("poster")
          ? {}
          : { background: "transparent", boxShadow: "none" }),
      }}
      onClick={
        structure.includes("poster") ? handlePosterImageUpload : undefined
      }
    >
      {!profilePoster && (
        <ButtonSecondary
          style={{ zIndex: 20 }}
          onClick={handlePosterImageUpload}
        >
          이미지 업로드하기
        </ButtonSecondary>
      )}

      {structure.includes("profile") && (
        <>
          <span
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
            }}
          >
            <Image src={iconProfileBadge} alt="iconProfileBadge" />
          </span>

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: size ? (size+"%"):100,
              maxHeight: size ? (size+"%"):100,
              aspectRatio
            }}
            onClick={handleProfileImageUpload}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="object-cover h-full w-full"
              src={profileImage ?? iconProfileMan}
              style={borderRadius!==undefined ? { borderRadius: `${borderRadius}px` } : { borderRadius: 0}}
              alt="iconProfileDefault"
            />
          </div>
        </>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "6px",
          left: "50%",
          transform: "translate(-50%, 0)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // gap: "16px",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {structure.includes("name") && (
          <p
            // className="mt-2"
            style={{
              fontSize: nameFontSize??"24px",
              lineHeight: 1.4,
              fontWeight: fontWeight ?? 700,
              textAlign,
              fontFamily,
              textDecoration,
              color
            }}
          >
            <EditorProvider
              // slotBefore={<></>}
              immediatelyRender={false}
              extensions={extensions}
              content={style.name}
              // onUpdate={(v) => {console.log("sadfasdfsad",v.editor.getText())}}
              onBlur={(v) => {
                handleNameUpdate(v.editor.getText());
              }}
            />
            {/* 이름 */}
          </p>
        )}
        {structure.includes("description") && (
          <p
            style={{
              fontSize: descriptionFontSize??"18px",
              lineHeight: 1.4,
              fontWeight: fontWeight ?? 700,
              textAlign,
              fontFamily,
              textDecoration,
              color
            }}
          >
            <EditorProvider
              // slotBefore={<></>}
              immediatelyRender={false}
              extensions={extensions}
              content={style.description}
              // onUpdate={(v) => {console.log("sadfasdfsad",v.editor.getText())}}
              onBlur={(v) => {
                handleDescriptionUpdate(v.editor.getHTML());
              }}
            />
            {/* 간단한 소개글을
        <br />
        입력해 보세요 */}
          </p>
        )}
      </div>
    </div>
  );
};

// export const ProfileCover = () => (
//   <div
//     className={styles.editable}
//     style={{
//       position: "relative",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       width: "100%", // option: size
//       height: "auto",
//       aspectRatio: "1/1", // option: ratio
//       objectFit: "cover",
//       borderRadius: 0, // option: corner
//       background:
//         "linear-gradient(180deg, rgba(204,207,209,1) 0%, rgba(249,249,249,1) 100%)",
//       overflow: "hidden",
//     }}
//   >
//     {/* <ButtonSecondary style={{ zIndex: 20 }}>
//       이미지 업로드하기
//     </ButtonSecondary> */}
//     <Image
//       style={{
//         position: "absolute",
//         display: "block",
//         width: "100%",
//         height: "auto",
//       }}
//       src={sampleImage}
//       alt="sampleImage"
//     />

//     <span
//       style={{
//         position: "absolute",
//         top: "24px",
//         right: "24px",
//       }}
//     >
//       <Image src={iconProfileBadge} alt="iconProfileBadge" />
//     </span>

//     <div
//       style={{
//         position: "absolute",
//         bottom: "6px",
//         left: "50%",
//         transform: "translate(-50%, 0)",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "16px",
//         width: "100%",
//       }}
//     >
//       <p
//         style={{
//           fontSize: "24px",
//           lineHeight: 1.4,
//           fontWeight: 700,
//           textAlign: "center",
//         }}
//       >
//         이름
//       </p>
//       <p
//         style={{
//           fontSize: "18px",
//           lineHeight: 1.4,
//           fontWeight: 700,
//           textAlign: "center",
//         }}
//       >
//         간단한 소개글을
//         <br />
//         입력해 보세요
//       </p>
//     </div>
//   </div>
// );

export const ProfileNamecardDefault = ({
  style,
  id,
}: {
  style: any;
  id?: string;
}) => {
  const {
    borderRadius,
    profilePoster,
    profileImage,
    textAlign,
    structure,
    fontFamily,
    fontWeight,
    textDecoration,
    color,
    nameFontSize,
    descriptionFontSize,
    aspectRatio,
    size
  } = style;
  const dispatch = useAppDispatch();

  const handlePosterImageUpload = (e: any) => {
    e.stopPropagation();
    dispatch(
      showModal({
        modalType: "addImage",
        fieldToSet: "profilePoster",
        forBlockId: id,
      })
    );
  };

  const handleProfileImageUpload = (e: any) => {
    e.stopPropagation();
    dispatch(
      showModal({
        modalType: "addImage",
        fieldToSet: "profileImage",
        forBlockId: id,
      })
    );
  };

  const extensions = [StarterKit.configure({})];

  const handleNameUpdate = (newContent: any) => {
    dispatch(
      changeStyle({
        id,
        style: {
          ...style,
          name: newContent,
        },
      })
    );
  };

  const handleDescriptionUpdate = (newContent: any) => {
    dispatch(
      changeStyle({
        id,
        style: {
          ...style,
          description: newContent,
        },
      })
    );
  };

  return (
    <>
      {structure.includes("poster") && (
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", // option: size
            height: "auto",
            aspectRatio: "16/9", // option: ratio
            objectFit: "cover",
            borderRadius: 0, // option: corner
            ...(profilePoster
              ? {
                  backgroundImage: `url(${profilePoster})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { background: "var(--color-grey-50)" }),
            overflow: "hidden",
          }}
          onClick={handlePosterImageUpload}
        >
          {!profilePoster && (
            <ButtonSecondary onClick={handlePosterImageUpload}>
              이미지 업로드하기
            </ButtonSecondary>
          )}
        </div>
      )}
      <div
        style={{
          marginTop: structure.includes("poster") ? "-52px" : "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0 24px",
          gap: "16px",
          width: "100%",
          position: "relative",
        }}
      >
        {structure.includes("profile") && (
          <>
            <div
              style={{
                cursor: "pointer",
                position: "relative",
                // overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: size ? (size+"%"):100,
                maxHeight: size ? (size+"%"):100,
                // borderRadius: "50%",
                marginBottom: "16px,",
                aspectRatio
              }}
              onClick={handleProfileImageUpload}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profileImage ?? iconProfileDefault}
                alt="iconProfileDefault"
                className="object-cover h-full w-full"
                style={borderRadius!==undefined ? { borderRadius: `${borderRadius}px` } : { borderRadius: "9999px"}}
              />
              <span
                style={{
                  position: "absolute",
                  right: "-8px",
                  bottom: 0,
                }}
              >
                <Image src={iconProfileBadge} alt="iconProfileBadge" />
              </span>
            </div>
          </>
        )}

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            // gap: "20px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {structure.includes("name") && (
            <p
              // className="mt-2"
              style={{
                fontSize: nameFontSize??"20px",
                lineHeight: 1.4,
                fontWeight: fontWeight ?? 700,
                textAlign,
                fontFamily,
                textDecoration,
                color
              }}
            >
              <EditorProvider
                // slotBefore={<></>}
                immediatelyRender={false}
                extensions={extensions}
                content={style.name}
                // onUpdate={(v) => {console.log("sadfasdfsad",v.editor.getText())}}
                onBlur={(v) => {
                  handleNameUpdate(v.editor.getText());
                }}
              />
              {/* 이름 */}
            </p>
          )}
          {structure.includes("description") && (
            <p
              style={{
                fontSize: descriptionFontSize??"18px",
                lineHeight: 1.4,
                fontWeight: fontWeight ?? 700,
                textAlign,
                fontFamily,
                textDecoration,
                color
              }}
            >
              <EditorProvider
                // slotBefore={<></>}
                immediatelyRender={false}
                extensions={extensions}
                content={style.description}
                // onUpdate={(v) => {console.log("sadfasdfsad",v.editor.getText())}}
                onBlur={(v) => {
                  handleDescriptionUpdate(v.editor.getHTML());
                }}
              />
              {/* 간단한 소개글을
          <br />
          입력해 보세요 */}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

// export const ProfileNamecard = () => (
//   <>
//     <div
//       className={styles.editable}
//       style={{
//         position: "relative",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%", // option: size
//         height: "auto",
//         aspectRatio: "16/9", // option: ratio
//         objectFit: "cover",
//         borderRadius: 0, // option: corner
//         backgroundColor: "var(--color-grey-50)",
//         overflow: "hidden",
//       }}
//     >
//       {/* <ButtonSecondary>이미지 업로드하기</ButtonSecondary> */}

//       <Image
//         style={{
//           position: "absolute",
//           display: "block",
//           width: "100%",
//           height: "auto",
//         }}
//         src={sampleImage}
//         alt="sampleImage"
//       />
//     </div>
//     <div
//       style={{
//         marginTop: "-52px",
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "flex-start",
//         alignItems: "flex-start",
//         padding: "0 24px",
//         gap: "16px",
//         width: "100%",
//         position: "relative",
//       }}
//     >
//       <div
//         style={{
//           position: "relative",
//         }}
//       >
//         <div
//           className={styles.editable}
//           style={{
//             cursor: "pointer",

//             overflow: "hidden",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100px",
//             height: "100px",
//             borderRadius: "50%",
//             marginBottom: "16px,",
//           }}
//         >
//           <Image src={sampleImage} alt="sampleImage" />
//         </div>
//         <span
//           style={{
//             position: "absolute",
//             right: "-8px",
//             bottom: 0,
//           }}
//         >
//           <Image src={iconProfileBadge} alt="iconProfileBadge" />
//         </span>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "20px",
//         }}
//       >
//         <p
//           style={{
//             fontSize: "20px",
//             lineHeight: 1.4,
//             fontWeight: 700,
//             textAlign: "left",
//           }}
//         >
//           이름
//         </p>
//         <p
//           style={{
//             fontSize: "14px",
//             lineHeight: 1.4,
//             fontWeight: 700,
//             textAlign: "left",
//           }}
//         >
//           간단한 소개글을
//           <br />
//           입력해 보세요
//         </p>
//       </div>
//     </div>
//   </>
// );
