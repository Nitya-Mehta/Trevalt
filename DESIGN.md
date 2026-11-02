# Trevalt visual system

## Direction

Trevalt leads with its name. The opening screen contains only the morphing wordmark, surrounded by quiet navigation. The site is dark throughout. Generous empty space, large type, visible rules, and square edges give it a restrained modern brutalist character. Project work begins below the opening screen. The private workspace remains paused behind Coming soon pages.

## Tokens

- Canvas `#0b0c0b`; raised surface `#151715`; inset surface `#121412`.
- Main text `#f3f3ef`; secondary text `#b0b0a8`; separators `rgba(243,243,239,.2)`.
- Orange `#ff5500` is a sparing accent for focus, interaction, and the founder cards. It should not turn every heading or button orange.
- Space Grotesk for headings and interface text; JetBrains Mono for numbers, IDs, and code. Fraunces and TAN Nimbus appear in the restored business card artwork.
- Content width 1440px. Reading copy stays narrow. Public sections have ample vertical space; groups are divided with simple rules.

## Composition

- The homepage opens with the full-screen Trevalt signature, followed by a compact Web, Android, and AI services strip with a Contact link. Homepage sections span the viewport with a small edge inset; Work follows as image-and-type rows, then draggable cards inside a clearly marked boundary.
- Keep the mascot logo beside the Trevalt wordmark in the shared header. The services strip keeps its numbered services at the left and its Contact link at the far right. GeoWav's homepage preview uses a three-screen composition from its existing app imagery.
- Public pages use one large heading, concise supporting copy, project imagery, and substantial dark space.
- About pairs each founder portrait with a compact name and role row above the original flipping business card design. Portraits never overlap the business card artwork. Cards flip on hover and remain usable by click and keyboard.
- Hairline and solid rules establish structure. No glass, glow, gradient, or decorative grid. Cards and controls are square except where the original business card artwork uses its own shape.
- Primary actions are compact solid rectangles. Secondary actions are text or outline controls. Inputs have visible labels and focus states.
- Navigation and footer stay plain text. On mobile, navigation wraps into a usable second line.

## Motion and behavior

- Preserve the morphing wordmark, draggable project cards, founder card flip and links, zoomable screenshots, and route interactions.
- Motion is brief and controlled. Reduced motion removes nonessential transforms and smooth scrolling while preserving access to content.

## Coverage

The system applies to every public route, five case studies, supporting states, navigation, and footer. Login/recovery/setup, admin, and client routes currently show a shared Coming soon screen at the owner's request. Their former interfaces are retained in `features/portal/` for later restoration. Server actions and Supabase behavior are outside the visual redesign.
