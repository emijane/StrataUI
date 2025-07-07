/**
 * Font Awesome Icon Library Setup
 *
 * This module configures the Font Awesome icon system globally for the app.
 * It ensures only explicitly imported icons are bundled (tree-shaking friendly),
 * and prevents automatic CSS injection to avoid conflicts with Tailwind or custom styles.
 *
 * Usage:
 * - This file should be imported once (e.g., in `_app.tsx` or layout.tsx) to register icons globally.
 * - After importing, you can use icons via <FontAwesomeIcon icon={faUser} />, etc.
 */

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

// Import the core Font Awesome styles (required once in the app)
import "@fortawesome/fontawesome-svg-core/styles.css";

// Disable automatic CSS injection to avoid style duplication/conflict
config.autoAddCss = false;

// Register specific icons to the global library for usage across the app
library.add(faUser, faSearch, faBars, faGithub);
