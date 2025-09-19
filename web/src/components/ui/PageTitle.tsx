import { Container } from "@/components/ui/Container";

type PageTitleProps = {
  title: string;
  description?: string;
};

export function PageTitle({ title, description }: PageTitleProps) {
  return (
    <Container className="space-y-4 py-14">
      <h1 className="text-3xl font-thin font-serif text-secondary-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </Container>
  );
}
