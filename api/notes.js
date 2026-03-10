import { put, list } from '@vercel/blob';

const BLOB_KEY = 'jcc-notes.json';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: BLOB_KEY });
      if (blobs.length === 0) {
        return res.status(200).json({});
      }
      const blob = blobs[0];
      const fetchUrl = blob.downloadUrl || blob.url;
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        return res.status(200).json({});
      }
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(200).json({ _debug: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      await put(BLOB_KEY, body, {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).end();
}
