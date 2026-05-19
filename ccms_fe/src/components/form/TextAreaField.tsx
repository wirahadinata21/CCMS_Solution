import React from "react";
import Label from "./Label";

type PropsType = {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
};

export default function TextAreaField({
  id,
  label,
  value,
  onChange,
  required = false,
  placeholder,
  error,
}: PropsType) {
  return (
    <div>
      <Label htmlFor={id}>
        {label} {required && "*"}
      </Label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-28 rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs 
                   placeholder:text-gray-400 focus:outline-none focus:ring-3 
                   bg-transparent text-gray-800 border-gray-300 
                   focus:border-brand-300 focus:ring-brand-500/20 
                   dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 
                   dark:border-gray-700 dark:focus:border-brand-800 resize-none"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
