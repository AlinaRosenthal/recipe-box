import {
  createTheme,
  defaultCssVariablesResolver,
  defaultVariantColorsResolver,
  type MantineTheme,
} from '@mantine/core';

const FONT_FAMILY = 'Nunito Sans, Avenir Next, Avenir, system-ui, sans-serif';

const ON_PRIMARY = '#1F2A1C';

export const recipeTheme = createTheme({
  fontFamily: FONT_FAMILY,
  fontSmoothing: true,
  headings: {
    fontFamily: FONT_FAMILY,
    fontWeight: '400',
    sizes: {
      h1: { fontSize: '32px', fontWeight: '800', lineHeight: '1.05' },
      h2: { fontSize: '28px', fontWeight: '400', lineHeight: '1.2' },
      h3: { fontSize: '22px', fontWeight: '400', lineHeight: '1.25' },
      h4: { fontSize: '22px', fontWeight: '400', lineHeight: '1.25' },
      h5: { fontSize: '14px', fontWeight: '700', lineHeight: '1.3' },
      h6: { fontSize: '12px', fontWeight: '600', lineHeight: '1.3' },
    },
  },
  primaryColor: 'sage',
  colors: {
    brand: [
      '#FFF5E8',
      '#FFEAD0',
      '#FFD9AB',
      '#FFC782',
      '#FFB45C',
      '#FFA63E',
      '#FF9E2C',
      '#E88A14',
      '#C4730D',
      '#9E5C08',
    ],
    sage: [
      '#F4F8F1',
      '#E8F1E2',
      '#DAE8D0',
      '#CADDBC',
      '#BBD4AB',
      '#B2CC9F',
      '#A9C59B',
      '#8FAE80',
      '#738F65',
      '#566E4B',
    ],
    olive: [
      '#F5F9EC',
      '#EBF3D9',
      '#D9E7B7',
      '#C5D995',
      '#B1CB73',
      '#A3BF55',
      '#7FA33A',
      '#6E8E31',
      '#5B7528',
      '#475D1F',
    ],
    error: [
      '#FBEDEB',
      '#F5D5D0',
      '#EBB0A7',
      '#E08B7E',
      '#D37363',
      '#CA5A45',
      '#C8472F',
      '#AE3C27',
      '#923120',
      '#76271A',
    ],
  },
  radius: {
    md: '12px',
    xl: '24px',
  },
  defaultRadius: 'lg',
  shadows: {
    card: '0 8px 24px rgba(63, 90, 52, 0.12)',
  },
  variantColorResolver: (input) => {
    const colors = defaultVariantColorsResolver(input);
    if (input.variant === 'filled' && input.color === 'brand') {
      return { ...colors, color: ON_PRIMARY, hoverColor: ON_PRIMARY };
    }
    return colors;
  },
  components: {
    Button: {
      defaultProps: { radius: 'lg' },
      styles: {
        root: { fontWeight: 700 },
      },
    },
    Card: {
      defaultProps: { withBorder: true, shadow: 'card', radius: 'lg' },
    },
    Checkbox: {
      defaultProps: { iconColor: '#1F2A1C' },
      styles: {
        label: { fontSize: '14px', color: '#2E3A2B' },
      },
    },
    Badge: {
      defaultProps: { radius: 8 },
      styles: {
        root: { textTransform: 'none' },
      },
    },
    TextInput: {
      defaultProps: { size: 'md' },
      styles: {
        label: { fontSize: '13px', fontWeight: 600, marginBottom: 6 },
      },
    },
    PasswordInput: {
      defaultProps: { size: 'md' },
      styles: {
        label: { fontSize: '13px', fontWeight: 600, marginBottom: 6 },
      },
    },
    Textarea: {
      defaultProps: { size: 'md' },
      styles: {
        label: { fontSize: '13px', fontWeight: 600, marginBottom: 6 },
      },
    },
    Select: {
      defaultProps: { size: 'md' },
      styles: {
        label: { fontSize: '13px', fontWeight: 600, marginBottom: 6 },
      },
    },
    Table: {
      styles: {
        th: {
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--rb-muted-text)',
          borderBottomColor: '#D3DECB',
        },
        td: {
          fontSize: '14px',
          borderBottomColor: '#D3DECB',
        },
      },
    },
  },
});

/**
 * Mantine generates its own `:root` variables after `styles.css`, so the
 * `--mantine-*` bridge there was being overwritten. Variables are applied
 * through the provider instead, keeping a single source of truth in `--rb-*`.
 */
export const recipeCssVariablesResolver = (theme: MantineTheme) => {
  const base = defaultCssVariablesResolver(theme);

  return {
    ...base,
    light: {
      ...base.light,
      '--mantine-color-anchor': 'var(--rb-anchor)',
      '--mantine-color-dimmed': 'var(--rb-muted-text)',
      '--mantine-color-default-border': 'var(--rb-outline)',
      '--mantine-color-text': 'var(--rb-on-surface)',
      '--mantine-color-placeholder': 'var(--rb-placeholder)',
      '--mantine-color-error': 'var(--rb-error)',
    },
  };
};
