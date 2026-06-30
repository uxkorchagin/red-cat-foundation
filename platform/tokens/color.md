# Color — структурная архитектура

Структура подсистемы Color в составе Design Language (см. [README.md](README.md)). Определяет роли и форму шкалы, не литеральные значения — конкретные оттенки бренда задаются как конфигурация поверх этой структуры, в соответствии с [token-architecture.md](token-architecture.md).

## Разделение шкалы и ролей

Color разделяет **шкалу** (Global) и **роли** (Semantic) — шкала меняется между брендами, роли остаются неизменными между темами и брендами.

## Global — форма шкалы

Числовая шкала шагов светлоты с фиксированным шагом (`color/[группа]/[шаг]`), а не произвольные имена шагов. Уточнение: **форма шкалы (число и имена шагов, набор групп) — Foundation-инвариант**, как базовая единица Spacing — общая для всех брендов, чтобы роли вроде `color/content/secondary` означали один и тот же относительный контраст независимо от бренда. Бренд-конфигурацией остаётся только сам оттенок (hue) за каждым шагом, не форма шкалы.

**Группы** (Foundation-инвариант, по смыслу использования, не по конкретному цвету):

| Группа | Назначение |
|---|---|
| `neutral` | Базовые `background`/`content`/`border` |
| `accent` | `interactive` |
| `success`, `warning`, `danger`, `info` | Соответствующие `feedback`-роли |

**Шаги шкалы** (Foundation-инвариант, 11 шагов от самого светлого к самому тёмному):

| Token                 | Type  | Mode | Value                   |
| --------------------- | ----- | ---- | ----------------------- |
| `color/[группа]/0`    | Color | —    | → бренд (самый светлый) |
| `color/[группа]/100`  | Color | —    | → бренд                 |
| `color/[группа]/200`  | Color | —    | → бренд                 |
| `color/[группа]/300`  | Color | —    | → бренд                 |
| `color/[группа]/400`  | Color | —    | → бренд                 |
| `color/[группа]/500`  | Color | —    | → бренд                 |
| `color/[группа]/600`  | Color | —    | → бренд                 |
| `color/[группа]/700`  | Color | —    | → бренд                 |
| `color/[группа]/800`  | Color | —    | → бренд                 |
| `color/[группа]/900`  | Color | —    | → бренд                 |
| `color/[группа]/1000` | Color | —    | → бренд (самый тёмный)  |

`[группа]` подставляется из таблицы групп выше — итого 6 групп × 11 шагов = 66 Global-токенов, не дублируемых построчно здесь.

## Semantic — ролевая таксономия

Роли организованы по категориям UI, напрямую в конвенции именования `категория/роль/вариант(/состояние)` из Token Architecture.

Формат таблицы соответствует панели Figma Variables: одна строка на комбинацию токена и значения Mode. Колонка Mode отражает ось **Theme**, обязательную для `background`/`content`/`border` (см. "Режимы" ниже); **Brand** — отдельное, не показанное здесь измерение, поскольку конкретные оттенки определяются конфигурацией продукта, а не Foundation. Value — ссылка на Global-шаг шкалы (бренд-конфигурация), не литерал.

| Token | Type | Mode | Value |
|---|---|---|---|
| `color/background/base` | Color | Light | → Global (бренд) |
| `color/background/base` | Color | Dark | → Global (бренд) |
| `color/background/raised` | Color | Light | → Global (бренд) |
| `color/background/raised` | Color | Dark | → Global (бренд) |
| `color/background/overlay` | Color | Light | → Global (бренд) |
| `color/background/overlay` | Color | Dark | → Global (бренд) |
| `color/content/primary` | Color | Light | → Global (бренд) |
| `color/content/primary` | Color | Dark | → Global (бренд) |
| `color/content/secondary` | Color | Light | → Global (бренд) |
| `color/content/secondary` | Color | Dark | → Global (бренд) |
| `color/content/tertiary` | Color | Light | → Global (бренд) |
| `color/content/tertiary` | Color | Dark | → Global (бренд) |
| `color/content/disabled` | Color | Light | → Global (бренд) |
| `color/content/disabled` | Color | Dark | → Global (бренд) |
| `color/content/inverse` | Color | Light | → Global (бренд) |
| `color/content/inverse` | Color | Dark | → Global (бренд) |
| `color/border/default` | Color | Light | → Global (бренд) |
| `color/border/default` | Color | Dark | → Global (бренд) |
| `color/border/focus` | Color | Light | → Global (бренд) |
| `color/border/focus` | Color | Dark | → Global (бренд) |
| `color/border/disabled` | Color | Light | → Global (бренд) |
| `color/border/disabled` | Color | Dark | → Global (бренд) |
| `color/interactive/accent/default` | Color | — | → Global (бренд) |
| `color/interactive/accent/hover` | Color | — | → Global (бренд) |
| `color/interactive/accent/active` | Color | — | → Global (бренд) |
| `color/interactive/accent/focus` | Color | — | → Global (бренд) |
| `color/interactive/accent/disabled` | Color | — | → Global (бренд) |
| `color/feedback/success/content` | Color | — | → Global (бренд) |
| `color/feedback/success/background` | Color | — | → Global (бренд) |
| `color/feedback/warning/content` | Color | — | → Global (бренд) |
| `color/feedback/warning/background` | Color | — | → Global (бренд) |
| `color/feedback/danger/content` | Color | — | → Global (бренд) |
| `color/feedback/danger/background` | Color | — | → Global (бренд) |
| `color/feedback/info/content` | Color | — | → Global (бренд) |
| `color/feedback/info/background` | Color | — | → Global (бренд) |

Feedback-роли (success/warning/danger/info) определены один раз на уровне Foundation по смыслу и не переопределяются проектами — переопределяется только конкретный оттенок через ось Brand, не сама роль.

## Режимы

- **Theme (light/dark)** — обязательная ось для `background`, `content`, `border`: каждая такая роль обязана иметь определение для обоих значений Theme, это не опция.
- **Brand** — определяет, какая Global-шкала (палитра) стоит за ролью; сама роль и её назначение не меняются между брендами.
- **Viewport** — Color не варьируется по Viewport.

## Правило контраста

Пары `content`-роль на `background`-роли обязаны соответствовать WCAG 2.1 AA: 4.5:1 для обычного текста, 3:1 для крупного текста и UI-компонентов. Это обязательная проверка для любой пары ролей в любой комбинации Theme × Brand, а не рекомендация.

## Связь с другими подсистемами

- **[Elevation](elevation.md)** использует `color/background` и `color/border` роли для тонального сдвига поверхности, а также `color/shadow/default` — аддитивное расширение категории, введённое при проектировании Elevation для значения тени, не покрытого ролями background/content/border/interactive/feedback.
- **[Iconography](iconography.md)** использует `color/content` и `color/interactive` роли для цвета иконок.
