import { useMemo } from "react";
import { useUrl } from "../../../hooks/useUrl";
import { CABIN_CONFIG } from "../../../utils/configs/cabinConfig";
import { buildFiltersFromConfig } from "../../../utils/helpers/tableUrlHelpers";

export function useCabinFilters() {
  const discountConfig = CABIN_CONFIG.FILTERS.DISCOUNT;
  const priceConfig = CABIN_CONFIG.FILTERS.PRICE;

  const [discount, setDiscount] = useUrl(discountConfig.PARAM, {
    defaultValue: discountConfig.DEFAULT,
  });

  const [price, setPrice] = useUrl(priceConfig.PARAM, {
    defaultValue: priceConfig.DEFAULT,
  });

  const filters = useMemo(
    () =>
      buildFiltersFromConfig(
        new URLSearchParams([
          [discountConfig.PARAM, discount ?? discountConfig.DEFAULT],
          [priceConfig.PARAM, price ?? priceConfig.DEFAULT],
        ]),
        {
          // mapper for each param
          [discountConfig.PARAM]: (v) => discountConfig.ToFilter(v),
          [priceConfig.PARAM]: (v) => priceConfig.ToFilter(v),
        }
      ),
    [discount, price, discountConfig, priceConfig]
  );

  return { discount, setDiscount, price, setPrice, filters };
}
