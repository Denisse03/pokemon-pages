import Link from "next/link";
import navStyles from "./nav.module.css";

export default function Nav() {
  return (
    <nav>
      <ul className={navStyles.mainNav}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/Search">Search</Link>
        </li>
        <li>
          <Link href="/Favorite">Favorites</Link>
        </li>
        <li>
          <Link href="/Pokemon">Pokemon</Link>
        </li>
      </ul>
    </nav>
  );
}
