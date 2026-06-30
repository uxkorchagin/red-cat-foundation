# Platform

Главный технический раздел Foundation — Platform Core. Здесь развивается содержательное ядро платформы: платформенно-независимый источник истины о том, каким должно быть решение, независимо от технологии реализации.

## Текущее состояние (Этап 1)

- [tokens/](tokens/) — дизайн-токены.
- [components/](components/) — архитектура компонентов.

## Важное архитектурное разграничение

`platform/` сегодня содержит только **спецификации** (источник истины), не реализации под конкретную технологию. Когда появятся кодовые реализации (React/Vue/SwiftUI/Compose) или техническая синхронизация с Figma-библиотекой, они получат собственное явное место — `platform/implementations/` (см. [constitution/roadmap.md](../constitution/roadmap.md)) — а не будут неявно подмешаны в `tokens/` или `components/`.

## Связанные домены

- Обоснования решений — [knowledge/foundations/](../knowledge/foundations/), [knowledge/components/](../knowledge/components/).
- Шаблоны для новых спецификаций — [templates/token-spec.md](../templates/token-spec.md), [templates/component-spec.md](../templates/component-spec.md).
- Ревью изменений — [checklists/component-review.md](../checklists/component-review.md), [checklists/design-review.md](../checklists/design-review.md).
