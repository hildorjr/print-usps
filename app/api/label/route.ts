import EasyPost from "@easypost/api";
import { NextRequest, NextResponse } from "next/server";

type AddressInput = {
  name?: string;
  company?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
};

type ParcelInput = {
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
};

const hasAddressFields = (address: AddressInput | undefined) =>
  Boolean(
    address &&
      address.street1 &&
      address.city &&
      address.state &&
      address.zip &&
      address.name
  );

const hasParcelFields = (parcel: ParcelInput | undefined) =>
  Boolean(
    parcel &&
      Number(parcel.weight) > 0 &&
      Number(parcel.length) > 0 &&
      Number(parcel.width) > 0 &&
      Number(parcel.height) > 0
  );

export async function POST(req: NextRequest) {
  if (!process.env.EASYPOST_API_KEY) {
    return NextResponse.json(
      { error: "EASYPOST_API_KEY is missing" },
      { status: 500 }
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { fromAddress, toAddress, parcel } = payload || {};

  if (!hasAddressFields(fromAddress) || !hasAddressFields(toAddress)) {
    return NextResponse.json(
      { error: "From and to addresses require name, street1, city, state, zip" },
      { status: 400 }
    );
  }

  if (!hasParcelFields(parcel)) {
    return NextResponse.json(
      { error: "Parcel requires weight, length, width, height" },
      { status: 400 }
    );
  }

  const api = new EasyPost(process.env.EASYPOST_API_KEY);

  try {
    const shipment = await api.Shipment.create({
      to_address: {
        name: toAddress.name,
        company: toAddress.company,
        street1: toAddress.street1,
        street2: toAddress.street2,
        city: toAddress.city,
        state: toAddress.state,
        zip: toAddress.zip,
        phone: toAddress.phone,
      },
      from_address: {
        name: fromAddress.name,
        company: fromAddress.company,
        street1: fromAddress.street1,
        street2: fromAddress.street2,
        city: fromAddress.city,
        state: fromAddress.state,
        zip: fromAddress.zip,
        phone: fromAddress.phone,
      },
      parcel: {
        weight: Number(parcel.weight),
        length: Number(parcel.length),
        width: Number(parcel.width),
        height: Number(parcel.height),
      },
      options: {
        label_format: "PNG",
        label_size: "4x6",
      },
    });

    const rate = shipment.lowestRate(["USPS"]);
    const purchased = await api.Shipment.buy(shipment.id, rate.id);

    return NextResponse.json({
      trackingCode: purchased.tracking_code,
      labelUrl: purchased.postage_label?.label_url,
      labelBase64: (purchased.postage_label as any)?.label_base64,
      rate: purchased.selected_rate,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create label";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

