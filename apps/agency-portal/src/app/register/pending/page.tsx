import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="px-6 py-5 flex items-center gap-3 border-b border-gray-800">
        <Image src="/logo.png" alt="SmartKode" width={26} height={26} priority className="w-[26px] h-[26px] object-contain" />
        <span className="text-base font-bold tracking-wide text-white">SmartKode</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full border border-gray-700 flex items-center justify-center">
              <Clock className="w-9 h-9 text-gray-400" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold text-white">Application Submitted</h1>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
              Your agency application is under review. Our team typically responds within <strong className="text-white">48 hours</strong>. You will receive an email once a decision is made.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-black p-6 text-left space-y-3">
            <h2 className="text-sm font-bold text-white">What happens next?</h2>
            <ul className="space-y-3">
              {[
                "Our team reviews your application details",
                "You receive an approval or rejection email",
                "On approval, you can log in and start submitting leads",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-400">{step}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-gray-600">
            Have a question?{" "}
            <Link href="https://smartkode.co/contact" className="text-white underline underline-offset-4">
              Contact us
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
