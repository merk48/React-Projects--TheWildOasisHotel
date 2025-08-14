import { SUPABASE_METHODS } from "../helpers/supabaseQueryHelpers";
import PARAMS from "../constants/urlParams";
import { DATE_FORMAT_FULL } from "../constants/uiConstants";

// Filters
const STATUS = {
  ALL: "all",
  CHECKED_OUT: "checked-out",
  CHECKED_IN: "checked-in",
  UNCONFIRMED: "unconfirmed",
};

// options for UI
const STATUS_OPTIONS = [
  { value: STATUS.ALL, label: "All" },
  { value: STATUS.CHECKED_OUT, label: "Checked out" },
  { value: STATUS.CHECKED_IN, label: "Checked in" },
  { value: STATUS.UNCONFIRMED, label: "Unconfirmed" },
];

const SORT_OPTIONS = [
  { value: "startDate-desc", label: "Date — recent first" },
  { value: "startDate-asc", label: "Date — earliest first" },
  { value: "totalPrice-desc", label: "Amount — high first" },
  { value: "totalPrice-asc", label: "Amount — low first" },
];
// sort constant default
const DEFAULT_SORT = SORT_OPTIONS[0].value;

export const BOOKING_CONFIG = {
  STATUS,
  SORT_OPTIONS,
  FILTERS: {
    STATUS: {
      FIELD: "status", // backend field name
      PARAM: PARAMS.BOOKING.STATUS_FILTER, // url param name
      DEFAULT: STATUS.ALL,
      OPTIONS: STATUS_OPTIONS,
      META_DATA: {},
      ToFilter: (value) =>
        !value || value === STATUS.ALL
          ? null
          : {
              field: PARAMS.BOOKING.STATUS_FILTER,
              method: SUPABASE_METHODS.EQ,
              value,
            },
    },
  },
  SORT: {
    OPTIONS: SORT_OPTIONS,
    PARAM: PARAMS.SORT, // url param name
    DEFAULT: DEFAULT_SORT,
  },
  UI: {
    STATUS_TAG_COLORS: {
      [STATUS.UNCONFIRMED]: "blue",
      [STATUS.CHECKED_IN]: "green",
      [STATUS.CHECKED_OUT]: "silver",
    },
    DATE_FORMAT: DATE_FORMAT_FULL,
  },
};
