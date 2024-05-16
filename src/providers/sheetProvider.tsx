"use client";

import  NewAccountSheet  from "@/features/accounts/components/newAccountSheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
 
  const isMounted = useMountedState();
  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
    </>
  )
}

