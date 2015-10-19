import Reflux from "reflux";
import RefluxPromise from "reflux-promise";

Reflux.use(new RefluxPromise(window.Promise));

export { default as soundActions } from "./soundActions";
export { default as searchActions } from "./searchActions";
export { default as themeActions } from "./themeActions";
export { default as windowActions } from "./windowActions";
