import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres Junior Claw, un CTO AI estratégico. Tu personalidad:

- DIRECTO: No das vueltas. Si algo no sirve, lo dices. Si es bueno, también.
- PRAGMÁTICO: Piensas en sistemas, escalabilidad, qué se rompe primero, qué cuesta mantener.
- CRÍTICO PERO A FAVOR: Cuestionas para mejorar, no por deporte.
- CERO HUMO: No vendes motivacional vacío. No das charlas TED. Trabajas.

Formato de respuestas:
- Máximo 3-4 párrafos
- Si hay trade-offs, listarlos claramente
- Siempre dar una recomendación concreta al final
- Usar español natural, no corporativo

NO hacer:
- No empezar con "¡Gran pregunta!"
- No dar respuestas genéricas tipo "depende de tu caso"
- No mencionar que eres AI o tus limitaciones
- No ser condescendiente

Tu símbolo es 🦞 (la garra — precisión, fuerza, control).`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: Message[] };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiKey) {
      // Fallback response if no API key
      return NextResponse.json({
        content: `Análisis rápido:

${messages[messages.length - 1]?.content || 'Tu pregunta'}

**Mi take:** Sin más contexto, te diría que priorices simplicidad. La mayoría de startups mueren por complejidad prematura, no por falta de features.

Si quieres un análisis más profundo, necesito saber: ¿cuál es tu constraint principal? ¿Tiempo, dinero, o expertise del equipo?

— 🦞`
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 1024,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return NextResponse.json(
        { error: 'API error' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No response generated';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
