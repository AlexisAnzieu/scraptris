export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mlsNumber = searchParams.get("mlsNumber");

  if (!mlsNumber) {
    return Response.json({ error: "mlsNumber is required" }, { status: 400 });
  }

  const res = await fetch(
    `http://vps-936fc4fa.vps.ovh.net:3500/properties/${mlsNumber}`
  );

  const properties = await res.json();
  return Response.json(properties);
}
