---
layout: events
title: Webinars · 2026
permalink: /events/webinars/
favicon: /img/logo.png
---
{% assign today = site.time | date: "%Y-%m-%d" %}

{% assign genai_next = 9999999999 %}
{% assign genai_talks = site.data.webinars | where: "series", "GenAI" | sort: "date" %}
{% for t in genai_talks %}
  {% assign t_day = t.date | date: "%Y-%m-%d" %}
  {% if t_day >= today %}
    {% assign t_ts = t.date | date: "%s" | plus: 0 %}
    {% if t_ts < genai_next %}
      {% assign genai_next = t_ts %}
    {% endif %}
  {% endif %}
{% endfor %}

{% assign health_next = 9999999999 %}
{% assign health_talks = site.data.webinars | where: "series", "Health" | sort: "date" %}
{% for t in health_talks %}
  {% assign t_day = t.date | date: "%Y-%m-%d" %}
  {% if t_day >= today %}
    {% assign t_ts = t.date | date: "%s" | plus: 0 %}
    {% if t_ts < health_next %}
      {% assign health_next = t_ts %}
    {% endif %}
  {% endif %}
{% endfor %}

{% capture genai_block %}
<div id="genai-stats-series" style="text-align: center; margin-bottom: 2em;">
  <span><i>Ongoing Webinar Series</i></span>
  <h2>Generative AI and Statistics</h2>
  Bridging the Gap Between Generative AI and Statistical Methodologies
</div>

<div class="timeline">
  {% for t in genai_talks %}
    {% assign t_day = t.date | date: "%Y-%m-%d" %}
    {% if t_day >= today %}
      {% include webinar_card.html t=t %}
    {% endif %}
  {% endfor %}
  {% for t in genai_talks reversed %}
    {% assign t_day = t.date | date: "%Y-%m-%d" %}
    {% if t_day < today %}
      {% include webinar_card.html t=t %}
    {% endif %}
  {% endfor %}
</div>
{% endcapture %}

{% capture health_block %}
<div id="health-data-science-series" style="text-align: center; margin-bottom: 2em;">
  <span><i>Ongoing Webinar Series</i></span>
  <h2>Statistical and AI Methods <br> for Health Data Science</h2>
  Empowering Health Data Science through the Integration of Statistics and AI
</div>

<div class="timeline">
  {% for t in health_talks %}
    {% assign t_day = t.date | date: "%Y-%m-%d" %}
    {% if t_day >= today %}
      {% include webinar_card.html t=t %}
    {% endif %}
  {% endfor %}
  {% for t in health_talks reversed %}
    {% assign t_day = t.date | date: "%Y-%m-%d" %}
    {% if t_day < today %}
      {% include webinar_card.html t=t %}
    {% endif %}
  {% endfor %}
</div>
{% endcapture %}

{% if genai_next <= health_next %}
  {{ genai_block }}
  <hr style="margin: 2em 0;">
  {{ health_block }}
{% else %}
  {{ health_block }}
  <hr style="margin: 2em 0;">
  {{ genai_block }}
{% endif %}



{% include webinars_footer.html %}