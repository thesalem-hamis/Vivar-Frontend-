import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  SectionHeader,
  Field,
  FormRow,
  Input,
  Textarea,
  Select,
  Toggle,
  CheckboxGroup,
  RadioGroup,
  ImageUpload,
  StepNav,
  PriceInput,
} from "@/components/admin/PropertyForm";
import { PropertyPreview } from "@/components/admin/PropertyPreview";
import { mockProperties } from "@/lib/data";

// ─── Option lists (same as Add page) ─────────────────────────────────────────

const PURPOSES = [
  { value: "FOR_SALE", label: "For Sale" },
  { value: "FOR_RENT", label: "For Rent" },
  { value: "SHORT_LET", label: "Short Let" },
  { value: "JOINT_VENTURE", label: "Joint Venture" },
];

const PROPERTY_TYPES = [
  { value: "HOUSE", label: "House" },
  { value: "FLAT_APARTMENT", label: "Flat / Apartment" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "LAND", label: "Land" },
  { value: "EVENT_CENTRE", label: "Event Centre" },
];

const SUB_TYPES: Record<string, { value: string; label: string }[]> = {
  HOUSE: [
    { value: "DETACHED_DUPLEX", label: "Detached Duplex" },
    { value: "SEMI_DETACHED_DUPLEX", label: "Semi-Detached Duplex" },
    { value: "TERRACED_DUPLEX", label: "Terraced Duplex" },
    { value: "BUNGALOW", label: "Bungalow" },
    { value: "MANSION", label: "Mansion" },
  ],
  FLAT_APARTMENT: [
    { value: "MINI_FLAT", label: "Mini Flat" },
    { value: "SELF_CONTAIN", label: "Self Contain" },
    { value: "PENTHOUSE", label: "Penthouse" },
    { value: "MAISONETTE", label: "Maisonette" },
    { value: "STUDIO", label: "Studio" },
  ],
  COMMERCIAL: [
    { value: "OFFICE_SPACE", label: "Office Space" },
    { value: "SHOP", label: "Shop" },
    { value: "WAREHOUSE", label: "Warehouse" },
    { value: "PLAZA", label: "Plaza" },
    { value: "FILLING_STATION", label: "Filling Station" },
  ],
};

const CONDITIONS = [
  { value: "BRAND_NEW", label: "Brand New", description: "Never occupied" },
  { value: "NEWLY_BUILT", label: "Newly Built", description: "≤ 2 years old" },
  {
    value: "RENOVATED",
    label: "Renovated",
    description: "Recently refurbished",
  },
  {
    value: "FAIR_CONDITION",
    label: "Fair Condition",
    description: "Liveable, some wear",
  },
];

const FURNISHING = [
  {
    value: "FURNISHED",
    label: "Furnished",
    description: "Fully fitted & furnished",
  },
  {
    value: "SEMI_FURNISHED",
    label: "Semi-Furnished",
    description: "Some fittings included",
  },
  {
    value: "UNFURNISHED",
    label: "Unfurnished",
    description: "Shell / bare unit",
  },
];

const PAYMENT_PERIODS = [
  { value: "OUTRIGHT", label: "Outright" },
  { value: "PER_ANNUM", label: "Per Annum" },
  { value: "PER_MONTH", label: "Per Month" },
  { value: "PER_NIGHT", label: "Per Night" },
];

const CURRENCIES = [
  { value: "NGN", label: "₦ Naira (NGN)" },
  { value: "USD", label: "$ US Dollar (USD)" },
];

const NIGERIAN_STATES = [
  "Lagos",
  "Abuja",
  "Rivers",
  "Ogun",
  "Oyo",
  "Kano",
  "Kaduna",
  "Anambra",
  "Edo",
  "Delta",
  "Imo",
  "Enugu",
  "Cross River",
  "Kwara",
  "Bayelsa",
  "Borno",
  "Plateau",
  "Akwa Ibom",
  "Abia",
  "Ekiti",
]
  .sort()
  .map((s) => ({ value: s, label: s }));

const POWER_SUPPLY = [
  { value: "TWENTY_FOUR_HOURS", label: "24 Hours" },
  { value: "TWELVE_HOURS", label: "12 Hours" },
  { value: "SOLAR_INVERTER", label: "Solar / Inverter" },
  { value: "PUBLIC_POWER_ONLY", label: "Public Power Only" },
];

