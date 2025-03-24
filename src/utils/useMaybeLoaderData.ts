import { useMatch } from "@tanstack/react-router";

import { FileRouteTypes } from "@src/routeTree.gen";

type UseMaybeLoaderDataReturn<TData extends Record<any, unknown>> = {
  data: TData;
  isGeneric: boolean;
  activeRouteId: string;
};

/**
 * A hook that returns default data if the generic route is active or the loader data from the params route
 *
 * @param genericRoute The generic route to check
 * @param paramsRoute The params route to check
 * @param options Options with defaultData
 * @returns An object with the loader data, active route ID, and whether the generic route is active
 */
export function useMaybeLoaderData<TData extends Record<any, unknown>>(
  genericRoute: FileRouteTypes["id"],
  paramsRoute: FileRouteTypes["id"],
  options: {
    defaultData: TData;
  }
): UseMaybeLoaderDataReturn<TData> {
  const genericRouteMatch = useMatch({
    from: genericRoute,
    shouldThrow: false,
  });

  const paramsRouteMatch = useMatch({
    from: paramsRoute,
    shouldThrow: false,
  });

  const isGeneric = !!genericRouteMatch && !paramsRouteMatch;
  const activeRouteId = isGeneric ? genericRoute : paramsRoute;

  return {
    data: isGeneric
      ? options.defaultData
      : (paramsRouteMatch?.loaderData as TData),
    isGeneric,
    activeRouteId,
  };
}
