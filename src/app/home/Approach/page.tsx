'use client';
import React from 'react';
import {
  Lightbulb,
  ClipboardList,
  LayoutTemplate,
  BrainCircuit,
  Rocket,
  LucideIcon,
} from 'lucide-react';

interface Step {
  id: number;
  step: string;
  heading: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    id: 1,
    step: 'Step 1',
    heading: 'Discover Key Insights',
    description: 'We begin by identifying key problems, opportunities, and goals.',
    icon: Lightbulb,
  },
  {
    id: 2,
    step: 'Step 2',
    heading: 'Organize Ideas Clearly',
    description: 'Ideas and feedback are structured into focused solutions.',
    icon: ClipboardList,
  },
  {
    id: 3,
    step: 'Step 3',
    heading: 'Design & Wireframe',
    description: 'We visualize interfaces and flows that align with the plan.',
    icon: LayoutTemplate,
  },
  {
    id: 4,
    step: 'Step 4',
    heading: 'Build the Solution',
    description: 'Our team develops the system with precision and adaptability.',
    icon: BrainCircuit,
  },
  {
    id: 5,
    step: 'Step 5',
    heading: 'Launch & Improve',
    description: 'Final product is deployed, monitored, and refined as needed.',
    icon: Rocket,
  },
];

const ApproachSection: React.FC = () => {
  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          How We Solve Problems — The SmartKode Way
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-16">
          Our method is structured, focused, and built to deliver practical solutions — whether it’s a product or a service.
        </p>

        {/* Responsive grid layout */}
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 place-items-center text-center">
    {steps.map(({ id, step, heading, description, icon: Icon }, index) => {
      const isLastOdd =
        steps.length % 2 === 1 && index === steps.length - 1;

    return (
      <div
        key={id}
        className={`flex flex-col items-center text-center px-2 ${
          isLastOdd
            ? 'col-span-2 justify-self-center sm:col-span-1'
            : ''
        }`}
      >
        <div className="mb-3">
          <Icon className="w-10 h-10 text-gray-500" />
        </div>

        <span className="text-xs uppercase tracking-wider text-gray-400 mb-1">
          {step}
        </span>

        <h3 className="text-base font-semibold mb-1">{heading}</h3>

        <p className="text-gray-500 text-sm leading-relaxed max-w-xs break-words">
          {description}
        </p>
      </div>
        );
      })}
    </div>

      </div>
    </section>
  );
};

export default ApproachSection;
