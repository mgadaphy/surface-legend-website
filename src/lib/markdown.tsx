import type { ReactNode } from "react";

/**
 * Renders the simple article syntax written in the admin (Blog): blank line = paragraph, "## " heading,
 * "### " subheading, "- " bullet, "1. " numbered step, **bold**, [text](link).
 * Builds React elements (never raw HTML), so text from the admin cannot inject scripts.
 */
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(((?:https?:\/\/|\/|mailto:)[^)\s]*)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={`${keyBase}-${i++}`}>{m[1]}</strong>);
    else {
      const external = /^https?:/.test(m[3]);
      out.push(
        <a key={`${keyBase}-${i++}`} href={m[3]} className="text-accent-dark underline underline-offset-2 hover:text-primary" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {m[2]}
        </a>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, "\n").trim().split(/\n\s*\n/);
  return (
    <>
      {blocks.map((block, b) => {
        const lines = block.split("\n").map((l) => l.trimEnd());
        const key = `b${b}`;
        if (lines.length === 1 && lines[0].startsWith("### ")) return <h3 key={key}>{inline(lines[0].slice(4), key)}</h3>;
        if (lines.length === 1 && lines[0].startsWith("## ")) return <h2 key={key}>{inline(lines[0].slice(3), key)}</h2>;
        if (lines.every((l) => /^\s*-\s+/.test(l)))
          return <ul key={key}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^\s*-\s+/, ""), `${key}-${i}`)}</li>)}</ul>;
        if (lines.every((l) => /^\s*\d+\.\s+/.test(l)))
          return <ol key={key}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^\s*\d+\.\s+/, ""), `${key}-${i}`)}</li>)}</ol>;
        return <p key={key}>{lines.flatMap((l, i) => (i ? [<br key={`br${i}`} />, ...inline(l, `${key}-${i}`)] : inline(l, `${key}-${i}`)))}</p>;
      })}
    </>
  );
}

/** About 200 words a minute. */
export const readingMinutes = (source: string) => Math.max(1, Math.round(source.split(/\s+/).length / 200));
