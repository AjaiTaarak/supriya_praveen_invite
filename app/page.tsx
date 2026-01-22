import Hero from "@/components/Hero";
import CoupleDetails from "@/components/CoupleDetails";
import EventDetails from "@/components/EventDetails";
import ThankYou from "@/components/ThankYou";
import ReceptionBackground from "@/components/ReceptionBackground";
import weddingDetails from "@/data/wedding-details.json";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-cream">
      <Hero />

      <CoupleDetails
        bride={weddingDetails.bride}
        groom={weddingDetails.groom}
      />

      <div className="mt-12 bg-white/40 border-t border-b border-maroon/10">
        <EventDetails
          title={weddingDetails.events.muhurtham.title}
          date={weddingDetails.events.muhurtham.date}
          time={weddingDetails.events.muhurtham.time}
          venueName={weddingDetails.events.muhurtham.venueName}
          venueAddress={weddingDetails.events.muhurtham.venueAddress}
          mapLink={weddingDetails.events.muhurtham.mapLink}
        />

        {/* Reception Section */}
        <div className="relative">
          {/* Gradient Transition */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/40 to-transparent z-20 pointer-events-none" />

          <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <ReceptionBackground />
            </div>

            <div className="relative z-10 w-full">
              <EventDetails
                title={weddingDetails.events.reception.title}
                date={weddingDetails.events.reception.date}
                time={weddingDetails.events.reception.time}
                venueName={weddingDetails.events.reception.venueName}
                venueAddress={weddingDetails.events.reception.venueAddress}
                mapLink={weddingDetails.events.reception.mapLink}
                showDecorations={false}
              />
            </div>
          </div>
        </div>
      </div>

      <ThankYou />
    </main >
  );
}
