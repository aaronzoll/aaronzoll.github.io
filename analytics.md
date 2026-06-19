---
layout: splash
title: Analytics
permalink: /analytics/
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: "https://picsum.photos/1300/400?image=989"
---

<style>
  .an-note {
    font-size: 0.84rem;
    color: #6b7c8a;
    font-style: italic;
    margin-bottom: 1.25rem;
  }

  .an-section {
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #3a4f63;
    border-bottom: 2px solid rgba(100, 120, 140, 0.2);
    padding-bottom: 0.35rem;
    margin: 2rem 0 1rem;
  }

  .an-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .an-card {
    padding: 1.1rem 1.2rem;
    border: 1px solid rgba(100, 120, 140, 0.22);
    border-radius: 5px;
    background: rgba(236, 239, 243, 0.45);
  }

  .an-card-title {
    font-weight: 700;
    font-size: 0.85rem;
    color: #2c3e50;
    margin-bottom: 0.35rem;
  }

  .an-card-desc {
    font-size: 0.84rem;
    color: #4a5568;
    line-height: 1.5;
    margin: 0 0 0.8rem;
  }

  .an-btn {
    display: inline-block;
    padding: 0.25rem 0.7rem;
    font-size: 0.78rem;
    font-weight: 500;
    color: #3a4f63;
    background: #eceff3;
    border: 1px solid #a0aebb;
    border-radius: 4px;
    text-decoration: none;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .an-btn:hover {
    background: #dde3ea;
    border-color: #7a8fa0;
    text-decoration: none;
    color: #3a4f63;
  }

  .an-embed-wrap {
    position: relative;
    width: 100%;
    border: 1px solid rgba(100, 120, 140, 0.22);
    border-radius: 5px;
    overflow: hidden;
    background: #f7f9fb;
  }

  .an-embed-wrap iframe {
    display: block;
    width: 100%;
    height: 820px;
    border: none;
  }

  .an-embed-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 320px;
    color: #6b7c8a;
    font-size: 0.9rem;
    text-align: center;
    gap: 0.5rem;
    padding: 2rem;
  }

  .an-embed-placeholder strong {
    font-size: 1rem;
    color: #3a4f63;
  }

  .an-embed-placeholder code {
    font-size: 0.8rem;
    background: #eceff3;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
  }

  @media (max-width: 700px) {
    .an-grid { grid-template-columns: 1fr; }
  }
</style>

<div class="an-section">Live Dashboard</div>

<div class="an-embed-wrap">
  <iframe src="https://datastudio.google.com/embed/reporting/9b90affa-90f5-4804-bee4-42d9d4eb4932/page/Wrm1F"
    frameborder="0" style="border:0" allowfullscreen
    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
  </iframe>
</div>

<p class="an-note" style="margin-top:0.6rem">
  Alternatively, view all data directly in
  <a href="https://analytics.google.com" target="_blank">Google Analytics</a>.
</p>

<div class="an-section">Quick Access — GA4 Reports</div>

<div class="an-grid">

  <div class="an-card">
    <div class="an-card-title">Traffic Overview</div>
    <p class="an-card-desc">Total users, sessions, page views, and new vs. returning visitors over any date range.</p>
    <a class="an-btn" href="https://analytics.google.com" target="_blank">Open GA4 →</a>
  </div>

  <div class="an-card">
    <div class="an-card-title">Real-Time</div>
    <p class="an-card-desc">Active users on the site right now and which pages they are currently viewing.</p>
    <a class="an-btn" href="https://analytics.google.com" target="_blank">Open GA4 →</a>
  </div>

  <div class="an-card">
    <div class="an-card-title">Top Pages</div>
    <p class="an-card-desc">Which pages receive the most visits, average time on page, and engagement rates.</p>
    <a class="an-btn" href="https://analytics.google.com" target="_blank">Open GA4 →</a>
  </div>

  <div class="an-card">
    <div class="an-card-title">Geographic Distribution</div>
    <p class="an-card-desc">Country and city-level breakdown of where visitors are located.</p>
    <a class="an-btn" href="https://analytics.google.com" target="_blank">Open GA4 →</a>
  </div>

  <div class="an-card">
    <div class="an-card-title">Traffic Sources</div>
    <p class="an-card-desc">How visitors arrive — direct, organic search, referral links, or social media.</p>
    <a class="an-btn" href="https://analytics.google.com" target="_blank">Open GA4 →</a>
  </div>

  <div class="an-card">
    <div class="an-card-title">Devices &amp; Browsers</div>
    <p class="an-card-desc">Desktop vs. mobile vs. tablet split, operating systems, and browser breakdown.</p>
    <a class="an-btn" href="https://analytics.google.com" target="_blank">Open GA4 →</a>
  </div>

  <div class="an-card">
    <div class="an-card-title">User Retention</div>
    <p class="an-card-desc">How often visitors return, average session duration, and bounce rate over time.</p>
    <a class="an-btn" href="https://analytics.google.com" target="_blank">Open GA4 →</a>
  </div>

  <div class="an-card">
    <div class="an-card-title">Search Console</div>
    <p class="an-card-desc">Which Google search queries bring visitors in, click-through rates, and impressions.</p>
    <a class="an-btn" href="https://search.google.com/search-console" target="_blank">Open Search Console →</a>
  </div>

</div>
