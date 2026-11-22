import { useState, type FormEvent } from 'react';
import { ActionIcon, Alert, Button, Group, Select, Stack, Text, TextInput, Textarea } from '@mantine/core';
import type { RecipeDraft, RecipeDraftIngredient } from '../data/types';
import { MAX_SERVINGS, MIN_SERVINGS } from '../lib/scale';

const UNIT_OPTIONS = [
  { value: '__none', label: '—' },
  { value: 'г', label: 'г' },
  { value: 'кг', label: 'кг' },
  { value: 'мл', label: 'мл' },
  { value: 'л', label: 'л' },
  { value: 'шт', label: 'шт' },
  { value: 'ст.л.', label: 'ст.л.' },
  { value: 'ч.л.', label: 'ч.л.' },
  { value: 'щепотка', label: 'щепотка' },
];

type FormRow = {
  key: string;
  amount: string;
  unit: string;
  name: string;
};

type FormErrors = {
  title?: string;
  servings?: string;
  ingredients?: string;
  steps?: string;
  form?: string;
};

type Props = {
  initialValues?: RecipeDraft;
  onCancel: () => void;
  onSave: (draft: RecipeDraft) => void;
};

function createRow(): FormRow {
  return { key: crypto.randomUUID(), amount: '', unit: '', name: '' };
}

function rowFromIngredient(ingredient: RecipeDraftIngredient): FormRow {
  return {
    key: crypto.randomUUID(),
    amount: ingredient.amount === null ? '' : String(ingredient.amount).replace('.', ','),
    unit: ingredient.unit,
    name: ingredient.name,
  };
}

export function RecipeForm({ initialValues, onCancel, onSave }: Props) {
  const [title, setTitle] = useState(() => initialValues?.title ?? '');
  const [servings, setServings] = useState(() => String(initialValues?.baseServings ?? 2));
  const [rows, setRows] = useState<FormRow[]>(() => {
    if (initialValues && initialValues.ingredients.length > 0) {
      return initialValues.ingredients.map(rowFromIngredient);
    }
    return [createRow()];
  });
  const [stepsText, setStepsText] = useState(() => initialValues?.steps.join('\n') ?? '');
  const [errors, setErrors] = useState<FormErrors>({});
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

  const clearError = (key: keyof FormErrors) => {
    setErrors((current) => {
      if (!current[key]) {
        return current;
      }
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const updateRow = (key: string, patch: Partial<FormRow>) => {
    setRows((current) => current.map((row) => (row.key === key ? { ...row, ...patch } : row)));

    if (patch.amount !== undefined) {
      setRowErrors((current) => {
        if (!current[key]) {
          return current;
        }
        const next = { ...current };
        delete next[key];
        return next;
      });
      clearError('ingredients');
    }

    if (patch.name !== undefined && patch.name.trim() !== '') {
      clearError('ingredients');
    }
  };

  const addRow = () => {
    setRows((current) => [...current, createRow()]);
  };

  const removeRow = (key: string) => {
    setRows((current) => (current.length > 1 ? current.filter((row) => row.key !== key) : current));
    setRowErrors((current) => {
      if (!current[key]) {
        return current;
      }
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    const nextRowErrors: Record<string, string> = {};

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      nextErrors.title = 'Укажите название рецепта';
    }

    const servingsNumber = Number(servings);
    if (!Number.isInteger(servingsNumber) || servingsNumber < MIN_SERVINGS || servingsNumber > MAX_SERVINGS) {
      nextErrors.servings = `Порции: целое число от ${MIN_SERVINGS} до ${MAX_SERVINGS}`;
    }

    const parsedIngredients = rows
      .map((row) => {
        const amountText = row.amount.trim().replace(',', '.');
        let amount: number | null = null;

        if (amountText !== '') {
          const value = Number(amountText);
          if (!Number.isFinite(value) || value <= 0) {
            nextRowErrors[row.key] = 'Количество — положительное число или пустое поле';
          } else {
            amount = value;
          }
        }

        return { name: row.name.trim(), amount, unit: row.unit };
      })
      .filter((row) => row.name !== '');

    if (parsedIngredients.length === 0) {
      nextErrors.ingredients = 'Добавьте хотя бы один ингредиент';
    } else if (Object.keys(nextRowErrors).length > 0) {
      nextErrors.ingredients = 'Исправьте количество в ингредиентах';
    }

    const steps = stepsText
      .split('\n')
      .map((step) => step.trim())
      .filter((step) => step !== '');

    if (steps.length === 0) {
      nextErrors.steps = 'Добавьте хотя бы один шаг';
    }

    setErrors(nextErrors);
    setRowErrors(nextRowErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      onSave({
        title: trimmedTitle,
        baseServings: servingsNumber,
        ingredients: parsedIngredients,
        steps,
      });
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : 'Не удалось сохранить рецепт.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap="md">
        <TextInput
          label="Название"
          placeholder="Например, Тост с авокадо"
          value={title}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
            clearError('title');
          }}
          error={errors.title}
        />

        <TextInput
          label="Порции"
          type="number"
          min={MIN_SERVINGS}
          max={MAX_SERVINGS}
          step={1}
          maw={120}
          value={servings}
          onChange={(event) => {
            setServings(event.currentTarget.value);
            clearError('servings');
          }}
          error={errors.servings}
        />

        <div>
          <Text fw={600} size="sm" mb={6}>
            Ингредиенты
          </Text>
          {rows.map((row) => (
            <div key={row.key} className="ingredient-row-block">
              <div className="ingredient-row">
                <TextInput
                  aria-label="Количество"
                  inputMode="decimal"
                  placeholder="200"
                  value={row.amount}
                  onChange={(event) => updateRow(row.key, { amount: event.currentTarget.value })}
                />
                <Select
                  aria-label="Единица измерения"
                  data={UNIT_OPTIONS}
                  value={row.unit === '' ? '__none' : row.unit}
                  onChange={(value) => updateRow(row.key, { unit: value && value !== '__none' ? value : '' })}
                  allowDeselect={false}
                />
                <TextInput
                  aria-label="Название ингредиента"
                  placeholder="мука"
                  value={row.name}
                  onChange={(event) => updateRow(row.key, { name: event.currentTarget.value })}
                />
                <ActionIcon
                  variant="subtle"
                  color="red"
                  size="lg"
                  radius="md"
                  onClick={() => removeRow(row.key)}
                  disabled={rows.length === 1}
                  aria-label="Удалить ингредиент"
                >
                  ×
                </ActionIcon>
              </div>
              {rowErrors[row.key] && (
                <Text c="error" size="sm" mt={4}>
                  {rowErrors[row.key]}
                </Text>
              )}
            </div>
          ))}
          <Button variant="subtle" color="dark" onClick={addRow} mt={6}>
            + Добавить ингредиент
          </Button>
          {errors.ingredients && (
            <Text c="error" size="sm" mt={6}>
              {errors.ingredients}
            </Text>
          )}
        </div>

        <Textarea
          label="Шаги"
          rows={6}
          placeholder="Один шаг — одна строка"
          value={stepsText}
          onChange={(event) => {
            setStepsText(event.currentTarget.value);
            clearError('steps');
          }}
          error={errors.steps}
        />

        {errors.form && (
          <Alert color="error" variant="light">
            {errors.form}
          </Alert>
        )}

        <Group justify="flex-end" gap="xs">
          <Button variant="subtle" color="dark" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit" color="brand" size="lg">
            Сохранить
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
