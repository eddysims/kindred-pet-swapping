import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { PropsWithChildren } from "react";

type ContainerProps = {
  className?: string;
  asChild?: boolean;
};

export function Container({
  children,
  className,
  asChild,
}: PropsWithChildren<ContainerProps>) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp className={cn(className, "container mx-auto px-6 md:px-8")}>
      {children}
    </Comp>
  );
}
