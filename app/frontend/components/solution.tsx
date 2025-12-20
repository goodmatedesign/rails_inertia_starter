import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Blocks, CreditCard, Rocket, Settings } from "lucide-react";

type Solution = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type SolutionProps = {
  label?: string;
  title?: string;
  subtitle?: string;
  solutions?: Solution[];
  className?: string;
};

const defaultSolutions: Solution[] = [
  {
    title: "Ready-to-Use UI Components",
    description:
      "UI development becomes as simple as building with blocks, including Shadcn/ui and Tailwind components.",
    icon: <Blocks className="size-6" />,
  },
  {
    title: "Out-of-the-Box Payment System",
    description:
      "Built-in Stripe integration with subscriptions and one-time payments, all you need to do is configure your pricing table.",
    icon: <CreditCard className="size-6" />,
  },
  {
    title: "Complete SaaS Features",
    description:
      "Built-in auth, i18n, blog, newsletter, dashboard, theming, and SEO optimization, saving you months of development time.",
    icon: <Rocket className="size-6" />,
  },
  {
    title: "Extensible Codebase",
    description:
      "Built with industry best practices for maintainability and scalability, fully customizable for your needs.",
    icon: <Settings className="size-6" />,
  },
];

export function Solution({
  label = "Solution",
  title = "Speed up your SaaS development",
  subtitle = "Rails SaaS Starter solves all the common problems of SaaS development",
  solutions = defaultSolutions,
  className,
}: SolutionProps) {
  return (
    <section className={cn("bg-muted/30 py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium text-primary uppercase tracking-wider">
            {label}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {solutions.map((solution) => (
            <Card
              key={solution.title}
              className="group border-primary/20 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {solution.icon}
                </div>
                <CardTitle className="text-lg">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {solution.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { defaultSolutions };
export type { Solution as SolutionItem, SolutionProps };
