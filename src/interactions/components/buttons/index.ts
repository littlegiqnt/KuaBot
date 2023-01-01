import { Button } from "structure/interaction/component/Button";
import detectLanguage from "./detect-language";
import ticketOpenCheck from "./ticket/create-ticket-check";

const buttons: Array<Button> = [
    detectLanguage, ticketOpenCheck,
];
export default buttons;