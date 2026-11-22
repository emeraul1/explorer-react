import type { JSX } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import { SiteHeader } from "./components/organisms/SiteHeader";
import { Footer } from "./components/organisms/Footer";
import { HomePage } from "./pages/HomePage";
import { CountryDetailPage } from "./pages/CountryDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App(): JSX.Element {
  return (
    <>
      <SiteHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/country/:code"
          element={<CountryDetailPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}