import type { ReactNode } from 'react';
import { ALLERGY, COOK_SKILL, DEFAULT_COOK_NAME, DIET, GOAL, WEEKDAY_T, WEEKEND_T } from '../data';
import type { EazychefActions } from '../state';
import type { AppState } from '../types';
import { OptionChip, RemovableChip } from '../components/Chip';
import { colors, fonts, inkAlpha } from '../theme';

interface ProfileProps {
  state: AppState;
  actions: EazychefActions;
}

export function Profile({ state, actions }: ProfileProps) {
  const cookWhoNames = ['Me', DEFAULT_COOK_NAME, 'Private chef', 'Someone else'];

  return (
    <div style={{ padding: '28px 0 28px', display: 'flex', flexDirection: 'column', gap: 22, minHeight: '100%' }}>
      <div>
        <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 19, color: colors.ink }}>Your info</div>
        <div style={{ fontSize: 13, color: inkAlpha(0.6), lineHeight: 1.5, marginTop: 4 }}>
          What we know so far — change anything, anytime.
        </div>
      </div>

      <Section label="How you eat">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {DIET.map((l) => (
            <OptionChip key={l} label={l} selected={state.diet === l} onClick={() => actions.setDiet(l)} />
          ))}
        </div>
      </Section>

      <Section label="Allergies & dislikes">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ALLERGY.map((l) => (
            <OptionChip key={l} label={l} selected={state.allergies.includes(l)} onClick={() => actions.toggleAllergy(l)} />
          ))}
        </div>
        {state.customAllergies.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {state.customAllergies.map((c, i) => (
              <RemovableChip key={c + i} label={c} onRemove={() => actions.removeCustomAllergy(i)} />
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={state.allergyInput}
            onChange={(e) => actions.setAllergyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                actions.addCustomAllergy();
              }
            }}
            placeholder="something else? type it here"
            style={inputStyle}
          />
          <div onClick={actions.addCustomAllergy} style={addButtonStyle}>
            +
          </div>
        </div>
      </Section>

      <Section label="Favorite dishes">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {state.dishes.map((d, i) => (
            <RemovableChip key={d + i} label={d} onRemove={() => actions.removeDish(i)} />
          ))}
        </div>
        {state.dishes.length < 4 && (
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
        )}
      </Section>

      <Section label="Current goal">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {GOAL.map((l) => (
            <OptionChip key={l} label={l} selected={state.goal === l} onClick={() => actions.setGoal(l)} />
          ))}
        </div>
      </Section>

      <Section label="Who cooks">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {cookWhoNames.map((l) => (
            <OptionChip key={l} label={l} selected={state.cookWho === l} onClick={() => actions.setCookWho(l)} />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COOK_SKILL.map((l) => (
            <OptionChip key={l} label={l} selected={state.cookSkill === l} onClick={() => actions.setCookSkill(l)} />
          ))}
        </div>
      </Section>

      <Section label="Time available">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={sectionLabelStyle}>Weekdays</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {WEEKDAY_T.map((l) => (
              <OptionChip key={l} label={l} selected={state.weekdayTime === l} onClick={() => actions.setWeekday(l)} />
            ))}
          </div>
          <div style={sectionLabelStyle}>Weekends</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {WEEKEND_T.map((l) => (
              <OptionChip key={l} label={l} selected={state.weekendTime === l} onClick={() => actions.setWeekend(l)} />
            ))}
          </div>
        </div>
      </Section>

      <div style={{ flex: 1 }} />
      <div
        onClick={() => {
          if (confirm('This clears everything and starts onboarding over. Continue?')) {
            actions.restart();
          }
        }}
        style={{
          cursor: 'pointer',
          textAlign: 'center',
          background: inkAlpha(0.06),
          color: colors.ink,
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 14,
          padding: 14,
          borderRadius: 999,
        }}
      >
        Reset all my data
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={sectionLabelStyle}>{label}</div>
      {children}
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
  fontWeight: 700,
  color: inkAlpha(0.45),
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
} as const;
