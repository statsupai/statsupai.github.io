---
layout: events
title: Webinars · 2026
permalink: /events/webinars/
---

<div style="text-align: center; margin-bottom: 2em;">
  <span><i>Upcoming Webinar Series</i></span>
  <h2>Generative AI and Statistics</h2>
  Exploring the Intersection of Generative AI and Statistical Methods
</div>

<div class="timeline">
  {% assign talks = site.data.webinars | sort: "date" %}
  {% for t in talks %}
    {% include webinar_card.html t=t %}
  {% endfor %}
</div>

{% include webinars_footer.html %}
