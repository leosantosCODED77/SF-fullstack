// Cloudflare Pages Function. Only proxies the public submission to the isolated
// intake Worker; never exposes Supabase or the CRM admin API to a visitor.
type Context = {
  request: Request;
  env: { SF_INTAKE_SERVICE?: { fetch(input: Request): Promise<Response> } };
};
export async function onRequestPost(context: Context): Promise<Response> {
  const { request, env } = context;
  if (!env.SF_INTAKE_SERVICE) return Response.json(
    { error: 'Recebimento pelo painel indisponível; utilize o WhatsApp.' },
    { status: 503 },
  );
  const raw = await request.text();
  if (raw.length > 8192) return Response.json({ error: 'Pedido muito grande' }, { status: 413 });
  const response = await env.SF_INTAKE_SERVICE.fetch(
    new Request('https://intake.internal/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': new URL(request.url).origin,
        'CF-Connecting-IP': request.headers.get('CF-Connecting-IP') || '',
      },
      body: raw,
    }),
  );
  return new Response(response.body, {
    status: response.status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
