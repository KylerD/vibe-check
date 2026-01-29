---
description: Map a codebase for readiness review
disable-model-invocation: false
---

# Codebase Mapping for Readiness

<objective>
Analyze the repository at a conceptual level and produce a codebase map that supports readiness assessment.
</objective>

## Output format

1. **Stack**
   - Languages, frameworks, runtime, databases, hosting

2. **Architecture**
   - High-level pattern
   - Layers and responsibilities
   - Data flow summary

3. **Structure**
   - Top-level directories
   - Key entry points

4. **Conventions**
   - Naming, error handling, configuration, feature boundaries

5. **Testing**
   - Test frameworks
   - Coverage areas and gaps

6. **Integrations**
   - External services, APIs, queues, storage

7. **Concerns**
   - Known risks, fragile areas, bottlenecks

## Rules
- Keep it concise, focus on what affects production readiness.
- Include file paths as examples when available.
- If repository access is limited, mark sections as Unknown and list assumptions.
