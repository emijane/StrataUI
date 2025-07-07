/**
 * Home Page (`/`)
 *
 * This is the default root route for the StrataUI application.
 * It renders a simple centered "Home" heading and includes a glowing background effect.
 *
 * - The glow effect is handled via a styled `div` with the class `background-glow`
 * - The heading is positioned above the background using z-index
 * - Tailwind utilities are used for layout, centering, and responsiveness
 */

export default function Page() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Decorative blurred background glow (defined in CSS) */}
      <div className="background-glow"></div>

      {/* Foreground content (centered text) */}
      <h1 className="relative z-10">Home</h1>
    </main>
  );
}
