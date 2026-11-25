/** localStorage key for the visitor's light/dark choice. */
export const THEME_KEY = "theme";

/**
 * Inline <head> script (see app/layout.tsx). Runs before first paint: uses the saved choice,
 * otherwise light (the default, whatever the OS setting), so the page never flashes the wrong theme.
 * Kept in a plain module so the server layout receives the actual string.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="dark"){t="light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
