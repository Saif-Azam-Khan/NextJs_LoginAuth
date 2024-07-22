import React , {memo}from "react";
import { IFormButton } from "@/types";

function FormButton({ clickHandler, disabled, text_1, text_2 }: IFormButton) {
  return (
    <button
      onClick={(e)=>clickHandler(e)}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
    >
      {disabled ? text_1 : text_2}
    </button>
  );
}

export default memo(FormButton);
