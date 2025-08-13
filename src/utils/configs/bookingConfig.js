import { SUPABASE_METHODS } from "../supabaseQueryHelpers";
import { PARAMS } from "./params";

const STATUS = {
  ALL: "all",
  CHECKED_OUT: "checked-out",
  CHECKED_IN: "checked-in",
  UNCONFIRMED: "unconfirmed",
};

// sort constant default
const DEFAULT_SORT = "startDate-desc";

// options for UI
const statusOptions = [
  { value: STATUS.ALL, label: "All" },
  { value: STATUS.CHECKED_OUT, label: "Checked out" },
  { value: STATUS.CHECKED_IN, label: "Checked in" },
  { value: STATUS.UNCONFIRMED, label: "Unconfirmed" },
];

const sortOptions = [
  { value: "startDate-desc", label: "Date — recent first" },
  { value: "startDate-asc", label: "Date — earliest first" },
  { value: "totalPrice-desc", label: "Amount — high first" },
  { value: "totalPrice-asc", label: "Amount — low first" },
];

export const BOOKING_CONFIG = {
  statusOptions: STATUS,
  filters: {
    status: {
      field: "status", // backend field name
      param: PARAMS.BOOKING.STATUS, // url param name
      default: STATUS.ALL,
      options: statusOptions,
      toFilter: (value) =>
        !value || value === STATUS.ALL
          ? null
          : {
              field: PARAMS.BOOKING.STATUS,
              method: SUPABASE_METHODS.EQ,
              value,
            },
    },
  },
  sort: {
    options: sortOptions,
    param: PARAMS.SORT, // url param name
    default: DEFAULT_SORT,
  },
  ui: {
    statusTagColors: {
      [STATUS.UNCONFIRMED]: "blue",
      [STATUS.CHECKED_IN]: "green",
      [STATUS.CHECKED_OUT]: "silver",
    },

    dateFormats: {
      display: "MMM dd yyyy",
    },
  },
};
