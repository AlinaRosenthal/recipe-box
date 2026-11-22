export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 20;

export function roundAmount(value: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }

  let rounded: number;
  if (value < 1) {
    rounded = Math.round(value * 4) / 4;
  } else if (value < 10) {
    rounded = Math.round(value * 2) / 2;
  } else {
    rounded = Math.round(value);
  }

  return Math.max(rounded, 0.25);
}

export function scaleAmount(amount: number | null, coefficient: number): number | null {
  if (amount === null) {
    return null;
  }
  return roundAmount(amount * coefficient);
}

export function formatAmount(amount: number | null): string {
  if (amount === null) {
    return 'по вкусу';
  }
  return String(Number(amount.toFixed(2))).replace('.', ',');
}

export function servingsCoefficient(servings: number, baseServings: number): number {
  if (baseServings <= 0) {
    return 1;
  }
  return servings / baseServings;
}
