import { BigdataChatWidget } from "@/components/Widgets/BigdataChatWidget";
import { BigdataWidgetManagerProvider } from "@/components/Widgets/BigdataWidgetManagerProvider";
import styles from "./page.module.css";
import { Article } from "@/components/Article/Article";

export default function Advanced() {
  return (
    <div className={styles["home"]}>
      <h2>News reader</h2>
      <p>Expand user context. Filter for your own data</p>
      <div className={styles["widgets-container"]}>
        <BigdataWidgetManagerProvider
          baseTheme={{ preset: "auto", primaryColor: "#eea933" }}
        >
          <Article />
          <BigdataChatWidget
            className={styles["widget-item"]}
            name={"home-chat"}
            researchConfig={{ inlineAttribution: true }}
          />
        </BigdataWidgetManagerProvider>
      </div>
    </div>
  );
}
