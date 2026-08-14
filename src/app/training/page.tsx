"use client";

import { useState } from "react";
import {
  Clock,
  MapPin,
  Users,
  Calendar,
  X,
  Video,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Button, Badge, Card, SectionHeading } from "@/components/ui";
import { events } from "@/data/site";
import { useToast } from "@/contexts/toast-context";

type FilterType = "all" | "upcoming" | "online" | "onsite";

export default function TrainingPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [registered, setRegistered] = useState<string | null>(null);

  const filteredEvents = events.filter((event) => {
    if (filter === "upcoming") return true;
    if (filter === "online") return event.location.includes("Virtual");
    if (filter === "onsite") return !event.location.includes("Virtual");
    return true;
  });

  const handleRegister = (eventId: string) => {
    setRegistered(eventId);
    toast({
      type: "success",
      title: "Registration Recorded",
      description: "Our team will contact you with event details and access links.",
    });
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Training & Events
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Upskill Your Team
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Join our product training workshops and technical events. From
            Fortinet security fundamentals to Aruba networking bootcamps, we
            help your team stay current with the latest technology.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-surface border-b border-border py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { value: "all", label: "All Events" },
                { value: "upcoming", label: "Upcoming" },
                { value: "online", label: "Online" },
                { value: "onsite", label: "Onsite" },
              ] as const
            ).map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? "primary" : "outline"}
                size="sm"
                onClick={() => setFilter(f.value)}
                className="gap-2"
              >
                {f.value === "online" && <Video className="h-4 w-4" />}
                {f.value === "onsite" && <Building2 className="h-4 w-4" />}
                {f.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Event Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">
              No events found
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              No events match your current filters. Try adjusting your search
              criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setFilter("all")}
            >
              Show All Events
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
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
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>
                        {event.available} / {event.seats} seats available
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button
                      size="sm"
                      variant={registered === event.id ? "outline" : "primary"}
                      className="w-full"
                      disabled={registered === event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(event.id);
                      }}
                    >
                      {registered === event.id ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Registered
                        </span>
                      ) : (
                        "Register Interest"
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={() => handleRegister(selectedEvent.id)}
          isRegistered={registered === selectedEvent.id}
        />
      )}
    </div>
  );
}

function EventModal({
  event,
  onClose,
  onRegister,
  isRegistered,
}: {
  event: (typeof events)[0];
  onClose: () => void;
  onRegister: () => void;
  isRegistered: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-background rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-accent transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2 className="text-xl font-bold text-navy mb-4">{event.title}</h2>

          <div className="space-y-3 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>
                {event.available} / {event.seats} seats available
              </span>
            </div>
          </div>

          <p className="text-sm text-foreground leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Agenda placeholder */}
          <div className="rounded-lg border border-border bg-surface p-4 mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Agenda
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <span className="font-mono text-xs text-primary w-16 shrink-0">
                  09:00
                </span>
                <span>Registration & Welcome</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-xs text-primary w-16 shrink-0">
                  09:30
                </span>
                <span>Product Overview & Architecture</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-xs text-primary w-16 shrink-0">
                  11:00
                </span>
                <span>Hands-on Lab Session</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-xs text-primary w-16 shrink-0">
                  13:00
                </span>
                <span>Certification Prep (if applicable)</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-xs text-primary w-16 shrink-0">
                  15:00
                </span>
                <span>Q&A and Networking</span>
              </div>
            </div>
          </div>

          {/* Speaker placeholder */}
          <div className="rounded-lg border border-border bg-surface p-4 mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Speaker
            </h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                CF
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  ChannelFirst Technical Team
                </p>
                <p className="text-xs text-muted-foreground">
                  Certified product specialist
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1"
              disabled={isRegistered}
              onClick={onRegister}
            >
              {isRegistered ? "Registered ✓" : "Register Interest"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
