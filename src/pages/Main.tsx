import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnyRouter, RouterProvider } from "@tanstack/react-router";
import { useTheme } from "@stores/theme.store";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

type MainProps = {
  router: AnyRouter;
};

const Main = ({ router }: MainProps) => {
  // Synchronizes the theme in the DOM
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default Main;
