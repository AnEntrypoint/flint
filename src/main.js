import { fetchInitialTemplates, fetchMoreTemplates, dedupeTemplates } from './templates.js';
import { shuffledDeck } from './deck.js';
import { loadLinks, saveLinks, isValidUrl, addLink, removeLink } from './links.js';
import { loadHistory, addAccepted, clearHistory } from './history.js';

const app = document.getElementById('app');

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560"><rect width="400" height="560" fill="#1a1d24"/><text x="200" y="280" font-family="sans-serif" font-size="18" fill="#9ca3af" text-anchor="middle">Preview unavailable</text></svg>'
);

const LOW_WATER_MARK = 4;
const MAX_FETCH_ATTEMPTS = 13;

const state = {
  deck: [],
  index: 0,
  links: loadLinks(),
  history: loadHistory(),
  linksSheetOpen: false,
  acceptPanelTemplate: null,
  loading: true,
  loadError: null,
  fetchingMore: false,
};

function currentTemplate() {
  return state.deck[state.index] ?? null;
}

async function loadInitialDeck() {
  state.loading = true;
  state.loadError = null;
  render();
  try {
    const templates = await fetchInitialTemplates();
    if (templates.length === 0) {
      state.loadError = 'Could not load any templates from v0.dev right now.';
    } else {
      state.deck = shuffledDeck(dedupeTemplates(templates));
      state.index = 0;
    }
  } catch (err) {
    console.error('Failed to load initial templates:', err);
    state.loadError = 'Could not load templates from v0.dev right now.';
  }
  state.loading = false;
  render();
}

async function maybeFetchMore() {
  if (state.fetchingMore) return;
  const remaining = state.deck.length - state.index;
  if (remaining > LOW_WATER_MARK) return;

  state.fetchingMore = true;
  try {
    const existingIds = state.deck.map((t) => t.id);
    let attempts = 0;
    let fresh = [];
    while (fresh.length === 0 && attempts < MAX_FETCH_ATTEMPTS) {
      fresh = await fetchMoreTemplates(existingIds);
      attempts += 1;
      if (fresh.length === 0) break;
    }
    if (fresh.length > 0) {
      state.deck = state.deck.concat(shuffledDeck(fresh));
      render();
    }
  } catch (err) {
    console.error('Failed to fetch more templates:', err);
  }
  state.fetchingMore = false;
}

function render() {
  app.innerHTML = '';
  app.appendChild(renderHeader());

  if (state.loading) {
    app.appendChild(renderLoading());
  } else if (state.loadError) {
    app.appendChild(renderLoadError());
  } else if (state.acceptPanelTemplate) {
    app.appendChild(renderAcceptPanel(state.acceptPanelTemplate));
  } else if (currentTemplate()) {
    app.appendChild(renderDeckArea());
    app.appendChild(renderControls());
  } else {
    app.appendChild(renderEmptyState());
  }

  if (state.linksSheetOpen) {
    app.appendChild(renderLinksSheet());
  }
}

function renderHeader() {
  const header = document.createElement('div');
  header.className = 'header';
  header.innerHTML = `
    <div class="brand">Flint <span class="v0">v0</span></div>
  `;
  const linksBtn = document.createElement('button');
  linksBtn.className = 'icon-btn';
  linksBtn.textContent = '🔗';
  linksBtn.setAttribute('aria-label', 'Manage your links');
  linksBtn.onclick = () => {
    state.linksSheetOpen = true;
    render();
  };
  header.appendChild(linksBtn);
  return header;
}

function renderLoading() {
  const el = document.createElement('div');
  el.className = 'loading-state';
  el.textContent = 'Loading templates from v0.dev…';
  return el;
}

function renderLoadError() {
  const el = document.createElement('div');
  el.className = 'empty-state';
  el.innerHTML = `<h2>Couldn't reach v0.dev</h2><p>${state.loadError}</p>`;
  const btn = document.createElement('button');
  btn.className = 'primary';
  btn.textContent = 'Retry';
  btn.onclick = () => {
    loadInitialDeck();
  };
  el.appendChild(btn);
  return el;
}

function renderEmptyState() {
  const el = document.createElement('div');
  el.className = 'empty-state';
  el.innerHTML = `<h2>No more templates</h2><p>You've swiped through everything fetched so far.</p>`;
  const btn = document.createElement('button');
  btn.className = 'primary';
  btn.textContent = 'Reshuffle & fetch more';
  btn.onclick = () => {
    loadInitialDeck();
  };
  el.appendChild(btn);
  return el;
}

