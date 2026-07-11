import type { Screen } from './types';
import { useEazychefState } from './state';
import { Logo } from './components/Logo';
import { colors, fonts, inkAlpha } from './theme';
import { Onboarding } from './screens/Onboarding';
import { Pantry } from './screens/Pantry';
import { Cards } from './screens/Cards';
import { Missing } from './screens/Missing';
import { Detail } from './screens/Detail';
import { Rating } from './screens/Rating';
import { Trends } from './screens/Trends';
import { Roadmap } from './screens/Roadmap';
import { Profile } from './screens/Profile';

const NAV: { key: Screen; label: string }[] = [
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'pantry', label: 'Pantry' },
  { key: 'cards', label: 'Recipes' },
  { key: 'missing', label: 'Missing' },
  { key: 'detail', label: 'Cook' },
  { key: 'rating', label: 'Rating' },
  { key: 'trends', label: 'Trends' },
  { key: 'roadmap', label: 'Roadmap' },
  { key: 'profile', label: 'Your info' },
];

function App() {
  const { state, selectedCard, actions } = useEazychefState();

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: colors.cream,
        fontFamily: fonts.body,
      }}
    >
      {state.onboardingComplete && (
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '14px 28px',
            background: colors.creamLight,
            borderBottom: `1px solid ${inkAlpha(0.08)}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginRight: 22 }}>
            <Logo size={26} />
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 16, color: colors.ink }}>Eazychef</div>
          </div>
          <div style={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
            {NAV.map((n) => {
              const active = state.screen === n.key;
              return (
                <div
                  key={n.key}
                  onClick={() => actions.jump(n.key)}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 13px',
                    fontFamily: fonts.body,
                    fontSize: 13,
                    fontWeight: 600,
                    color: active ? colors.terracotta : inkAlpha(0.55),
                    borderBottom: `2px solid ${active ? colors.terracotta : 'transparent'}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {n.label}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 480, padding: '0 16px' }}>
          {state.screen === 'onboarding' && <Onboarding state={state} actions={actions} />}
          {state.screen === 'pantry' && <Pantry state={state} actions={actions} />}
          {state.screen === 'cards' && <Cards state={state} actions={actions} />}
          {state.screen === 'missing' && <Missing selectedCard={selectedCard} actions={actions} />}
          {state.screen === 'detail' && <Detail state={state} selectedCard={selectedCard} actions={actions} />}
          {state.screen === 'rating' && <Rating state={state} selectedCard={selectedCard} actions={actions} />}
          {state.screen === 'trends' && <Trends state={state} actions={actions} />}
          {state.screen === 'roadmap' && <Roadmap actions={actions} />}
          {state.screen === 'profile' && <Profile state={state} actions={actions} />}
        </div>
      </div>
    </div>
  );
}

export default App;
