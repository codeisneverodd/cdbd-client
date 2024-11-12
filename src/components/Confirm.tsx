import Swal from "sweetalert2";
import "animate.css";
import iconClose from "/public/images/icon-close-small.svg";
import Image from "next/image";

export default async function Confirm({ title, text, cancelButton }:{title: string; text:string; cancelButton?: boolean}) {
  return Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      showDenyButton: true,
      showCancelButton: cancelButton || false,
      cancelButtonText: "취소하기",
      confirmButtonText: "확인하기",
      denyButtonText: "취소하기",
      reverseButtons: true,
      showClass: {
          popup: "animate__animated animate__fadeIn animate__faster",
      },
      hideClass: {
          popup: "animate__animated animate__zoomOut animate__faster",
      },
      showCloseButton: true,
      closeButtonHtml: ``
      // backdrop: false
  });
}