function renderDeckArea() {
  const area = document.createElement('div');
  area.className = 'deck-area';

  const stack = state.deck.slice(state.index, state.index + 2).reverse();
  stack.forEach((tpl, stackIdx) => {
    const isTop = stackIdx === stack.length - 1;
    const card = buildCard(tpl, isTop);
    area.appendChild(card);
  });

  return area;
}

function buildCard(tpl, isTop) {
  const card = document.createElement('div');
  card.className = isTop ? 'card card-top' : 'card';
  card.innerHTML = `
    <img src="${tpl.previewImageUrl}" alt="${tpl.name} template preview" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';" />
    <div class="info">
      <h2>${tpl.name}</h2>
      <p>${tpl.category} · ${tpl.description}</p>
    </div>
    <div class="stamp like">LIKE</div>
    <div class="stamp nope">NOPE</div>
  `;

  if (!isTop) {
    card.style.transform = 'scale(0.96) translateY(8px)';
    card.style.opacity = '0.7';
    return card;
  }

  attachSwipeHandlers(card, tpl);
  return card;
}

function attachSwipeHandlers(card, tpl) {
  let startX = 0, startY = 0, dx = 0, dy = 0, dragging = false;

  const likeStamp = () => card.querySelector('.stamp.like');
  const nopeStamp = () => card.querySelector('.stamp.nope');

  function onPointerDown(e) {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    card.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    dx = e.clientX - startX;
    dy = e.clientY - startY;
    const rot = dx / 18;
    card.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
    const opacity = Math.min(Math.abs(dx) / 100, 1);
    if (dx > 0) { likeStamp().style.opacity = opacity; nopeStamp().style.opacity = 0; }
    else { nopeStamp().style.opacity = opacity; likeStamp().style.opacity = 0; }
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    const threshold = 100;
    if (dx > threshold) {
      finishSwipe(card, 'right', tpl);
    } else if (dx < -threshold) {
      finishSwipe(card, 'left', tpl);
    } else {
      card.style.transition = 'transform 0.25s ease';
      card.style.transform = '';
      likeStamp().style.opacity = 0;
      nopeStamp().style.opacity = 0;
      setTimeout(() => { card.style.transition = ''; }, 250);
    }
    dx = 0; dy = 0;
  }

  card.addEventListener('pointerdown', onPointerDown);
  card.addEventListener('pointermove', onPointerMove);
  card.addEventListener('pointerup', onPointerUp);
  card.addEventListener('pointercancel', onPointerUp);

  card.tabIndex = 0;
  card.setAttribute('role', 'group');
  card.setAttribute('aria-label', `${tpl.name} template card. Press left arrow to reject, right arrow to accept.`);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); finishSwipe(card, 'right', tpl); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); finishSwipe(card, 'left', tpl); }
  });
}

function finishSwipe(card, direction, tpl) {
  card.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
  const flyX = direction === 'right' ? 600 : -600;
  card.style.transform = `translate(${flyX}px, -40px) rotate(${direction === 'right' ? 30 : -30}deg)`;
  card.style.opacity = '0';

  setTimeout(() => {
    state.index += 1;
    if (direction === 'right') {
      state.history = addAccepted(state.history, tpl);
      state.acceptPanelTemplate = tpl;
    }
    render();
    maybeFetchMore();
  }, 220);
}

function renderControls() {
  const controls = document.createElement('div');
  controls.className = 'controls';

  const rejectBtn = document.createElement('button');
  rejectBtn.className = 'reject';
  rejectBtn.textContent = '✕';
  rejectBtn.setAttribute('aria-label', 'Reject template');
  rejectBtn.onclick = () => {
    const card = document.querySelector('.card-top');
    if (card) finishSwipe(card, 'left', currentTemplate());
  };

  const acceptBtn = document.createElement('button');
  acceptBtn.className = 'accept';
  acceptBtn.textContent = '♥';
  acceptBtn.setAttribute('aria-label', 'Accept template');
  acceptBtn.onclick = () => {
    const card = document.querySelector('.card-top');
    if (card) finishSwipe(card, 'right', currentTemplate());
  };

  controls.appendChild(rejectBtn);
  controls.appendChild(acceptBtn);
  return controls;
}

