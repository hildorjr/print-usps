"use client";

import { useState, useCallback, useMemo, type Dispatch, type SetStateAction } from "react";
import { AddressFields, ParcelFields } from "./components";
import type { Address, Parcel } from "./types/shipping";

export const emptyAddress: Address = {
  name: "",
  company: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

export const defaultParcel: Parcel = {
  weight: "16",
  length: "10",
  width: "8",
  height: "4",
};

export const sampleFrom: Address = {
  name: "John Sender",
  company: "Acme Corp",
  street1: "388 Townsend St",
  street2: "Apt 20",
  city: "San Francisco",
  state: "CA",
  zip: "94107",
  phone: "4155551234",
};

export const sampleTo: Address = {
  name: "Jane Receiver",
  company: "Receiver LLC",
  street1: "30 Rockefeller Plz",
  street2: "Suite 45",
  city: "New York",
  state: "NY",
  zip: "10112",
  phone: "2125559876",
};

export const sampleParcel: Parcel = {
  weight: "24",
  length: "12",
  width: "9",
  height: "6",
};

export default function Home() {
  const [from, setFrom] = useState<Address>(emptyAddress);
  const [to, setTo] = useState<Address>(emptyAddress);
  const [parcel, setParcel] = useState<Parcel>(defaultParcel);
  const [labelUrl, setLabelUrl] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFromChange = useCallback(
    (key: keyof Address, value: string) =>
      setFrom((prev) => ({ ...prev, [key]: value })),
    []
  );

  const handleToChange = useCallback(
    (key: keyof Address, value: string) =>
      setTo((prev) => ({ ...prev, [key]: value })),
    []
  );

  const handleParcelChange = useCallback(
    (key: keyof Parcel, value: string) =>
      setParcel((prev) => ({ ...prev, [key]: value })),
    []
  );

  const fillSample = useCallback(() => {
    setFrom(sampleFrom);
    setTo(sampleTo);
    setParcel(sampleParcel);
    setError("");
    setLabelUrl("");
    setTrackingCode("");
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setError("");
      setLabelUrl("");
      setTrackingCode("");
      setLoading(true);

      const response = await fetch("/api/label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromAddress: from,
          toAddress: to,
          parcel: {
            weight: Number(parcel.weight),
            length: Number(parcel.length),
            width: Number(parcel.width),
            height: Number(parcel.height),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Unable to create label");
        setLoading(false);
        return;
      }

      setLabelUrl(data.labelUrl || "");
      setTrackingCode(data.trackingCode || "");
      setLoading(false);
    },
    [from, to, parcel]
  );

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 px-6 py-10 font-sans text-zinc-900">
      <main className="flex w-full max-w-4xl flex-col gap-8 rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-zinc-600">USPS label</p>
          <h1 className="text-3xl font-semibold text-zinc-900">
            Generate a shipping label
          </h1>
          <p className="text-sm text-zinc-600">
            Enter the addresses and parcel details to purchase a USPS label via
            EasyPost.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-zinc-600">Use the sample data to test quickly.</div>
          <button
            type="button"
            onClick={fillSample}
            className="cursor-pointer rounded-xl border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400"
          >
            Prefill sample data
          </button>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 lg:grid-cols-2">
            <AddressFields
              title="From address"
              address={from}
              onChange={handleFromChange}
            />
            <AddressFields
              title="Destination address"
              address={to}
              onChange={handleToChange}
            />
          </div>

          <ParcelFields parcel={parcel} onChange={handleParcelChange} />

          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
            >
              {loading ? "Purchasing label..." : "Create USPS label"}
            </button>
            {trackingCode ? (
              <div className="text-sm font-medium text-emerald-700">
                Tracking {trackingCode}
              </div>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {error}
            </div>
          ) : null}

          {labelUrl ? (
            <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-zinc-800">
                Label ready
              </div>
              <a
                href={labelUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-zinc-900 underline"
              >
                Download label
              </a>
              <img
                src={labelUrl}
                alt="USPS label"
                className="w-full max-w-xs rounded-lg border border-zinc-200 bg-white"
              />
            </div>
          ) : null}
        </form>
      </main>
    </div>
  );
}
