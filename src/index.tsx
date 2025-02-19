import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "@utils/i18n";
import Main from "@pages/Main.tsx";
import Loader from "@components/atoms/Loader/Loader";
import NotFound from "@pages/NotFound/NotFound";

// Global styles
import "@assets/styles/fonts.css";
import "@assets/styles/theme.css";
import "@assets/styles/global.css";

// Create a new router instance
const router = createRouter({
  routeTree,
  ...{
    defaultPendingComponent: () => {
      return <Loader />;
    },
    defaultNotFoundComponent: () => {
      return <NotFound />;
    },
  },
});
declare module "@tanstack/react-router" {
  interface Register {
    // Infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}

// Render the app
const rootElement = document.querySelector("#app") as Element;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <Main router={router} />
    </StrictMode>
  );
}
