import { NextResponse } from "next/server";

const REPO = "chlakaelf/case-study-web";
const BRANCH = "main";

export async function POST(request: Request) {
  const { password, slug, content } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 });
  }

  const filePath = `src/data/articles/${slug}.json`;
  const apiUrl = `https://api.github.com/repos/${REPO}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };

  // Get current file SHA
  const getRes = await fetch(`${apiUrl}?ref=${BRANCH}`, { headers });
  if (!getRes.ok) {
    return NextResponse.json({ error: "Failed to read file from GitHub" }, { status: 500 });
  }
  const { sha } = await getRes.json();

  // Commit updated content
  const encoded = Buffer.from(JSON.stringify(content, null, 2) + "\n").toString("base64");
  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: `Update article: ${slug}`,
      content: encoded,
      sha,
      branch: BRANCH,
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.text();
    return NextResponse.json({ error: "GitHub commit failed", detail: err }, { status: 500 });
  }

  const result = await putRes.json();
  return NextResponse.json({ ok: true, sha: result.content.sha });
}
