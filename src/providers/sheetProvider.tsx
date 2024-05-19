"use client";

import EditAccountSheet from "@/features/accounts/components/editAccountSheet";
import  NewAccountSheet  from "@/features/accounts/components/newAccountSheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
 
  const isMounted = useMountedState();
  if (!isMounted) return null;

  return (
    <>
      <EditAccountSheet />
      <NewAccountSheet />
    </>
  )
}

