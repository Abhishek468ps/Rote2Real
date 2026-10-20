"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  animation?: "lift" | "glow" | "scale" | "shimmer" | "pulse";
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  className,
  variant = "default",
  size = "default",
  animation = "lift",
  children,
  ...props
}) => {
  const animationClasses = {
    lift: "hover-lift",
    glow: "hover-glow",
    scale: "hover-scale",
    shimmer: "animate-shimmer",
    pulse: "animate-pulse-slow",
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "transition-all duration-300 group",
        animationClasses[animation],
        className
      )}
      {...props}
    >
      <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
        {children}
      </span>
    </Button>
  );
};

export default AnimatedButton;
