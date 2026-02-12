import Link from "next/link";
import { getCategoriesWithCount } from "../../../blog/utils/blog-utils";
import { Badge } from "@/components/ui/badge";

export default async function CategoriesPage() {
  const categories = getCategoriesWithCount().sort((a, b) => b.count - a.count);

  return (
    <div>
      <h1>Categories</h1>

      <ul>
        {categories.map((c) => (
          <li key={c.name}>
            <Link href={`/blog/categories/${c.name}`}>
              <Badge variant="secondary">
                {c.name} ({c.count})
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
