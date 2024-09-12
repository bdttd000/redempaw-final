"use client";

import React from "react";
import { makeStore } from "@/lib/redux/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";
import { useEffect, useRef } from "react";

export function StoreProvider({ children }) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current !== null) {
      return setupListeners(storeRef.current.dispatch);
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
