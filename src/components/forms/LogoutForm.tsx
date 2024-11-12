"use client";
import React from "react";
import LoadingFormButton from "../buttons/LoadingFormButton";
import { useFormState } from "react-dom";
import { logout } from "@/actions/logoutAction";

type Props = {};

const initialState = {
  error: "",
  message: "",
};

export default function LogoutForm({}: Props) {
  const [state, logoutAction] = useFormState(logout, initialState);

  return (
    <form
      action={logoutAction}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <LoadingFormButton
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </LoadingFormButton>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
