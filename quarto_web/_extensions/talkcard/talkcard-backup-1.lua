-- _extensions/talkcard/talkcard.lua
-- Minimal Pandoc Lua filter: renders "talk cards" with the same HTML as your sample.
-- No CSS or extra styling added.

local u = pandoc.utils

-- safe stringify meta values
local function mstr(x) return x and u.stringify(x) or "" end

-- HTML-escape
local function esc(s)
  s = s or ""
  return (s:gsub("[&<>\"]", {
    ["&"] = "&amp;", ["<"] = "&lt;", [">"] = "&gt;", ["\""] = "&quot;"
  }))
end

-- Build the exact HTML block you used originally
local function build_card(speaker, title, date, time, org, keywords, summary, details_html, video_src, video_title, video_link)
  -- details_html should already be HTML (or empty string)
  local kw = (keywords ~= "" and ('**Keywords:** ' .. esc(keywords) .. '\\\n') or "")
  local sm = (summary  ~= "" and ('**Summary:** '  .. esc(summary)  .. '\n') or "")
  local details_block = ""
  if details_html ~= "" then
    details_block = ([[<details>
  <summary><u>📖 Read more</u></summary>
  %s
</details>]]):format(details_html)
  end
  local open_link = ""
  if video_link ~= "" then
    open_link = ('\n[🎬Open the video directly](' .. esc(video_link) .. ')\\')
  end

  -- Exact structure and inline styles preserved from your snippet
  local html = ([[
<h3>🎤 %s: <em>%s</em></h3>
<p>📅 %s • 🕘 %s<br/>🏛️ %s</p>

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
    esc(speaker), esc(title),
    esc(date), esc(time), esc(org),
    kw, sm, details_block,
    esc(video_src),
    esc(video_title ~= "" and video_title or ("BIRS talk: " .. speaker)),
    open_link
  )

  return pandoc.RawBlock("html", html)
end

-- Render ONE talk table (from metadata or Div attributes)
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

  return build_card(
    speaker, title, date, time, org, keywords, summary,
    details_html, video_src, "BIRS talk: " .. speaker, video_link
  )
end

-- Render from a fenced Div {.talk ...} with attributes and inner Markdown as details
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
  return build_card(
    speaker, title, date, time, org, keywords, summary,
    inner_html, video_src, "BIRS talk: " .. speaker, video_link
  )
end

return {
  {
    -- Case 1: single talk block written inline
    Div = function(div)
      if div.classes:includes("talk") then
        return render_talk_div(div)
      end
      -- Case 2: placeholder that expands a list from meta.talks, with optional session filter
      if div.classes:includes("talks") then
        -- ✅ use .metadata
        local meta = (quarto and quarto.doc and quarto.doc.metadata) or pandoc.Meta({})
        local list = meta.talks
        if not list or type(list) ~= "table" then
          return pandoc.Null()
        end
        
        -- Optional filter: session="morning" or "afternoon"
        local want_session = div.attributes and div.attributes.session or nil
        local out = {}
        -- t should be a table with fields... and optionally t.session = "morning"/"afternoon"
        for _, t in ipairs(list) do
          if want_session == nil or mstr(t.session) == want_session then
            table.insert(out, render_talk_tbl(t))
          end
        end
        return out
      end

      return nil
    end
  }
}
