"use client";

import { memo } from "react";
import type { Parcel } from "../types/shipping";

type Props = {
  parcel: Parcel;
  onChange: (key: keyof Parcel, value: string) => void;
};

export const ParcelFields = memo(function ParcelFields({
  parcel,
  onChange,
}: Props) {
  const fields = [
    { key: "weight", label: "Weight (oz)" },
    { key: "length", label: "Length" },
    { key: "width", label: "Width" },
    { key: "height", label: "Height" },
  ] as const;

  return (
    <fieldset className="grid grid-cols-2 gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:grid-cols-4">
      <legend className="text-sm font-semibold text-zinc-800">
        Parcel (oz, inches)
      </legend>
      {fields.map((field) => (
        <label
          key={field.key}
          className="flex flex-col gap-1 text-sm text-zinc-700"
        >
          {field.label}
          <input
            type="number"
            min="0"
            step="any"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-400"
            value={parcel[field.key]}
            onChange={(e) => onChange(field.key, e.target.value)}
            required
          />
        </label>
      ))}
    </fieldset>
  );
});

