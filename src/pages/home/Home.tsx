import { useTranslation } from "react-i18next";

import Chat from "@src/components/organisms/Chat/Chat";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("pages.home.title", "Home")}</h1>
      <Chat conversation={null} />
    </div>
  );
};

export default Home;
