import { SUPABASE_METHODS } from "../helpers/supabaseQueryHelpers";
import PARAMS from "../constants/urlParams";
import { DATE_FORMAT_FULL } from "../constants/uiConstants";

// Filters
const DISCOUNT = {
  ALL: "all",
  WITH_DISCOUNT: "with-discount",
  NO_DISCOUNT: "no-discount",
};
const PRICE = {
  ALL: "all",
  UNDER_300: "<300",
  UNDER_500: "<500",
  UNDER_1000: "<1000",
};
const CURRENCY = "$";

// options for UI
const DISCOUNT_OPTIONS = [
  { value: DISCOUNT.ALL, label: "All" },
  { value: DISCOUNT.WITH_DISCOUNT, label: "With discount" },
  { value: DISCOUNT.NO_DISCOUNT, label: "No discount" },
];

const PRICE_OPTIONS = [
  { value: PRICE.ALL, label: "All" },
  { value: PRICE.UNDER_300, label: `Under 300${CURRENCY}` },
  { value: PRICE.UNDER_500, label: `Under 500${CURRENCY}` },
  { value: PRICE.UNDER_1000, label: `Under 1000${CURRENCY}` },
];

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A → Z)" },
  { value: "name-desc", label: "Name (Z → A)" },
  { value: "regularPrice-asc", label: "Price (low first)" },
  { value: "regularPrice-desc", label: "Price (high first)" },
  { value: "maxCapacity-asc", label: "Capacity (low first)" },
  { value: "maxCapacity-desc", label: "Capacity (high first)" },
];

// sort constant default
const DEFAULT_SORT = SORT_OPTIONS[0].value;

export const CABIN_CONFIG = {
  FILTERS: {
    DISCOUNT: {
      FIELD: "discount", // backend field name
      PARAM: PARAMS.CABIN.DISCOUNT_FILTER, // url param name
      DEFAULT: DISCOUNT.ALL,
      OPTIONS: DISCOUNT_OPTIONS,
      META_DATA: {},
      ToFilter: (value) => {
        if (!value || value === DISCOUNT.ALL) return null;

        if (value === DISCOUNT.WITH_DISCOUNT) {
          // discount > 0
          return { field: "discount", method: SUPABASE_METHODS.GT, value: 0 };
        }

        if (value === DISCOUNT.NO_DISCOUNT) {
          return {
            field: "discount",
            method: SUPABASE_METHODS.EQ,
            value: 0,
          };
        }

        return null;
      },
    },
    PRICE: {
      FIELD: "regularPrice", // backend field name
      PARAM: PARAMS.CABIN.PRICE_FILTER, // url param name
      DEFAULT: PRICE.ALL,
      OPTIONS: PRICE_OPTIONS,
      META_DATA: { CURRENCY },
      ToFilter: (value) => {
        if (!value || value === PRICE.ALL) return null;

        // map the string keys to numeric comparisons
        switch (value) {
          case PRICE.UNDER_300:
            return {
              field: "regularPrice",
              method: SUPABASE_METHODS.LT,
              value: 300,
            };
          case PRICE.UNDER_500:
            return {
              field: "regularPrice",
              method: SUPABASE_METHODS.LT,
              value: 500,
            };
          case PRICE.UNDER_1000:
            return {
              field: "regularPrice",
              method: SUPABASE_METHODS.LT,
              value: 1000,
            };
          default:
            return null;
        }
      },
    },
  },
  SORT: {
    OPTIONS: SORT_OPTIONS,
    PARAM: PARAMS.SORT, // url param name
    DEFAULT: DEFAULT_SORT,
  },
  UI: {
    DATE_FORMAT: DATE_FORMAT_FULL,
  },
};
