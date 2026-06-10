"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput({ name, id, placeholder, required, value, onChange }: { name: string; id: string; placeholder?: string; required?: boolean; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete="new-password"
        placeholder={placeholder}
        className="w-full bg-black border-b-2 border-gray-700 px-0 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300 pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white p-2 transition-colors"
        tabIndex={-1}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}
