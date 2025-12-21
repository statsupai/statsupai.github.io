---
layout: events
title: Webinars
permalink: /events/webinars/
last_updated: 2025-12-21
---

← **[Back to Events]({{ '/events/' | relative_url }})**

<div class="timeline">
  {% assign talks = site.data.webinars | sort: "date" %}
  {% for t in talks %}
    {% include webinar_card.html t=t %}
  {% endfor %}
</div>

{% include last_updated.html %}