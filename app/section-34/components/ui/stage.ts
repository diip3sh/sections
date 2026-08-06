/**
 * The content cap, following `section-30`'s split.
 *
 * Past 1440 the design has nothing more to say: the headline, the band's two
 * columns and the nav row all stop growing and centre, so the layout at 2560
 * is the layout at 1440 with wider margins rather than the same blocks pulled
 * apart. What does not stop is the horizontal rules — the nav's bottom edge and
 * the band's two — which stay on their full-bleed shells and run to the screen
 * edge, along with the wave field and the fade behind everything.
 *
 * The vertical rails are measured from *this* box rather than the viewport, so
 * they stay 16/48 off the content the way Figma draws them instead of drifting
 * out to the screen edges and leaving the copy stranded in the middle.
 *
 * Split across three files here, so it is a module rather than a local const.
 */
export const STAGE = "relative mx-auto w-full max-w-[1440px]";
