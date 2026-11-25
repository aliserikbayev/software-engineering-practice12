import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { checkAvailability } from "./domain/availability";
import { INITIAL_BOOKINGS, ROOM } from "./domain/fixtures";

function localClock(date: Date): string {
  return String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0");
}

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [start, setStart] = useState(() => { const next = new Date(); next.setMinutes(next.getMinutes() + 60); return localClock(next); });
  const [duration, setDuration] = useState("60");
  const [blocked, setBlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const result = useMemo(() => checkAvailability({
    start, durationMinutes: Number(duration), now, blocked, bookings: INITIAL_BOOKINGS,
  }), [start, duration, now, blocked]);

  function runCheck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChecked(true);
  }

  return <main className="shell">
    <header className="topbar">
      <a className="brand" href="#"><span className="brand-mark">SC</span><span>SMART CAMPUS</span></a>
      <span className="demo-label">FICTIONAL DEMO</span>
    </header>
    <section className="intro">
      <p className="eyebrow">SPACE MANAGEMENT / ROOM 204</p>
      <h1>Find your room.<br/><em>Make it happen.</em></h1>
      <p className="lead">Check whether a campus room is free before you plan your next session.</p>
    </section>
    <section className="workspace" aria-label="Room availability checker">
      <div className="room-card">
        <div className="room-visual"><span className="visual-grid"/><span className="room-number">204</span><span className="visual-caption">ENGINEERING BLOCK B</span></div>
        <div className="room-info">
          <div className="room-heading"><div><p className="eyebrow">SELECTED SPACE</p><h2>{ROOM.name}</h2></div><span className={blocked ? "status-pill closed" : "status-pill"}><i/>{blocked ? "Blocked" : "Bookable"}</span></div>
          <div className="room-meta"><span>⌂ {ROOM.building}</span><span>◷ Capacity {ROOM.capacity}</span></div>
        </div>
      </div>
      <div className="checker-card">
        <div className="card-title"><div><p className="eyebrow">01 — YOUR REQUEST</p><h2>When do you need it?</h2></div><span className="step">01 / 02</span></div>
        <form onSubmit={runCheck}>
          <div className="field-grid">
            <label className="field"><span>START TIME</span><input type="time" value={start} onChange={e => {setStart(e.target.value);setChecked(false);}} required/></label>
            <label className="field"><span>DURATION</span><div className="input-with-unit"><input type="number" min="1" max="120" step="1" value={duration} onChange={e => {setDuration(e.target.value);setChecked(false);}} required/><span>MIN</span></div></label>
          </div>
          <div className="now-row"><span>DEMO CURRENT TIME</span><input aria-label="Demo current time" type="time" value={localClock(now)} onChange={e => {const [h,m]=e.target.value.split(":").map(Number);const next=new Date(now);next.setHours(h,m,0,0);setNow(next);setChecked(false);}}/></div>
          <label className="toggle-row"><span><b>Room status</b><small>Simulate a temporary room closure</small></span><input type="checkbox" checked={blocked} onChange={e => {setBlocked(e.target.checked);setChecked(false);}}/><span className="toggle-ui"/></label>
          <button className="check-button" type="submit">Check availability <span>↗</span></button>
        </form>
      </div>
      <div className="result-card" aria-live="polite">
        <div className="result-top"><p className="eyebrow">02 — AVAILABILITY RESULT</p><span className="live-dot">● LIVE RULE CHECK</span></div>
        {!checked ? <div className="empty-result"><span className="result-icon">↗</span><div><h2>Ready when you are.</h2><p>Enter your preferred time and check the room against its existing bookings.</p></div></div> :
          <div className={result.available ? "decision available" : "decision unavailable"}><span className="decision-icon">{result.available ? "✓" : "!"}</span><div><p className="decision-label">{result.available ? "GOOD NEWS" : "NOT AVAILABLE"} · {result.reasonCode}</p><h2>{result.available ? "Room is available." : "Room is unavailable."}</h2><p>{result.message}</p></div></div>}
        <div className="result-foot"><span>FIXED SCHEDULE · READ ONLY</span><span>No bookings are changed</span></div>
      </div>
    </section>
    <section className="schedule">
      <div className="schedule-heading"><div><p className="eyebrow">ROOM 204 / TODAY</p><h2>Existing bookings</h2></div><span className="booking-count">04 BOOKINGS</span></div>
      <div className="booking-list">{INITIAL_BOOKINGS.map((booking,index)=><article className="booking" key={booking.id}><span className="booking-index">0{index+1}</span><div className="booking-time">{booking.start}<span>—</span>{booking.end}</div><div className="booking-name">{booking.title}</div><span className="booking-state">RESERVED</span></article>)}</div>
    </section>
    <footer><span>SMART CAMPUS · SOFTWARE ENGINEERING PRACTICE</span><span>DEMO DATA ONLY · NO PERSONAL INFORMATION</span></footer>
  </main>;
}