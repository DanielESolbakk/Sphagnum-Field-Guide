# Glossary<sup><a href="#ayotte2020">1</a></sup>|<sup><a href="#daniels1990">2</a></sup>|<sup><a href="#denismichelle1997">3</a>
<!--  Collects each item in the glossary.yml file and prints them on this page -->
{% for term in site.data.glossary %}
**{{ term[0] }}** - {{ term[1] }}

{% endfor %}

## Sources

<ol>
  <li id="ayotte2020">Ayotte, G., & Rochefort, L. (2020). <em>Sphagnum Mosses of eastern Canada: Biology — Anatomy — Morphology — Herbarium conservation techniques and microscopic preparations</em>. Editions JFD.</li>
  <li id="daniels1990">Daniels, R.E. & Eddy, A. (1990). <em>Handbook of European Sphagna</em>, 2. ed. HMSO, London. 284 s.</li>
</ol>
