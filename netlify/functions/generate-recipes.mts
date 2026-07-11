import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const RECIPE_SCHEMA = {
  type: 'object',
  properties: {
    recipes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'unique kebab-case slug' },
          name: { type: 'string' },
          prep: { type: 'string', description: "e.g. '20 min'" },
          reason: { type: 'string', description: '1-2 sentence personalized explanation' },
          ingredients: {
            type: 'array',
            items: { type: 'string' },
            description: '6-10 lowercase ingredient names, no quantities',
          },
          steps: {
            type: 'array',
            items: { type: 'string' },
            description: '3-5 short imperative cooking steps',
          },
        },
        required: ['id', 'name', 'prep', 'reason', 'ingredients', 'steps'],
        additionalProperties: false,
      },
    },
  },
  required: ['recipes'],
  additionalProperties: false,
} as const;

interface RequestBody {
  diet?: string;
  allergies?: string[];
  dishes?: string[];
  goal?: string;
  cookSkill?: string;
  weekdayTime?: string;
  weekendTime?: string;
  pantryItems?: string[];
  count?: number;
  excludeNames?: string[];
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const {
    diet = '',
    allergies = [],
    dishes = [],
    goal = '',
    cookSkill = '',
    weekdayTime = '',
    weekendTime = '',
    pantryItems = [],
    count = 6,
    excludeNames = [],
  } = body;

  const profileLines = [
    diet && `Diet: ${diet}`,
    allergies.length && `Allergies/dislikes to avoid completely: ${allergies.join(', ')}`,
    dishes.length && `Favorite dishes: ${dishes.join(', ')}`,
    goal && `Current goal: ${goal}`,
    cookSkill && `Cooking comfort level: ${cookSkill}`,
    weekdayTime && `Weekday time available: ${weekdayTime}`,
    weekendTime && `Weekend time available: ${weekendTime}`,
    pantryItems.length && `Pantry currently has: ${pantryItems.join(', ')}`,
    excludeNames.length && `Do not repeat these recipe names: ${excludeNames.join(', ')}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4000,
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: RECIPE_SCHEMA },
      },
      system:
        "You are a recipe recommendation engine for a home-cooking app. Generate realistic, home-style recipes tailored exactly to the user's profile. Strictly avoid every listed allergy or dislike — no exceptions. Lean toward their favorite dishes and stated goal where it makes sense. Keep each recipe cookable within their stated time. Vary the recipes across cuisines and cooking styles rather than repeating a theme.",
      messages: [
        {
          role: 'user',
          content: `Generate ${count} recipes for this profile:\n${profileLines || 'No profile info given — assume a general home cook with no restrictions.'}`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return new Response(JSON.stringify({ error: 'No content returned' }), { status: 502 });
    }

    const parsed = JSON.parse(textBlock.text);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Recipe generation failed';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};
