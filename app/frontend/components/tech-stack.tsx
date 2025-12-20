import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type TechStackItem = {
  name: string;
  description: string;
  icon: string;
};

type TechStackProps = {
  title?: string;
  subtitle?: string;
  technologies?: TechStackItem[];
  className?: string;
};

function SkillIcon({ icon, name }: { icon: string; name: string }) {
  return (
    <img
      src={`https://skills.syvixor.com/api/icons?i=${icon}`}
      alt={name}
      className="size-12"
      loading="lazy"
    />
  );
}

const defaultTechStack: TechStackItem[] = [
  {
    name: "Ruby on Rails 8.1",
    description: "The full-stack framework for building modern web applications.",
    icon: "ruby",
  },
  {
    name: "React 19",
    description: "The library for building interactive user interfaces.",
    icon: "reactjs",
  },
  {
    name: "Inertia.js",
    description: "Build single-page apps without building an API.",
    icon: "inertiajs",
  },
  {
    name: "Tailwind CSS v4",
    description: "The CSS framework for rapid UI development.",
    icon: "tailwindcss",
  },
  {
    name: "PostgreSQL",
    description: "The world's most advanced open source database.",
    icon: "postgresql",
  },
  {
    name: "Vite",
    description: "Next generation frontend tooling for blazing fast builds.",
    icon: "vite",
  },
  {
    name: "TypeScript",
    description: "Type-safe JavaScript for scalable applications.",
    icon: "typescript",
  },
  {
    name: "Shadcn UI",
    description: "Open source components for building modern websites.",
    icon: "shadcnui",
  },
  {
    name: "Kamal",
    description: "Deploy web apps anywhere with zero downtime.",
    icon: "docker",
  },
  {
    name: "Auth",
    description: "Secure passwordless authentication built-in.",
    icon: "oauth",
  },
  {
    name: "Stripe",
    description: "The best and most secure online payment service.",
    icon: "stripe",
  },
  {
    name: "Resend",
    description: "The modern email service for developers.",
    icon: "resend",
  },
];

export function TechStack({
  title = "Build with your favorite tech stack",
  subtitle = "Use the latest industry-standard technologies for your next project",
  technologies = defaultTechStack,
  className,
}: TechStackProps) {
  return (
    <section className={cn("bg-background py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="group transition-all hover:border-foreground/20 hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="mb-2">
                  <SkillIcon icon={tech.icon} name={tech.name} />
                </div>
                <CardTitle className="text-base">{tech.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription>{tech.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { defaultTechStack, SkillIcon };
export type { TechStackItem, TechStackProps };
