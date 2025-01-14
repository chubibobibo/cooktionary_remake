import { useEffect, useState, useRef } from "react";

interface LazyComponentLoadProps {
  children: React.ReactNode;
}

export const LazyComponentLoad: React.FC<LazyComponentLoadProps> = ({
  children,
}) => {
  /** @visible state that contains data for the visibility of the component to load */
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 } // Adjust threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
        observer.disconnect();
      }
    };
  }, []);

  return <div ref={ref}>{isVisible ? children : null}</div>;
};
