import { NavigationMenu } from "@base-ui/react";
import styles from "./Sidebar.module.css";
import { SidebarButton } from "./SidebarButton";
import Link from "next/link";
import { LoginForm } from "../Login/LoginForm";

function Sidebar() {
  return (
    <div className={styles["sidebar"]}>
      <Link className={styles["sidebar-logo"]} href={"/"}>
        Financial <br />
        Hub
      </Link>
      <NavigationMenu.Root>
        <NavigationMenu.List
          aria-orientation="vertical"
          style={{ listStyle: "none" }}
        >
          <SidebarButton href={"/"} label={"Home"} />
          <SidebarButton href={"/advanced"} label={"Advanced Example"} />
          <h3 className={styles["sidebar-subtitle"]}>Chat</h3>
          <SidebarButton href={"/chat/news"} label={"Chat with news"} />
          <SidebarButton href={"/chat/data"} label={"Chat with data"} />
          <h3 className={styles["sidebar-subtitle"]}>Document Viewer</h3>
          <SidebarButton
            href={"/document-viewer/explorer"}
            label={"Document Explorer"}
          />
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <footer>
        <LoginForm /> 
        Powered by:{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={"https://www.bigdata.com"}
        >
          Bigdata.com
        </Link>
      </footer>
    </div>
  );
}

export { Sidebar };
