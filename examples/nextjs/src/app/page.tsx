import { BigdataChatWidget } from "@/components/Widgets/BigdataChatWidget";
import { BigdataDocumentViewerWidget } from "@/components/Widgets/BigdataDocumentViewerWidget";
import { BigdataWidgetManagerProvider } from "@/components/Widgets/BigdataWidgetManagerProvider";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["home"]}>
      <h2>Bigdata widgets</h2>
      <p>
        Bigdata widgets can communicate between them and display all the data
        available through our documents and agents APIs
      </p>
      <div className={styles["widgets-container"]}>
        <BigdataWidgetManagerProvider baseTheme={{ preset: "auto" }}>
          <BigdataChatWidget
            className={styles["widget-item"]}
            name={"home-chat"}
            researchConfig={{ inlineAttribution: true }}
          />
          <BigdataDocumentViewerWidget
            className={styles["widget-item"]}
            name={"home-document-viewer"}
          />
        </BigdataWidgetManagerProvider>
      </div>
    </div>
  );
}
