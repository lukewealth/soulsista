---
name: Soulsysta Collective Visual Identity
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#414843'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#727973'
  outline-variant: '#c1c8c1'
  surface-tint: '#436652'
  primary: '#001f11'
  on-primary: '#ffffff'
  primary-container: '#123524'
  on-primary-container: '#7a9f88'
  inverse-primary: '#a9cfb7'
  secondary: '#785a00'
  on-secondary: '#ffffff'
  secondary-container: '#ffd576'
  on-secondary-container: '#795a00'
  tertiary: '#3b001b'
  on-tertiary: '#ffffff'
  tertiary-container: '#600331'
  on-tertiary-container: '#e47099'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5ecd2'
  primary-fixed-dim: '#a9cfb7'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#2b4e3b'
  secondary-fixed: '#ffdf9c'
  secondary-fixed-dim: '#eac165'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#ffd9e2'
  tertiary-fixed-dim: '#ffb1c8'
  on-tertiary-fixed: '#3e001d'
  on-tertiary-fixed-variant: '#812149'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 84px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
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
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  button-text:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
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
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  section-gap: 160px
---

## Brand & Style
The design system embodies "Editorial Zen"—a fusion of high-fashion editorial layouts and serene wellness aesthetics. It targets a discerning audience seeking both substance and luxury, evoking an emotional response of grounded aspiration and quiet confidence.

The visual style is a hybrid of **Editorial Minimalism** and **Glassmorphism**. It prioritizes high-contrast compositions, expansive whitespace (the "breath" of the brand), and cinematic image-making. The interface acts as a silent gallery for high-production photography, using subtle translucent layers to provide depth without clutter. The objective is high conversion through perceived value and effortless sophistication.

## Colors
The palette is rooted in nature and prestige. 
- **Primary (Deep Forest Green):** Used for heavy grounding elements, hero footers, and primary buttons. It represents growth and wisdom.
- **Secondary (Champagne Gold):** Reserved for high-value accents, borders on interactive elements, and subtle iconography. 
- **Surface (Ivory White):** The canvas for the entire system. Pure white is avoided to maintain a warm, organic feel.
- **Accents (Royal Rose & Soft Blush):** Used sparingly for "Shop Now" cues or highlights in editorial sections to draw the eye without breaking the calm.
- **Text (Luxury Black):** A soft, deep charcoal that ensures high legibility while appearing more expensive than pure black.

## Typography
The typographic scale emphasizes dramatic contrast between the serif headlines and sans-serif body text.
- **Headlines:** Use Playfair Display for all major headings. Large display sizes should use negative letter-spacing to mimic high-end magazine mastheads.
- **Body:** Inter provides a neutral, highly readable counterpoint to the expressive headlines. 
- **Labels:** Hanken Grotesk (as a modern substitute for Neue Haas) is used for utility text, navigation, and labels. These are often presented in all-caps with generous letter-spacing to denote "luxury status."

## Layout & Spacing
This design system utilizes a **Fixed Grid** philosophy for desktop (12 columns) and a **Fluid Grid** for mobile (4 columns). 

- **The "Breath" Principle:** Vertical spacing between major sections is intentionally large (160px+) to force the user to slow down and consume content sequentially.
- **Asymmetry:** Editorial layouts should break the grid occasionally—for example, images offsetting into the margins or overlapping text blocks to create a cinematic feel.
- **Mobile Reflow:** On mobile, margins tighten to 20px, and section gaps reduce to 80px, maintaining the feeling of space without excessive scrolling.

## Elevation & Depth
Depth is created through **Glassmorphism** and **Tonal Layering** rather than traditional shadows.

1.  **Glassmorphism:** Navigation bars and sticky conversion bars use a high-refraction backdrop blur (20px-30px) with a 40% opaque Ivory White fill. A 1px border in 10% Gold (#C9A34A) defines the edge.
2.  **Tonal Layers:** Secondary content areas use Soft Blush or Warm Taupe backgrounds to separate them from the main Ivory surface.
3.  **Soft Ambient Shadows:** When shadows are required (e.g., on elevated cards), they must be ultra-diffused: `0px 20px 40px rgba(18, 53, 36, 0.05)`, using the Primary Deep Green as the shadow tint for a more natural integration.

## Shapes
The shape language is primarily **Soft (0.25rem)**. This slight rounding provides a modern, approachable feel while maintaining the architectural structure of a premium brand.

- **Image Masks:** Use custom "Editorial Masks"—large organic curves or arch shapes for hero images to soften the layout.
- **Interactive Elements:** Buttons and input fields maintain the 0.25rem radius. 
- **Pill Accents:** Only "Status" chips or small badges may use the full pill-shape (round-xl) to distinguish them from structural elements.

## Components
- **Primary Buttons:** High-contrast Deep Forest Green backgrounds with Ivory text. On hover, the background transitions to Champagne Gold. Micro-interactions include a slight scale-up (1.02x) and a subtle letter-spacing expansion.
- **Editorial Cards:** Large-format images with 0.25rem radius. Content is placed in a glassmorphic overlay at the bottom or floating slightly off-center.
- **Sticky Conversion Bar:** A persistent bottom-bar (mobile) or top-right floating element (desktop). It uses the glassmorphic style with a prominent "Book Now" call-to-action in Royal Rose.
- **Input Fields:** Minimalist design with only a bottom border (1px) in Warm Taupe. Labels use the "Label-Caps" typography style above the field.
- **Lists:** Bullet points are replaced with custom Champagne Gold icons (e.g., a small minimalist star or leaf) to maintain the luxury aesthetic.
- **Image Masks:** Utilize "The Arch" mask for portraits and "The Wide Panorama" for landscape lifestyle shots to create a curated, gallery-like experience.