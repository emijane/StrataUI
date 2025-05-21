// Manages icons for general icons.
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // 👈 essential
config.autoAddCss = false;

library.add(faUser, faSearch, faBars, faGithub);