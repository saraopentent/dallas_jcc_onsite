#!/usr/bin/env node

/**
 * Miro Board Export Script
 * Extracts all items, connectors, and comments from a Miro board.
 *
 * Usage: node scripts/export-miro.js <API_TOKEN> [BOARD_ID]
 * Default board ID: uXjVGTurZa8=
 */

const API_BASE = 'https://api.miro.com/v2';
const DEFAULT_BOARD_ID = 'uXjVGTurZa8=';

const token = process.argv[2];
const boardId = process.argv[3] || DEFAULT_BOARD_ID;

if (!token) {
  console.error('Usage: node scripts/export-miro.js <API_TOKEN> [BOARD_ID]');
  console.error('Get your token at: https://miro.com/app/settings/user-profile/apps');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
};

async function fetchPaginated(url) {
  const allItems = [];
  let cursor = null;

  do {
    const separator = url.includes('?') ? '&' : '?';
    const pageUrl = cursor ? `${url}${separator}cursor=${cursor}&limit=50` : `${url}${separator}limit=50`;
    const res = await fetch(pageUrl, { headers });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error ${res.status} for ${url}: ${text}`);
    }

    const json = await res.json();
    allItems.push(...(json.data || []));
    cursor = json.cursor || null;

    // Rate limiting: Miro allows ~100 req/min
    await new Promise(r => setTimeout(r, 200));
  } while (cursor);

  return allItems;
}

async function fetchItemComments(itemId) {
  try {
    const url = `${API_BASE}/boards/${boardId}/items/${itemId}/comments`;
    const res = await fetch(url, { headers });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).map(c => ({
      id: c.id,
      text: c.data?.content || c.content || '',
      author: c.createdBy?.name || 'Unknown',
      createdAt: c.createdAt || c.created_at,
      itemId,
    }));
  } catch {
    return [];
  }
}

async function main() {
  console.log(`Exporting board: ${boardId}`);

  // 1. Fetch all board items
  console.log('Fetching board items...');
  const items = await fetchPaginated(`${API_BASE}/boards/${boardId}/items`);
  console.log(`  Found ${items.length} items`);

  // 2. Fetch board-level comments
  console.log('Fetching board comments...');
  let boardComments = [];
  try {
    const res = await fetch(`${API_BASE}/boards/${boardId}/comments?limit=50`, { headers });
    if (res.ok) {
      const json = await res.json();
      boardComments = (json.data || []).map(c => ({
        id: c.id,
        text: c.data?.content || c.content || '',
        author: c.createdBy?.name || 'Unknown',
        createdAt: c.createdAt || c.created_at,
        itemId: null,
      }));
    }
  } catch (e) {
    console.warn('  Could not fetch board comments:', e.message);
  }
  console.log(`  Found ${boardComments.length} board-level comments`);

  // 3. Fetch item-level comments for each item
  console.log('Fetching item comments...');
  const itemComments = [];
  let processed = 0;
  for (const item of items) {
    const comments = await fetchItemComments(item.id);
    itemComments.push(...comments);
    processed++;
    if (processed % 20 === 0) {
      console.log(`  Processed ${processed}/${items.length} items (${itemComments.length} comments so far)`);
    }
  }
  console.log(`  Found ${itemComments.length} item-level comments`);

  // 4. Separate connectors from other items
  const connectors = items.filter(i => i.type === 'connector');
  const boardItems = items.filter(i => i.type !== 'connector');

  // 5. Structure the output
  const output = {
    boardId,
    exportedAt: new Date().toISOString(),
    items: boardItems.map(item => ({
      id: item.id,
      type: item.type,
      content: item.data?.content || item.data?.title || '',
      plainText: stripHtml(item.data?.content || ''),
      position: item.position || {},
      geometry: item.geometry || {},
      style: item.style || {},
      parent: item.parent || null,
    })),
    connectors: connectors.map(c => ({
      id: c.id,
      startItem: c.data?.startItem || c.startItem || null,
      endItem: c.data?.endItem || c.endItem || null,
      caption: c.data?.caption || '',
      style: c.style || {},
    })),
    comments: [...boardComments, ...itemComments],
    summary: {
      totalItems: boardItems.length,
      totalConnectors: connectors.length,
      totalComments: boardComments.length + itemComments.length,
      itemTypes: countBy(boardItems, i => i.type),
    },
  };

  // 6. Write output
  const fs = await import('fs');
  const path = await import('path');
  const outPath = path.join(process.cwd(), 'data', 'board-data.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\nExported to: ${outPath}`);
  console.log(`Summary: ${output.summary.totalItems} items, ${output.summary.totalConnectors} connectors, ${output.summary.totalComments} comments`);
  console.log('Item types:', output.summary.itemTypes);
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
}

function countBy(arr, fn) {
  return arr.reduce((acc, item) => {
    const key = fn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

main().catch(err => {
  console.error('Export failed:', err.message);
  process.exit(1);
});
