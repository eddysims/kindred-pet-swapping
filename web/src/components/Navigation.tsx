import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";

export function Navigation() {
  return (
    <div className="bg-muted sticky top-0 z-50">
      <Container asChild className="flex items-center min-h-14  mx-0">
        <nav>
          <Link
            href="/"
            className="inline-flex items-baseline gap-4 font-serif font-thin text-lg text-muted-foreground"
          >
            <Image
              src="/assets/kindred_logo.png"
              alt="Kindred Logo"
              width={96}
              height={24}
            />
            Pet Swap
          </Link>
        </nav>
      </Container>
    </div>
  );
}
