"use client";

import { Button, Field, Form } from "@base-ui/react";
import { ArrowRight } from "lucide-react";
import styles from "./Login.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";

function LoginForm() {
  const [isMounted, setIsMounted] = useState(false);
  const [authenticated, setAuthenticated] = useLocalStorage<string | undefined>(
    "authenticated",
    undefined,
  );

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (authenticated !== undefined) {
      try {
        const current = new Date(authenticated);
        if (current.getTime() < Date.now()) {
          setAuthenticated(undefined);
        }
      } catch {
        setAuthenticated(undefined);
      }
    }
  }, [authenticated, setAuthenticated]);

  function logout() {
    fetch(new URL("/api/prod/logout", location.origin).href, {
      method: "POST",
    }).then((res) =>
      res.json().then(() => {
        setAuthenticated(undefined);
      }),
    );
  }

  function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch(new URL("/api/prod/login", location.origin).href, {
      method: "POST",
      body: JSON.stringify({ key: formData.get("key") }),
    }).then((res) =>
      res.json().then((data) => {
        // Setting the max age 8 hours before
        const maxAge = data.age - 240;
        const expirationDate = new Date(Date.now() + maxAge * 1000);
        setAuthenticated(expirationDate.toDateString());
      }),
    );
  }

  if (!isMounted) {
    return null;
  }

  return authenticated ? (
    <div className={styles["login-container"]}>
      <Button onClick={logout}>Logout</Button>
    </div>
  ) : (
    <Form onSubmit={onSubmit} className={styles["login-container"]}>
      <div className={styles["main-filter"]}>
        <Field.Root name="key" className={styles["query-input"]}>
          <Field.Label>Bigdata Api Key</Field.Label>
          <Field.Control required autoComplete="off"/>
        </Field.Root>

        <Button type="submit" disabled={false} focusableWhenDisabled>
          <ArrowRight />
        </Button>
      </div>
    </Form>
  );
}

export { LoginForm };
