import React, { useState } from "react";

// ─── SVG Icons (no lucide-react) ─────────────────────────────────────────────

export const ChevronDownSVG = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckSVG = ({ className = "" }: { className?: string }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M5 12l5 5L19 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const InfoSVG = ({ className = "" }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M12 8v1M12 11v5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const UploadSVG = ({ className = "" }: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <path
      d="M17 8l-5-5-5 5M12 3v12"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseSVG = ({ className = "" }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const PinSVG = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.75" />
  </svg>
);

export const WarningSVG = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 2L2 20h20L12 2z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M12 9v5M12 16.5v.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Section Header ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  step: number;
  title: string;
  description: string;
}

export function SectionHeader({
  step,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-4 pb-5 mb-6 border-b border-gray-100">
      <div className="w-9 h-9 rounded-xl bg-[#0E292F] flex items-center justify-center shrink-0">
        <span className="text-white text-[13px] font-bold">
          {step.toString().padStart(2, "0")}
        </span>
      </div>
      <div>
        <h2 className="text-[16px] font-bold text-[#0E292F] leading-tight">
          {title}
        </h2>
        <p className="text-[12px] text-gray-400 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

// ─── Label ────────────────────────────────────────────────────────────────────

export function Label({
  children,
  htmlFor,
  required,
  hint,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0E292F] mb-1.5"
    >
      {children}
      {required && <span className="text-red-400">*</span>}
      {hint && (
        <span title={hint} className="text-gray-300 cursor-help">
          <InfoSVG />
        </span>
      )}
    </label>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  prefix?: string;
  suffix?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, prefix, suffix, className = "", ...props }, ref) => (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-gray-400 pointer-events-none select-none">
          {prefix}
        </span>
      )}
      <input
        ref={ref}
        {...props}
        className={`
          w-full bg-gray-50 border ${error ? "border-red-300 bg-red-50/40" : "border-gray-200"}
          rounded-xl px-4 py-3 text-[13px] text-[#0E292F]
          placeholder:text-gray-300 outline-none
          focus:border-[#0E292F] focus:bg-white focus:ring-2 focus:ring-[#0E292F]/8
          transition-all duration-200
          ${prefix ? "pl-8" : ""}
          ${suffix ? "pr-12" : ""}
          ${className}
        `}
      />
      {suffix && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] font-medium text-gray-400 pointer-events-none select-none">
          {suffix}
        </span>
      )}
      {error && (
        <p className="flex items-center gap-1 mt-1 text-[11px] text-red-500">
          <WarningSVG /> {error}
        </p>
      )}
    </div>
  ),
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = "", ...props }, ref) => (
    <div>
      <textarea
        ref={ref}
        {...props}
        className={`
          w-full bg-gray-50 border ${error ? "border-red-300 bg-red-50/40" : "border-gray-200"}
          rounded-xl px-4 py-3 text-[13px] text-[#0E292F]
          placeholder:text-gray-300 outline-none resize-none
          focus:border-[#0E292F] focus:bg-white focus:ring-2 focus:ring-[#0E292F]/8
          transition-all duration-200 min-h-[120px]
          ${className}
        `}
      />
      {error && (
        <p className="flex items-center gap-1 mt-1 text-[11px] text-red-500">
          <WarningSVG /> {error}
        </p>
      )}
    </div>
  ),
);
Textarea.displayName = "Textarea";

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, options, placeholder, className = "", ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        {...props}
        className={`
          w-full bg-gray-50 border ${error ? "border-red-300 bg-red-50/40" : "border-gray-200"}
          rounded-xl px-4 py-3 pr-10 text-[13px] text-[#0E292F]
          outline-none appearance-none cursor-pointer
          focus:border-[#0E292F] focus:bg-white focus:ring-2 focus:ring-[#0E292F]/8
          transition-all duration-200
          ${!props.value ? "text-gray-300" : ""}
          ${className}
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronDownSVG />
      </span>
      {error && (
        <p className="flex items-center gap-1 mt-1 text-[11px] text-red-500">
          <WarningSVG /> {error}
        </p>
      )}
    </div>
  ),
);
Select.displayName = "Select";

// ─── Toggle Switch ────────────────────────────────────────────────────────────

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
}: ToggleProps) {
  return (
    <label
      className={`flex items-center justify-between gap-4 cursor-pointer group ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-[#0E292F] leading-tight">
          {label}
        </p>
        {description && (
          <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative shrink-0 w-11 h-6 rounded-full transition-colors duration-300
          ${checked ? "bg-[#0E292F]" : "bg-gray-200"}
          focus:outline-none focus:ring-2 focus:ring-[#0E292F]/20
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm
            transition-transform duration-300
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </label>
  );
}

// ─── Checkbox Group ───────────────────────────────────────────────────────────

interface CheckboxOption {
  value: string;
  label: string;
  icon?: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function CheckboxGroup({
  options,
  value,
  onChange,
}: CheckboxGroupProps) {
  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((o) => {
        const selected = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => toggle(o.value)}
            className={`
              flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-200
              ${
                selected
                  ? "bg-[#0E292F] border-[#0E292F] text-white"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:border-[#0E292F]/40 hover:bg-[#0E292F]/5"
              }
            `}
          >
            <span
              className={`
                flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors
                ${selected ? "bg-white/20 border-white/40" : "bg-white border-gray-300"}
              `}
            >
              {selected && <CheckSVG className="text-white" />}
            </span>
            {o.icon && <span className="text-base leading-none">{o.icon}</span>}
            <span className="text-[12px] font-medium leading-snug">
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Radio Group ─────────────────────────────────────────────────────────────

interface RadioGroupProps {
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  cols?: 2 | 3 | 4;
}

export function RadioGroup({
  options,
  value,
  onChange,
  cols = 2,
}: RadioGroupProps) {
  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  }[cols];

  return (
    <div className={`grid ${colClass} gap-2`}>
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`
              relative flex flex-col gap-0.5 px-4 py-3 rounded-xl border text-left transition-all duration-200
              ${
                selected
                  ? "bg-[#0E292F] border-[#0E292F] text-white shadow-sm"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:border-[#0E292F]/40 hover:bg-[#0E292F]/4"
              }
            `}
          >
            <span
              className={`text-[13px] font-semibold ${selected ? "text-white" : "text-[#0E292F]"}`}
            >
              {o.label}
            </span>
            {o.description && (
              <span
                className={`text-[11px] ${selected ? "text-white/60" : "text-gray-400"}`}
              >
                {o.description}
              </span>
            )}
            {selected && (
              <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                <CheckSVG className="text-white" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Image Upload Drop Zone ───────────────────────────────────────────────────

interface ImageUploadProps {
  images: string[];
  onAdd: (urls: string[]) => void;
  onRemove: (idx: number) => void;
}

export function ImageUpload({ images, onAdd, onRemove }: ImageUploadProps) {
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    // In a real app — upload to S3/Cloudinary and get back URLs.
    // Here we create local object URLs for visual demo.
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    onAdd(urls);
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`
          flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed cursor-pointer
          transition-all duration-200
          ${
            dragging
              ? "border-[#0E292F] bg-[#0E292F]/5"
              : "border-gray-200 bg-gray-50 hover:border-[#3D7188] hover:bg-[#3D7188]/5"
          }
        `}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dragging ? "bg-[#0E292F]/10" : "bg-gray-100"}`}
        >
          <UploadSVG
            className={dragging ? "text-[#0E292F]" : "text-gray-400"}
          />
        </div>
        <div className="text-center">
          <p className="text-[13px] font-semibold text-[#0E292F]">
            Drop images here or{" "}
            <span className="text-[#3D7188] underline underline-offset-2">
              browse files
            </span>
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            PNG, JPG, WEBP — max 5 MB each. First image becomes the cover.
          </p>
        </div>
      </label>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 text-[9px] font-bold tracking-wider uppercase bg-[#0E292F] text-white px-1.5 py-0.5 rounded-md">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <CloseSVG className="text-gray-700" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Form Row (2-column grid) ─────────────────────────────────────────────────

export function FormRow({
  children,
  cols = 2,
}: {
  children: React.ReactNode;
  cols?: 1 | 2 | 3;
}) {
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
  }[cols];
  return <div className={`grid ${colClass} gap-4`}>{children}</div>;
}

// ─── Form Field wrapper (label + control) ─────────────────────────────────────

export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Label required={required} hint={hint}>
        {label}
      </Label>
      {children}
    </div>
  );
}

// ─── Step Nav Badge ───────────────────────────────────────────────────────────

interface StepBadgeProps {
  steps: { label: string; icon: string }[];
  current: number;
  completed: Set<number>;
  onNavigate: (step: number) => void;
}

export function StepNav({
  steps,
  current,
  completed,
  onNavigate,
}: StepBadgeProps) {
  return (
    <nav className="flex flex-col gap-1">
      {steps.map((s, i) => {
        const done = completed.has(i);
        const active = current === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onNavigate(i)}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200
              ${
                active
                  ? "bg-[#0E292F] text-white shadow-sm"
                  : done
                    ? "text-[#0E292F] hover:bg-gray-100"
                    : "text-gray-400 hover:bg-gray-50"
              }
            `}
          >
            <span
              className={`
                w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[12px] font-bold transition-colors
                ${active ? "bg-white/15" : done ? "bg-[#0E292F] text-white" : "bg-gray-100 text-gray-400"}
              `}
            >
              {done && !active ? (
                <CheckSVG className="text-white w-3 h-3" />
              ) : (
                i + 1
              )}
            </span>
            <div className="min-w-0">
              <p
                className={`text-[12px] font-semibold leading-none ${active ? "text-white" : done ? "text-[#0E292F]" : "text-gray-500"}`}
              >
                {s.label}
              </p>
              <p
                className={`text-[10px] mt-0.5 leading-none ${active ? "text-white/60" : "text-gray-400"}`}
              >
                {s.icon}
              </p>
            </div>
            {done && !active && (
              <span className="ml-auto">
                <CheckSVG className="text-[#3D7188]" />
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

// ─── Price Input (formatted Naira) ────────────────────────────────────────────

interface PriceInputProps {
  value: string;
  onChange: (raw: string) => void;
  currency: "NGN" | "USD";
  error?: string;
  placeholder?: string;
}

export function PriceInput({
  value,
  onChange,
  currency,
  error,
  placeholder = "0",
}: PriceInputProps) {
  const symbol = currency === "NGN" ? "₦" : "$";

  const display = value ? Number(value.replace(/,/g, "")).toLocaleString() : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    onChange(raw);
  };

  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#0E292F] pointer-events-none">
        {symbol}
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        placeholder={placeholder}
        className={`
          w-full bg-gray-50 border ${error ? "border-red-300" : "border-gray-200"}
          rounded-xl pl-8 pr-4 py-3 text-[13px] text-[#0E292F] font-semibold
          placeholder:text-gray-300 placeholder:font-normal outline-none
          focus:border-[#0E292F] focus:bg-white focus:ring-2 focus:ring-[#0E292F]/8
          transition-all duration-200
        `}
      />
      {error && (
        <p className="flex items-center gap-1 mt-1 text-[11px] text-red-500">
          <WarningSVG /> {error}
        </p>
      )}
    </div>
  );
}
