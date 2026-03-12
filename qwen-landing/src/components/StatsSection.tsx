"use client";

import { useState, useEffect, useRef } from "react";

interface StatsSectionProps {
  onView?: () => void;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: StatItem[] = [
  { value: 2, suffix: "B+", label: "Tokens Served" },
  { value: 500, suffix: "+", label: "Enterprise Clients" },
  { value: 99.99, suffix: "%", label: "Uptime SLA" },
  { value: 15, suffix: "min", label: "Avg Support Response" },
];

function AnimatedCounter({ target, suffix, prefix }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  const displayValue = target % 1 === 0 ? Math.floor(count) : count.toFixed(2);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export default function StatsSection({ onView }: StatsSectionProps) {
  const [hasViewed, setHasViewed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hasViewed) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasViewed) {
          setHasViewed(true);
          onView?.();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasViewed, onView]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 border-y" 
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--card-bg)' }}>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
                <AnimatedCounter 
                  target={stat.value} 
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
