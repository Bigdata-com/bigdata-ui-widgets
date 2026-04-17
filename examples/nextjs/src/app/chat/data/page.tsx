import { BigdataChatWidget } from "@/components/Widgets/BigdataChatWidget";
import { BigdataWidgetManagerProvider } from "@/components/Widgets/BigdataWidgetManagerProvider";
import styles from "./page.module.css";
import { Chart } from "@/components/Chart/Chart";

export default function Advanced() {
  return (
    <div className={styles["home"]}>
      <h2>Data analysis</h2>
      <p>
        Give your users the last piece of information to complete their research
      </p>
      <div className={styles["widgets-container"]}>
        <BigdataWidgetManagerProvider
          baseTheme={{ preset: "auto", primaryColor: "#aa42e2" }}
        >
          <Chart />
          <BigdataChatWidget
            className={styles["widget-item"]}
            name={"home-chat"}
            researchConfig={{ inlineAttribution: {
                enabled: true,
                showBigdataMoreButton: true,
                showWebMoreButton: true,
              } }}
          />
        </BigdataWidgetManagerProvider>
      </div>
    </div>
  );
}
