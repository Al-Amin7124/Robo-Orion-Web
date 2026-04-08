
const GROQ_API_KEY = "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"; 
const YT_API_KEY = "AIzaSyATC96GifK-SjyDp36NPq3C4crr1XD9rzc"; 
const PROXY_URL = "https://corsproxy.io/?";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

async function generateSEO() {
  const title = document.getElementById('inp-title').value.trim();
  const details = document.getElementById('inp-details').value.trim();
  if (!title) return alert('Please enter a keyword for research.');

  const btn = document.getElementById('gen-btn');
  const log = document.getElementById('research-log');
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div> Analyzing Competitors...';
  log.innerHTML = "Searching YouTube for top ranking videos...";

  try {
    // --- PHASE 1: YOUTUBE RESEARCH (Keep as is) ---
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(title)}&type=video&key=${YT_API_KEY}`;
    const searchRes = await fetch(searchUrl);
    if (searchRes.status === 403) throw new Error("SERVER_BUSY"); 
    if (!searchRes.ok) throw new Error("YT_API_ERROR");

    const searchData = await searchRes.json();
    if (!searchData.items) throw new Error("YT_API_ERROR");
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');

    log.innerHTML = "Extracting hidden tags and metadata...";
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds}&key=${YT_API_KEY}`;
    const detailsRes = await fetch(detailsUrl);
    if (detailsRes.status === 403) throw new Error("SERVER_BUSY");
    if (!detailsRes.ok) throw new Error("YT_API_ERROR");

    const detailsData = await detailsRes.json();
    const researchReport = detailsData.items.map((v, i) => {
      const tags = v.snippet.tags ? v.snippet.tags.join(', ') : "No tags found";
      const itemHtml = `<div class="res-item"><span class="res-title">${v.snippet.title}</span>Tags: ${tags}</div>`;
      return { html: itemHtml, text: `Video ${i+1} Title: ${v.snippet.title}\nTags: ${tags}\nDesc: ${v.snippet.description}\n---\n` };
    });

    log.innerHTML = researchReport.map(r => r.html).join('');
    btn.innerHTML = '<div class="spinner"></div> Engineering Viral SEO...';

    // --- PHASE 2: THE EXPANSIVE PROMPT ---
    const fullResearchText = researchReport.map(r => r.text).join('\n');
    
    const prompt = `You are a YouTube Growth Hacker and SEO Architect. 
    I have provided real-time research on the top 5 ranking videos for the keyword: "${title}".

    COMPETITOR DATA:
    ${fullResearchText}

    USER'S VIDEO DETAILS:
    ${details}

    YOUR MISSION:
    Do NOT summarize the competitors. Your goal is to CRUSH them by providing 10x more value, more keywords, and a much more professional structure.

    STRICT REQUIREMENTS:
    1. SEO TITLE: Create a high-CTR, "Click-Magnet" title. Use Power Words. Keep it under 60 chars.
    
    2. DESCRIPTION (MUST BE MASSIVE): 
       The description MUST be at least 400-600 words. 
       Structure it exactly as follows:
       - SECTION 1 (The Hook): 2-3 sentences of high-intensity, keyword-rich text to stop the scroll.
       - SECTION 2 (Deep Value): A comprehensive 3-paragraph explanation of the video content. Use bullet points to list benefits.
       - SECTION 3 (SEO Keyword Cloud): A "Topics Covered" section containing 15+ LSI keywords found in the competitor research.
       - SECTION 4 (Timestamps): 6-8 realistic, descriptive timestamps.
       - SECTION 5 (The Closing): A powerful CTA and social links placeholder.

    3. HASHTAGS: Exactly 12 high-performing hashtags (mix of broad and niche).
    
    4. VIDEO TAGS: Exactly 25 highly optimized tags. Include exact match, long-tail, and common search variations.

    OUTPUT FORMAT (Strict JSON):
    {
      "seoTitle": "string",
      "description": "The massive 400+ word description",
      "hashtags": ["#tag1", ...],
      "videoTags": ["tag1", ...]
    }`;

    const response = await fetch(PROXY_URL + encodeURIComponent(GROQ_URL), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
      body: JSON.stringify({ 
        model: "llama-3.1-8b-instant", 
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8, // Higher temperature for more creative, long-form writing
        response_format: { type: "json_object" } 
      })
    });

    if (response.status === 429) throw new Error("SERVER_BUSY");
    if (!response.ok) throw new Error("AI_API_ERROR");

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content.replace(/```json|```/g, "").trim());

    document.getElementById('out-title').textContent = content.seoTitle;
    document.getElementById('out-desc').textContent = content.description;
    document.getElementById('tags-hash').innerHTML = content.hashtags.map(t => `<div class="hash-chip">${t}</div>`).join('');
    document.getElementById('tags-vid').innerHTML = content.videoTags.map(t => `<div class="tag-chip">${t},</div>`).join('');

  } catch (err) {
    console.error(err);
    if (err.message === "SERVER_BUSY") {
      alert("⚠️ The server is currently busy. Please try again later.");
      log.innerHTML = "Server quota reached. Please try again later.";
    } else {
      alert("An unexpected error occurred. Please check your connection.");
    }
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Generate Data-Driven SEO';
  }
}

function copyField(id, btn) {
  navigator.clipboard.writeText(document.getElementById(id).textContent);
  btn.textContent = 'COPIED';
  setTimeout(() => btn.textContent = 'COPY', 2000);
}
function copyHashtags(btn) {
  const tags = Array.from(document.querySelectorAll('.hash-chip')).map(c => c.textContent).join(' ');
  navigator.clipboard.writeText(tags);
  btn.textContent = 'COPIED';
  setTimeout(() => btn.textContent = 'COPY', 2000);
}
function copyVideoTags(btn) {
  const tags = Array.from(document.querySelectorAll('.tag-chip')).map(c => c.textContent.replace(',', '')).join(', ');
  navigator.clipboard.writeText(tags);
  btn.textContent = 'COPIED';
  setTimeout(() => btn.textContent = 'COPY', 2000);
}
