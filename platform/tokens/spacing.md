М# Spacing — структурная архитектура

Структура подсистемы Spacing в составе Design Language (см. [README.md](README.md)). Определяет форму шкалы и ролевую таксономию, не литеральные значения, за одним отличием от Color/Typography: базовая единица ритма — структурный инвариант Foundation, а не бренд-конфигурация (см. ниже), но её конкретное число (4 или 8) определяется отдельно, не в этом документе.

## Global — форма шкалы

Линейная арифметическая шкала кратных значений единой базовой единицы (`space/1`, `space/2`, `space/4`, ...), а не геометрическая прогрессия — даёт предсказуемую математику и выравнивание на пиксельные сетки разных плотностей экрана.

Базовая единица переиспользуется:
- **[Typography](typography.md)** — шаг шкалы line-height.
- **[Grid](grid.md)** — колонки и желоба.

## Почему базовая единица — не бренд-конфигурация

В отличие от оттенка цвета (Color) или гарнитуры (Typography), согласованный ритм отступов — инвариант, общий для всех продуктов студии. Если бы базовая единица варьировалась по бренду, компоновки и паттерны перестали бы быть взаимно переносимы между проектами, что противоречит цели Foundation как общего основания.

## Semantic — ролевая таксономия

Semantic-уровень обязателен (не опционален): режим, согласно [token-architecture.md](token-architecture.md), применяется только на Semantic-уровне — без него адаптация отступов под Viewport невозможна без нарушения уже принятого правила.

Mode здесь — **Viewport**: `spacing/layout/*` и `spacing/stack/*` варьируются по нему; `spacing/component/*` и `spacing/inline/*` структурно не обязаны (Mode = `—`), но механизм доступен при необходимости.

| Token | Type | Mode | Value |
|---|---|---|---|
| `spacing/component/compact` | Number | — | → Global |
| `spacing/component/default` | Number | — | → Global |
| `spacing/component/comfortable` | Number | — | → Global |
| `spacing/stack/xs` | Number | Compact | → Global |
| `spacing/stack/xs` | Number | Medium | → Global |
| `spacing/stack/xs` | Number | Expanded | → Global |
| `spacing/stack/sm` | Number | Compact | → Global |
| `spacing/stack/sm` | Number | Medium | → Global |
| `spacing/stack/sm` | Number | Expanded | → Global |
| `spacing/stack/md` | Number | Compact | → Global |
| `spacing/stack/md` | Number | Medium | → Global |
| `spacing/stack/md` | Number | Expanded | → Global |
| `spacing/stack/lg` | Number | Compact | → Global |
| `spacing/stack/lg` | Number | Medium | → Global |
| `spacing/stack/lg` | Number | Expanded | → Global |
| `spacing/stack/xl` | Number | Compact | → Global |
| `spacing/stack/xl` | Number | Medium | → Global |
| `spacing/stack/xl` | Number | Expanded | → Global |
| `spacing/inline/xs…xl` | Number | — | → Global (та же шкала, что stack) |
| `spacing/layout/xs` | Number | Compact | → Global |
| `spacing/layout/xs` | Number | Medium | → Global |
| `spacing/layout/xs` | Number | Expanded | → Global |
| `spacing/layout/sm…xl` | Number | Compact / Medium / Expanded | → Global |

## Режимы

- **Viewport** — основная ось вариативности: `spacing/layout/*` и `spacing/stack/*`, как правило, меньше на mobile, чем на desktop.
- **Brand** — структурно не влияет.
- **Theme** — не влияет.

## Границы

Отрицательные отступы и специфика конкретной компоновки — не часть структуры Spacing; это ответственность компонентной/лейаут-реализации, использующей токены.

## Значения (Foundation-инвариант)

Базовая единица: **4px**. Более гранулярна, чем классические 8px, при этом крупные интервалы остаются кратны и 8 (8 = 2×4) — даёт точность для небольших продуктов и достаточную крупность для крупных, не жертвуя ни одним из заявленных масштабов Foundation. Обоснование альтернатив — [knowledge/foundations/foundation-invariant-values.md](../../knowledge/foundations/foundation-invariant-values.md).

Global-уровень режимонезависим (Mode = `—` для всех строк — режим применяется только на Semantic-уровне, см. [token-architecture.md](token-architecture.md)).

| Token | Type | Mode | Value |
|---|---|---|---|
| `space/0` | Number | — | 0 |
| `space/1` | Number | — | 4 |
| `space/2` | Number | — | 8 |
| `space/3` | Number | — | 12 |
| `space/4` | Number | — | 16 |
| `space/6` | Number | — | 24 |
| `space/8` | Number | — | 32 |
| `space/12` | Number | — | 48 |
| `space/16` | Number | — | 64 |

## Связь с другими подсистемами

- **[Typography](typography.md)** — line-height выравнивается на базовую единицу Spacing.
- **[Grid](grid.md)** — колонки и желоба используют ту же базовую единицу.
