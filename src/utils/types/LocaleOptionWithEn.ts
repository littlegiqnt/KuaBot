import { Locale } from "discord.js";
import PartiallyRequired from "./PartiallyRequired";

type Locales = PartiallyRequired<Record<Locale | "en", string>, "en">
export default Locales;