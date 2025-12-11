"use client";

import { memo } from "react";
import type { Address } from "../types/shipping";

type Props = {
  title: string;
  address: Address;
  onChange: (key: keyof Address, value: string) => void;
};

export const AddressFields = memo(function AddressFields({
  title,
  address,
  onChange,
}: Props) {
  return (
    <fieldset className="grid grid-cols-1 gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <legend className="text-sm font-semibold text-zinc-800">{title}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          Name
          <input
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-400"
            value={address.name}
            onChange={(e) => onChange("name", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          Company
          <input
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-400"
            value={address.company}
            onChange={(e) => onChange("company", e.target.value)}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-zinc-700">
        Street
        <input
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-400"
          value={address.street1}
          onChange={(e) => onChange("street1", e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-zinc-700">
        Street 2
        <input
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-400"
          value={address.street2}
          onChange={(e) => onChange("street2", e.target.value)}
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          City
          <input
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-400"
            value={address.city}
            onChange={(e) => onChange("city", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          State
          <input
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-400"
            value={address.state}
            onChange={(e) => onChange("state", e.target.value)}
            required
          />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          ZIP
          <input
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-400"
            value={address.zip}
            onChange={(e) => onChange("zip", e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-zinc-700">
          Phone
          <input
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-zinc-400"
            value={address.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </label>
      </div>
    </fieldset>
  );
});

