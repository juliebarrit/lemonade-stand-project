import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 sm:p-20 items-center gap-16">
      {/* Main Section */}
      <main className="flex flex-col items-center sm:items-start gap-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-decimal list-inside text-sm text-center sm:text-left">
          <li className="mb-2 tracking-tight">
            Welcome to{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-mono font-semibold">
              src/pages/index.js
            </code>
            .
          </li>
          <li className="tracking-tight">Save and see your changes instantly.</li>
        </ol>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>

          <a
            className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="flex gap-6 flex-wrap items-center justify-center">
        <FooterLink
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          src="/file.svg"
          alt="File icon"
          text="Learn"
        />
        <FooterLink
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          src="/window.svg"
          alt="Window icon"
          text="Examples"
        />
        <FooterLink
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          src="/globe.svg"
          alt="Globe icon"
          text="Go to nextjs.org →"
        />
      </footer>
    </div>
  );
}

// FooterLink Component (Reusable)
function FooterLink({ href, src, alt, text }) {
  return (
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image aria-hidden src={src} alt={alt} width={16} height={16} />
      {text}
    </a>
  );
}
