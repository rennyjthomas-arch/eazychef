import { ALLERGY, COOK_SKILL, DEFAULT_COOK_NAME, DIET, GOAL, WEEKDAY_T, WEEKEND_T } from '../data';
import type { EazychefActions } from '../state';
import type { AppState } from '../types';
import { BotBubble, UserBubble } from '../components/ChatBubble';
import { OptionChip, RemovableChip } from '../components/Chip';
import { colors, inkAlpha } from '../theme';

interface OnboardingProps {
  state: AppState;
  actions: EazychefActions;
}

export function Onboarding({ state, actions }: OnboardingProps) {
  const { obStep } = state;
  const cookWhoNames = ['Me', DEFAULT_COOK_NAME, 'Private chef', 'Someone else'];

  return (
    <div style={{ padding: '28px 0 24px', display: 'flex', flexDirection: 'column', gap: 18, minHeight: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                width: i === obStep ? 22 : 10,
                height: 6,
                borderRadius: 3,
                background: i <= obStep ? colors.terracotta : inkAlpha(0.14),
              }}
            />
          ))}
        </div>
        <div
          onClick={actions.finishOnboarding}
          style={{ cursor: 'pointer', position: 'absolute', right: 0, fontSize: 12, fontWeight: 600, color: inkAlpha(0.4) }}
        >
          Skip to pantry →
        </div>
      </div>

      {/* step 0: diet */}
      {obStep > 0 && (
        <UserBubble>{state.diet}</UserBubble>
      )}
      {obStep === 0 && (
        <>
          <BotBubble>So, how do you usually eat?</BotBubble>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 44 }}>
            {DIET.map((l) => (
              <OptionChip key={l} label={l} selected={state.diet === l} onClick={() => actions.setDiet(l)} />
            ))}
          </div>
        </>
      )}

      {/* step 1: allergies */}
      {obStep >= 1 && (
        <>
          {obStep > 1 && (
            <UserBubble>{[...state.allergies, ...state.customAllergies].join(', ')}</UserBubble>
          )}
          {obStep === 1 && (
            <>
              <BotBubble>Anything you just don't touch? Allergies, dislikes, whatever.</BotBubble>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 44 }}>
                {ALLERGY.map((l) => (
                  <OptionChip key={l} label={l} selected={state.allergies.includes(l)} onClick={() => actions.toggleAllergy(l)} />
                ))}
              </div>
              {state.customAllergies.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 44 }}>
                  {state.customAllergies.map((c, i) => (
                    <RemovableChip key={c + i} label={c} onRemove={() => actions.removeCustomAllergy(i)} />
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, paddingLeft: 44 }}>
                <input
                  value={state.allergyInput}
                  onChange={(e) => actions.setAllergyInput(e.target.value)}
                  placeholder="something else? type it here"
                  style={inputStyle}
                />
                <div onClick={actions.addCustomAllergy} style={addButtonStyle}>
                  +
                </div>
              </div>
              {(state.allergies.length > 0 || state.customAllergies.length > 0) && (
                <div style={{ paddingLeft: 44 }}>
                  <ContinueButton onClick={actions.nextStep} />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* step 2: favorite dishes */}
      {obStep >= 2 && (
        <>
          {obStep > 2 && <UserBubble>{state.dishes.join(', ')}</UserBubble>}
          {obStep === 2 && (
            <>
              <BotBubble>Give me 2-3 dishes you always enjoy.</BotBubble>
              <div style={{ paddingLeft: 44, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {state.dishes.map((d, i) => (
                    <RemovableChip key={d + i} label={d} onRemove={() => actions.removeDish(i)} />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    value={state.dishInput}
                    onChange={(e) => actions.setDishInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        actions.addDish();
                      }
                    }}
                    placeholder="e.g. rajma chawal"
                    style={inputStyle}
                  />
                  <div onClick={actions.addDish} style={addButtonStyle}>
                    +
                  </div>
                </div>
              </div>
              {state.dishes.length > 0 && (
                <div style={{ paddingLeft: 44 }}>
                  <ContinueButton onClick={actions.nextStep} />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* step 3: goal */}
      {obStep >= 3 && (
        <>
          {obStep > 3 && <UserBubble>{state.goal}</UserBubble>}
          {obStep === 3 && (
            <>
              <BotBubble>What's the goal right now?</BotBubble>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 44 }}>
                {GOAL.map((l) => (
                  <OptionChip key={l} label={l} selected={state.goal === l} onClick={() => actions.setGoal(l)} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* step 4: cook + skill */}
      {obStep >= 4 && (
        <>
          {obStep > 4 && <UserBubble>{`${state.cookWho} · ${state.cookSkill}`}</UserBubble>}
          {obStep === 4 && (
            <>
              <BotBubble>Who's doing the actual cooking, and how comfortable are they?</BotBubble>
              <div style={{ paddingLeft: 44, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={sectionLabelStyle}>Who cooks</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {cookWhoNames.map((l) => (
                    <OptionChip key={l} label={l} selected={state.cookWho === l} onClick={() => actions.setCookWho(l)} />
                  ))}
                </div>
              </div>
              <div style={{ paddingLeft: 44, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={sectionLabelStyle}>How comfortable are they</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {COOK_SKILL.map((l) => (
                    <OptionChip key={l} label={l} selected={state.cookSkill === l} onClick={() => actions.setCookSkill(l)} />
                  ))}
                </div>
              </div>
              {!!state.cookWho && !!state.cookSkill && (
                <div style={{ paddingLeft: 44 }}>
                  <ContinueButton onClick={actions.nextStep} />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* step 5: time available */}
      {obStep >= 5 && (
        <>
          <BotBubble>Last one — how much time do you realistically have to cook?</BotBubble>
          <div style={{ paddingLeft: 44, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={sectionLabelStyle}>Weekdays</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {WEEKDAY_T.map((l) => (
                <OptionChip key={l} label={l} selected={state.weekdayTime === l} onClick={() => actions.setWeekday(l)} />
              ))}
            </div>
          </div>
          <div style={{ paddingLeft: 44, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={sectionLabelStyle}>Weekends</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {WEEKEND_T.map((l) => (
                <OptionChip key={l} label={l} selected={state.weekendTime === l} onClick={() => actions.setWeekend(l)} />
              ))}
            </div>
          </div>
          {!!state.weekdayTime && !!state.weekendTime && (
            <div style={{ paddingLeft: 44 }}>
              <div
                onClick={actions.finishOnboarding}
                style={{
                  cursor: 'pointer',
                  display: 'inline-block',
                  background: colors.terracotta,
                  color: '#FFF8ED',
                  fontFamily: "'Fredoka',sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  padding: '10px 22px',
                  borderRadius: 999,
                }}
              >
                Alright, let's cook
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ContinueButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        background: colors.ink,
        color: '#FFF8ED',
        fontFamily: "'Fredoka',sans-serif",
        fontWeight: 600,
        fontSize: 13,
        padding: '9px 20px',
        borderRadius: 999,
      }}
    >
      Continue
    </div>
  );
}

const inputStyle = {
  flex: 1,
  border: `1.5px solid ${inkAlpha(0.14)}`,
  background: colors.creamLight,
  borderRadius: 999,
  padding: '10px 16px',
  fontSize: 14,
  fontFamily: "'Inter',sans-serif",
  color: colors.ink,
  outline: 'none',
} as const;

const addButtonStyle = {
  cursor: 'pointer',
  background: colors.ink,
  color: '#FFF8ED',
  width: 38,
  height: 38,
  borderRadius: 999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  flexShrink: 0,
} as const;

const sectionLabelStyle = {
  fontSize: 11,
  fontWeight: 600,
  color: inkAlpha(0.45),
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
} as const;
