import { cn } from "@/lib/utils";
import ApiEndpoint from "./api-endpoint";

type FeaturesProps = {
  className?: string;
};

export default function Features({ className }: FeaturesProps) {
  return (
    <section className={cn("bg-muted/30 py-24", className)}>
      <ApiEndpoint />
    </section>
  );
}
