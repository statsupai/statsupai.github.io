document.addEventListener("DOMContentLoaded", () => {
  const config = window.zoteroConfig || {};
  const { groupID, apiKey, collections } = config;

  if (!groupID || !apiKey || !collections) {
    console.error('Zotero config not found.');
    return;
  }

  function getTwoDigitMonth(dateStr) {
    if (!dateStr) return null;

    const date = new Date(dateStr);
    if (isNaN(date)) return null;

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return month; // e.g., "06"
  }
  
  // --------------------------- JS: Load Zotero Collection --------------------------- 
  const loadZoteroCollection = (containerId, collectionID) => {
    const url = `https://api.zotero.org/groups/${groupID}/collections/${collectionID}/items?key=${apiKey}&sort=date&direction=desc`;
    // const container = document.getElementById(containerId);


    return fetch(url)
    .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.json();
    })
    .then(data => {
        const container = document.getElementById(containerId);
        data.forEach(item => {
        if (
          // item.data.itemType !== 'attachment' && 
          // item.data.itemType !== "note" &&
          item.data.title
          && item.data.creators 
          // && item.data.abstractNote !== undefined
        ) {
            const div = document.createElement('div');
            div.className = 'item';

            // --------------------------- JS: Item Rendering --------------------------- 
            const title = safeText(item.data.title);
            const doi = safeText(item.data.DOI);
            // const titlelink = item.data.url ? `<a href="${item.data.url}" target="_blank" title="${item.data.url}>${title}</a>` : '<span class="no-content">—</span>';
            const doilink = item.data.url ? `<a href="${item.data.url}" target="_blank" title="${item.data.url}">${doi}</a>` : '<span class="no-content">—</span>';

            const year = item.data.date ? new Date(item.data.date).getFullYear() : null;
            const month = getTwoDigitMonth(item.data.date ?? item.dateModified) || null;
            // const date = item.data.date ? new Date(item.data.date).toLocaleDateString() : '—';
            const creators = item.data.creators || [];
            const authors = creators
            .filter(c => c.creatorType === 'author')
            .map(c => `${c.lastName}${c.firstName ? ', ' + c.firstName : ''}`)
            .join('; ') || '—';
            const abstract = item.data.abstractNote;
            // const abstract = item.data.abstractNote || `<span class="no-content" style="white-space: nowrap">—</span>`;
            // const abstract = safeText(item.data.abstractNote);

            const isLong = abstract.length > 300;
            // const preview = isLong ? abstract.slice(0, 300) + '…' : abstract;
            const abstractID = `abstract-${item.key}`;

            // Abstract text -> Toggle button -> DOI link
            const abstractHTML = `
            <div class="item-meta abstract-container">
              ${abstract
                ? `<div class="abstract-text clamp-abstract" id="${abstractID}">
                    <strong>Abstract:</strong>
                    ${abstract}
                  </div>
                  <div class="toggle-line"> 
                    ${isLong 
                      ? `<button class="toggle-abstract" data-id="${abstractID}" data-full="${encodeURIComponent(abstract)}">
                        <span class="toggle-label"><strong>Show more</strong></span>
                        </button>`
                      : `<span style="white-space: nowrap"> </span>`}
                    <span class="toggle-note">
                      DOI:${doilink}
                      </span>
                  </div>`
                : `<div class="toggle-line"> 
                    <span class="abstract-text clamp-abstract" id="${abstractID}">
                      <strong>Abstract:</strong>
                      <span class="no-content" style=>—</span>
                    </span>                        
                    <span class="toggle-note">
                      DOI:${doilink}
                      </span>
                  </div>`
              }
            </div>`;

            // ****************************************************************************** 
            //                                 JS: Item Content                               
            // ******************************************************************************
            div.innerHTML = `
                <div class="item-title-container">
                  <div class="item-title">
                  <span class="thin">
                  ${month && year
                    ? `<span class="month">(${month}/${year})</span>`
                    : `<span class="year">
                    ${year ? `(${year})` : ''}</span>`}
                  </span>
                  ${item.data.url
                    ? `<a href="${item.data.url}" target="_blank">${title}</a>`
                    : title}
                  <span class="link-badge-container">
                    <a href="${item.data.url}" target="_blank" class="link-badge">&#9654;link</a>
                    <span class="title-popup">${item.data.url}</span>
                  </span>
                </div>
                </div>
                <div class="item-meta authors"><div class="authors-text">${authors}</div></div>
                ${abstractHTML}
            `;

            // ============================ JS: Toggle Abstract Functionality ============================ 
            const toggleButton = div.querySelector('.toggle-abstract');
            if (toggleButton) {
            toggleButton.addEventListener('click', function () {
                const button = this;  // lock in reference
                const abstractBlock = div.querySelector(`#${this.dataset.id}`);
                const label = this.querySelector('.toggle-label');
                const fullText = decodeURIComponent(this.dataset.full);
                // --------------------------- JS: Toggle Abstract Text ---------------------------
                abstractBlock.innerHTML = '<strong>Abstract:</strong> ' + fullText;

                const isCollapsed = label.textContent.trim() === 'Show more';
                if (isCollapsed) {
                    abstractBlock.classList.remove('clamp-abstract');
                    label.innerHTML = `
                        <strong>Show less</strong>
                    `;
                } else {
                    abstractBlock.classList.add('clamp-abstract');
                    label.innerHTML = `
                        <strong>Show more</strong>
                    `;
                }
            });
            }

            container.appendChild(div);
        }
        });
        // onComplete(); // trigger scroll here
      })
      .catch(err => {
          // --------------------------- JS: Error Handling --------------------------- 
          const container = document.getElementById('zotero-list');
          container.innerHTML = `<p style="color: red;">Error loading Zotero items.</p>`;
          console.error(err);
      });
  };

  // ************************* JS: Load Collections ************************* 

  // Loop through all defined collections
  Promise.all(
    Object.entries(collections).map(([containerId, collectionID]) =>
      loadZoteroCollection(containerId, collectionID)
    )
  ).then(() => {
    // Optional scroll fix
    const hash = decodeURIComponent(location.hash);
    if (hash && document.querySelector(hash)) {
      // Force browser to jump to anchor after layout
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const target = document.querySelector(hash);
          if (!target) return;
          location.hash = '';        // temporarily clear
          location.hash = hash;      // re-trigger native scroll
        });
      });
    }
  });
});