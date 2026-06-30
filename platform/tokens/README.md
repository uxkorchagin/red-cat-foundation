# Platform / Tokens — Design Language

Спецификация дизайн-токенов Foundation начинается с архитектуры Design Language — слоя правил и структуры, который кодируется в токены. Источник истины о значениях, а не об их обосновании (обоснования и рассмотренные альтернативы — в [knowledge/foundations/](../../knowledge/foundations/)).

## Что такое Design Language в Red Cat Foundation

Design Language — слой правил и структуры, определяющий, как воспринимается продукт, построенный на Foundation: по каким принципам организован цвет, типографика, пространство, форма, движение и иконография, и как эти принципы кодируются в переиспользуемые единицы. Design Language — не визуальный стиль конкретного продукта, а грамматика, общая для всех продуктов студии, независимо от того, какой словарь (бренд) на ней говорит.

Design Language отвечает не на вопрос "какое именно значение", а на вопрос "как это вообще организовано, чтобы нести смысл". Конкретные значения — следующий слой: токены.

## Что входит / не входит

**Входит**: структурные и перцептивные правила девяти первичных систем — Color, Typography, Spacing, Radius, Elevation, Motion, Grid, Breakpoints, Iconography — и общая инфраструктура их кодирования, Token Architecture (уровни, нейминг, принципы версионирования токенов).

**Не входит**:
- API, состояния и поведение компонентов — [platform/components/](../components/).
- Паттерны взаимодействия и навигации — UX Standards, Этап 2 ([constitution/roadmap.md](../../constitution/roadmap.md)).
- Конкретные значения бренда (палитра, гарнитура конкретного продукта) — конфигурация поверх Design Language, не часть его структуры.
- Процесс работы команды с Figma — DesignOps, Этап 3.
- Фактическая реализация в Figma/коде — `platform/implementations/`, появится позже.

## Связи

- **С Component Architecture**: компоненты потребляют токены, реализующие Design Language, но не определяют визуальные значения сами — Design Language и Component Architecture встречаются в точке привязки токена к свойству компонента.
- **С UX Standards**: Design Language задаёт перцептивный язык (включая принципы Motion); UX Standards определяет поведенческие паттерны, которые этим языком пользуются, но не определяет его.
- **С Figma**: Design Language платформенно-независим; в Figma реализуется через Variables и структуру библиотеки в `platform/implementations/`, когда эта связка появится.

## Архитектура: единый слой, не плоская модель

Design Language — не то же самое, что токены: правила и значения разделены, чтобы смена бренда оставалась конфигурацией поверх языка, а не правкой самого языка. При этом Token Architecture (инфраструктура кодирования) спроектирована как часть Design Language, а не отдельно от него — потому что она осмысленна только в контакте с реальными нуждами Color, Typography, Spacing и других систем, которые она кодирует.

```
                    ┌─────────────────────────────┐
                    │       Token Architecture       │  ← инфраструктура кодирования
                    │  (уровни, нейминг, версионирование) │     (не несёт содержания сама по себе)
                    └───────────────┬─────────────────┘
                                    │ кодирует решения всех систем ниже
        ┌───────────────────────────┼───────────────────────────┐
        │                            │                            │
 ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐
 │  Первичные    │   │  Первичные    │   │  Производные   │
 │  системы      │   │  системы      │   │  системы       │
 │  Color        │   │  Typography   │   │  Grid          │
 │  Spacing      │   │  Radius       │   │  Breakpoints   │
 │  Iconography  │   │               │   │  Elevation     │
 │  (база)       │   │               │   │  Motion        │
 └───────────────┘   └───────────────┘   └────────────────┘
```

## Зависимости между подсистемами

- **Token Architecture** проектируется первой — не содержит перцептивного смысла, но определяет, как его выразят все остальные подсистемы.
- **Первичные, слабо связанные между собой**: Color, Typography, Spacing, Radius, базовая единица Iconography — порядок между собой не важен, но все они идут после Token Architecture.
- **Производные, зависящие от первичных**: Grid и Breakpoints зависят от Spacing; Elevation зависит от Color (роли теней/оверлеев) и от Motion (переход между состояниями высоты); Iconography как компонентная система зависит от Grid/Spacing.
- **Motion** частично первичен (тайминг, easing как самостоятельная шкала), частично пересекается с Elevation; конкретное применение Motion к поведению компонентов — уже не Design Language, а зона Component Architecture/UX Standards.

