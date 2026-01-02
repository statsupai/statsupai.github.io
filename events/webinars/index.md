---
layout: events
title: Webinars · 2026
permalink: /events/webinars/
---

<div id="health-data-science-series" style="text-align: center; margin-bottom: 2em;">
  <span><i>Ongoing Webinar Series</i></span>
  <h2>Statistical and AI Methods <br> for Health Data Science</h2>
  Empowering Health Data Science through the Integration of Statistics and AI
</div>

<div class="timeline">
  {% assign talks = site.data.webinars | where: "series", "Stats×AI for Health Data Science" | sort: "date" %}
  {% for t in talks %}
    {% include webinar_card.html t=t %}
  {% endfor %}
</div>

<hr style="margin: 2em 0;">
<div id="genai-stats-series" style="text-align: center; margin-bottom: 2em;">
  <span><i>Upcoming Webinar Series</i></span>
  <h2>Generative AI and Statistics</h2>
  Bridging the Gap Between Generative AI and Statistical Methodologies
</div>

<div class="timeline">
  {% assign talks = site.data.webinars | where: "series", "GenAI × Statistics" | sort: "date" %}
  {% for t in talks %}
    {% include webinar_card.html t=t %}
  {% endfor %}
</div>

{% include webinars_footer.html %}