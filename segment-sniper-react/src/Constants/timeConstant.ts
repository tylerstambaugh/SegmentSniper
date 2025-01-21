import { DateTime } from "luxon";


export const maxDateTime = () => {
    return new DateTime(DateTime.max()),
}