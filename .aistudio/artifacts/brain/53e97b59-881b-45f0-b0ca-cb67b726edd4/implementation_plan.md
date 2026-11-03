# Royal Door Frame Distortion Fix & Soft Breeze Motion

Fix the hero image distortion by locking the royal door frame into its native portrait aspect ratio within a centered card container, surrounded by a seamless deep burgundy backdrop, and implement delicate soft-breeze micro-animations for the hanging golden bells and blooming corner lotuses.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were clarified and confirmed in Phase 1:

- **Confirmed Decision 1: Frame Sizing & Presentation**: The royal door frame will be presented as a **centered portrait card** with the matching deep burgundy damask backdrop (`#4A0E2E`) flanking it on wider screens. This guarantees zero aspect-ratio distortion, zero vertical squashing, and crisp pixel alignment across mobile, tablet, and desktop viewports.
- **Confirmed Decision 2: Motion Style**: A **soft breeze animation** will be applied. The hanging golden temple bells will sway gently with a subtle pendulum swing ($\pm 2.5^\circ$ to $\pm 3^\circ$), and the blooming lotus bouquets will breathe and tilt delicately with organic ease-in-out timing, avoiding abrupt jerks or clipping seams.

---

## 1. Overview & Core Concept

- **What It Does**: Presents a pristine, un-distorted royal Indian wedding entrance arch with a warm glowing inner paper parchment and delicate soft-breeze micro-movements on the corner motifs (golden hanging bells and lotus clusters), followed by a smooth-scroll affordance to the invitation details below.
- **Target Audience / Persona**: Wedding guests accessing the invitation on mobile phones, tablets, and wide desktop screens.
- **Key Value**: Delivers the authentic luxury aesthetic of the royal burgundy arch template without stretching, distortion, or artificial cutouts, creating a regal first impression.

---

## 2. User Experience & Visual Design

- **Layout Structure**:
  - Full-viewport container (`h-[100svh] min-h-[100svh] w-full`) bathed in deep royal burgundy (`#4A0E2E`) with tone-on-tone gold dust texture.
  - Centered portrait stage (`max-w-md md:max-w-lg aspect-[2/3] h-full max-h-[100svh] relative`) strictly maintaining the original 2:3 proportion of the door frame asset.
  - Flush top alignment with zero awkward top gaps or cutouts.
- **Visual Identity & Atmosphere**:
  - *Base Frame*: High-fidelity royal burgundy arch with carved gold borders and intricate Indian motifs.
  - *Inner Atmosphere*: Warm ivory paper parchment with a soft radiant sunlit pulse (`radial-gradient` from `#FFFDF8` to `#FFE8BD`).
  - *Micro-Motion*:
    - **Hanging Bells**: Delicate pendulum swaying from the top corners (`transform-origin: 50% 0%`, 5.4s cycle).
    - **Corner Lotuses**: Gentle organic breathing and slight rocking angle ($\pm 1.5^\circ$, 6.2s cycle).
    - **Drifting Petals**: Translucent rose-pink petals drifting softly through the radiant aperture.
  - *Affordance*: Centered gold chevron with clear English text (`"View Invitation"`), gently pulsing to guide guests downward.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Aspect-Ratio Locked Container vs Full-Viewport Stretch**
  - *Chosen Approach*: Enclose the door frame inside an `aspect-[2/3]` portrait card centered with `max-h-[100svh] mx-auto`, bordered seamlessly by the deep burgundy page backdrop.
  - *Why*: The original template image has a native 2:3 aspect ratio. Using `object-fill` across varying phone heights and wide desktop monitors caused extreme horizontal and vertical distortion. The centered card preserves the artwork's authentic proportions.
  - *Alternatives Considered*: Cropping with `object-cover` was rejected because it clips the bottom lotuses and top bells.
- **Decision 2: Pristine Base Asset Integration**
  - *Chosen Approach*: Use the original high-resolution transparent template (`Luxury_Burgundy_Lotus_Wedding_Invitation_Template___Indian_Wedding_Design-removebg-preview__1__1da85cbb.png`) as the primary frame, layered over the warm radiant glow, with smoothly animated bell and lotus overlay layers perfectly registered to the base artwork.
  - *Why*: Eliminates the harsh solid-color patch artifacts introduced by earlier ImageMagick edits.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│ Full Viewport Canvas: 100svh (#4A0E2E Royal Burgundy Backdrop)  │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Centered Portrait Card: aspect-[2/3] (max-w-md / lg)    │   │
│   │                                                         │   │
│   │  [Layer 0] Warm Sunlit Radial Parchment (#FFFDF8..#FFE) │   │
│   │  [Layer 1] Soft Drifting Lotus Petals & Sparkle Aura    │   │
│   │  [Layer 2] Base Royal Burgundy Lotus Arch Frame (clean) │   │
│   │  [Layer 3] Animated Hanging Bells (Pendulum Soft Breeze)│   │
│   │  [Layer 4] Animated Corner Lotuses (Gentle Breeze Sway) │   │
│   │  [Layer 5] "View Invitation" Smooth Scroll Chevron      │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Gold Royal Divider Ribbon]                                    │
└─────────────────────────────────────────────────────────────────┘
```

- **CSS & Keyframe Strategy**:
  - `bellSoftBreezeLeft` / `bellSoftBreezeRight`: $\pm 2.8^\circ$ rotation, smooth ease-in-out, `will-change: transform`.
  - `lotusSoftBreezeLeft` / `lotusSoftBreezeRight`: $\pm 1.8^\circ$ tilt, $1.02\times$ scale, smooth ease-in-out.
  - Respects `@media (prefers-reduced-motion: reduce)`.
