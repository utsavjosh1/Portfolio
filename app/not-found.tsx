"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import "../app/not-found.css";

export default function Page404() {
  return (
    <div
      className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-background to-muted/20"
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Animated 404 with floating elements */}
          <div className="relative">
            <div className="inline-block relative">
              {/* Main 404 text */}
              <h1 className="text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/40 leading-none animate-glitch">
                404
              </h1>

              {/* Floating geometric shapes */}
              <div className="absolute -top-8 -left-8 animate-float-slow">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-30"
                >
                  <circle
                    cx="30"
                    cy="30"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="15"
                    fill="currentColor"
                    className="text-primary/20"
                  />
                </svg>
              </div>

              <div className="absolute -bottom-4 -right-12 animate-float-medium">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-30"
                >
                  <rect
                    x="5"
                    y="5"
                    width="40"
                    height="40"
                    rx="8"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                  <rect
                    x="15"
                    y="15"
                    width="20"
                    height="20"
                    rx="4"
                    fill="currentColor"
                    className="text-primary/20"
                  />
                </svg>
              </div>

              <div className="absolute top-1/2 -left-16 animate-float-fast">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-30"
                >
                  <path
                    d="M20 5 L35 30 L5 30 Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                  <path
                    d="M20 15 L28 27 L12 27 Z"
                    fill="currentColor"
                    className="text-primary/20"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Lost astronaut SVG illustration */}
          <div className="flex justify-center animate-float-slow">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="40"
                cy="40"
                r="2"
                fill="currentColor"
                className="text-primary/60 animate-pulse-slow"
              />
              <circle
                cx="160"
                cy="50"
                r="2"
                fill="currentColor"
                className="text-primary/60 animate-pulse-medium"
              />
              <circle
                cx="170"
                cy="120"
                r="2"
                fill="currentColor"
                className="text-primary/60 animate-pulse-fast"
              />
              <circle
                cx="30"
                cy="150"
                r="2"
                fill="currentColor"
                className="text-primary/60 animate-pulse-slow"
              />

              {/* Helmet */}
              <circle cx="100" cy="80" r="35" fill="currentColor" className="text-primary/10" />
              <circle
                cx="100"
                cy="80"
                r="35"
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary"
              />

              {/* Visor */}
              <ellipse cx="100" cy="80" rx="25" ry="20" fill="currentColor" className="text-primary/30" />
              <path
                d="M 80 75 Q 100 85, 120 75"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary/50"
                fill="none"
              />

              {/* Body */}
              <rect
                x="80"
                y="110"
                width="40"
                height="50"
                rx="8"
                fill="currentColor"
                className="text-primary/10"
              />
              <rect
                x="80"
                y="110"
                width="40"
                height="50"
                rx="8"
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary"
              />

              {/* Arms */}
              <path
                d="M 80 120 L 60 130 L 55 145"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-primary"
              />
              <path
                d="M 120 120 L 140 130 L 145 145"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-primary"
              />

              {/* Legs */}
              <path
                d="M 88 160 L 85 180"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-primary"
              />
              <path
                d="M 112 160 L 115 180"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-primary"
              />

              {/* Oxygen Pack */}
              <rect
                x="105"
                y="115"
                width="12"
                height="20"
                rx="2"
                fill="currentColor"
                className="text-primary/20"
              />
              <circle cx="111" cy="122" r="2" fill="currentColor" className="text-primary" />
              <circle cx="111" cy="128" r="2" fill="currentColor" className="text-primary" />
            </svg>
          </div>

          {/* Text */}
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Lost in Space</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Looks like this page drifted off into the void. The coordinates you entered don’t match any known location in our universe.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay">
            <Button asChild size="lg" className="group">
              <Link href="/" className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
                  <path d="M10 2L2 8V18H7V13H13V18H18V8L10 2Z" fill="currentColor" />
                </svg>
                Return Home
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.back();
                }
              }}
              className="group flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:-translate-x-1">
                <path d="M8 4L2 10L8 16M2 10H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Go Back
            </Button>
          </div>

          {/* Code */}
          <div className="pt-8 opacity-40">
            <p className="text-sm text-muted-foreground font-mono">ERROR_CODE: PAGE_NOT_FOUND_404</p>
          </div>
        </div>
      </div>
    </div>
  );
}
