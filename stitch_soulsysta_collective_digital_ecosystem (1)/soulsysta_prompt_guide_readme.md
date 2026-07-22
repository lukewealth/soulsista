# Soulsysta Collective | Design Prompt Guide

This README serves as the definitive guide for maintaining, extending, and iterating on the **Soulsysta Collective** digital ecosystem. It codifies the visual language, content strategy, and prompt engineering patterns used to generate the current high-fidelity mobile experience.

---

## 1. Brand Identity & Design System

All prompts must anchor in the following core visual principles to ensure continuity across new screens and assets.

### Visual Pillars
- **Palette:** `Ivory` (#FAF9F6) as the primary surface, `Forest Green` (#001F11) for primary actions and deep contrast, and `Muted Gold/Sage` for secondary accents.
- **Typography:** `Playfair Display` for headlines (Editorial, high-contrast serif) and `Inter` or `Hanken Grotesk` for utility/body text (clean, modern sans-serif).
- **Aesthetic:** "Expensive Minimalism." Think Apple's precision meets Aesop's apothecary warmth. Use high-contrast editorial photography, generous whitespace, and glassmorphic UI elements.

### Design System Reference
- **Active System:** `{{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_2}}`
- **Key Tokens:** `surface-container-low`, `primary-container`, `font-headline-lg`.

---

## 2. Core Prompting Patterns

### For New Screen Generation
When creating net-new pages (e.g., a "Speaking Engagements" or "Journal" page), use this structural template:

> **Prompt:** "Design a [Mobile/Desktop] [Page Name] for Soulsysta Collective. The design must be anchored in the established visual identity of {{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_2}}. Use a cinematic hero section with 'Playfair Display' typography. Incorporate glass-card sections for [Specific Content]. Maintain the 'Expensive Minimalism' aesthetic with high-end editorial photography like in {{DATA:SCREEN:SCREEN_17}}. The intent is to [Conversion Goal]."

### For Image Generation
To maintain the "Soulsysta Look" in new visual assets:

> **Prompt:** "Generate a [Portrait/Landscape] photo of [Subject]. Style: High-end editorial photography, soft natural morning light, neutral ivory background. Palette: Muted forest greens and warm ivories. Aesthetic: Professional, serene, and aspirational. Use 'pro' model for complex compositions."

---

## 3. Component Library
Refer to `{{DATA:COMPONENTS:COMPONENTS_4}}` for shared UI patterns:
- **TopAppBar:** Small, centered headline, glassmorphic background.
- **BottomNavBar:** Label + Icon, 4-destination, rounded-t-full shape.
- **Footer:** Editorial links with underline-offset hovers.

---

## 4. Conversion Funnels
The ecosystem is built on two primary funnels defined in `{{DATA:DOCUMENT:DOCUMENT_18}}`:
1. **The Booking Journey:** (Questionnaire {{DATA:SCREEN:SCREEN_13}} → Selection {{DATA:SCREEN:SCREEN_14}} → Scheduling {{DATA:SCREEN:SCREEN_12}} → Success {{DATA:SCREEN:SCREEN_11}}).
2. **The Product Funnel:** (Bookstore {{DATA:SCREEN:SCREEN_10}} → Purchase).

---

## 5. Maintenance & Iteration
- **To Tweak UI:** Use `edit_html_in_place` for color/text/spacing adjustments.
- **To Restructure:** Use `edit_html_full_regen` when adding major new sections or changing layouts.
- **Fidelity Rule:** Never "correct" or "improve" brand names or established copy (e.g., "She Too Can") unless explicitly asked.

---
*Generated for the Soulsysta Collective Design Team.*
