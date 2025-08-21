-- Minimal, Markdown-first talk card filter.
-- - Titles are real Header(3) nodes => appear in ToC, get stable anchors.
-- - Body is mostly Markdown AST (Paras/Emph/Strong/LineBreak), not raw HTML.
-- - Only <details> and <iframe> are emitted as Raw HTML.

local u = pandoc.utils
local includes = u.includes or function(list, val)
  for _, v in ipairs(list) do if v == val then return true end end
  return false
end

-- ---------- helpers ----------
local function mstr(x) return x and u.stringify(x) or "" end

local function slugify(...)
  local s = table.concat({...}, "-"):lower()
  s = s:gsub("[^%w%s%-_]+", "")
  s = s:gsub("%s+", "-"):gsub("%-+", "-"):gsub("^%-", ""):gsub("%-$", "")
  if s == "" then s = "talk" end
  return s
end

local function make_title_header(speaker, title, id_hint)
  -- Inlines:  🎤 Hongtu Zhu: *Causal Generalist Medical AI*
  local inl = {
    pandoc.Str("🎤"), pandoc.Space(),
    pandoc.Str(speaker), pandoc.Str(":"), pandoc.Space(),
    pandoc.Emph({ pandoc.Str(title) })
  }
  local id = id_hint
  if not id or id == "" then id = slugify("talk", speaker, title) end
  return pandoc.Header(3, inl, pandoc.Attr(id))
end

-- Build a "meta" paragraph with a hard linebreak in the middle
local function meta_para(date, time, org)
  return pandoc.Para({
    pandoc.Str("📅 " .. date .. " • 🕘 " .. time),
    pandoc.LineBreak(),
    pandoc.Str("🏛️ " .. org)
  })
end

local function kv_plain(label, value)
  if value == "" then return nil end
  local val_inl = (label == "Keywords") and pandoc.Emph({ pandoc.Str(value) })   -- italic only for Keywords
  return pandoc.Plain({
    pandoc.Strong({ pandoc.Str(label .. ":") }),
    pandoc.Space(),
    pandoc.Str(value),
    pandoc.LineBreak()
  })
end

-- local function kv_plain(label, value)
--   if value == "" then return nil end
--   local val_inl = (label == "Keywords") and pandoc.Emph({ pandoc.Str(value) })   -- italic only for Keywords
--   else pandoc.Str(value)
--   return pandoc.Plain({
--     pandoc.Strong({ pandoc.Str(label .. ":") }),
--     pandoc.Space(),
--     val_inl,
--     pandoc.LineBreak()
--   })
-- end

local function details_block_from_md(md_string)
  if md_string == "" then return nil end
  local inner_doc = pandoc.read(md_string, "markdown")
  local inner_html = pandoc.write(inner_doc, "html")
  local html = ([[<details>
  <summary><u>📖 Read more</u></summary>
  %s
</details>]]):format(inner_html)
  return pandoc.RawBlock("html", html)
end

local function iframe_block(src, title)
  if src == "" then return nil end
  local html = ([[<div style="position:relative;padding-top:56.25%%;height:0;overflow:hidden;margin:1rem 0;">
  <iframe
    src="%s"
    title="%s"
    allowfullscreen
    loading="lazy"
    style="position:absolute;top:0;left:0;width:100%%;height:100%%;border:0;">
  </iframe>
</div>]]):format(src, title)
  return pandoc.RawBlock("html", html)
end

local function link_para(href, text)
  if href == "" then return nil end
  return pandoc.Para({ pandoc.Link(text or "🎬Open the video directly", href) })
end

-- ---------- renderers ----------
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
  local id_hint   = mstr(t.id)

  local blocks = {}
  table.insert(blocks, make_title_header(speaker, title, id_hint))
  table.insert(blocks, meta_para(date, time, org))
  local kv
  kv = kv_plain("Keywords", keywords); if kv then table.insert(blocks, kv) end
  kv = kv_plain("Summary",  summary ); if kv then table.insert(blocks, kv) end
  local det = details_block_from_md(details_md); if det then table.insert(blocks, det) end
  local ifr = iframe_block(video_src, "BIRS talk: " .. speaker); if ifr then table.insert(blocks, ifr) end
  local lnk = link_para(video_link, "🎬Open the video directly"); if lnk then table.insert(blocks, lnk) end
  return blocks
end

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
  local id_hint   = a.id or ""

  -- Convert the fenced div's inner Markdown to HTML for <details>
  local inner_html = pandoc.write(pandoc.Pandoc(div.content), "html")

  local blocks = {}
  table.insert(blocks, make_title_header(speaker, title, id_hint))
  table.insert(blocks, meta_para(date, time, org))
  local kv
  kv = kv_plain("Keywords", keywords); if kv then table.insert(blocks, kv) end
  kv = kv_plain("Summary",  summary ); if kv then table.insert(blocks, kv) end
  if inner_html ~= "" then
    local det = pandoc.RawBlock("html", ([[<details>
  <summary><u>📖 Read more</u></summary>
  %s
</details>]]):format(inner_html))
    table.insert(blocks, det)
  end
  local ifr = iframe_block(video_src, "BIRS talk: " .. speaker); if ifr then table.insert(blocks, ifr) end
  local lnk = link_para(video_link, "🎬Open the video directly"); if lnk then table.insert(blocks, lnk) end
  return blocks
end

-- ---------- metadata capture + dispatcher ----------
local DOC_META = pandoc.Meta({})

local function meta_handler(m)
  DOC_META = m
  return nil
end

local function div_handler(div)
  -- Inline one-off card
  if includes(div.classes, "talk") then
    return render_talk_div(div)
  end

  -- Data-driven list: ::: {.talks session="morning"} :::
  if includes(div.classes, "talks") then
    local list = DOC_META.talks
    if not list or type(list) ~= "table" then
      return pandoc.Null()
    end
    local want_session = (div.attributes and (div.attributes.session or div.attributes["session"])) or nil
    local out = {}
    for _, t in ipairs(list) do
      if want_session == nil or mstr(t.session) == want_session then
        local blocks = render_talk_tbl(t)
        for _, b in ipairs(blocks) do table.insert(out, b) end
      end
    end
    return out
  end

  return nil
end

return { { Meta = meta_handler, Div = div_handler } }