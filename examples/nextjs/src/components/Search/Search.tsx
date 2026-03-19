"use client";
import {
  Button,
  Field,
  Fieldset,
  Form,
  Radio,
  RadioGroup,
} from "@base-ui/react";
import { useActionState } from "react";
import styles from "./Search.module.css";
import { SearchIcon } from "lucide-react";
import { NoResults } from "./NoResults";
import { fetchResults } from "./fetchResults";
import { Results } from "./Results";

function Search() {
  const [state, formAction, loading] = useActionState(fetchResults, undefined);

  return (
    <div className={styles["search"]}>
      <Form action={formAction}>
        <div className={styles["main-filter"]}>
          <Field.Root name="query" className={styles["query-input"]}>
            <Field.Label>Query</Field.Label>
            <Field.Control required />
          </Field.Root>

          <Button type="submit" disabled={loading} focusableWhenDisabled>
            <SearchIcon />
          </Button>
        </div>

        <Field.Root name="filter">
          <Fieldset.Root
            render={
              <RadioGroup
                defaultValue="any"
                className={styles["radio-group"]}
              />
            }
          >
            <Field.Item className={styles["checkbox-container"]}>
              <Field.Label>
                <Radio.Root value="any" className={styles["checkbox"]} />
                Any
              </Field.Label>
            </Field.Item>
            <Field.Item className={styles["checkbox-container"]}>
              <Field.Label>
                <Radio.Root value="public" className={styles["checkbox"]} />
                Public
              </Field.Label>
            </Field.Item>
            <Field.Item className={styles["checkbox-container"]}>
              <Field.Label>
                <Radio.Root value="private" className={styles["checkbox"]} />
                Private
              </Field.Label>
            </Field.Item>
          </Fieldset.Root>
        </Field.Root>
      </Form>

      <div className={styles["main-content"]}>
        {state === undefined || state.length === 0 ? (
          <NoResults errorMessage={loading ? "Loading..." : undefined} />
        ) : null}
        {typeof state === "string" ? <NoResults errorMessage={state} /> : null}
        {state instanceof Array ? <Results results={state} /> : null}
      </div>
    </div>
  );
}

export { Search };