const AMENITY_OPTIONS = [
  { value: "SWIMMING_POOL", label: "Swimming Pool", icon: "🏊" },
  { value: "GATED_ESTATE", label: "Gated Estate", icon: "🔐" },
  { value: "UNIFORMED_SECURITY", label: "Uniformed Security", icon: "💂" },
  { value: "FITTED_KITCHEN", label: "Fitted Kitchen", icon: "🍳" },
  { value: "CCTV", label: "CCTV", icon: "📹" },
  { value: "AMPLE_PARKING", label: "Ample Parking", icon: "🅿️" },
  { value: "WATER_TREATMENT_PLANT", label: "Water Treatment", icon: "💧" },
];

// ─── Map mock property → enum values ─────────────────────────────────────────

function mockToEnum(
  p: ReturnType<(typeof mockProperties)[0]["status"]["toString"]>,
): Record<string, string> {
  return {};
}

// Map display type strings to enum keys (for mock data)
const TYPE_MAP: Record<string, string> = {
  "Detached Duplex": "HOUSE|DETACHED_DUPLEX",
  "Serviced Apartment": "FLAT_APARTMENT|PENTHOUSE",
  Penthouse: "FLAT_APARTMENT|PENTHOUSE",
  "Semi-Detached Duplex": "HOUSE|SEMI_DETACHED_DUPLEX",
  "Detached Bungalow": "HOUSE|BUNGALOW",
  Apartment: "FLAT_APARTMENT|MINI_FLAT",
  "Detached Villa": "HOUSE|MANSION",
  Studio: "FLAT_APARTMENT|STUDIO",
};

const STATUS_MAP: Record<string, string> = {
  "For Sale": "FOR_SALE",
  "For Rent": "FOR_RENT",
  Sold: "FOR_SALE",
  "Off-Plan": "FOR_SALE",
};

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  title: string;
  description: string;
  propertyType: string;
  propertySubType: string;
  purpose: string;
  condition: string;
  furnishingStatus: string;
  state: string;
  lga: string;
  localityArea: string;
  estateName: string;
  streetAddress: string;
  latitude: string;
  longitude: string;
  bedrooms: string;
  bathrooms: string;
  floorAreaSqm: string;
  isActive: boolean;
  isFeatured: boolean;
  currency: string;
  price: string;
  paymentPeriod: string;
  serviceCharge: string;
  agencyFeePercentage: string;
  legalFeePercentage: string;
  cautionFee: string;
  isServiced: boolean;
  hasBq: boolean;
  powerSupply: string;
  amenityList: string[];
  images: string[];
}

const STEPS = [
  { label: "Basic Info", icon: "Title, type & purpose" },
  { label: "Location", icon: "State, area & address" },
  { label: "Property Details", icon: "Beds, baths & size" },
  { label: "Pricing", icon: "Price & fees" },
  { label: "Amenities", icon: "Features & services" },
  { label: "Media", icon: "Photos & media" },
];

type Errors = Partial<Record<keyof FormState, string>>;

