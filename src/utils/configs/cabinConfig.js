import { SUPABASE_METHODS } from "../helpers/supabaseQueryHelpers";
import PARAMS from "../constants/urlParams";
import { DATE_FORMAT } from "../constants/uiConstants";

// Filters
const DISCOUNT = {
  ALL: "all",
  WITH_DISCOUNT: "with-discount",
  NO_DISCOUNT: "no-discount",
};
const PRICE = {
  ALL: "all",
  UNDER_200: "<200",
  UNDER_300: "<300",
  UNDER_400: "<500",
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
  { value: PRICE.UNDER_200, label: `Under 200${CURRENCY}` },
  { value: PRICE.UNDER_300, label: `Under 300${CURRENCY}` },
  { value: PRICE.UNDER_400, label: `Under 400${CURRENCY}` },
];

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A → Z)" },
  { value: "name-desc", label: "Name (Z → A)" },
  { value: "price-asc", label: "Price (low first)" },
  { value: "price-desc", label: "Price (high first)" },
  { value: "capacity-asc", label: "Capacity (low first)" },
  { value: "capacity-desc", label: "Capacity (high first)" },
];

// sort constant default
const DEFAULT_SORT = SORT_OPTIONS[0].value;

export const CABIN_CONFIG = {
  FILTERS: {
    DISCOUNT: {
      FIELD: "discount", // backend field name
      PARAM: PARAMS.CABIN.DISCOUNT_FILTER, // url param name
      DEFAULT: DISCOUNT.ALL,
      OPTION: DISCOUNT_OPTIONS,
      META_DATA: {},
      ToFilter: (value) =>
        !value || value === DISCOUNT.ALL
          ? null
          : {
              field: PARAMS.CABIN.DISCOUNT_FILTER,
              method: SUPABASE_METHODS.EQ,
              value,
            },
    },
    PRICE: {
      FIELD: "regularPrice", // backend field name
      PARAM: PARAMS.CABIN.PRICE_FILTER, // url param name
      DEFAULT: PRICE.ALL,
      OPTION: PRICE_OPTIONS,
      META_DATA: { CURRENCY },
      ToFilter: (value) =>
        !value || value === PRICE.ALL
          ? null
          : {
              field: PARAMS.CABIN.PRICE_FILTER,
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
    DATE_FORMAT,
  },
};
