import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import Loader from "@components/atoms/Loader/Loader";
import Footer from "@components/organisms/Footer/Footer";
import Header from "@src/components/organisms/Header/Header";

import "./Default.css";

const Default = () => {
  return (
    <div className="Root">
      <Header />
      <main className="page-content">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Default;
