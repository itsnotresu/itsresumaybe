export async function handler(event, context) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  const anthropicEndpoint = 'https://api.anthropic.com/v1/messages';

  const userPrompt = JSON.parse(event.body).prompt;

  const response = await fetch(anthropicEndpoint, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [
        { role: 'user', content: userPrompt }
      ]
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}