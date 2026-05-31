document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const answerEl = document.getElementById('answer-word');
  const heroSubEl = document.getElementById('hero-sub');
  const lastUpdatedEl = document.getElementById('last-updated');
  const footerLastUpdatedEl = document.getElementById('footer-last-updated');
  const statusTextEl = document.getElementById('status-text');
  const inlineUpdatedEls = document.querySelectorAll('.last-updated-inline');
  const twitterBtn = document.getElementById('share-twitter');
  const copyBtn = document.getElementById('share-copy');

  // Populate dates
  const dateStr = typeof LAST_UPDATED !== 'undefined' ? LAST_UPDATED : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  if (lastUpdatedEl) lastUpdatedEl.textContent = dateStr;
  if (footerLastUpdatedEl) footerLastUpdatedEl.textContent = dateStr;
  inlineUpdatedEls.forEach(el => { el.textContent = dateStr; });

  // Apply state
  const active = typeof LAWSUIT_ACTIVE !== 'undefined' ? LAWSUIT_ACTIVE : true;

  if (active) {
    body.classList.add('state-active');
    if (answerEl) answerEl.textContent = 'YES.';
    if (heroSubEl) heroSubEl.textContent = `As of ${dateStr}, Patagonia is actively suing Pattie Gonia and seeking a court order to stop them from performing under their own name.`;
    if (statusTextEl) statusTextEl.textContent = `The lawsuit is currently active. As of ${dateStr}, no dismissal, settlement, or court ruling has been entered. The case remains on the docket of the Central District of California as Case 2:26-cv-00586.`;
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', 'https://ispatagoniaerasing pattiegonia.com/og-active.png');
  } else {
    body.classList.add('state-resolved');
    const resolvedDate = typeof RESOLVED_DATE !== 'undefined' && RESOLVED_DATE ? RESOLVED_DATE : dateStr;
    if (answerEl) answerEl.textContent = 'NO.';
    if (heroSubEl) heroSubEl.textContent = `Patagonia dropped the suit on ${resolvedDate}. Pattie Gonia is free to keep being Pattie Gonia.`;
    if (statusTextEl) statusTextEl.textContent = `The lawsuit has been resolved. Patagonia's case against Pattie Gonia (Case 2:26-cv-00586) was dismissed on ${resolvedDate}. Pattie Gonia is free to continue performing and operating under their name.`;
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', 'https://ispatagoniaerasing pattiegonia.com/og-resolved.png');

    // Remove the "ongoing" timeline item's "no resolution" language
    const ongoingItem = document.getElementById('timeline-ongoing');
    if (ongoingItem) {
      ongoingItem.querySelector('strong').textContent = 'Lawsuit Resolved';
      ongoingItem.querySelector('p').textContent = `Patagonia dismissed the case on ${resolvedDate}. Pattie Gonia retains the right to perform under their name.`;
      ongoingItem.classList.add('timeline-item--key');
    }
  }

  // Twitter / X share
  const siteUrl = 'https://ispatagoniaerasing pattiegonia.com';
  const tweetText = active
    ? `Patagonia filed a federal lawsuit asking a court to stop Pattie Gonia from performing under their own name. Track the case: ${siteUrl}`
    : `Patagonia dropped the lawsuit against Pattie Gonia. Pattie Gonia is free to keep being Pattie Gonia. ${siteUrl}`;

  if (twitterBtn) {
    twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  }

  // Copy link
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(siteUrl).then(() => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = orig; }, 2000);
      });
    });
  }
});
