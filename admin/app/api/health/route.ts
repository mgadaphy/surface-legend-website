/** Health check for Docker and uptime monitors: GET /api/health returns 200 while the server runs. */
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ ok: true, service: "surface-legend-admin", time: new Date().toISOString() });
}
