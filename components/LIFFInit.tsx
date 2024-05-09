"use client";

import type { Liff } from "@line/liff";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Props {}

export function LIFFInit() {
  const liffID = process.env.NEXT_PUBLIC_LIFF_ID;

  useEffect(() => {
    import("@line/liff")
      .then((liff) => liff.default)
      .then(async (liff) => {
        const response = await liff
          .init({
            liffId: String(liffID),
          })
          .then(async () => {
            if (!liff.isLoggedIn()) {
              liff.login();
            }
            return await liff
              .getProfile()
              .then(async (profile) => {
                return profile;
              })
              .catch((err) => console.log(err));
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
          });

        if (response) {
          console.log(response);
        }
      });
  }, []);

  return <></>;
}
