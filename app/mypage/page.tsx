"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  buildLoginPath,
  getAuthSession,
  getMyPagePathByRole,
  MY_PAGE_ROOT_PATH,
} from "@/lib/auth";

export default function MyPageRouter() {
  const router = useRouter();

  useEffect(() => {
    const authSession = getAuthSession();

    if (!authSession) {
      router.replace(buildLoginPath(MY_PAGE_ROOT_PATH));
      return;
    }

    router.replace(getMyPagePathByRole(authSession.user.userRole));
  }, [router]);

  return null;
}
