import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { type Opportunity } from "@/lib/opportunities";
import { categoryConfig, categoryNameById } from "@/lib/categoryDisplay";
import { useSavedOpportunities } from "@/hooks/useSavedOpportunities";
import { toast } from "sonner";
import { ShareButton } from "@/components/ShareButton";

export function OppCard({ o }: { o: Opportunity }) {
  const cfg = categoryConfig[o.category];
  const { isSaved, toggle } = useSavedOpportunities();
  const saved = isSaved(o.id);

  const onToggleSave = () => {
    const nowSaved = toggle(o.id);
    toast(nowSaved ? "Saved" : "Removed", {
      description: nowSaved
        ? `${o.name} added to your saved list.`
        : `${o.name} removed from your saved list.`,
    });
  };

  return (
    <article className="opp-card">
      <div className="opp-top">
        <div className="opp-top-badges">
          <span
            className="opp-cat-chip"
            style={cfg ? { background: cfg.soft, color: cfg.color } : undefined}
          >
            {categoryNameById[o.category] ?? o.category.replace("-", " ")}
          </span>
          {o.isNew && <span className="opp-new-pill">New</span>}
          <span
            className={`deadline-badge deadline-${o.deadlineStatus === "open" ? "open" : o.deadlineStatus === "est" ? "est" : "closed"}`}
          >
            {o.deadlineStatus === "open" ? "Open" : o.deadlineStatus === "est" ? "Est." : "Closed"}
          </span>
        </div>
        <div className="opp-top-actions">
          <ShareButton path={`/opportunities/${o.id}`} title={o.name} text={o.description} />
          <button
            type="button"
            className={`save-btn ${saved ? "saved" : ""}`}
            onClick={onToggleSave}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${o.name} from saved` : `Save ${o.name}`}
            title={saved ? "Remove from saved" : "Save"}
          >
            <Heart size={16} strokeWidth={2} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <h3 className="opp-title">
        <Link
          to="/opportunities/$id"
          params={{ id: String(o.id) }}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {o.name}
        </Link>
      </h3>
      <p className="opp-desc">{o.description}</p>
      <div className="opp-details">
        <div className="opp-meta">
          <div>
            <div className="meta-label">Deadline</div>
            <div className="meta-value">{o.deadline}</div>
          </div>
          <div>
            <div className="meta-label">Award</div>
            <div className="meta-value">{o.amount}</div>
          </div>
          <div>
            <div className="meta-label">Difficulty</div>
            <div className="meta-value">{o.difficulty}</div>
          </div>
          <div>
            <div className="meta-label">Commitment</div>
            <div className="meta-value">{o.timeCommitment}</div>
          </div>
        </div>
      </div>
      <div className="opp-bottom">
        <div className="tag-chips">
          {o.gradeLevels.slice(0, 2).map((g) => (
            <span className="tag-chip" key={g}>
              {g}
            </span>
          ))}
          {o.stem && <span className="tag-chip">STEM</span>}
        </div>
        <Link className="apply-link" to="/opportunities/$id" params={{ id: String(o.id) }}>
          View details →
        </Link>
      </div>
    </article>
  );
}
