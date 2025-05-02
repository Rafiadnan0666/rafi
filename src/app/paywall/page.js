"use client"
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setScreenshot(null);

    try {
      const res = await fetch("/api/screenshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (data.screenshot) {
        setScreenshot(data.screenshot);
      } else {
        setError("Failed to capture screenshot.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Paywall Screenshot Tool 📰
      </h1>
      <p className="text-gray-400 mb-6 text-center max-w-md">
        Paste a link to an article you want to save. We’ll generate a
        full-page screenshot for you to keep offline. Great for research,
        archiving, and offline reading!
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex items-center space-x-2"
      >
        <input
          type="url"
          required
          placeholder="https://example.com/article"
          className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
        >
          {loading ? "Capturing..." : "Capture"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {screenshot && (
        <div className="mt-8 w-full max-w-4xl">
          <p className="mb-2 text-center">Here’s your screenshot:</p>
          <a
            href={screenshot}
            download="article-screenshot.png"
            className="text-blue-400 hover:underline text-sm text-center block mb-2"
          >
            Download
          </a>
          <img
            src={screenshot}
            alt="Website Screenshot"
            className="w-full rounded shadow-lg"
          />
        </div>
      )}
    </main>
  );
}
