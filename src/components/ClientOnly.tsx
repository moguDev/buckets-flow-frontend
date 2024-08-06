"use client";
import React from "react";
import { RecoilRoot } from "recoil";

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default ClientOnly;
