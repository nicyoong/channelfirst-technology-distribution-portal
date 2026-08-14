import { SectionHeading, Badge, Card } from "@/components/ui";
import { events } from "@/data/site";

export const metadata = {
  title: "Training & Events — ChannelFirst Technology",
  description:
    "Upskill your team with our product training workshops and technical events. Fortinet, Aruba, Microsoft, and more.",
};

export default function TrainingPage() {
  return (
    <div className="bg-background">
      <section className="bg-gradient-to-br from-navy to-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Training & Events
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Training & Upcoming Events
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Invest in your team&apos;s technical capabilities. We offer regular
            product training sessions, certification prep workshops, and
            partner enablement events across Malaysia.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          eyebrow="Upcoming Events"
          title="Register Your Interest"
          align="left"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {event.title}
                </h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="text-primary">📅</span> {event.date} · {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">📍</span> {event.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">👥</span>{" "}
                    {event.available} / {event.seats} seats available
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
                <div className="mt-4">
                  <button className="w-full px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors">
                    Register Interest
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
