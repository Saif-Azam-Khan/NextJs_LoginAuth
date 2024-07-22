import React from "react";
import Link from "next/link";
import { ILinks } from "@/types";

function Links({ linkTo, text }: ILinks) {
  return <Link href={linkTo}>{text}</Link>;
}

export default Links;
