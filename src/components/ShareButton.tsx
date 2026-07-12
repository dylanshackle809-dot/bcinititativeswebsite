import { Share2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Share button for opportunities.
 *
 * - Mobile / supporting browsers: opens the native share sheet (Web Share API).
 * - Desktop / fallback: copies the link to the clipboard and shows a
 *   "Link copied!" toast.
 *
 * `path` is app-relative (e.g. "/opportunities/12") so each opportunity gets
 * its own shareable URL; the absolute URL is built at click time.
 */
export function ShareButton({
  path,
  title,
  text,
  variant = "icon",
}: {
  path: string;
  title: string;
  text?: string;
  variant?: "icon" | "labeled";
}) {
  const onShare = async () => {
    const url = `${window.location.origin}${path}`;

    // Native share sheet on mobile/touch devices only — desktop browsers may
    // also expose navigator.share, but copy-to-clipboard is the better UX there.
    const isMobileLike = window.matchMedia("(pointer: coarse)").matches;
    if (isMobileLike && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        // User dismissed the sheet — not an error, and no fallback needed.
        if (err instanceof DOMException && err.name === "AbortError") return;
        // Otherwise fall through to clipboard copy.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied!", { description: `Share ${title} with a friend.` });
    } catch {
      toast("Couldn't copy the link", { description: url });
    }
  };

  if (variant === "labeled") {
    return (
      <button type="button" className="share-btn-labeled" onClick={onShare} aria-label={`Share ${title}`}>
        <Share2 size={14} strokeWidth={2} /> Share
      </button>
    );
  }

  return (
    <button
      type="button"
      className="share-btn"
      onClick={onShare}
      aria-label={`Share ${title}`}
      title="Share"
    >
      <Share2 size={15} strokeWidth={2} />
    </button>
  );
}
