import { Section } from "@/components/layout/sections";
import { SectionHeader } from "@/components/layout/sections/header";

export default function WorkPreview() {
  return (
    <Section className="relative w-full pt-10">
      <div className="flex flex-col gap-10">
        <SectionHeader
          align="left"
          className="px-6"
          description="A snapshot of recent projects and collaborations."
          title="Work"
        />
        <div className="divider-top-dashed">
          <div className="flex min-h-48 items-center justify-center border-border border-b border-dashed px-6 py-12 text-center">
            <p className="text-muted-foreground text-sm">
              Work in progress. Projects will appear here soon.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
