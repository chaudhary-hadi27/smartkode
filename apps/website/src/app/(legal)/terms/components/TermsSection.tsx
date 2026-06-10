import type { SectionProps } from '../types';

export default function TermsSection({
  id,
  title,
  description,
  icon: Icon,
  gradient,
  children
}: SectionProps) {
  return (
    <section id={id} className="mb-16 sm:mb-24 scroll-mt-20">
      <div className="flex items-center mb-8 sm:mb-12">
        <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mr-6 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-400 text-lg">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}