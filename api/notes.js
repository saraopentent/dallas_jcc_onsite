import { put, head, list } from '@vercel/blob';

const BLOB_KEY = 'jcc-notes.json';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Find the blob by listing with prefix
      const { blobs } = await list({ prefix: BLOB_KEY });
      if (blobs.length === 0) {
        return res.status(200).json({});
      }
      const response = await fetch(blobs[0].url);
      const data = await response.json();
      return res.status(200).json(data);
    } catch {
      return res.status(200).json({});
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      JSON.parse(body); // validate
      await put(BLOB_KEY, body, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      return res.status(200).json({ ok: true });
    } catch {
      return res.status(400).json({ error: 'invalid json' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).end();
}
