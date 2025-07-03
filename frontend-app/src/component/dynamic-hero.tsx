import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

const parseRgbColor = (
  colorString: string | null
): { r: number; g: number; b: number } | null => {
  if (!colorString) return null;
  const match = colorString.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
  );
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
    };
  }
  return null;
};

interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  target?: string;
}

interface HeroSectionProps {
  heading?: string;
  tagline?: string;
  buttonText?: string;
  imageUrl?: string;
  videoUrl?: string;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    onClick: () => console.info("Default Home clicked"),
  },
  { id: "about", label: "About", href: "#about-section" },
  {
    id: "pricing",
    label: "Pricing",
    onClick: () => console.info("Default Pricing clicked"),
  },
  {
    id: "get-started-nav",
    label: "Get Started",
    onClick: () => console.info("Default Nav Get Started clicked"),
  },
];

const HeroSection: React.FC<HeroSectionProps> = ({
  heading = "Something you really want",
  tagline = "You can't live without this product. I'm sure of it.",
  buttonText = "Get Started",
  navItems = defaultNavItems,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const mousePosRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const resolvedCanvasColorsRef = useRef<{
    strokeStyle: { r: number; g: number; b: number };
  }>({
    strokeStyle: { r: 128, g: 128, b: 128 },
  });

  useEffect(() => {
    const tempElement = document.createElement("div");
    tempElement.style.display = "none";
    document.body.appendChild(tempElement);

    const updateResolvedColors = () => {
      tempElement.style.color = "var(--foreground)";
      const computedFgColor = getComputedStyle(tempElement).color;
      const parsedFgColor = parseRgbColor(computedFgColor);
      if (parsedFgColor) {
        resolvedCanvasColorsRef.current.strokeStyle = parsedFgColor;
      } else {
        const isDarkMode = document.documentElement.classList.contains("dark");
        resolvedCanvasColorsRef.current.strokeStyle = isDarkMode
          ? { r: 250, g: 250, b: 250 }
          : { r: 10, g: 10, b: 10 };
      }
    };

    updateResolvedColors();

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          updateResolvedColors();
          break;
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
      tempElement.remove();
    };
  }, []);

  const drawArrow = useCallback(() => {
    const canvas = canvasRef.current;
    const targetEl = targetRef.current;
    const ctx = ctxRef.current;
    const mouse = mousePosRef.current;

    if (!canvas || !targetEl || !ctx || mouse.x === null || mouse.y === null)
      return;

    const rect = targetEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const x0 = mouse.x;
    const y0 = mouse.y;
    const a = Math.atan2(cy - y0, cx - x0);
    const x1 = cx - Math.cos(a) * (rect.width / 2 + 12);
    const y1 = cy - Math.sin(a) * (rect.height / 2 + 12);

    const midX = (x0 + x1) / 2;
    const midY = (y0 + y1) / 2;
    const offset = Math.min(200, Math.hypot(x1 - x0, y1 - y0) * 0.5);
    const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
    const controlX = midX;
    const controlY = midY + offset * t;

    const r = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
    const opacity = Math.min(
      1.0,
      (r - Math.max(rect.width, rect.height) / 2) / 500
    );

    const arrowColor = resolvedCanvasColorsRef.current.strokeStyle;
    ctx.strokeStyle = `rgba(${arrowColor.r}, ${arrowColor.g}, ${arrowColor.b}, ${opacity})`;
    ctx.lineWidth = 2;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(controlX, controlY, x1, y1);
    ctx.setLineDash([10, 5]);
    ctx.stroke();
    ctx.restore();

    const angle = Math.atan2(y1 - controlY, x1 - controlX);
    const headLength = 10 * (ctx.lineWidth / 1.5);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(
      x1 - headLength * Math.cos(angle - Math.PI / 6),
      y1 - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(x1, y1);
    ctx.lineTo(
      x1 - headLength * Math.cos(angle + Math.PI / 6),
      y1 - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !targetRef.current) return;

    const context = canvas.getContext("2d");
    if (context) ctxRef.current = context;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("mousemove", handleMouseMove);
    updateCanvasSize();

    const animateLoop = () => {
      const ctx = ctxRef.current;
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawArrow();
      }
      animationFrameIdRef.current = requestAnimationFrame(animateLoop);
    };

    animateLoop();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [drawArrow]);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <nav className="w-full max-w-screen-md mx-auto flex flex-wrap justify-center sm:justify-between items-center px-4 sm:px-8 py-4 text-sm">
        {navItems.map((item) => {
          const commonProps = {
            key: item.id,
            className:
              "py-2 px-3 sm:px-4 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 dark:hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-150 ease-in-out whitespace-nowrap",
            onClick: item.onClick,
          };
          if (item.href) {
            return (
              <a
                href={item.href}
                target={item.target}
                rel={
                  item.target === "_blank" ? "noopener noreferrer" : undefined
                }
                {...commonProps}
              >
                {item.label}
              </a>
            );
          }
          return (
            <button type="button" {...commonProps}>
              {item.label}
            </button>
          );
        })}
      </nav>

      <main className="flex-grow flex flex-col items-center justify-start mt-5">
        <div className="mt-12 sm:mt-16 lg:mt-24 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-center px-4 bg-[linear-gradient(135deg,#1b3c3f,#4db6ac)] bg-clip-text text-transparent">
            {heading}
          </h1>

          <p className="mt-3 block text-muted-foreground text-center text-base sm:text-lg px-4 max-w-xl">
            {tagline}
          </p>
        </div>

        <div className="mt-8 flex justify-center" ref={targetRef}>
          <Link
            to="/workspace"
            className="py-2 px-6 rounded-xl bg-gradient-to-r from-[#1b3c3f] to-[#4db6ac] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
          >
            {buttonText}
          </Link>
        </div>
      </main>
      <div className="h-12 sm:h-16 md:h-24"></div>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
      ></canvas>
    </div>
  );
};

export { HeroSection };
