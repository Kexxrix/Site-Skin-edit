/** Original vector geometry for the local demo; no provider image or iframe.
 * Feed this from the selected match's local tracker state. It does not own timers.
 */
export function FootballPitchR4({
  ballX,
  ballY,
  direction,
  phaseLabel,
  active,
}: {
  /** Coordinates in the 100 x 64 viewBox; see tracker-demo-config.json. */
  ballX: number;
  ballY: number;
  direction: "left" | "right";
  phaseLabel: string;
  active: boolean;
}) {
  const x = Math.max(6, Math.min(94, ballX));
  const y = Math.max(7, Math.min(57, ballY));
  const sign = direction === "right" ? 1 : -1;
  const tip = Math.max(6, Math.min(94, x + sign * 10));
  return (
    <div className="ab-pitch4">
      <svg viewBox="0 0 100 64" role="img" aria-label={`축구 경기장, ${phaseLabel}`}>
        <rect width="100" height="64" fill="#23432d" />
        {[0, 2, 4, 6, 8].map(n => <rect key={n} x={n * 10} width="10" height="64" fill="#294c33" />)}
        <g fill="none" stroke="#b8ccb9" strokeWidth=".4" opacity=".7">
          <rect x="4" y="4" width="92" height="56" />
          <path d="M50 4V60" />
          <circle cx="50" cy="32" r="8" />
          <path d="M4 17H18V47H4 M96 17H82V47H96 M4 25H9V39H4 M96 25H91V39H96" />
          <path d="M18 25Q26 32 18 39 M82 25Q74 32 82 39" />
          <path d="M4 28H1.5V36H4 M96 28H98.5V36H96" />
        </g>
        <g fill="#b8ccb9" opacity=".7">
          <circle cx="50" cy="32" r=".55" />
          <circle cx="13.5" cy="32" r=".55" />
          <circle cx="86.5" cy="32" r=".55" />
        </g>
        {active ? (
          <g stroke="#ff7c32" fill="none" strokeWidth="1.2" opacity=".8">
            <path d={`M${x} ${y}H${tip} M${tip - sign * 3} ${y - 2}L${tip} ${y}L${tip - sign * 3} ${y + 2}`} />
          </g>
        ) : null}
        {active ? (
          <g className="ab-pitch4__ball" style={{ transform: `translate(${x}px, ${y}px)` }}>
            <circle r="2.6" fill="#ff641f" opacity=".2" />
            <circle r="1.25" fill="#f5f4f4" stroke="#111" strokeWidth=".3" />
          </g>
        ) : null}
      </svg>
      <span className="ab-pitch4__phase">{phaseLabel}</span>
    </div>
  );
}
