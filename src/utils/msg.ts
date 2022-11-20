import type { Locale } from "discord.js";
import type { TOptions } from "i18next";
import i18next from "i18next";

export default (locale: Locale, key: string, options?: TOptions) => i18next.t(key, { lng: locale, ...options });
