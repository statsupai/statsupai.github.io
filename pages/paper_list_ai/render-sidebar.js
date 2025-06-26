function renderSidebar() {
  const nav = document.getElementById("sidebar-nav");
  if (!nav) {
    console.error("Sidebar navigation element not found.");
    return;
  }
  
  const meta = window.sidebarMeta || {};
  const sections = window.pageSections || [];

  // --------------------------- JS: Render Sidebar Heading ---------------------------
  // Title and description
  const heading = document.createElement("h2");
  heading.innerHTML = meta.title || "Navigation";

  if (meta.backLink) {
    // Back link from the button
    const link = document.createElement("a");
    link.href = meta.backLink;
    link.target = meta.linkTarget || "_self";    

    // Back button
    const backButton = document.createElement("button");
    backButton.className = "back-button";
    backButton.innerHTML = `
        <span class="back-icon">
            &#x21A9; back
        </span>
    `;
    link.appendChild(backButton);

    // Add the back link above the heading
    nav.appendChild(link);
  }


  const desc = document.createElement("p");
  desc.className = "sidebar-desc";
  desc.innerHTML = meta.description || "";

  nav.appendChild(heading);
  nav.appendChild(desc);

  // --------------------------- JS: Create Sidebar Navigation ---------------------------
  // Navigation
  const ul = document.createElement("ul");

  sections.forEach(section => {
    if (section.title === null || section.title.trim() === "") {
      return; // Skip sections with no title
    } else {
      const baseAnchor = section.id.replace(/^zotero-/, '');

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${baseAnchor}`;
      a.innerHTML = `<strong>${section.title}</strong>`;
      li.appendChild(a);

      // Subcollections
      if (section.subcollections && section.subcollections.length > 0) {
        const subUl = document.createElement("ul");

        section.subcollections.forEach(sub => {
          const subAnchor = sub.id.replace(/^zotero-/, '');
          const subLi = document.createElement("li");
          const subA = document.createElement("a");
          subA.href = `#${subAnchor}`;
          subA.innerHTML = sub.title.replace(/<[^>]*>?/gm, '');  // strip tags for sidebar
          subLi.appendChild(subA);
          subUl.appendChild(subLi);
        });

        li.appendChild(subUl);
      }

      ul.appendChild(li);
    }
    
  });

  nav.appendChild(ul);

  // Back to top button
  const backToTop = document.createElement("button");
  backToTop.id = "back-to-top";
  backToTop.textContent = " ▲ Top ";
  backToTop.onclick = () => window.scrollTo({ top: 10, behavior: "smooth" });
  nav.appendChild(backToTop);
}