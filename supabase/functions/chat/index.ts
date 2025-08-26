// deno-lint-ignore-file no-explicit-any
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 });
  }

  try {
    const { lesson_id, transcript, user_id } = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_KEY')!;
    const sb = createClient(supabaseUrl, serviceKey);

    let feedback = `Thanks! I heard: "${transcript}". Try to pronounce numbers clearly and steadily. Say them one by one: one, two, three...`;

    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (openaiKey && typeof transcript === 'string' && transcript.length > 0) {
      const system = `You are a friendly language coach helping a learner practice English numbers 1-10. Give short, encouraging feedback on their pronunciation and correctness. If they miss numbers, suggest the correct form.`;
      const payload = {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: `Learner said: ${transcript}` },
        ],
        temperature: 0.4,
      };
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (resp.ok) {
        const data = await resp.json();
        feedback = data.choices?.[0]?.message?.content?.trim() || feedback;
      }
    }

    // Store conversation
    await sb.from('conversations').insert({
      user_id,
      lesson_id,
      user_input: transcript,
      model_response: feedback,
    });

    return new Response(JSON.stringify({ feedback }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
