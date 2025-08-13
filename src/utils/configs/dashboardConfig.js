import { SUPABASE_METHODS } from "../helpers/supabaseQueryHelpers";
import PARAMS from "../constants/urlParams";
import { DATE_FORMAT } from "../constants/uiConstants";

// Filters
const LAST = {
  ALL: "all",
  WEEK: "7",
  MONTH: "30",
  TREE_MONTHS: "90",
};

// options for UI
const LAST_OPTIONS = [
  { value: LAST.ALL, label: "All" },
  { value: LAST.WEEK, label: "Last 7 days" },
  { value: LAST.MONTH, label: "Last 30 days" },
  { value: LAST.TREE_MONTHS, label: "Last 90 days" },
];

export const DASHBOARD_CONFIG = {
  FILTERS: {
    LAST: {
      PARAM: PARAMS.DASHBOARD.LAST_FILTER, // url param name
      DEFAULT: LAST.ALL,
      OPTIONS: LAST_OPTIONS,
      ToFilter: (value) =>
        !value || value === LAST.ALL
          ? null
          : {
              field: PARAMS.DASHBOARD.LAST_FILTER,
              method: SUPABASE_METHODS.EQ,
              value,
            },
    },
  },
  UI: {
    DATE_FORMAT,
  },
};
