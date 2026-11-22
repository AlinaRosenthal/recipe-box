import { useState } from 'react';
import { Button, Card, Checkbox, Group, Input, ScrollArea, Stack, Text, Title } from '@mantine/core';
import { normalizeName } from '../lib/normalize';

type Props = {
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  onReset: () => void;
};

export function IngredientFilter({ options, selected, onToggle, onReset }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const filteredOptions = options.filter((option) =>
    normalizeName(option.label).includes(normalizeName(searchValue)),
  );

  return (
    <Card withBorder padding="md" component="section" aria-label="Фильтр по ингредиентам">
      <Group justify="space-between" align="center" mb="xs">
        <Title order={4}>Что имеется?</Title>
        <Button variant="subtle" color="dark" size="sm" onClick={onReset} disabled={selected.length === 0}>
          Сбросить
        </Button>
      </Group>
      <Text c="dimmed" size="sm" mb="xs">
        Выбрано: {selected.length}
      </Text>
      {options.length > 10 && (
        <Input
          placeholder="Поиск ингредиента…"
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          mb="xs"
          __clearable
          aria-label="Поиск ингредиента"
        />
      )}
      <ScrollArea.Autosize mah={280} type="auto">
        <Stack gap={2}>
          {filteredOptions.length === 0 ? (
            <Text c="dimmed" size="sm">Ничего не найдено</Text>
          ) : (
            filteredOptions.map((option) => (
              <Checkbox
                key={option.value}
                size="sm"
                label={option.label}
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
              />
            ))
          )}
        </Stack>
      </ScrollArea.Autosize>
    </Card>
  );
}
