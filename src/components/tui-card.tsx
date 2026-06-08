import { CvPill } from "@/components/cv-pill";
import { TuiBio } from "@/components/tui-bio";
import { TuiContacts } from "@/components/tui-contacts";
import { TuiHero } from "@/components/tui-hero";

export function TuiCard() {
  return (
    <section
      id="about"
      className="flex min-h-0 scroll-mt-28 flex-col lg:pb-5"
      aria-labelledby="profile-heading"
    >
      <TuiHero />
      <div className="mt-8 sm:mt-10">
        <TuiBio />
      </div>
      <CvPill />
      <div className="my-8 border-t profile-rule sm:my-9" />
      <TuiContacts />
    </section>
  );
}
