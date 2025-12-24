---
layout: events
title: Webinars · 2026
permalink: /events/webinars/
---

<div class="timeline">
  {% assign talks = site.data.webinars | sort: "date" %}
  {% for t in talks %}
    {% include webinar_card.html t=t %}
  {% endfor %}
</div>

{% include webinars_footer.html %}
