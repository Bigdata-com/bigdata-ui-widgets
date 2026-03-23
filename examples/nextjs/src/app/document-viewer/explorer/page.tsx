import { BigdataDocumentViewerWidget } from "@/components/Widgets/BigdataDocumentViewerWidget";
import { BigdataWidgetManagerProvider } from "@/components/Widgets/BigdataWidgetManagerProvider";
import styles from "./page.module.css";
import { Search } from "@/components/Search/Search";

export default function Explorer() {
  return (
    <div className={styles["home"]}>
      <h2>Document explorer</h2>
      <p>Visualize your Bigdata content with ease</p>
      <div className={styles["widgets-container"]}>
        <BigdataWidgetManagerProvider
          baseTheme={{ preset: "auto", primaryColor: "#a33b47" }}
        >
          <Search />
          <BigdataDocumentViewerWidget
            className={styles["widget-item"]}
            name={"explorer-viewer"}
          />
        </BigdataWidgetManagerProvider>
      </div>
    </div>
  );
}
