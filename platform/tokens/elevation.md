# Elevation — структурная архитектура

Структура подсистемы Elevation в составе Design Language (см. [README.md](README.md)). Последняя из девяти подсистем — зависит от Color и Motion (обе уже спроектированы), в соответствии с [token-architecture.md](token-architecture.md).

## Механизм выражения высоты — тень + тональный сдвиг

Тень плохо читается в тёмной теме: на тёмном фоне тёмная тень не создаёт достаточного контраста, чтобы сигнал "эта поверхность выше" считывался. Elevation выражается комбинированно — тенью и тональным сдвигом цвета поверхности — с разным весом по Theme:

- В светлой теме основной сигнал — тень, тональный сдвиг — вспомогательный.
- В тёмной теме — наоборот, тональный сдвиг становится основным сигналом.

Оба компонента — часть одной Semantic-роли, не два независимых токена, комбинируемых вручную.

## Global — форма шкалы

Числовая шкала уровней высоты (`elevation/0`…`N`). Форма фиксируется здесь, точные параметры тени (смещение, размытие, разброс) и тонального сдвига — позже.

## Semantic — ролевая таксономия

Роли по назначению поверхности, не по числовому уровню напрямую — режим (Theme) применяется только на Semantic-уровне, согласно Token Architecture:

Mode здесь — **Theme**: каждая роль пакует тень и тональный сдвиг с разным весом для Light/Dark (см. "Механизм выражения высоты" выше); конкретные параметры тени/сдвига — бренд-конфигурация.

| Token | Type | Mode | Value |
|---|---|---|---|
| `elevation/surface/resting` | Number | Light | → Global 0 (тень-доминанта) |
| `elevation/surface/resting` | Number | Dark | → Global 0 (тон-доминанта) |
| `elevation/surface/raised` | Number | Light | → Global 1 (тень-доминанта) |
| `elevation/surface/raised` | Number | Dark | → Global 1 (тон-доминанта) |
| `elevation/overlay/menu` | Number | Light | → Global 2 (тень-доминанта) |
| `elevation/overlay/menu` | Number | Dark | → Global 2 (тон-доминанта) |
| `elevation/overlay/modal` | Number | Light | → Global 3 (тень-доминанта) |
| `elevation/overlay/modal` | Number | Dark | → Global 3 (тон-доминанта) |
| `elevation/overlay/tooltip` | Number | Light | → Global 4 (тень-доминанта) |
| `elevation/overlay/tooltip` | Number | Dark | → Global 4 (тон-доминанта) |

Каждая роль пакует тень, тональный сдвиг и ссылку на `motion/duration/micro` + `motion/easing/standard` ([motion.md](motion.md)) для перехода между состояниями (например, при наведении на карточку).

## Расширение Color

Тень требует собственного узкого цветового значения, не покрытого существующими ролями Color. Вводится аддитивное расширение `color/shadow/default` — minor-дополнение к уже принятой структуре Color ([color.md](color.md)), не пересмотр её альтернатив.

## Режимы

- **Theme** — основная ось: меняется вес тени относительно тонального сдвига.
- **Brand** — выраженность высоты (насколько заметна тень) может быть частью идентичности бренда, по тому же принципу, что и Radius и выразительность Motion.
- **Viewport** — не применяется.

## Значения (нумерация уровней — Foundation-инвариант)

Чисто порядковое решение по уже зафиксированным ролям, не требует визуального суждения. Параметры тени и тонального сдвига (блюр, разброс, степень сдвига) остаются бренд-конфигурацией. Обоснование — [knowledge/foundations/foundation-invariant-values.md](../../knowledge/foundations/foundation-invariant-values.md).

| Token | Type | Mode | Value (роль) |
|---|---|---|---|
| `elevation/0` | Number | — | `elevation/surface/resting` |
| `elevation/1` | Number | — | `elevation/surface/raised` |
| `elevation/2` | Number | — | `elevation/overlay/menu` |
| `elevation/3` | Number | — | `elevation/overlay/modal` |
| `elevation/4` | Number | — | `elevation/overlay/tooltip` |

## Связь с другими подсистемами

- **[Color](color.md)** — источник тонального сдвига поверхности и `color/shadow/default`.
- **[Motion](motion.md)** — источник длительности/кривой перехода между уровнями высоты.
- **[Radius](radius.md)** — приподнятые поверхности и скругление часто проектируются согласованно.
