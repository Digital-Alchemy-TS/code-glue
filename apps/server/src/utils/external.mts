import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { inspect } from "util";

// common stuff for dayjs
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(weekOfYear);

// making console.log not suck
inspect.defaultOptions.depth = 100;
