"use client";

import { usePathname } from "next/navigation";
import ContactForm from "../ContactForm";

export default function ClientContact() {
  const path = usePathname();

  if (path !== "/contact") {
    return <ContactForm />;
  }

  return null;
}