Практическое следствие: подсистемы проектируются в порядке Token Architecture → первичные системы → производные системы.

## Правила развития

- Новая потребность бренда решается на уровне alias-конфигурации, не изменением структуры. Если структуры недостаточно — это сигнал спроектировать её точнее через RFC, а не вводить точечное исключение.
- Изменение самой Token Architecture (уровней, нейминга) — всегда breaking change: от неё зависят все остальные подсистемы.
- Любое структурное изменение проходит через алгоритм Skill `design-systems-architect`: исследование → минимум две альтернативы → компромиссы → рекомендация → утверждение пользователем.

## Принципы масштабирования

- Работает одинаково для одного бренда и для множества одновременно — за счёт разделения global/alias уровней токенов.
- Работает для малой и для крупной команды — структура не требует экспертизы, недоступной малой команде, но допускает точки расширения для более сложных нужд.
- Остаётся технологически нейтральным — определяется здесь, переносится в Figma/код позже без изменения структуры.
- Нейминг, установленный в Token Architecture, переиспользуется каждой следующей подсистемой, а не изобретается заново.

## Спроектированные подсистемы

- [token-architecture.md](token-architecture.md) — структурная архитектура самих токенов (уровни, нейминг, режимы). Обоснование — [knowledge/foundations/token-architecture.md](../../knowledge/foundations/token-architecture.md).
- [color.md](color.md) — ролевая таксономия и форма шкалы Color. Обоснование — [knowledge/foundations/color.md](../../knowledge/foundations/color.md).
- [typography.md](typography.md) — составные Type Style токены и ролевая таксономия Typography. Обоснование — [knowledge/foundations/typography.md](../../knowledge/foundations/typography.md).
- [spacing.md](spacing.md) — линейная шкала и ролевая таксономия Spacing. Обоснование — [knowledge/foundations/spacing.md](../../knowledge/foundations/spacing.md).
- [radius.md](radius.md) — шкала и ролевая таксономия Radius. Обоснование — [knowledge/foundations/radius.md](../../knowledge/foundations/radius.md).
- [iconography.md](iconography.md) — шкала размеров и правила переиспользования Color/Spacing/Radius. Обоснование — [knowledge/foundations/iconography.md](../../knowledge/foundations/iconography.md).
- [grid.md](grid.md) — переменное число колонок по Viewport, переиспользование Spacing для желобов/полей. Обоснование — [knowledge/foundations/grid.md](../../knowledge/foundations/grid.md).
- [breakpoints.md](breakpoints.md) — абстрактная шкала классов доступного пространства (compact/medium/expanded), заполняющая ось Viewport. Обоснование — [knowledge/foundations/breakpoints.md](../../knowledge/foundations/breakpoints.md).
- [motion.md](motion.md) — длительность по масштабу изменения, ролевая таксономия кривых движения, обязательное правило reduced motion. Обоснование — [knowledge/foundations/motion.md](../../knowledge/foundations/motion.md).
- [elevation.md](elevation.md) — комбинированное выражение высоты (тень + тональный сдвиг), ролевая таксономия по назначению поверхности. Обоснование — [knowledge/foundations/elevation.md](../../knowledge/foundations/elevation.md).

## Статус

Все девять подсистем Design Language спроектированы структурно: Token Architecture, Color, Typography, Spacing, Radius, Iconography, Grid, Breakpoints, Motion, Elevation.

Foundation-инварианты (базовая единица Spacing, пороги Breakpoints, число колонок и max-width Grid, правило line-height, нумерация уровней Elevation, длительности Motion) заполнены литеральными значениями — см. соответствующие документы подсистем и обоснование в [knowledge/foundations/foundation-invariant-values.md](../../knowledge/foundations/foundation-invariant-values.md).

Бренд-конфигурация (оттенки Color, гарнитуры и размеры Typography, точные пиксели Radius, параметры тени Elevation) сознательно не заполняется здесь — это материал для будущей конфигурации конкретного бренда поверх структуры Foundation, не часть самой структуры.
