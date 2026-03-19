import { BrainCircuit, CircleUser } from "lucide-react";
import styles from "./Feed.module.css";
import { Button } from "@base-ui/react";

type Props = {
  username: string;
  handle: string;
  text: string;
  date: string;
  onAiClick: (prompt: string) => void;
};

const dateFormatter = new Intl.DateTimeFormat("en");

function FeedMessage({ username, handle, text, date, onAiClick }: Props) {
  const formattedDate = dateFormatter.format(new Date(date));
  return (
    <div className={styles["card"]}>
      <div className={styles["header"]}>
        <CircleUser size={32} />
        <div>
          <span className={styles["username"]}>{username}</span>
          <div className={styles["subheader"]}>
            <span>{handle}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <p className={styles["message"]}>{text}</p>
      <div className={styles["button-holder"]}>
        <Button
          onClick={() =>
            onAiClick(
              `Can you verify the following statement made on ${formattedDate}:
            
            ${text}
            `,
            )
          }
        >
          <BrainCircuit size={16} />
          Ask Bigdata
        </Button>
      </div>
    </div>
  );
}

export { FeedMessage };
