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
  FiUserPlus
} from 'react-icons/fi';

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

          <div className="status-bar">IRL Sync · React Prototype</div>

          <div
            className="app"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* WELCOME */}
            <Screen id="screen-welcome" active={screen === 'welcome'}>
              <div style={{ marginTop: 40 }} />
              <div className="pill">Prototype · Tap or swipe</div>
              <div className="title">Turn screen time into real-life time.</div>
              <div className="subtitle">
                IRL Sync helps you swap endless scrolling for real-world
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
                  every few days. No more ghost groups.
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
              <div className="back-row">
                <button className="back-btn" onClick={() => goto('welcome')}>
                  ←
                </button>
                <div className="back-title">Today in IRL Sync</div>
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
                View IRL rewards
              </button>

              <button
                className="btn btn-ghost"
                style={{ marginTop: 6 }}
                onClick={() => goto('stats')}
              >
                View your progress
              </button>


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
                <p>Friends you’ve met with recently in IRL Sync.</p>
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
                  Join a book club meetup hosted through IRL Sync once this
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
              <h3>Little wins add up!</h3>
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
                <h3>Café Luna</h3>
                <p>Cozy café · Outlets · Quiet background music.</p>
              </div>
              <div className="card">
                <h3>City Park</h3>
                <p>Walking loop · Benches · Great for phone-free walks.</p>
              </div>
              <div className="card">
                <h3>Board Game Hub</h3>
                <p>Open table nights · Easy way to meet new people offline.</p>
              </div>

              <button className="btn btn-secondary"
                style={{ marginRight: 6 }} 
                onClick={() => goto('nearby')}
              >
                <FiMapPin style={{ marginRight: 6 }} />
                See people nearby
              </button>

              <BottomNav current={screen} goto={goto} />
            </Screen>

            {/* PEOPLE NEARBY */}
            <Screen id="screen-nearby" active={screen === 'nearby'}>
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

            {/* CHAT LIST */}
            <Screen id="screen-chats" active={screen === 'chats'}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
