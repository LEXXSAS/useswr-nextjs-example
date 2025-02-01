import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <nav className="container mx-auto">
        <div className="logo-wrapper">
          <Link href={"/newpagetwo"}>
            <p className="font-bold text-xl">Logo</p>
          </Link>
        </div>
        <div className="right-menu">
          <ul>
            <li>
              <Link href={"#"}>other</Link>
            </li>
            <li>
              <Link href={"#"}>other</Link>
            </li>
            <li>
              <Link href={"#"}>other</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
