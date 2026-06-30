# Iconography — структурная архитектура

Структура подсистемы Iconography в составе Design Language (см. [README.md](README.md)). В отличие от предыдущих подсистем, Iconography в основном переиспользует уже определённые примитивы (Color, Spacing, Radius) и вводит только одну собственную новую структуру — шкалу размеров, в соответствии с [token-architecture.md](token-architecture.md).

## Принцип переиспользования

- **Цвет** иконки — не отдельная таксономия, а уже существующие роли `color/content/*` и `color/interactive/*` ([color.md](color.md)).
- **Контейнер** иконки (круглая/прямоугольная подложка) — уже существующие `radius/full`/`radius/component` ([radius.md](radius.md)) и роли Spacing ([spacing.md](spacing.md)), без отдельных токенов формы/отступа.

## Global — шкала размеров

`icon/size/[шаг]` — шаги кратны базовой единице Spacing, чтобы иконка визуально совпадала с сеткой окружающих компонентов, а не была согласована с ней случайно. В отличие от Color/Radius/Typography, конкретные значения здесь — **Foundation-инвариант**: размер иконки определяется выравниванием на сетку, а не визуальной идентичностью бренда (та же логика, что и у порогов Breakpoints).

| Token | Type | Mode | Value |
|---|---|---|---|
| `icon/size/16` | Number | — | 16 |
| `icon/size/20` | Number | — | 20 |
| `icon/size/24` | Number | — | 24 |
| `icon/size/32` | Number | — | 32 |

## Semantic — ролевая таксономия

`icon/size/xs|sm|md|lg`, ссылающиеся на Global-шаги. Semantic-уровень обязателен: размер иконки может зависеть от Viewport (например, более крупная область для touch-таргетов на mobile), а режим, согласно Token Architecture, применяется только на Semantic-уровне.

| Token | Type | Mode | Value |
|---|---|---|---|
| `icon/size/xs` | Number | Compact | → `icon/size/16` |
| `icon/size/xs` | Number | Medium | → `icon/size/16` |
| `icon/size/xs` | Number | Expanded | → `icon/size/16` |
| `icon/size/sm` | Number | Compact | → `icon/size/20` |
| `icon/size/sm` | Number | Medium | → `icon/size/20` |
| `icon/size/sm` | Number | Expanded | → `icon/size/20` |
| `icon/size/md` | Number | Compact | → `icon/size/24` |
| `icon/size/md` | Number | Medium | → `icon/size/24` |
| `icon/size/md` | Number | Expanded | → `icon/size/24` |
| `icon/size/lg` | Number | Compact | → `icon/size/24` |
| `icon/size/lg` | Number | Medium | → `icon/size/32` |
| `icon/size/lg` | Number | Expanded | → `icon/size/32` |

## Режимы

- **Viewport** — основная ось вариативности размера.
- **Brand** — структурно не применяется к токенам Iconography: набор иконок и их цвет наследуются из Color, где Brand уже учтён; специфичные для продукта иконки — исключение на уровне Component-токена, не Foundation-режим.
- **Theme** — не влияет напрямую (учтён через Color).

## Границы

Стиль отрисовки (outline/filled/duotone), толщина обводки, оптическая сетка/live area иконки — производственные решения набора иконок-артефактов, вне структуры токенов. Относится к будущей `platform/implementations/` ([constitution/roadmap.md](../../constitution/roadmap.md)), не к Token Architecture.

## Связь с другими подсистемами

- **[Color](color.md)** — источник цветовых ролей.
- **[Radius](radius.md), [Spacing](spacing.md)** — источник токенов контейнера иконки.
- **[Spacing](spacing.md)** — источник базовой единицы для шкалы размеров.
