# Typography — структурная архитектура

Структура подсистемы Typography в составе Design Language (см. [README.md](README.md)). Определяет роли и форму шкалы, не литеральные значения — конкретная гарнитура и точные размеры остаются конфигурацией поверх этой структуры, в соответствии с [token-architecture.md](token-architecture.md).

## Модель: составные Semantic-токены

В отличие от полностью атомарной модели, Typography на Semantic-уровне предоставляется как именованные составные стили ("Type Style") — каждый ссылается на атомарные Global-токены (шкала размера, шкала line-height, шкала насыщенности, список семейств) и используется как единая роль, а не как пять отдельных значений. Соответствует тому, как Figma нативно работает с Text Styles.

## Global — атомарные шкалы

Все значения — относительные единицы, не абсолютные пиксели, чтобы не нарушать пользовательское масштабирование интерфейса (accessibility).

### font-size — бренд-конфигурация

Модульная прогрессия либо выровненная на сетку отступов; точный коэффициент — бренд/проектная конфигурация. Число шагов (8) фиксируется на уровне Foundation по числу различных размеров, фактически используемых Semantic-ролями.

| Token | Type | Mode | Value |
|---|---|---|---|
| `typography/font-size/1`…`8` | Number | — | → бренд |

### font-weight — Foundation-инвариант

В отличие от font-size, конкретные числовые значения насыщенности — общепринятый стандарт (CSS/OS), а не творческое решение бренда; бренд выбирает гарнитуру (family), которая должна поддерживать эти значения.

| Token | Type | Mode | Value |
|---|---|---|---|
| `typography/font-weight/regular` | Number | — | 400 |
| `typography/font-weight/medium` | Number | — | 500 |
| `typography/font-weight/semibold` | Number | — | 600 |
| `typography/font-weight/bold` | Number | — | 700 |

### line-height — переиспользование Spacing, не отдельная шкала

Line-height не вводит собственный Global-токен — Semantic Type Style ссылается напрямую на `space/*` ([spacing.md](spacing.md)), округляя естественную высоту строки вверх до ближайшего кратного базовой единицы (см. "Значения" ниже). Это прямое применение принципа переиспользования, уже использованного Iconography для Color/Radius.

## Семейства — роли

Mode — **Brand** (конкретная гарнитура определяется конфигурацией продукта).

| Token | Type | Mode | Value |
|---|---|---|---|
| `typography/family/primary` | String | Brand | → бренд-конфигурация |
| `typography/family/secondary` | String | Brand | → бренд-конфигурация |
| `typography/family/mono` | String | Brand | → бренд-конфигурация |

Конкретная гарнитура — бренд-конфигурация (ось Brand); роль фиксирована на уровне Foundation, аналогично разделению шкалы и роли в Color.

## Semantic — ролевая таксономия (Type Style)

В конвенции `категория/роль/вариант`. Mode — **Viewport** для ролей, чувствительных к размеру экрана (`display`, `heading/*`); остальные режимонезависимы.

| Token | Type | Mode | Value |
|---|---|---|---|
| `typography/display` | String | Compact | → Global (составной стиль) |
| `typography/display` | String | Medium | → Global (составной стиль) |
| `typography/display` | String | Expanded | → Global (составной стиль) |
| `typography/heading/1…N` | String | Compact / Medium / Expanded | → Global (составной стиль) |
| `typography/body/default` | String | — | → Global (составной стиль) |
| `typography/body/emphasis` | String | — | → Global (составной стиль) |
| `typography/body/small` | String | — | → Global (составной стиль) |
| `typography/label/default` | String | — | → Global (составной стиль) |
| `typography/label/small` | String | — | → Global (составной стиль) |
| `typography/caption` | String | — | → Global (составной стиль) |
| `typography/code` | String | — | → Global (составной стиль) |

## Режимы

- **Viewport** — `typography/heading/*` и `typography/display` варьируются по Viewport (например, заголовок меньше на mobile). Прямое применение механизма Token Architecture.
- **Brand** — определяет выбор семейства (family) через роли primary/secondary/mono.
- **Theme** — на Typography структурно не влияет.

## Значения (правило, не литерал)

Конкретные line-height остаются бренд-конфигурацией (зависят от ещё не выбранного размера шрифта), но правило их вычисления зафиксировано как Foundation-инвариант: значение line-height округляется вверх до ближайшего кратного базовой единицы Spacing (4px, [spacing.md](spacing.md)), независимо от того, какой размер шрифта выберет бренд. Обоснование — [knowledge/foundations/foundation-invariant-values.md](../../knowledge/foundations/foundation-invariant-values.md).

Таблица — иллюстрация применения правила, не таблица токенов Foundation (конкретный font-size — бренд-конфигурация):

| Mode | Размер шрифта (пример) | Естественный line-height (×1.5) | Округление до кратного 4px |
|---|---|---|---|
| — | 14px | 21px | 24px (`space/6`) |
| — | 16px | 24px | 24px (`space/6`) |
| — | 20px | 30px | 32px (`space/8`) |
| — | 24px | 36px | 36px (уже кратно 4) |

## Связь с другими подсистемами

- **[Spacing](spacing.md)** — line-height структурно зависит от базовой единицы Spacing для согласованного вертикального ритма.
- **[Grid](grid.md) / [Breakpoints](breakpoints.md)** — Viewport-вариативность заголовков использует точки перехода, определяемые подсистемой Breakpoints.
