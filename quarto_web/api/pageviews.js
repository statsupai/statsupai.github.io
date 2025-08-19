// /api/pageviews.js  (Node 18+ / Vercel serverless)
export default async function handler(req, res) {
  try {
    const { path } = req.query;
    if (!path) return res.status(400).json({ error: "Missing ?path" });

    // 1) Get the list of per-path hit summaries, then pick the one you want.
    //    (stats/hits doesn't accept ?path=; we filter client-side here on the server.)
    const hitsResp = await fetch("https://statsupai.goatcounter.com/api/v0/stats/hits", {
      headers: {
        // GoatCounter API auth: bearer token
        Authorization: `Bearer ${process.env.GOATCOUNTER_TOKEN}`,
        Accept: "application/json",
      },
    });

    if (!hitsResp.ok) {
      const text = await hitsResp.text();
      return res.status(hitsResp.status).json({ error: "Upstream error", details: text });
    }

    const hitsData = await hitsResp.json();

    // Find the specific path object (exact match on GoatCounter's stored path)
    // Example path looks like "/quarto_web/site/posts/2025-isu-niss-conference.html"
    const item = (hitsData.hits || []).find(h => h.path === path);

    // If found, optionally get referrals or other detail using the path_id
    let refs = null;
    if (item?.path_id) {
      const refsResp = await fetch(
        `https://statsupai.goatcounter.com/api/v0/stats/hits/${item.path_id}`,
        { headers: { Authorization: `Bearer ${process.env.GOATCOUNTER_TOKEN}`, Accept: "application/json" } }
      );
      if (refsResp.ok) {
        const detail = await refsResp.json();
        refs = detail.refs || null; // array of {name, count, …}
      }
    }

    // Shape a small response for your page
    return res.status(200).json({
      ok: true,
      path,
      title: item?.title ?? null,
      count: item?.count ?? 0,
      path_id: item?.path_id ?? null,
      max_daily: item?.max ?? null,  // peak daily views from GoatCounter summary
      refs,                          // optional referral breakdown for that path
      // You can add item.stats here if you want daily/hourly arrays
    });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Unknown error" });
  }
}