---
name: Soulsysta Collective
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#414843'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#727973'
  outline-variant: '#c1c8c1'
  surface-tint: '#436652'
  primary: '#001f11'
  on-primary: '#ffffff'
  primary-container: '#123524'
  on-primary-container: '#7a9f88'
  inverse-primary: '#a9cfb7'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#211913'
  on-tertiary: '#ffffff'
  tertiary-container: '#372d26'
  on-tertiary-container: '#a2948b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5ecd2'
  primary-fixed-dim: '#a9cfb7'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#2b4e3b'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#f0dfd5'
  tertiary-fixed-dim: '#d4c3ba'
  on-tertiary-fixed: '#221a14'
  on-tertiary-fixed-variant: '#50453d'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 80px
    fontWeight: '600'
    lineHeight: 90px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 54px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  stats-number:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style
The design system embodies a state of "aspirational stillness." It blends the technical precision of high-performance athletic wear with the tactile, sensory elegance of luxury apothecary. The brand personality is serene yet commanding, focusing on the intersection of mental wellness and physical vitality.

The visual style is **Elevated Minimalism** with **Glassmorphic** accents. It prioritizes expansive whitespace to allow high-end, cinematic photography to breathe. The emotional response should be one of immediate calm, followed by a sense of belonging to an exclusive, high-performance community. Layouts should feel like a premium editorial magazine—intentional, rhythmic, and sophisticated.

## Colors
The palette is rooted in the earth and elevated by light. 
- **Deep Forest Green** serves as the anchor for authority and grounding, used primarily for high-contrast CTAs and primary typography.
- **Ivory and Warm White** create the expansive "canvas," providing the necessary whitespace for an open, airy feel.
- **Soft Gold and Champagne** are used sparingly for fine lines, iconography, and premium indicators, mimicking metallic hardware or sunlight.
- **Blush and Muted Sage** provide soft, organic transitions for secondary surfaces and status indicators.

## Typography
The typographic hierarchy creates a dialogue between tradition and modernity. 
- **Headlines:** Use Playfair Display for a literary, sophisticated feel. Use "Optical Sizing" where available to maintain hair-line elegance at large scales.
- **Body:** Inter provides a neutral, highly readable counterpoint to the expressive serif headlines. Maintain generous line height (1.6x+) for body copy to enhance the feeling of "breath."
- **Data/Numbers:** Use Hanken Grotesk (a high-quality alternative to Neue Haas) for a bold, athletic, and modern feel in tracking stats or numerical lists.
- **Labels:** Always use uppercase with increased letter spacing for a high-fashion, navigational feel.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 
- **Whitespace as a Feature:** Sections should be separated by significant vertical gaps (120px to 160px) to signify a change in narrative pace.
- **The "Editorial" Offset:** Avoid perfect symmetry. Place imagery off-center or allow it to bleed off one edge of the screen to create a cinematic, storytelling effect.
- **Safe Zones:** Content containers should never feel cramped. Use a minimum of 80px horizontal padding on desktop to ensure the focus remains central and prestigious.

## Elevation & Depth
Depth is achieved through **optical layering** rather than traditional drop shadows.
- **Glassmorphism:** Navigation bars and foreground overlays use a `backdrop-filter: blur(20px)` with a semi-transparent White (`rgba(255,255,255,0.7)`) fill. This creates a "frosted glass" effect that feels light and premium.
- **Shadows:** When used, shadows must be "Ambient"—extremely soft, using the Forest Green or Sand color as a tint rather than pure Black. Example: `0px 20px 40px rgba(18, 53, 36, 0.05)`.
- **Z-Axis Hierarchy:** Imagery often sits on the lowest level, with glass cards and typography floating gracefully above, creating a sense of three-dimensional space.

## Shapes
The shape language is primarily **Soft (0.25rem - 0.75rem)**. While the overall vibe is modern, slightly rounded corners prevent the UI from feeling aggressive or "sharp."
- **Image Masks:** Utilize organic, pill-shaped, or arched masks for lifestyle photography to break the rigidity of the grid.
- **Buttons:** Use a hybrid approach—Primary buttons are sharp or subtly rounded (4px), while secondary "wellness" tags use pill-shapes (full rounding) to feel more approachable.

## Components
- **Editorial Headers:** Use `display-lg` typography overlaid on high-contrast, slow-motion video or grain-textured photography.
- **Glassmorphic Cards:** White surfaces with 70% opacity, 20px blur, and a 1px solid White border at 20% opacity.
- **Primary CTAs:** Deep Forest Green background with Ivory text. On hover, the background shifts to Soft Gold. Text should be `label-caps`.
- **Navigation:** A fixed top bar with a glassmorphic blur. Links use Inter `label-caps`. The active state is indicated by a subtle Soft Gold dot beneath the text.
- **Input Fields:** Minimalist design with only a bottom border in Muted Sage. Focus state transitions the border to Forest Green with a subtle fade.
- **Image Carousels:** Use a "Peek" behavior where the next image is partially visible, encouraging a sense of discovery and flow.