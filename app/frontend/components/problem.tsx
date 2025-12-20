import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, CreditCard, Settings2 } from "lucide-react";

type Problem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type ProblemProps = {
  label?: string;
  title?: string;
  subtitle?: string;
  problems?: Problem[];
  className?: string;
};

const defaultProblems: Problem[] = [
  {
    title: "UI Development Challenges",
    description:
      "Developers struggle to build modern UI and responsive designs from scratch without ready-to-use components.",
    icon: <Code2 className="size-6" />,
  },
  {
    title: "Payment Integration Complexity",
    description:
      "Integrating secure payment systems requires complex implementation of subscriptions and webhooks.",
    icon: <CreditCard className="size-6" />,
  },
  {
    title: "Essential Features Overhead",
    description:
      "Implementing core SaaS features like auth, i18n, blog, newsletter, SEO, and theming are tedious and time-consuming.",
    icon: <Settings2 className="size-6" />,
  },
];

export function Problem({
  label = "Problem",
  title = "Building SaaS from scratch is a hassle",
  subtitle = "Don't waste time on designing a landing page or Stripe subscriptions",
  problems = defaultProblems,
  className,
}: ProblemProps) {
  return (
    <section className={cn("bg-background py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((problem) => (
            <Card
              key={problem.title}
              className="group border-destructive/20 bg-destructive/5 transition-all hover:border-destructive/40"
            >
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                  {problem.icon}
                </div>
                <CardTitle className="text-lg">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {problem.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { defaultProblems };
export type { Problem as ProblemItem, ProblemProps };
