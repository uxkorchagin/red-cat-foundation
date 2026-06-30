# Grid — структурная архитектура

Структура подсистемы Grid в составе Design Language (см. [README.md](README.md)). Производная система: зависит от Spacing (источник значений желобов/полей) и от Breakpoints (точки перехода между ступенями Viewport, проектируется следующим шагом), в соответствии с [token-architecture.md](token-architecture.md).

## Колонки — переменное число по Viewport

**Решение**: число колонок не фиксировано на всех экранах, а варьируется по оси Viewport (например, по аналогии с Material — меньше колонок на mobile, больше на desktop), а не остаётся постоянным (12) везде.

При делении фиксированного числа колонок на ширину маленького экрана получаются непригодно узкие колонки. Переменное число — прямое применение уже встроенного механизма Token Architecture: значение варьируется по Viewport на Semantic-уровне, как заголовки в Typography и отступы в Spacing.

`grid/columns` — Semantic-токен; конкретные числа на каждой ступени и точки перехода между ними определяются вместе с подсистемой Breakpoints.

## Желоба и поля — переиспользование Spacing

Grid не вводит собственные значения отступов:
- `grid/gutter` — ссылается на `spacing/layout/*` ([spacing.md](spacing.md)).
- `grid/margin` — ссылается на `spacing/layout/*`.

Варьируются по Viewport так же, как сама Spacing. Тот же принцип переиспользования, что уже применён в Iconography к Color/Radius.

## Максимальная ширина контейнера

Обязательное структурное правило: на крупных экранах должна существовать верхняя граница ширины контента — иначе строки текста становятся нечитаемо длинными. `grid/container/max-width` — обязательный токен; конкретное значение определяется при заполнении Breakpoints/бренд-конфигурацией, но наличие самого ограничения не опционально.

## Режимы

- **Viewport** — основная и фактически единственная ось вариативности Grid: колонки, желоба, поля, максимальная ширина — всё индексируется по viewport.
- **Brand, Theme** — не влияют.

## Значения (Foundation-инвариант)

`grid/container/max-width` на ступени Expanded — 1280px: ограничивает длину строки на крупных экранах, не сужая полезную область на типичных широких мониторах. Обоснование — [knowledge/foundations/foundation-invariant-values.md](../../knowledge/foundations/foundation-invariant-values.md).

| Token | Type | Mode | Value |
|---|---|---|---|
| `grid/columns` | Number | Compact | 4 |
| `grid/columns` | Number | Medium | 8 |
| `grid/columns` | Number | Expanded | 12 |
| `grid/gutter` | Number | Compact | → `space/4` (16) |
| `grid/gutter` | Number | Medium | → `space/6` (24) |
| `grid/gutter` | Number | Expanded | → `space/8` (32) |
| `grid/margin` | Number | Compact | → `space/4` (16) |
| `grid/margin` | Number | Medium | → `space/6` (24) |
| `grid/margin` | Number | Expanded | → `space/8` (32) |
| `grid/container/max-width` | Number | Compact | — |
| `grid/container/max-width` | Number | Medium | — |
| `grid/container/max-width` | Number | Expanded | 1280 |

## Связь с другими подсистемами

- **[Spacing](spacing.md)** — единственный источник значений для желобов и полей.
- **[Breakpoints](breakpoints.md)** — определяет точки перехода между ступенями Viewport, на которые ссылается Grid.
