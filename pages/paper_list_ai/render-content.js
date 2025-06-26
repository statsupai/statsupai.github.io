// Zotero Paper List AI - Dynamic Content Generation
// Author: Yulin Li (yl2021@stat.rutgers.edu)
// Date: 06-21-2025
// https://statsupai.org
// 
// Description:
// This script dynamically generates the content for the Zotero paper list page.
// It creates sections and subcollections based on the provided data structure.
// It also initializes scroll spy functionality to highlight the active section in the sidebar.
// This script should be included in the HTML file after the DOM is fully loaded.

// ======================================================================
// Dynamic Content Generation
// ======================================================================
// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
  // --------------------------- JS: Render Main Content ---------------------------
  if (typeof renderMainContent === "function") {
    renderMainContent();
  }
  // --------------------------- JS: Render Sidebar ---------------------------
  if (typeof renderSidebar === "function") {
    renderSidebar();
  }
  // --------------------------- JS: Initialize Scroll Spy ---------------------------
  if (typeof initScrollSpy === "function") {
    initScrollSpy();
  }
});
