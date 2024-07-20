import React from "react";

interface inputProps {
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    onchange: (event : React.ChangeEvent<HTMLInputElement>) => void;
}

const Input:React.FC<inputProps> = ({
    placeholder, value, type, disabled, onchange
}) => {
  return (
    <input disabled = {disabled} onChange={onchange} value={value} type={type} placeholder={placeholder} 
        className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white 
        focus:border-sky-500 focus:border-2 transition disbaled:bg-neutral-900 disbaled:opacity-70 disbled:cursor-not-allowed"
    />
  )
}

export default Input