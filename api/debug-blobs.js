import { list } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    const { blobs } = await list();
    return res.status(200).json(blobs.map(b => ({ pathname: b.pathname, url: b.url, downloadUrl: b.downloadUrl })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
