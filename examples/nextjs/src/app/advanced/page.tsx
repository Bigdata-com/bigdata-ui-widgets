import { ScriptsProvider } from "@/components/ScriptsProvider/ScriptsProvider";
import { BigdataChatWidget } from "@/components/Widgets/BigdataChatWidget";
import { BigdataDocumentViewerWidget } from "@/components/Widgets/BigdataDocumentViewerWidget";
import { BigdataWidgetManagerProvider } from "@/components/Widgets/BigdataWidgetManagerProvider";
import styles from "./page.module.css";
import { Feed } from "@/components/Feed/Feed";

export default function Advanced() {
  return (
    <div className={styles["home"]}>
      <h2>Interactive feed</h2>
      <p>
        You can combine Bigdata widgets with your app logic to enhance your
        users experience
      </p>
      <div className={styles["widgets-container"]}>
        <ScriptsProvider>
          <BigdataWidgetManagerProvider
            baseTheme={{ preset: "auto", primaryColor: "#6ff26f" }}
          >
            <Feed />
            <div className={styles["bd-widgets-container"]}>
              <BigdataChatWidget
                className={styles["widget-item"]}
                name={"home-chat"}
                researchConfig={{ inlineAttribution: true }}
              />
              <BigdataDocumentViewerWidget
                className={styles["widget-item"]}
                name={"home-document-viewer"}
              />
            </div>
          </BigdataWidgetManagerProvider>
        </ScriptsProvider>
      </div>
    </div>
  );
}
