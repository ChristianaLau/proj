// import axios from 'axios';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//     return;
//   }

//   const { query } = req.body;

//   if (!query) {
//     res.status(400).json({ error: 'Query is required' });
//     return;
//   }

//   try {
//     const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
//       prompt: query,
//       max_tokens: 100
//     }, {
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.status(200).json({ result: response.data.choices[0].text });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }