"use client";

import { useForm } from "react-hook-form";

import { Tag } from "./Tag";
import { useCompanyStore } from "@/hooks/useCompanyStore";
import { usePositionStore } from "@/hooks/usePositionStore";

type Inputs = {
  [key: string]: string;
};

interface InputFormProps {
  field: string;
  placeholder: string;
}

export const InputForm = ({ field, placeholder }: InputFormProps) => {
  const { companies, addCompany, removeCompany } = useCompanyStore();
  const { positions, addPosition, removePosition } = usePositionStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (formData: Inputs) => {
    if (field === "company") {
      addCompany(formData[field]);
    } else {
      addPosition(formData[field]);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-baseline gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <input
            {...register(field, { required: true })}
            id={field}
            placeholder={placeholder}
            className="w-full border border-stone-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
          {errors[field] &&
            (field === "company"
              ? companies.length === 0
              : positions.length === 0) && (
              <span className="text-red-500 text-sm">
                {field} field is required
              </span>
            )}
          <div className="flex gap-2 flex-wrap">
            <label htmlFor={field} className="font-bold">
              {field === "company" ? "Companies: " : "Positions: "}
            </label>
            {field === "company"
              ? companies.map((item) => (
                  <Tag
                    key={item}
                    text={item}
                    onRemove={() => removeCompany(item)}
                  />
                ))
              : positions.map((item) => (
                  <Tag
                    key={item}
                    text={item}
                    onRemove={() => removePosition(item)}
                  />
                ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            !watch(field) &&
            (field === "company" ? companies.length > 0 : positions.length > 0)
          }
        >
          Add
        </button>
      </div>
    </form>
  );
};
