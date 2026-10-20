import { trustItems } from "@/data/content";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-10 pr-10">
      {trustItems.map((item) => (
        <li key={item} className="flex items-center gap-10 font-display text-xl font-bold whitespace-nowrap">
          {item}
          <span aria-hidden="true" className="text-yellow">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TrustBar() {
  return (
    <section
      aria-label="Technologies et formation"
      className="overflow-hidden border-y-2 border-border bg-surface-inverse py-5 text-fg-inverse"
    >
      <div className="marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
