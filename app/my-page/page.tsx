import { redirect } from "next/navigation";
import { MY_PAGE_ROOT_PATH } from "@/lib/auth";

export default function LegacyMyPageRedirect() {
  redirect(MY_PAGE_ROOT_PATH);
}