function renderAcceptPanel(tpl) {
  const panel = document.createElement('div');
  panel.className = 'accept-panel';

  const header = document.createElement('div');
  header.innerHTML = `
    <p style="color:var(--muted);text-align:center;margin-bottom:4px;">You liked</p>
    <div class="accepted-name" style="text-align:center;">${tpl.name}</div>
    <div class="accepted-category" style="text-align:center;">${tpl.category}</div>
  `;
  panel.appendChild(header);

  const img = document.createElement('img');
  img.src = tpl.previewImageUrl;
  img.alt = `${tpl.name} preview`;
  img.loading = 'lazy';
  img.onerror = () => { img.onerror = null; img.src = FALLBACK_IMAGE; };
  img.style.width = '160px';
  img.style.borderRadius = '16px';
  img.style.marginBottom = '12px';
  panel.appendChild(img);

  if (tpl.v0Url) {
    const v0Link = document.createElement('a');
    v0Link.href = tpl.v0Url;
    v0Link.target = '_blank';
    v0Link.rel = 'noopener noreferrer';
    v0Link.textContent = 'View on v0.dev';
    v0Link.style.cssText = 'color:#7dd3fc;font-size:13px;margin-bottom:20px;display:inline-block;';
    panel.appendChild(v0Link);
  }

  const linksTitle = document.createElement('h3');
  linksTitle.textContent = 'Your links';
  panel.appendChild(linksTitle);

  if (state.links.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'links-empty';
    empty.textContent = "You haven't added any links yet. Add some so matches can find you.";
    panel.appendChild(empty);

    const addBtn = document.createElement('button');
    addBtn.className = 'primary';
    addBtn.style.marginTop = '14px';
    addBtn.textContent = 'Add your links';
    addBtn.onclick = () => {
      state.linksSheetOpen = true;
      render();
    };
    panel.appendChild(addBtn);
  } else {
    const list = document.createElement('ul');
    list.className = 'link-list';
    list.style.width = '100%';
    list.style.maxWidth = '380px';
    state.links.forEach((link) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = link.label;
      li.appendChild(a);
      list.appendChild(li);
    });
    panel.appendChild(list);
  }

  const continueBtn = document.createElement('button');
  continueBtn.className = 'ghost';
  continueBtn.style.marginTop = '20px';
  continueBtn.textContent = 'Keep swiping';
  continueBtn.onclick = () => {
    state.acceptPanelTemplate = null;
    render();
  };
  panel.appendChild(continueBtn);

  if (state.history.length > 1) {
    const hist = document.createElement('div');
    hist.className = 'hint';
    hist.textContent = `${state.history.length} templates accepted this session`;
    panel.appendChild(hist);
  }

  return panel;
}

function renderLinksSheet() {
  const backdrop = document.createElement('div');
  backdrop.className = 'sheet-backdrop';
  backdrop.onclick = (e) => {
    if (e.target === backdrop) {
      state.linksSheetOpen = false;
      render();
    }
  };

  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.innerHTML = `<h2>Your links</h2><p style="color:var(--muted);font-size:13px;margin-top:-8px;">Shown to matches when you accept a template.</p>`;

  const field = document.createElement('div');
  field.className = 'field';
  const labelInput = document.createElement('input');
  labelInput.placeholder = 'Label (e.g. GitHub)';
  labelInput.style.maxWidth = '110px';
  const urlInput = document.createElement('input');
  urlInput.placeholder = 'https://…';
  field.appendChild(labelInput);
  field.appendChild(urlInput);
  sheet.appendChild(field);

  const errorText = document.createElement('div');
  errorText.className = 'error-text';
  errorText.style.display = 'none';
  errorText.textContent = 'Please enter a valid http(s) URL.';
  sheet.appendChild(errorText);

  const addBtn = document.createElement('button');
  addBtn.className = 'primary';
  addBtn.textContent = 'Add link';
  addBtn.style.marginBottom = '16px';
  addBtn.onclick = () => {
    const url = urlInput.value.trim();
    if (!isValidUrl(url)) {
      errorText.style.display = 'block';
      urlInput.classList.add('invalid');
      return;
    }
    errorText.style.display = 'none';
    urlInput.classList.remove('invalid');
    state.links = addLink(state.links, labelInput.value, url);
    labelInput.value = '';
    urlInput.value = '';
    render();
  };
  sheet.appendChild(addBtn);

  if (state.links.length > 0) {
    const list = document.createElement('ul');
    list.className = 'link-list';
    state.links.forEach((link, i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = link.label;
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-link';
      removeBtn.textContent = '✕';
      removeBtn.setAttribute('aria-label', `Remove ${link.label}`);
      removeBtn.onclick = () => {
        state.links = removeLink(state.links, i);
        render();
      };
      li.appendChild(a);
      li.appendChild(removeBtn);
      list.appendChild(li);
    });
    sheet.appendChild(list);
  }

  const closeBtn = document.createElement('button');
  closeBtn.className = 'ghost';
  closeBtn.style.marginTop = '14px';
  closeBtn.textContent = 'Done';
  closeBtn.onclick = () => {
    state.linksSheetOpen = false;
    render();
  };
  sheet.appendChild(closeBtn);

  backdrop.appendChild(sheet);
  return backdrop;
}

window.addEventListener('error', (e) => {
  console.error('Flint runtime error:', e.error || e.message);
});

render();
loadInitialDeck();
