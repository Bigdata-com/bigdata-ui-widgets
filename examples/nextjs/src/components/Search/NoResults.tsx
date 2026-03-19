import styles from "./Search.module.css";

type Props = {
  errorMessage?: string;
};

function NoResults({ errorMessage }: Props) {
  return (
    <div className={styles["no-results"]}>
      {errorMessage ?? "No results yet."}
    </div>
  );
}

export { NoResults };
