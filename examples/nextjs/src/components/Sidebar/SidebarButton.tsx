"use client";

import { NavigationMenu } from "@base-ui/react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

function SidebarButton({ label, href }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <NavigationMenu.Item className={styles["sidebar-list-item"]}>
      <NavigationMenu.Link
        className={styles["sidebar-item"]}
        render={<Link href={href} />}
        href={href}
        active={active}
      >
        {label}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

export { SidebarButton };
