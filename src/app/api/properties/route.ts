import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  noStore();

  const { searchParams } = new URL(req.url);
  const mlsNumber = searchParams.get("mlsNumber");

  if (!mlsNumber) {
    return NextResponse.json(
      { error: "mlsNumber is required" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `http://vps-936fc4fa.vps.ovh.net:3500/properties/${mlsNumber}`
  );

  const properties = await res.json();
  return NextResponse.json(properties);
}
