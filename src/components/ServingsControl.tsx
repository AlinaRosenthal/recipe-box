import { ActionIcon, Group, Text } from '@mantine/core';
import { MAX_SERVINGS, MIN_SERVINGS } from '../lib/scale';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export function ServingsControl({ value, onChange }: Props) {
  return (
    <Group gap="xs" align="center" wrap="nowrap">
      <Text c="dimmed" size="xs">
        Порции
      </Text>
      <ActionIcon
        variant="default"
        radius="md"
        size={36}
        onClick={() => onChange(value - 1)}
        disabled={value <= MIN_SERVINGS}
        aria-label="Меньше порций"
      >
        −
      </ActionIcon>
      <Text fw={700} w={28} ta="center">
        {value}
      </Text>
      <ActionIcon
        variant="default"
        radius="md"
        size={36}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_SERVINGS}
        aria-label="Больше порций"
      >
        +
      </ActionIcon>
    </Group>
  );
}
