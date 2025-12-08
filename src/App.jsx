// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  FiHome,
  FiMap,
  FiMessageCircle,
  FiUsers,
  FiCoffee,
  FiCompass,
  FiMapPin,
  FiUserPlus,
  FiUser,
  FiLock,
  FiClock,
  FiList,
  FiArrowRight,
  FiCalendar
} from 'react-icons/fi';
import FLIPLogo from "./assets/flip-logo-nobg.png"; // keep your correct path

function LogoHeader() {
  return (
    <div className="brand-header">
      <img
        src={FLIPLogo}
        alt="FLIP logo"
        className="brand-logo"
        style={{ width: 32, height: "auto" }}  // 👈 hard limit the size
      />
    </div>
  );
}




function Screen({ id, active, children }) {
  return (
    <div className={`screen${active ? ' active' : ''}`} id={id}>
      {children}
    </div>
  );
}

function BottomNav({ current, goto }) {
  return (
    <div className="bottom-nav">
      <button
        className={`nav-item${current === 'dashboard' ? ' active' : ''}`}
        onClick={() => goto('dashboard')}
      >
        <FiHome />
        <span>Home</span>
      </button>
      <button
        className={`nav-item${current === 'map' ? ' active' : ''}`}
        onClick={() => goto('map')}
      >
        <FiMap />
        <span>Map</span>
      </button>
      <button
        className={`nav-item${current === 'chats' ? ' active' : ''}`}
        onClick={() => goto('chats')}
      >
        <FiMessageCircle />
        <span>Chats</span>
      </button>

       <button
        className={`nav-item${current === 'profile' ? ' active' : ''}`}
        onClick={() => goto('profile')}
      >
        <FiUser />
        <span>Profile</span>
      </button>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('welcome');

  // fake timer/points for hangout screen
  const [seconds, setSeconds] = useState(37 * 60 + 12);
  const [points, setPoints] = useState(37);

  // swipe between dashboard, map, chats
  const swipeOrder = ['dashboard', 'map', 'chats'];
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    if (screen !== 'hangout') return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
      setPoints((p) => p + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [screen]);

  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  const goto = (id) => setScreen(id);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const threshold = 50; // px
    setTouchStartX(null);

    if (Math.abs(deltaX) < threshold) return;

    const direction = deltaX < 0 ? 'left' : 'right';
    const idx = swipeOrder.indexOf(screen);
    if (idx === -1) return;

    if (direction === 'left' && idx < swipeOrder.length - 1) {
      setScreen(swipeOrder[idx + 1]);
    } else if (direction === 'right' && idx > 0) {
      setScreen(swipeOrder[idx - 1]);
    }
  };

  return (
    <div className="device-wrapper">
      {/* decorative side buttons */}
      <div className="side-button left-long" />
      <div className="side-button left-short" />
      <div className="side-button right-power" />

      <div className="device">
        <div className="device-inner">
          <div className="notch" />

          <div className="status-bar">FLIP · React Prototype</div>

          <div
            className="app"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* WELCOME */}
            <Screen id="screen-welcome" active={screen === 'welcome'}>
              {/* App Logo for Welcome screen */}
              <div className="welcome-logo-wrap">
                <img src={FLIPLogo} alt="FLIP Logo" className="welcome-logo" />
              </div>

              <div style={{ marginTop: 40 }} />
              <div className="pill">Prototype · Tap or swipe</div>
              <div className="title">Turn screen time into real-life time.</div>
              <div className="subtitle">
                FLIP helps you swap endless scrolling for real-world
                hangouts, deeper friendships, and time in your local third
                places.
              </div>

              <button
                className="btn btn-primary"
                onClick={() => goto('dashboard')}
              >
                Get Started
              </button>

              <button className="btn btn-ghost" onClick={() => goto('how')}>
                Learn How It Works
              </button>

              <div className="footer-hint">
                Made for class – no real data, just a clickable demo.
              </div>
            </Screen>

            {/* HOW IT WORKS */}
            <Screen id="screen-how" active={screen === 'how'}>
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('welcome')}>
                  ←
                </button>
                <div className="back-title">How it works</div>
              </div>

              <div className="card">
                <h3>Meet to add friends</h3>
                <p>
                  You can only connect by scanning each other’s QR code while
                  standing together in person.
                </p>
              </div>

              <div className="card">
                <h3>Chats that depend on real life</h3>
                <p>
                  Group chats stay active only if your group actually meets up
                  a few times a month. No more ghost groups.
                </p>
              </div>

              <div className="card">
                <h3>Discover third places near you</h3>
                <p>
                  Find cafés, parks, libraries, and community spots that are
                  perfect for talking, studying, or just hanging out.
                </p>
              </div>

              <div className="card">
                <h3>Earn rewards for showing up</h3>
                <p>
                  Local businesses offer small discounts when friends check in
                  together and put their phones away.
                </p>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => goto('dashboard')}
              >
                Continue to app
              </button>
            </Screen>

            {/* DASHBOARD */}
            <Screen id="screen-dashboard" active={screen === 'dashboard'}>
              {/* App Logo */}
              <LogoHeader />

              <div className="back-row">
                <button className="back-btn" onClick={() => goto('welcome')}>
                  ←
                </button>
                <div className="back-title">Today in FLIP</div>
              </div>

              <div
                className="card"
                style={{
                  background: '#eff6ff',
                  borderColor: '#bfdbfe',
                }}
              >
                <div className="section-label">Today’s IRL goal</div>
                <h3>60 minutes face-to-face</h3>
                <p>
                  Plan one real-world hangout today. Any activity counts as long
                  as you’re together and mostly off your phones.
                </p>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: 12 }}
                  onClick={() => goto('plan-1')}
                >
                  Plan a hangout
                </button>
              </div>

              <div className="section-label" style={{ marginTop: 16 }}>
                Nearby third places
              </div>

              <div className="card">
                <h3>
                  <FiCoffee style={{ marginRight: 6 }} />
                  Café Luna · 0.4 miles
                </h3>
                <p>
                  Quiet tables, good coffee, perfect for conversation or study.
                </p>
              </div>

              <div className="card">
                <h3>
                  <FiCompass style={{ marginRight: 6 }} />
                  City Park · 0.7 miles
                </h3>
                <p>Walk-and-talk loop with benches and open grass.</p>
              </div>

              <div className="card">
                <h3>
                  <FiUsers style={{ marginRight: 6 }} />
                  Board Game Hub · 1.2 miles
                </h3>
                <p>Community game nights. Great for meeting new people offline.</p>
              </div>

              <button
                className="btn btn-secondary"
                style={{ marginTop: 6 }}
                onClick={() => goto('rewards')}
              >
                View FLIP rewards
              </button>

              <button
                className="btn btn-ghost"
                style={{ marginTop: 6 }}
                onClick={() => goto('stats')}
              >
                View your progress
              </button>

              <button
                className="btn btn-ghost"
                style={{ marginTop: 6 }}
                onClick={() => goto("plan-builder")}
              >
                Open plan builder
              </button>


              <BottomNav current={screen} goto={goto} />


              <div className="link" onClick={() => goto('hangout')}>
                Preview “Hangout in progress” screen →
              </div>

              <BottomNav current={screen} goto={goto} />
            </Screen>

            {/* PLAN HANGOUT STEP 1 */}
            <Screen id="screen-plan-1" active={screen === 'plan-1'}>
              <div className="back-row">
                <button
                  className="back-btn"
                  onClick={() => goto('dashboard')}
                >
                  ←
                </button>
                <div className="back-title">Plan a hangout</div>
              </div>

              <div className="input-group">
                <label className="input-label">What do you want to do?</label>
                <select className="input" defaultValue="Grab coffee">
                  <option>Grab coffee</option>
                  <option>Study session</option>
                  <option>Walk &amp; talk</option>
                  <option>Game night</option>
                  <option>Just catch up</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Where?</label>
                <select className="input" defaultValue="Café Luna">
                  <option>Café Luna</option>
                  <option>City Park</option>
                  <option>Board Game Hub</option>
                  <option>Public Library</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">When?</label>
                <input
                  className="input"
                  type="text"
                  defaultValue="Today · 5:00 – 6:30 PM"
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={() => goto('plan-2')}
              >
                Next: invite friends
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => goto('dashboard')}
              >
                Cancel
              </button>
            </Screen>

            {/* PLAN HANGOUT STEP 2 */}
            <Screen id="screen-plan-2" active={screen === 'plan-2'}>
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('plan-1')}>
                  ←
                </button>
                <div className="back-title">Invite friends</div>
              </div>

              <div className="card">
                <div className="section-label">Suggested</div>
                <h3>Alex, Maya, Jordan</h3>
                <p>Friends you’ve met with recently in FLIP.</p>
              </div>

              <button className="btn btn-secondary">Add from contacts</button>

              <button className="btn btn-ghost" onClick={() => goto('qr')}>
                Show my QR code
              </button>

              <button className="btn btn-primary" onClick={() => goto('hangout')}>
                Create hangout
              </button>
            </Screen>

            {/* QR MEET TO ADD */}
            <Screen id="screen-qr" active={screen === 'qr'}>
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('plan-2')}>
                  ←
                </button>
                <div className="back-title">Add me in person</div>
              </div>

              <div className="qr-box">
                <div className="qr-inner" />
              </div>

              <div className="center">
                <div style={{ fontWeight: 600, marginBottom: 3 }}>
                  @ken_crabtree
                </div>
                <div
                  className="muted"
                  style={{ maxWidth: 260, margin: '0 auto' }}
                >
                  Ask your friend to scan this code while you’re together to
                  connect. You can’t add people from a distance.
                </div>

                <div className="pill-status">
                  <span
                    style={{
                      display: 'inline-block',
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      background: 'var(--success)',
                    }}
                  />
                  Ready to scan in person
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => goto('hangout')}>
                Start hangout with new friend
              </button>
            </Screen>

            {/* HANGOUT IN PROGRESS */}
            <Screen id="screen-hangout" active={screen === 'hangout'}>
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('dashboard')}>
                  ←
                </button>
                <div className="back-title">Hangout in progress</div>
              </div>

              <div className="section-label">Location</div>
              <div className="card">
                <h3>Café Luna · 3 friends</h3>
                <p>
                  Phones face-down, conversation on. Tap “End” when you’re done.
                </p>
              </div>

              <div className="center" style={{ marginTop: 22 }}>
                <div className="timer">
                  {hours}:{mins}:{secs}
                </div>
                <div className="points">+{points} IRL points</div>
                <div className="muted">
                  Time spent with your phone minimized.
                </div>
              </div>

              <button className="btn btn-primary" style={{ marginTop: 24 }}>
                Pause / lock phone
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => goto('dashboard')}
              >
                End hangout
              </button>

              <div className="footer-hint">
                “Real connection starts when the screen goes dark.”
              </div>
            </Screen>

            {/* IRL REWARDS */}
            <Screen id="screen-rewards" active={screen === 'rewards'}>
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('dashboard')}>
                  ←
                </button>
                <div className="back-title">IRL rewards</div>
              </div>

              <div className="card">
                <h3>Café Luna · 5% off drink</h3>
                <p>
                  Check in with at least one friend and spend 30+ minutes in
                  focus mode.
                </p>
                <div className="rewards-row">
                  <span className="muted">Cost: 20 IRL points</span>
                  <span className="badge">Available</span>
                </div>
              </div>

              <div className="card">
                <h3>City Park Smoothies · free topping</h3>
                <p>Complete 2 outdoor hangouts this week before Sunday night.</p>
                <div className="rewards-row">
                  <span className="muted">Cost: 15 IRL points</span>
                  <span className="badge">Weekly</span>
                </div>
              </div>

              <div className="card">
                <h3>Local Bookstore · 10% off</h3>
                <p>
                  Join a book club meetup hosted through FLIP once this
                  month.
                </p>
                <div className="rewards-row">
                  <span className="muted">Cost: 30 IRL points</span>
                  <span className="badge">Limited</span>
                </div>
              </div>
            </Screen>

            {/* STATS / PROGRESS */}
            <Screen id="screen-stats" active={screen === 'stats'}>
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('dashboard')}>
                  ←
                </button>
                <div className="back-title">Your progress</div>
              </div>

            {/* Level + XP */}
            <div className="card">
              <div className="section-label">Level</div>
              <h3>Level 4 · Social Explorer</h3>
              <p>
                You’re leveling up by replacing doomscrolling with real-world experience. 
                Keep showing up to reach the next rank.
              </p>

              <div className="xp-label-row">
                <span className="xp-current">1450 XP</span>
                <span className="xp-total">2000 XP to Level 5</span>
              </div>

              <div className="xp-bar">
                <div className="xp-bar-fill" style={{ width: '72%' }} />
              </div>

              {/* Next milestone */}
              <div className="milestone-box">
                <div className="milestone-title">Next milestone</div>
                <div className="milestone-text">
                    Do one 30-minute phone-free hangout with a new person to earn{' '}
                    <strong>+150 XP</strong> and unlock <strong>Level 5</strong>.
                </div>      
              </div>

              <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
                Prototype uses sample data — a real app would pull this from tracked
                hangouts and focus mode sessions.
              </div>
            </div>

            {/* Weekly stats */}
            <div className="card">
              <div className="section-label">This week</div>
              <h3>Face-to-face time</h3>
              <p>
                <strong>214 minutes</strong> in real-life hangouts logged so far this
                week.
              </p>

              <div className="stats-row">
                <div className="stat-number">71%</div>
                <div className="stat-label">of 300 min weekly goal</div>
              </div>

              <div className="stat-grid">
                <div className="stat-pill">
                  <div className="stat-pill-number">5</div>
                  <div className="stat-pill-label">Phone-free sessions</div>
                </div>
                <div className="stat-pill">
                  <div className="stat-pill-number">3</div>
                  <div className="stat-pill-label">Day streak</div>
                </div>
                <div className="stat-pill">
                  <div className="stat-pill-number">3.5h</div>
                  <div className="stat-pill-label">Scrolling replaced</div>
                </div>
              </div>
            </div>

            {/* Badges / achievements */}
            <div className="card">
              <div className="section-label">Achievements</div>
              <h3>Little wins that add up!</h3>
              <p>
                Each badge marks a step away from phone addiction and toward real life.
              </p>

              <div className="badge-row">
                <div className="badge-pill badge-gold">First 60-min hangout</div>
                <div className="badge-pill badge-blue">3 days in a row</div>
                <div className="badge-pill badge-green">Phone-free café session</div>
                <div className="badge-pill badge-purple">Tried a new third place</div>
              </div>
            </div>
            
          </Screen>

            {/* MAP / THIRD PLACES */}
            <Screen id="screen-map" active={screen === 'map'}>
              <LogoHeader />
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('dashboard')}>
                  ←
                </button>
                <div className="back-title">Third places near you</div>
              </div>

              <div className="map-box">
                <div className="map-pin pin-1">
                  <span>Café Luna</span>
                </div>
                <div className="map-pin pin-2">
                  <span>City Park</span>
                </div>
                <div className="map-pin pin-3">
                  <span>Board Game Hub</span>
                </div>
              </div>

              <div className="section-label" style={{ marginTop: 14 }}>
                Spots
              </div>

              
              <div className="card">
                <h3>City Park</h3>
                <p>Walking loop · Benches · Great for phone-free walks.</p>
              </div>
              <div className="card">
                <h3>Board Game Hub</h3>
                <p>Open table nights · Easy way to meet new people offline.</p>
              </div>

                {/* Midpoint finder entry */}
                <button
                  className="btn btn-secondary"
                  style={{ marginTop: 8, marginBottom: 4 }}
                  onClick={() => goto("midpoint")}
                >
                  <FiMapPin style={{ marginRight: 6 }} />
                  Find a fair meetup spot
                </button>

              <button className="btn btn-secondary"
                style={{ marginRight: 6 }} 
                onClick={() => goto('nearby')}
              >
                <FiMapPin style={{ marginRight: 6 }} />
                See people nearby
              </button>

              <BottomNav current={screen} goto={goto} />
            </Screen>

            {/* PLAN BUILDER + SHARED TO-DO */}
            <Screen id="screen-plan-builder" active={screen === "plan-builder"}>
              <LogoHeader />

              <div className="back-row">
                <button className="back-btn" onClick={() => goto("dashboard")}>
                  ←
                </button>
                <div className="back-title">Plan builder</div>
              </div>

              {/* Plan summary */}
              <div className="card">
                <div className="section-label">Plan details</div>
                <h3>Sunset walk &amp; coffee</h3>
                <p>
                  This is what your friends see when you share a hangout: simple, clear,
                  and focused on the real-life experience.
                </p>

                <div className="plan-row">
                  <FiMapPin className="plan-icon" />
                  <div>
                    <div className="plan-label">Where</div>
                    <div className="plan-value">City Park → Café Luna</div>
                  </div>
                </div>

                <div className="plan-row">
                  <FiClock className="plan-icon" />
                  <div>
                    <div className="plan-label">When</div>
                    <div className="plan-value">Today · 6:30–8:00 PM</div>
                  </div>
                </div>

                <div className="plan-row">
                  <FiUsers className="plan-icon" />
                  <div>
                    <div className="plan-label">Who</div>
                    <div className="plan-value">You, Alex, Maya · open to 1–2 more</div>
                  </div>
                </div>

                <div className="plan-row">
                  <FiList className="plan-icon" />
                  <div>
                    <div className="plan-label">Vibe</div>
                    <div className="plan-value">
                      Walk, talk, decompress, then grab a drink. Phones mostly away.
                    </div>
                  </div>
                </div>
              </div>

              {/* Shared to-do list */}
              <div className="card">
                <div className="section-label">Shared to-do list</div>
                <h3>Who&apos;s bringing what?</h3>
                <p>
                  Everyone in the hangout can see and edit this list so planning doesn&apos;t
                  turn into 40 messages.
                </p>

                <ul className="todo-list">
                  <li className="todo-item done">
                    <span className="todo-check" />
                    <span className="todo-text">Water bottles</span>
                    <span className="todo-tag">You</span>
                  </li>
                  <li className="todo-item">
                    <span className="todo-check" />
                    <span className="todo-text">Deck of cards / small game</span>
                    <span className="todo-tag">Alex</span>
                  </li>
                  <li className="todo-item">
                    <span className="todo-check" />
                    <span className="todo-text">Playlist ideas</span>
                    <span className="todo-tag">Maya</span>
                  </li>
                  <li className="todo-item">
                    <span className="todo-check" />
                    <span className="todo-text">Snack to share</span>
                    <span className="todo-tag">Unclaimed</span>
                  </li>
                </ul>

                <div className="todo-add-row">
                  <input
                    className="text-input"
                    placeholder="Add item (prototype only, not saved)"
                  />
                  <button className="btn-small" type="button">
                    +
                  </button>
                </div>

                <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
                  In a real app this list would sync live between everyone invited to the
                  hangout.
                </div>
              </div>

              <BottomNav current={screen} goto={goto} />
            </Screen>


            {/* PEOPLE NEARBY */}
            <Screen id="screen-nearby" active={screen === 'nearby'}>
              <LogoHeader />
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('map')}>
                  ←
                </button>
                <div className="back-title">People nearby</div>
              </div>

              <div className="nearby-pill">
                <span className="nearby-dot" />
                Location sharing ON (demo)
              </div>

                <div className="subtitle" style={{ marginTop: 8 }}>
                  These are people within about a 1 mile radius who have opted in to being
                  discoverable for in-person meetups.
                </div>

                <div className="card nearby-card">
                  <div className="nearby-row">
                    <div className="avatar avatar-1">A</div>
                    <div className="nearby-main">
                      <div className="nearby-name">Alex (21)</div>
                      <div className="nearby-meta">Wants: coffee & study session</div>
                      <div className="nearby-distance">0.3 miles · at Café Luna</div>
                    </div>
                    <button className="nearby-action">
                      <FiUserPlus />
                    </button>
                  </div>
                </div>

                <div className="card nearby-card">
                  <div className="nearby-row">
                    <div className="avatar avatar-2">M</div>
                    <div className="nearby-main">
                      <div className="nearby-name">Maya (19)</div>
                      <div className="nearby-meta">Looking for: walk & talk break</div>
                      <div className="nearby-distance">0.6 miles · heading to City Park</div>
                    </div>
                    <button className="nearby-action">
                      <FiUserPlus />
                    </button>
                  </div>
                </div>

                <div className="card nearby-card">
                  <div className="nearby-row">
                    <div className="avatar avatar-3">J</div>
                    <div className="nearby-main">
                      <div className="nearby-name">Jordan (20)</div>
                      <div className="nearby-meta">Board games · open to new people</div>
                      <div className="nearby-distance">1.1 miles · at Board Game Hub</div>
                    </div>
                    <button className="nearby-action">
                      <FiUserPlus />
                    </button>
                  </div>
                </div>

                <div className="footer-hint">
                  In a real version, this screen would use location permissions and only show
                  people who opt in to being discovered for in-person meetups.
                </div>         
              </Screen>

              {/* MIDPOINT FINDER */}
              <Screen id="screen-midpoint" active={screen === "midpoint"}>
                <LogoHeader />

                <div className="back-row">
                  <button className="back-btn" onClick={() => goto("map")}>
                    ←
                  </button>
                  <div className="back-title">Midpoint finder</div>
                </div>

                <div className="card midpoint-card">
                  <div className="section-label">Step 1</div>
                  <h3>Where are you both coming from?</h3>
                  <p>
                    In a real app this would use location services. For the prototype, think
                    of these as rough neighborhoods or campuses.
                  </p>

                  <div className="form-row">
                    <label className="field-label">Your area</label>
                    <input
                      className="text-input"
                      placeholder="e.g. Campus A, Downtown, North Side"
                    />
                  </div>

                  <div className="form-row">
                    <label className="field-label">Friend&apos;s area</label>
                    <input
                      className="text-input"
                      placeholder="e.g. Campus B, East Side, Near mall"
                    />
                  </div>
                </div>

                <div className="card">
                  <div className="section-label">Step 2</div>
                  <h3>Suggested midpoint</h3>
                  <p>
                    Based on travel time, we pick somewhere roughly in the middle that also
                    works as a &quot;third place&quot; — not home, not work, but a neutral
                    place to connect.
                  </p>

                  <div className="midpoint-spot">
                    <div className="midpoint-icon">
                      <FiMapPin />
                    </div>
                    <div>
                      <div className="midpoint-name">City Park · Main entrance</div>
                      <div className="midpoint-meta">
                        About 10–12 min from both of you · benches · walking paths
                      </div>
                    </div>
                  </div>

                  <ul className="midpoint-list">
                    <li>Feels fair — similar travel effort for both people.</li>
                    <li>Public, open space that&apos;s safe and low-pressure.</li>
                    <li>Easy to extend into a walk, coffee, or group meetup.</li>
                  </ul>

                  <button
                    className="btn btn-secondary"
                    style={{ marginTop: 10 }}
                    onClick={() => goto("plan-builder")}
                  >
                    <FiArrowRight style={{ marginRight: 6 }} />
                    Turn this into a hangout plan
                  </button>
                </div>

                <div className="footer-hint">
                  In the real app, this would use live maps, travel time, and safety filters
                  to suggest smart meet-in-the-middle locations.
                </div>
              </Screen>


            {/* CHAT LIST */}
            <Screen id="screen-chats" active={screen === 'chats'}>
              <LogoHeader />
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('dashboard')}>
                  ←
                </button>
                <div className="back-title">Chats</div>
              </div>

              <div className="card chat-card" onClick={() => goto('chat-room')}>
                <div className="chat-title">
                  <FiUsers style={{ marginRight: 8 }} />
                  Café Crew
                </div>
                <div className="chat-preview">
                  “Same time at Café Luna tonight?”
                </div>
                <div className="chat-meta">3 people · Active · 5m ago</div>
              </div>

              <div className="card chat-card" onClick={() => goto('chat-room')}>
                <div className="chat-title">
                  <FiUsers style={{ marginRight: 8 }} />
                  Study Buddies
                </div>
                <div className="chat-preview">
                  “Let’s do a phone-free cram session.”
                </div>
                <div className="chat-meta">4 people · Quiet · 2h ago</div>
              </div>

              <div className="card chat-card" onClick={() => goto('chat-room')}>
                <div className="chat-title">
                  <FiUsers style={{ marginRight: 8 }} />
                  Game Night Group
                </div>
                <div className="chat-preview">
                  “Board Game Hub on Friday?”
                </div>
                <div className="chat-meta">5 people · Planning</div>
              </div>

              <button className="btn btn-primary">
                <FiMessageCircle style={{ marginRight: 6 }} />
                New group chat (in person)
              </button>

              <BottomNav current={screen} goto={goto} />
            </Screen>

            {/* CHAT ROOM MOCKUP */}
            <Screen id="screen-chat-room" active={screen === 'chat-room'}>
              <LogoHeader />
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('chats')}>
                  ←
                </button>
                <div className="back-title">Café Crew</div>
              </div>

              <div className="chat-room">
                <div className="bubble-row left">
                  <div className="bubble">
                    “Anyone up for a phone-free coffee later?”
                  </div>
                </div>
                <div className="bubble-row right">
                  <div className="bubble bubble-own">
                    “I’m in. 6pm at Café Luna?”
                  </div>
                </div>
                <div className="bubble-row left">
                  <div className="bubble">
                    “Perfect, let’s start a hangout in the app so it tracks.”
                  </div>
                </div>
              </div>

              <div className="chat-input-row">
                <input
                  className="chat-input"
                  type="text"
                  placeholder="Send a message…"
                />
                <button className="chat-send-btn">
                  <FiMessageCircle />
                </button>
              </div>
            </Screen>

            {/* PROFILE */}
            <Screen id="screen-profile" active={screen === 'profile'}>
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('dashboard')}>
                  ←
                </button>
                <div className="back-title">Your profile</div>
              </div>

              {/* Header */}
              <div className="card profile-header">
                <div className="profile-avatar">K</div>
                <div className="profile-main">
                  <div className="profile-name">
                    <FiUser style={{ marginRight: 6 }} />
                    Ken Crabtree
                  </div>
                  <div className="profile-handle">@ken_crabtree</div>
                  <div className="profile-meta">Student · Bay Area · Third-place explorer</div>
                </div>
              </div>

              <button className="btn btn-ghost" onClick={() => goto('qr')}>
                Show my QR code
              </button>

              {/* IRL summary */}
              <div className="card">
                <div className="section-label">IRL summary</div>
                <h3>Level 4 · Social Explorer</h3>
                <p>
                  <strong>1450 IRL XP</strong> · <strong>214 min</strong> this week ·{' '}
                  <strong>5</strong> phone-free sessions · <strong>3-day</strong> streak.
                </p>

                <div className="xp-bar" style={{ marginTop: 10 }}>
                  <div className="xp-bar-fill" style={{ width: '72%' }} />
                </div>

                <button
                className="btn btn-ghost"
                style={{ marginTop: 6 }}
                onClick={() => goto("collections")}
                >
                View Collections
                </button>

                <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
                  Your profile grows only when you do things offline — hangouts, focus mode,
                  and trying new third places.
                </div>
              </div>

              {/* Friends summary */}
              <div className="card">
                <div className="section-label">Friends</div>
                <h3>23 friends · 12 active in FLIP this month</h3>
                <p>
                  Your friends list is built from people you’ve actually met in person and
                  scanned with your QR code. No ghost friends, only real connections.
                </p>

                <button
                  className="btn btn-secondary"
                  style={{ marginTop: 10 }}
                  onClick={() => goto('friends')}
                >
                  View all friends
                </button>
              </div>

              {/* Posting power */}
              <div className="card">
                <div className="section-label">Posting power</div>
                <h3>IRL-limited social feed</h3>
                <p>
                  To keep this from becoming another doomscroll app, posting and certain
                  features are limited by your IRL points.
                </p>

                <div className="posting-row">
                  <div className="posting-info">
                    <div className="posting-number">2</div>
                    <div className="posting-label">posts left today</div>
                  </div>
                  <div className="posting-bar">
                    <div className="posting-bar-fill" style={{ width: '40%' }} />
                  </div>
                </div>

                <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
                  Earn more post credits by joining real hangouts instead of scrolling.
                </div>          
              </div>

              {/* Sample posts / locked content */}
              <div className="card">
                <div className="section-label">Your moments</div>
                <h3>Recent IRL posts</h3>
                <p style={{ marginBottom: 10 }}>
                  Prototype view: simple text posts tied to real places, not viral content.
                </p>

                <div className="feed-item">
                  <div className="feed-title">Coffee with Alex at Café Luna ☕</div>
                  <div className="feed-meta">Yesterday · 45 min phone-free</div>
                </div>

                <div className="feed-item">
                  <div className="feed-title">Sunset walk at City Park 🌅</div>
                  <div className="feed-meta">2 days ago · 35 min phone-free</div>
                </div>

                <div className="feed-item feed-locked">
                  <div className="feed-title">
                    <FiLock style={{ marginRight: 6 }} />
                    More posts locked
                  </div>
                  <div className="feed-meta">
                    Do one more hangout this week to unlock extra posts.
                  </div>
                </div>
                </div>
              </Screen>

              {/* COLLECTIONS */}
              <Screen id="screen-collections" active={screen === 'collections'}>
                <LogoHeader />

                <div className="back-row">
                  <button className="back-btn" onClick={() => goto('profile')}>
                    ←
                  </button>
                  <div className="back-title">Collections</div>
                </div>

                <div className="subtitle" style={{ marginBottom: 10 }}>
                  Everything you&apos;ve discovered through real-life experiences.
                </div>

                {/* Coffee spots collection */}
                <div className="collection-block">
                  <h3 className="collection-title">Coffee spots ☕</h3>
                  <div className="collection-grid">
                    <div className="collection-item unlocked">Café Luna</div>
                    <div className="collection-item unlocked">Bean &amp; Co.</div>
                    <div className="collection-item locked">???</div>
                  </div>
                </div>

                {/* Parks collection */}
                <div className="collection-block">
                  <h3 className="collection-title">Parks &amp; nature 🌿</h3>
                  <div className="collection-grid">
                    <div className="collection-item unlocked">City Park</div>
                    <div className="collection-item unlocked">Greenway Trails</div>
                    <div className="collection-item locked">???</div>
                  </div>
                </div>

                {/* People you met */}
                <div className="collection-block">
                  <h3 className="collection-title">People you&apos;ve met 👥</h3>
                  <div className="collection-grid">
                    <div className="collection-item unlocked">Alex</div>
                    <div className="collection-item unlocked">Jordan</div>
                    <div className="collection-item locked">???</div>
                  </div>
                </div>

                {/* Events attended */}
                <div className="collection-block">
                  <h3 className="collection-title">Events attended 🎉</h3>
                  <div className="collection-grid">
                    <div className="collection-item unlocked">Board game night</div>
                    <div className="collection-item unlocked">Sunset walk</div>
                    <div className="collection-item locked">???</div>
                  </div>
                </div>

                <div className="footer-hint">
                  In a real app, these would unlock automatically when you visit new places,
                  attend events, or meet people in person.
                </div>

                <BottomNav current={screen} goto={goto} />
              </Screen>


              {/* FRIENDS LIST */}
              <Screen id="screen-friends" active={screen === 'friends'}>
                <LogoHeader />
                <div className="back-row">
                  <button className="back-btn" onClick={() => goto('profile')}>
                    ←
                  </button>
                  <div className="back-title">Your friends</div>
                </div>

                <div className="friends-pill">
                  <span className="friends-dot" />
                  23 friends · IRL-verified only
                </div>

                <div className="subtitle" style={{ marginTop: 8 }}>
                  Everyone here has been added by scanning each other’s QR codes in person.
                  No random follows, no bots — just people you actually know.
                </div>

                <div className="card friend-card">
                  <div className="friend-row">
                  <div className="friend-avatar friend-a">A</div>
                    <div className="friend-main">
                      <div className="friend-name">Alex</div>
                      <div className="friend-meta">Last hangout: 2 days ago · Café Luna</div>
                      <div className="friend-tag">Study buddy · Coffee runs</div>
                    </div>
                    <button className="friend-action">
                      Invite to hangout
                    </button>
                  </div>
                </div>

                <div className="card friend-card">
                  <div className="friend-row">
                    <div className="friend-avatar friend-m">M</div>
                    <div className="friend-main">
                      <div className="friend-name">Maya</div>
                      <div className="friend-meta">Last hangout: 5 days ago · City Park</div>
                      <div className="friend-tag">Walk & talk · Mental health check-ins</div>
                    </div>
                    <button className="friend-action">
                      Invite to hangout
                    </button>
                  </div>
                </div>

                <div className="card friend-card">
                  <div className="friend-row">
                    <div className="friend-avatar friend-j">J</div>
                    <div className="friend-main">
                      <div className="friend-name">Jordan</div>
                      <div className="friend-meta">Last hangout: 1 week ago · Board Game Hub</div>
                      <div className="friend-tag">Game nights · New people</div>
                    </div>
                    <button className="friend-action">
                      Invite to hangout
                    </button>
                  </div>
                </div>

                <div className="footer-hint">
                  In a real version, this screen would show filters, mutual third places, and
                  quick actions to start IRL-focused group chats.
                </div>
              </Screen>
          </div>
        </div>
      </div>
    </div>
  );
}
