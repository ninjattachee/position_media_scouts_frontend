"use client";

import { InputForm } from "./InputForm";

export const InputSection = () => {
  return (
    <div className="flex gap-12 max-md:flex-col max-md:gap-6 w-full">
      <InputForm field="company" placeholder="Enter company name" />
      <InputForm field="position" placeholder="Enter position title" />
    </div>
  );
};
