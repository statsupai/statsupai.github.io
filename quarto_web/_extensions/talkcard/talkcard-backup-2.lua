-- Render "talk cards" exactly like your original HTML (no extra styling).

local u = pandoc.utils
local includes = u.includes or function(list, val)
  for _, v in ipairs(list) do if v == val then return true end end
  return false
end

-- ---------- helpers ----------
local function mstr(x) return x and u.stringify(x) or "" end
local function esc(s)
  s = s or ""
  return (s:gsub("[&<>\"]", {["&"]="&amp;", ["<"]="&lt;", [">"]="&gt;", ["\""]="&quot;"}))
end

local function make_title_header(speaker, title)
  -- 🎤 Hongtu Zhu: *Causal Generalist Medical AI*
  local inl = {
    pandoc.Str("🎤"), pandoc.Space(),
    pandoc.Str(speaker), pandoc.Str(":"), pandoc.Space(),
    pandoc.Emph({ pandoc.Str(title) })
  }
  -- return an H3; Pandoc will include this in the ToC and add an id
  return pandoc.Header(3, inl)
end

-- Build only the body HTML (no <h3> here)
local function build_body_html(date, time, org, keywords, summary, details_html, video_src, video_title, video_link)
  local kw = (keywords ~= "" and ('<strong>Keywords:</strong> ' .. esc(keywords) .. '<br/>\n') or "")
  local sm = (summary  ~= "" and ('<strong>Summary:</strong> '  .. esc(summary)  .. '<br/>\n') or "")

  local details_block = ""
  if details_html ~= "" then
    details_block = ([[<details>
  <summary><u>📖 Read more</u></summary>
  %s
</details>]]):format(details_html)
  end

  local open_link = (video_link ~= "" and ('<a href="' .. esc(video_link) .. '">🎬Open the video directly</a>') or "")

  -- your tight meta line (use your preferred variant)
  local html = ([[
<span><p>📅 %s • 🕘 %s<br/>🏛️ %s</span></p>
%s%s%s
<div style="position:relative;padding-top:56.25%%;height:0;overflow:hidden;margin:1rem 0;">
  <iframe
    src="%s"
    title="%s"
    allowfullscreen
    loading="lazy"
    style="position:absolute;top:0;left:0;width:100%%;height:100%%;border:0;">
  </iframe>
</div>%s
]]):format(
    esc(date), esc(time), esc(org),
    kw, sm, details_block,
    esc(video_src),
    esc(video_title),
    open_link
  )

  return pandoc.RawBlock("html", html)
end

-- from metadata table
local function render_talk_tbl(t)
  local speaker   = mstr(t.speaker)
  local title     = mstr(t.title)
  local date      = mstr(t.date)
  local time      = mstr(t.time)
  local org       = mstr(t.org)
  local keywords  = mstr(t.keywords)
  local summary   = mstr(t.summary)
  local video_src = mstr(t.video_src)
  local video_link= mstr(t.video_link)
  local details_md= mstr(t.details)

  local details_html = ""
  if details_md ~= "" then
    local ddoc = pandoc.read(details_md, "markdown")
    details_html = pandoc.write(ddoc, "html")
  end

  local header = make_title_header(speaker, title)
  local body   = build_body_html(date, time, org, keywords, summary, details_html, video_src, "BIRS talk: " .. speaker, video_link)
  return { header, body }
end

-- from inline {.talk ...} block
local function render_talk_div(div)
  local a = div.attributes or {}
  local speaker   = a.speaker or ""
  local title     = a.title or ""
  local date      = a.date or ""
  local time      = a.time or ""
  local org       = a.org or ""
  local keywords  = a.keywords or ""
  local summary   = a.summary or ""
  local video_src = a.video_src or ""
  local video_link= a.video_link or ""
  local inner_html = pandoc.write(pandoc.Pandoc(div.content), "html")

  local header = make_title_header(speaker, title)
  local body   = build_body_html(date, time, org, keywords, summary, inner_html, video_src, "BIRS talk: " .. speaker, video_link)
  return { header, body }
end

-- ---------- capture metadata ----------
local DOC_META = pandoc.Meta({})

local function meta_handler(m)
  DOC_META = m
  return nil
end

-- ---------- main ----------
local function div_handler(div)
  if includes(div.classes, "talk") then
    return render_talk_div(div)
  end
  if includes(div.classes, "talks") then
    local list = DOC_META.talks
    if not list or type(list) ~= "table" then
      return pandoc.Null()
    end
    local want_session = (div.attributes and (div.attributes.session or div.attributes["session"])) or nil
    local out = {}
    for _, t in ipairs(list) do
      if want_session == nil or mstr(t.session) == want_session then
        table.insert(out, render_talk_tbl(t))
      end
    end
    return out
  end
  return nil
end

return { { Meta = meta_handler, Div = div_handler } }