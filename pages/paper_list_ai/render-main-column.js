function renderMainContent() {
  const main = document.getElementById("main-content");
  const sections = window.pageSections || [];
  if (!main) {
    console.error("Main content element not found.");
    return;
  }
  if (!sections || sections.length === 0) {   
    main.innerHTML = '<p class="no-content">No sections available.</p>';
    return;
  }

  // -------------------- JS: Create Page Title ---------------------------
  // Clear existing content
  main.innerHTML = "";  // Clear existing content
  
  // Add <h1> title if defined
  const pageTitle = window.pageMeta?.title;
  if (pageTitle) {
    const h1 = document.createElement("h1");
    h1.textContent = pageTitle;
    main.appendChild(h1);
  }
  
  // -------------------- JS: Create Sections and Subcollections ---------------------------
  sections.forEach(section => {
    const baseAnchor = section.id.replace(/^zotero-/, '');  // e.g. 'list-1'
    const sec = document.createElement("section");
    sec.id = baseAnchor;

    const h2 = document.createElement("h2");
    h2.id = baseAnchor;
    h2.innerHTML = section.title;
    sec.appendChild(h2);

    // Main collection container
    const mainDiv = document.createElement("div");
    mainDiv.className = "zotero-list";
    mainDiv.id = section.id;
    sec.appendChild(mainDiv);

    // Subcollections
    (section.subcollections || []).forEach(sub => {
      const subAnchor = sub.id.replace(/^zotero-/, '');

      const h3 = document.createElement("h3");
      h3.id = subAnchor;
      h3.className = "spy-anchor";
      h3.innerHTML = sub.title;
      sec.appendChild(h3);

      const subDiv = document.createElement("div");
      subDiv.className = "zotero-list";
      subDiv.id = sub.id;
      sec.appendChild(subDiv);
    });

    // Add the section to the main content
    main.appendChild(sec);
  });

}