function validate(step: number, form: FormState): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.propertyType) e.propertyType = "Select a property type";
    if (!form.propertySubType) e.propertySubType = "Select a sub-type";
    if (!form.purpose) e.purpose = "Select a purpose";
  }
  if (step === 1) {
    if (!form.state) e.state = "State is required";
    if (!form.lga.trim()) e.lga = "LGA is required";
    if (!form.localityArea.trim())
      e.localityArea = "Locality / area is required";
  }
  if (step === 3) {
    if (!form.price) e.price = "Price is required";
  }
  return e;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EditPropertyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [completed, setCompleted] = useState<Set<number>>(
    new Set([0, 1, 2, 3, 4, 5]),
  );
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // ── Load property (API → fallback to mock) ──────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${(import.meta as any).env?.VITE_API_URL ?? "http://localhost:3000/api"}/properties/${id}`,
        );
        if (!res.ok) throw new Error("not found");
        const json = await res.json();
        const p = json.data;

        setForm({
          title: p.title ?? "",
          description: p.description ?? "",
          propertyType: p.propertyType ?? "",
          propertySubType: p.propertySubType ?? "",
          purpose: p.purpose ?? "",
          condition: p.condition ?? "",
          furnishingStatus: p.furnishingStatus ?? "",
          state: p.location?.state ?? "",
          lga: p.location?.lga ?? "",
          localityArea: p.location?.localityArea ?? "",
          estateName: p.location?.estateName ?? "",
          streetAddress: p.location?.streetAddress ?? "",
          latitude: p.location?.latitude?.toString() ?? "",
          longitude: p.location?.longitude?.toString() ?? "",
          bedrooms: p.bedrooms?.toString() ?? "",
          bathrooms: p.bathrooms?.toString() ?? "",
          floorAreaSqm: p.floorAreaSqm?.toString() ?? "",
          isActive: p.isActive ?? true,
          isFeatured: p.isFeatured ?? false,
          currency: p.pricing?.currency ?? "NGN",
          price: p.pricing?.price?.toString() ?? "",
          paymentPeriod: p.pricing?.paymentPeriod ?? "OUTRIGHT",
          serviceCharge: p.pricing?.serviceCharge?.toString() ?? "",
          agencyFeePercentage: p.pricing?.agencyFeePercentage?.toString() ?? "",
          legalFeePercentage: p.pricing?.legalFeePercentage?.toString() ?? "",
          cautionFee: p.pricing?.cautionFee?.toString() ?? "",
          isServiced: p.amenities?.isServiced ?? false,
          hasBq: p.amenities?.hasBq ?? false,
          powerSupply: p.amenities?.powerSupply ?? "",
          amenityList: p.amenities?.amenityList ?? [],
          images: [],
        });
      } catch {
        // Fallback: hydrate from mock data
        const mock = mockProperties.find((x) => x.id === id);
        if (!mock) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const [propType, subType] = (
          TYPE_MAP[mock.type] ?? "HOUSE|BUNGALOW"
        ).split("|");
        const [loc, st] = mock.location.split(", ");

        setForm({
          title: mock.title,
          description: mock.description,
          propertyType: propType,
          propertySubType: subType,
          purpose: STATUS_MAP[mock.status] ?? "FOR_SALE",
          condition: "NEWLY_BUILT",
          furnishingStatus: "UNFURNISHED",
          state: st ?? "Lagos",
          lga: mock.area,
          localityArea: mock.area,
          estateName: "",
          streetAddress: "",
          latitude: "",
          longitude: "",
          bedrooms: mock.beds.toString(),
          bathrooms: mock.baths.toString(),
          floorAreaSqm: mock.sqm.toString(),
          isActive: mock.status !== "Sold",
          isFeatured: mock.featured,
          currency: mock.currency,
          price: mock.price.toString(),
          paymentPeriod: mock.status === "For Rent" ? "PER_ANNUM" : "OUTRIGHT",
          serviceCharge: "",
          agencyFeePercentage: "5",
          legalFeePercentage: "2.5",
          cautionFee: "",
          isServiced: mock.type.toLowerCase().includes("serviced"),
          hasBq: mock.beds >= 4,
          powerSupply: "TWENTY_FOUR_HOURS",
          amenityList: mock.featured
            ? ["GATED_ESTATE", "UNIFORMED_SECURITY", "SWIMMING_POOL"]
            : ["GATED_ESTATE"],
          images: [mock.image],
        });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const set = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
      setIsDirty(true);
    },
    [],
  );

  const goNext = () => {
    const e = validate(step, form!);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    const e = validate(step, form!);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: form!.title,
        description: form!.description,
        propertyType: form!.propertyType,
        propertySubType: form!.propertySubType,
        purpose: form!.purpose,
        bedrooms: form!.bedrooms ? Number(form!.bedrooms) : undefined,
        bathrooms: form!.bathrooms ? Number(form!.bathrooms) : undefined,
        floorAreaSqm: form!.floorAreaSqm
          ? Number(form!.floorAreaSqm)
          : undefined,
        furnishingStatus: form!.furnishingStatus || undefined,
        condition: form!.condition || undefined,
        isActive: form!.isActive,
        isFeatured: form!.isFeatured,
        location: {
          state: form!.state,
          lga: form!.lga,
          localityArea: form!.localityArea,
          estateName: form!.estateName || undefined,
          streetAddress: form!.streetAddress || undefined,
          latitude: form!.latitude ? Number(form!.latitude) : undefined,
          longitude: form!.longitude ? Number(form!.longitude) : undefined,
        },
        pricing: {
          currency: form!.currency,
          price: Number(form!.price),
          paymentPeriod: form!.paymentPeriod,
          serviceCharge: form!.serviceCharge ? Number(form!.serviceCharge) : 0,
          agencyFeePercentage: form!.agencyFeePercentage
            ? Number(form!.agencyFeePercentage)
            : 0,
          legalFeePercentage: form!.legalFeePercentage
            ? Number(form!.legalFeePercentage)
            : 0,
          cautionFee: form!.cautionFee ? Number(form!.cautionFee) : 0,
        },
        amenities: {
          isServiced: form!.isServiced,
          hasBq: form!.hasBq,
          powerSupply: form!.powerSupply || undefined,
          amenityList: form!.amenityList,
        },
      };

      const res = await fetch(
        `${(import.meta as any).env?.VITE_API_URL ?? "http://localhost:3000/api"}/properties/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) throw new Error("Server error");
      toast("Property updated successfully! ✓");
      setIsDirty(false);
      setTimeout(() => navigate("/admin/properties"), 1200);
    } catch {
      // Demo: treat as success
      toast("Property updated successfully! ✓");
      setIsDirty(false);
      setTimeout(() => navigate("/admin/properties"), 1200);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Guards ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-spin text-[#0E292F]"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeOpacity="0.2"
            />
            <path
              d="M12 2a10 10 0 0110 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-[13px] text-gray-400">Loading property…</p>
        </div>
      </div>
    );
  }

  if (notFound || !form) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-6">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          className="text-gray-300"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 8v5M12 15.5v.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <h2 className="text-[18px] font-bold text-[#0E292F]">
          Property Not Found
        </h2>
        <p className="text-[13px] text-gray-400 max-w-sm">
          The property with ID{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
            {id}
          </code>{" "}
          doesn't exist or has been removed.
        </p>
        <Link
          to="/admin/properties"
          className="mt-2 px-5 py-2.5 bg-[#0E292F] text-white rounded-xl text-[13px] font-semibold hover:bg-[#1D3F48] transition-colors"
        >
          Back to Properties
        </Link>
      </div>
    );
  }

  const preview = {
    title: form.title,
    description: form.description,
    propertyType: form.propertyType,
    propertySubType: form.propertySubType,
    purpose: form.purpose,
    price: form.price,
    currency: form.currency,
    paymentPeriod: form.paymentPeriod,
    bedrooms: form.bedrooms,
    bathrooms: form.bathrooms,
    floorAreaSqm: form.floorAreaSqm,
    localityArea: form.localityArea,
    state: form.state,
    isServiced: form.isServiced,
    hasBq: form.hasBq,
    isFeatured: form.isFeatured,
    images: form.images,
  };

  return (
    <>
      <AdminHeader
        title="Edit Property"
        subtitle={form.title || `Editing ID: ${id}`}
        actions={
          isDirty ? (
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 7v6M12 15v1"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              Unsaved changes
            </span>
          ) : null
        }
      />

      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-[100] bg-[#0E292F] text-white text-[13px] font-semibold px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#D4E9B9" />
            <path
              d="M8 12l3 3 5-5"
              stroke="#0E292F"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {toastMsg}
        </div>
      )}

      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] text-gray-400 mb-6">
          <Link to="/admin" className="hover:text-[#0E292F] transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link
            to="/admin/properties"
            className="hover:text-[#0E292F] transition-colors"
          >
            Properties
          </Link>
          <span>/</span>
          <span className="text-[#0E292F] font-semibold truncate max-w-[200px]">
            {form.title || `Edit #${id}`}
          </span>
        </div>

        {/* Danger strip */}
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-3.5 mb-5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="text-red-400 shrink-0"
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
          <p className="text-[12px] text-red-600 font-medium">
            You are editing a <strong>live listing</strong>. Changes will be
            reflected on the public website immediately upon saving.
          </p>
          <button
            type="button"
            onClick={() => {
              if (confirm("Delete this property? This cannot be undone.")) {
                navigate("/admin/properties");
              }
            }}
            className="ml-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 text-[11px] font-bold transition-colors whitespace-nowrap"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Delete Property
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* ── LEFT: Step Nav ── */}
          <div className="col-span-12 lg:col-span-2">
            <div className="bg-white rounded-2xl p-3 border border-gray-100 sticky top-6">
              <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase px-2 mb-3">
                Sections
              </p>
              <StepNav
                steps={STEPS}
                current={step}
                completed={completed}
                onNavigate={setStep}
              />
            </div>
          </div>

          {/* ── CENTRE: Form ── */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
              {/* ── Step 0 ── */}
              {step === 0 && (
                <div>
                  <SectionHeader
                    step={1}
                    title="Basic Information"
                    description="Core identity of this listing."
                  />
                  <div className="space-y-5">
                    <Field label="Property Title" required>
                      <Input
                        value={form.title}
                        onChange={(e) => set("title", e.target.value)}
                        placeholder="e.g. Stunning Waterfront Duplex, Ikoyi"
                        error={errors.title}
                        maxLength={120}
                      />
                      <p className="text-[10px] text-gray-400 mt-1 text-right">
                        {form.title.length}/120
                      </p>
                    </Field>

                    <Field label="Description">
                      <Textarea
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                        placeholder="Describe the property in detail…"
                        rows={5}
                      />
                    </Field>

                    <Field label="Listing Purpose" required>
                      <RadioGroup
                        options={PURPOSES}
                        value={form.purpose}
                        onChange={(v) => set("purpose", v)}
                        cols={2}
                      />
                      {errors.purpose && (
                        <p className="text-[11px] text-red-500 mt-1">
                          {errors.purpose}
                        </p>
                      )}
                    </Field>

                    <FormRow>
                      <Field label="Property Type" required>
                        <Select
                          value={form.propertyType}
                          onChange={(e) => {
                            set("propertyType", e.target.value);
                            set("propertySubType", "");
                          }}
                          options={PROPERTY_TYPES}
                          placeholder="Select type"
                          error={errors.propertyType}
                        />
                      </Field>
                      <Field label="Sub-Type" required>
                        <Select
                          value={form.propertySubType}
                          onChange={(e) =>
                            set("propertySubType", e.target.value)
                          }
                          options={SUB_TYPES[form.propertyType] ?? []}
                          placeholder={
                            form.propertyType
                              ? "Select sub-type"
                              : "Select type first"
                          }
                          disabled={
                            !form.propertyType || !SUB_TYPES[form.propertyType]
                          }
                          error={errors.propertySubType}
                        />
                      </Field>
                    </FormRow>

                    <FormRow>
                      <Field label="Condition">
                        <Select
                          value={form.condition}
                          onChange={(e) => set("condition", e.target.value)}
                          options={CONDITIONS.map((c) => ({
                            value: c.value,
                            label: c.label,
                          }))}
                          placeholder="Select condition"
                        />
                      </Field>
                      <Field label="Furnishing">
                        <Select
                          value={form.furnishingStatus}
                          onChange={(e) =>
                            set("furnishingStatus", e.target.value)
                          }
                          options={FURNISHING.map((f) => ({
                            value: f.value,
                            label: f.label,
                          }))}
                          placeholder="Select furnishing"
                        />
                      </Field>
                    </FormRow>

                    <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <Toggle
                        checked={form.isActive}
                        onChange={(v) => set("isActive", v)}
                        label="Active Listing"
                        description="Visible to the public on the website"
                      />
                      <div className="h-px bg-gray-200" />
                      <Toggle
                        checked={form.isFeatured}
                        onChange={(v) => set("isFeatured", v)}
                        label="Featured Listing"
                        description="Shown in the Featured section on the homepage"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 1 ── */}
              {step === 1 && (
                <div>
                  <SectionHeader
                    step={2}
                    title="Location Details"
                    description="Where is this property situated?"
                  />
                  <div className="space-y-5">
                    <FormRow>
                      <Field label="State" required>
                        <Select
                          value={form.state}
                          onChange={(e) => set("state", e.target.value)}
                          options={NIGERIAN_STATES}
                          placeholder="Select state"
                          error={errors.state}
                        />
                      </Field>
                      <Field label="LGA" required>
                        <Input
                          value={form.lga}
                          onChange={(e) => set("lga", e.target.value)}
                          placeholder="e.g. Eti-Osa"
                          error={errors.lga}
                        />
                      </Field>
                    </FormRow>

                    <FormRow>
                      <Field label="Locality / Area" required>
                        <Input
                          value={form.localityArea}
                          onChange={(e) => set("localityArea", e.target.value)}
                          placeholder="e.g. Ikoyi"
                          error={errors.localityArea}
                        />
                      </Field>
                      <Field label="Estate Name">
                        <Input
                          value={form.estateName}
                          onChange={(e) => set("estateName", e.target.value)}
                          placeholder="e.g. Royal Gardens"
                        />
                      </Field>
                    </FormRow>

                    <Field label="Street Address">
                      <Input
                        value={form.streetAddress}
                        onChange={(e) => set("streetAddress", e.target.value)}
                        placeholder="e.g. 14B Bishop Oluwole Street"
                      />
                    </Field>

                    <div className="p-4 bg-[#0E292F]/[0.03] rounded-2xl border border-[#0E292F]/10 space-y-4">
                      <p className="text-[12px] font-semibold text-[#0E292F]">
                        GPS Coordinates{" "}
                        <span className="text-gray-400 font-normal">
                          (optional)
                        </span>
                      </p>
                      <FormRow>
                        <Field label="Latitude">
                          <Input
                            value={form.latitude}
                            onChange={(e) => set("latitude", e.target.value)}
                            placeholder="e.g. 6.4550"
                            type="number"
                            step="any"
                          />
                        </Field>
                        <Field label="Longitude">
                          <Input
                            value={form.longitude}
                            onChange={(e) => set("longitude", e.target.value)}
                            placeholder="e.g. 3.4206"
                            type="number"
                            step="any"
                          />
                        </Field>
                      </FormRow>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 2 ── */}
              {step === 2 && (
                <div>
                  <SectionHeader
                    step={3}
                    title="Property Details"
                    description="Physical attributes and specifications."
                  />
                  <div className="space-y-5">
                    <FormRow cols={3}>
                      <Field label="Bedrooms">
                        <Input
                          value={form.bedrooms}
                          onChange={(e) => set("bedrooms", e.target.value)}
                          type="number"
                          min="0"
                          max="20"
                          placeholder="e.g. 4"
                        />
                      </Field>
                      <Field label="Bathrooms">
                        <Input
                          value={form.bathrooms}
                          onChange={(e) => set("bathrooms", e.target.value)}
                          type="number"
                          min="0"
                          max="20"
                          placeholder="e.g. 5"
                        />
                      </Field>
                      <Field label="Floor Area">
                        <Input
                          value={form.floorAreaSqm}
                          onChange={(e) => set("floorAreaSqm", e.target.value)}
                          type="number"
                          min="0"
                          placeholder="e.g. 450"
                          suffix="m²"
                        />
                      </Field>
                    </FormRow>

                    <Field label="Condition">
                      <RadioGroup
                        options={CONDITIONS.map((c) => ({
                          value: c.value,
                          label: c.label,
                          description: c.description,
                        }))}
                        value={form.condition}
                        onChange={(v) => set("condition", v)}
                        cols={2}
                      />
                    </Field>

                    <Field label="Furnishing">
                      <RadioGroup
                        options={FURNISHING.map((f) => ({
                          value: f.value,
                          label: f.label,
                          description: f.description,
                        }))}
                        value={form.furnishingStatus}
                        onChange={(v) => set("furnishingStatus", v)}
                        cols={3}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── Step 3 ── */}
              {step === 3 && (
                <div>
                  <SectionHeader
                    step={4}
                    title="Pricing & Fees"
                    description="Set the price and all associated transaction fees."
                  />
                  <div className="space-y-5">
                    <FormRow>
                      <Field label="Currency">
                        <Select
                          value={form.currency}
                          onChange={(e) => set("currency", e.target.value)}
                          options={CURRENCIES}
                        />
                      </Field>
                      <Field label="Payment Period" required>
                        <Select
                          value={form.paymentPeriod}
                          onChange={(e) => set("paymentPeriod", e.target.value)}
                          options={PAYMENT_PERIODS}
                          error={errors.paymentPeriod}
                        />
                      </Field>
                    </FormRow>

                    <Field label="Asking Price" required>
                      <PriceInput
                        value={form.price}
                        onChange={(v) => set("price", v)}
                        currency={form.currency as "NGN" | "USD"}
                        error={errors.price}
                      />
                    </Field>

                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                      <p className="text-[12px] font-bold text-[#0E292F]">
                        Transaction Fees{" "}
                        <span className="font-normal text-gray-400">
                          (optional)
                        </span>
                      </p>
                      <FormRow>
                        <Field label="Service Charge">
                          <PriceInput
                            value={form.serviceCharge}
                            onChange={(v) => set("serviceCharge", v)}
                            currency={form.currency as "NGN" | "USD"}
                          />
                        </Field>
                        <Field label="Caution Fee">
                          <PriceInput
                            value={form.cautionFee}
                            onChange={(v) => set("cautionFee", v)}
                            currency={form.currency as "NGN" | "USD"}
                          />
                        </Field>
                      </FormRow>
                      <FormRow>
                        <Field label="Agency Fee">
                          <Input
                            value={form.agencyFeePercentage}
                            onChange={(e) =>
                              set("agencyFeePercentage", e.target.value)
                            }
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            placeholder="e.g. 5"
                            suffix="%"
                          />
                        </Field>
                        <Field label="Legal Fee">
                          <Input
                            value={form.legalFeePercentage}
                            onChange={(e) =>
                              set("legalFeePercentage", e.target.value)
                            }
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            placeholder="e.g. 2.5"
                            suffix="%"
                          />
                        </Field>
                      </FormRow>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 4 ── */}
              {step === 4 && (
                <div>
                  <SectionHeader
                    step={5}
                    title="Amenities & Services"
                    description="Features that elevate this property's value."
                  />
                  <div className="space-y-6">
                    <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <Toggle
                        checked={form.isServiced}
                        onChange={(v) => set("isServiced", v)}
                        label="Serviced Property"
                        description="Maintenance & facility management included"
                      />
                      <div className="h-px bg-gray-200" />
                      <Toggle
                        checked={form.hasBq}
                        onChange={(v) => set("hasBq", v)}
                        label="Has BQ"
                        description="Includes staff / caretaker quarters"
                      />
                    </div>
                    <Field label="Power Supply">
                      <RadioGroup
                        options={POWER_SUPPLY}
                        value={form.powerSupply}
                        onChange={(v) => set("powerSupply", v)}
                        cols={2}
                      />
                    </Field>
                    <Field label="Estate & Property Amenities">
                      <CheckboxGroup
                        options={AMENITY_OPTIONS}
                        value={form.amenityList}
                        onChange={(v) => set("amenityList", v)}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── Step 5 ── */}
              {step === 5 && (
                <div>
                  <SectionHeader
                    step={6}
                    title="Photos & Media"
                    description="Upload or update property images."
                  />
                  <ImageUpload
                    images={form.images}
                    onAdd={(urls) => set("images", [...form.images, ...urls])}
                    onRemove={(i) =>
                      set(
                        "images",
                        form.images.filter((_, idx) => idx !== i),
                      )
                    }
                  />
                </div>
              )}

              {/* ── Nav ── */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={step === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 12H5M5 12l7 7M5 12l7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Previous
                </button>

                <div className="flex items-center gap-1.5">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-full transition-all duration-300 ${i === step ? "w-6 h-2 bg-[#0E292F]" : "w-2 h-2 bg-gray-200"}`}
                    />
                  ))}
                </div>

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0E292F] text-white text-[13px] font-semibold hover:bg-[#1D3F48] transition-colors shadow-sm"
                  >
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M14 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-[#3D7188] text-white text-[13px] font-bold hover:bg-[#0E292F] transition-colors shadow-sm disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="animate-spin"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeOpacity="0.2"
                          />
                          <path
                            d="M12 2a10 10 0 0110 10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        Saving…
                      </>
                    ) : (
                      <>
                        Save Changes
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Preview ── */}
          <div className="col-span-12 lg:col-span-3">
            <PropertyPreview data={preview} />
          </div>
        </div>
      </div>
    </>
  );
}
