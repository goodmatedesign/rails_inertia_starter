"use client";

import { Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Blogpost = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
          <Badge variant="secondary">Product Update</Badge>
          <h1 className="text-pretty text-center text-3xl font-medium lg:text-5xl">
            New Tools to Help You Work Better - Simple Task Flow Tools
          </h1>
          <p className="text-muted-foreground text-center lg:text-lg">
            Discover how our new automation capabilities can transform your
            team&apos;s productivity. Learn about the latest tools and features
            designed to enhance efficiency, reduce manual tasks, and improve
            collaboration across your organization.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Avatar className="size-12 border">
              <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
            </Avatar>
            <div>
              <p className="text-sm font-medium">John doe</p>
              <p className="text-muted-foreground text-sm">
                Updated on Dec 07, 2024
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-6xl rounded-lg border p-2">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="aspect-video rounded-lg object-cover"
          />
        </div>
        <div className="relative mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-4">
          <div className="sticky top-8 hidden h-fit lg:block">
            <span className="mb-6 text-lg">Content</span>
            <nav className="mt-2">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#section1"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section1"
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    How the Tax System Works
                  </a>
                </li>
                <li>
                  <a
                    href="#section2"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section2"
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    The People&apos;s Rebellion
                  </a>
                </li>
                <li>
                  <a
                    href="#section3"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section3"
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    The King&apos;s Plan
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="lg:col-span-2">
            <div className="lg:col-span-2">
              <div>
                <h1 className="text-3xl font-extrabold">The Great Joke Tax</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  In a kingdom far away, where laughter once flowed freely, a
                  peculiar tale unfolded about a king who decided to tax the
                  very essence of joy itself - jokes and jest.
                </p>
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="placeholder"
                  className="my-8 aspect-video w-full rounded-md object-cover"
                />
              </div>
              <section
                id="section1"
                ref={(ref) => addSectionRef("section1", ref)}
                className="prose dark:prose-invert mb-8"
              >
                <h2>How the Tax System Works</h2>
                <p>
                  The king, seeing how much happier his subjects were, realized
                  the error of his ways and repealed the joke tax. Jokester was
                  declared a hero, and the kingdom lived happily ever after.
                </p>
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Royal Decree!</AlertTitle>
                  <AlertDescription>
                    Remember, all jokes must be registered at the Royal Jest
                    Office before telling them
                  </AlertDescription>
                </Alert>
              </section>

              <section
                id="section2"
                ref={(ref) => addSectionRef("section2", ref)}
                className="prose dark:prose-invert mb-8"
              >
                <h2>The People&apos;s Rebellion</h2>
                <p>
                  The people of the kingdom, feeling uplifted by the laughter,
                  started to tell jokes and puns again, and soon the entire
                  kingdom was in on the joke.
                </p>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>King&apos;s Treasury</th>
                        <th>People&apos;s happiness</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Empty</td>
                        <td>Overflowing</td>
                      </tr>
                      <tr className="even:bg-muted m-0 border-t p-0">
                        <td>Modest</td>
                        <td>Satisfied</td>
                      </tr>
                      <tr className="even:bg-muted m-0 border-t p-0">
                        <td>Full</td>
                        <td>Ecstatic</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  The king, seeing how much happier his subjects were, realized
                  the error of his ways and repealed the joke tax. Jokester was
                  declared a hero, and the kingdom lived happily ever after.
                </p>
              </section>

              <section
                id="section3"
                ref={(ref) => addSectionRef("section3", ref)}
                className="prose dark:prose-invert mb-8"
              >
                <h2>The King&apos;s Plan</h2>
                <p>
                  The king thought long and hard, and finally came up with{" "}
                  <a href="#">a brilliant plan</a>: he would tax the jokes in
                  the kingdom.
                </p>
                <blockquote>
                  &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a
                  good joke, so it&apos;s only fair that they should pay for the
                  privilege.&rdquo;
                </blockquote>
                <p>
                  The king&apos;s subjects were not amused. They grumbled and
                  complained, but the king was firm:
                </p>
                <ul>
                  <li>1st level of puns: 5 gold coins</li>
                  <li>2nd level of jokes: 10 gold coins</li>
                  <li>3rd level of one-liners : 20 gold coins</li>
                </ul>
                <p>
                  As a result, people stopped telling jokes, and the kingdom
                  fell into a gloom. But there was one person who refused to let
                  the king&apos;s foolishness get him down: a court jester named
                  Jokester.
                </p>
              </section>
            </div>
          </div>
          <div className="prose dark:prose-invert sticky top-8 hidden h-fit rounded-lg border p-6 lg:block">
            <h5 className="text-xl font-semibold">
              Get Started with Our Solution
            </h5>
            <ul className="my-6 text-sm [&>li]:pl-0">
              <li>Save 40% time with task automation</li>
              <li>Real-time team collaboration</li>
              <li>Easy drag-and-drop workflows</li>
            </ul>
            <div className="flex flex-col gap-2">
              <Button>Get started</Button>
              <Button variant="outline">Learn more</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blogpost };
