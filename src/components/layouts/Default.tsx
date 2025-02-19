import { Outlet } from "@tanstack/react-router";
import Header from "@src/components/organisms/Header/Header";
import Footer from "@components/organisms/Footer/Footer";
import { Suspense } from "react";
import Loader from "@components/atoms/Loader/Loader";

import "./Default.css";

const Default = () => {
  return (
    <div className="Root">
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Default;
