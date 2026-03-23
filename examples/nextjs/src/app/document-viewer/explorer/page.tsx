import { BigdataDocumentViewerWidget } from "@/components/Widgets/BigdataDocumentViewerWidget";
import { BigdataWidgetManagerProvider } from "@/components/Widgets/BigdataWidgetManagerProvider";
import styles from "./page.module.css";
import { Search } from "@/components/Search/Search";

export default function Explorer() {
  return (
    <div>
      <h2>Document explorer</h2>
      <p>Visualize your Bigdata content with ease</p>
      <div className={styles["widgets-container"]}>
        <BigdataWidgetManagerProvider
          baseTheme={{ preset: "auto", primaryColor: "#a33b47" }}
        >
          <Search />
          <div className={styles["widget-item"]}>
            <BigdataDocumentViewerWidget name={"explorer-viewer"} />
          </div>
        </BigdataWidgetManagerProvider>
      </div>
    </div>
  );
}
