import { ChevronDown } from "lucide-react";
import React, {
  useState,
  useRef,
  useEffect,
  type MouseEvent,
  type JSX,
} from "react";

interface MultiSelectFieldProps<T> {
  name: keyof T;
  options: string[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  placeholder?: string;
}

export default function MultiSelectField<T extends Record<string, any>>({
  name,
  options,
  formData,
  setFormData,
  placeholder = "Select options...",
}: MultiSelectFieldProps<T>): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedValues = (formData[name] as string[]) || [];

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent | globalThis.MouseEvent,
    ): void {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener,
    );
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener,
      );
  }, []);

  const toggleValue = (value: string): void => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValues,
    }));
  };

  const removeTag = (e: MouseEvent<HTMLButtonElement>, value: string): void => {
    e.stopPropagation();
    setFormData((prev) => ({
      ...prev,
      [name]: selectedValues.filter((item) => item !== value),
    }));
  };

  return (
    <div className="w-full max-w-md font-sans">
      <div ref={containerRef} className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex min-h-10 w-full items-center justify-between py-1.5 duration-200 cursor-pointer px-3.5 border border-[#E5E7EB] rounded-md text-sm text-[#0E292F] placeholder:text-[#9CA3AF] transition-all bg-white font-sans
                                  ${
                                    isOpen
                                      ? "border-[#0E292F] ring-2 ring-[#0E292F]/10"
                                      : "border-gray-300 hover:border-gray-400"
                                  }`}
        >
          <div className="flex flex-wrap gap-1.5 max-w-[90%]">
            {selectedValues.length === 0 ? (
              <span className="text-gray-400 pl-1">{placeholder}</span>
            ) : (
              selectedValues.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center gap-1.5 bg-black text-white text-sm px-3 py-1 rounded-md font-medium"
                >
                  {value}
                  <button
                    type="button"
                    onClick={(e) => removeTag(e, value)}
                    className="text-gray-400 hover:text-white text-xs font-bold pl-0.5"
                  >
                    ✕
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="text-gray-400 flex items-center shrink-0">
            <ChevronDown
              className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            <div className="py-1">
              {options.map((option) => {
                const isChecked = selectedValues.includes(option);
                return (
                  <label
                    key={option}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-sm font-medium
                                            ${isChecked ? "bg-gray-50 text-black" : "hover:bg-gray-50 text-gray-900"}`}
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleValue(option)}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 border border-gray-300 rounded-md bg-white peer-checked:bg-[#9333EA] peer-checked:border-[#9333EA] flex items-center justify-center transition-all">
                        <svg
                          className={`w-3.5 h-3.5 text-white ${isChecked ? "block" : "hidden"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    {option}
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
