const STORAGE_KEY = 'flint:user-links';

export function loadLinks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

export function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function addLink(links, label, url) {
  const next = [...links, { label: label.trim() || url, url }];
  saveLinks(next);
  return next;
}

export function removeLink(links, index) {
  const next = links.filter((_, i) => i !== index);
  saveLinks(next);
  return next;
}
