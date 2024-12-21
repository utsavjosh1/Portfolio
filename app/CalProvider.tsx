"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function CalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#3366FF" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return <>{children}</>;
}
