import Image from "next/image";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function PreviewLanding() {
  return (
    <div className="pb-6 sm:pb-20">
      <MaxWidthWrapper>
        <div className="h-auto rounded-xl md:bg-muted/30 md:p-3.5 md:ring-1 md:ring-inset md:ring-border">
          <div className="relative overflow-hidden rounded-xl border md:rounded-lg">
            <Image
              className="flex size-full object-contain object-center dark:hidden"
              src="/_static/images/light-preview.jpg"
              alt="preview landing"
              width={2000}
              height={1000}
              priority={true}
            />
            <Image
              className="hidden size-full object-contain object-center dark:flex"
              src="/_static/images/dark-preview.jpg"
              alt="preview landing"
              width={2000}
              height={1000}
              priority={true}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
