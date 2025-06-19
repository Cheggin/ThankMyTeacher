// deno-lint-ignore-file no-explicit-any
// @ts-ignore Deno is available at runtime in Supabase Edge Functions
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req: Request) => {
  const { to, subject, message } = await req.json()

  if (!to || !subject || !message) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'reaganhsu123@gmail.com', // Use your verified sender
        to,
        subject,
        html: `<p>${message}</p>`,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      return new Response(JSON.stringify({ success: false, error: data }), { status: 500 })
    }
    return new Response(JSON.stringify({ success: true, data }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: String(error) }), { status: 500 })
  }
})