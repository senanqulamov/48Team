/**
 * Section Content Components
 * Simple content wrappers for each section
 */

export function Section1Content() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-black/40 via-cyan-950/30 to-black/40 relative">
      <div className="absolute inset-0 border-r border-white/10" />
      <div className="relative z-10">
        <h1 className="text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
          Section 1
        </h1>
        <p className="text-2xl text-cyan-100 mt-4 text-center">
          Scroll down to move right →
        </p>
      </div>
    </div>
  )
}

export function Section2Content() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-black/40 via-cyan-900/25 to-black/40 relative">
      <div className="absolute inset-0 border-r border-white/10" />
      <div className="relative z-10">
        <h1 className="text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
          Section 2
        </h1>
        <p className="text-2xl text-cyan-100 mt-4 text-center">
          Keep scrolling →
        </p>
      </div>
    </div>
  )
}

export function Section3Content() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-950/35 via-black/40 to-cyan-950/30 relative">
      <div className="absolute inset-0 border-r border-white/10" />
      <div className="relative z-10">
        <h1 className="text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
          Section 3
        </h1>
        <p className="text-2xl text-cyan-100 mt-4 text-center">
          Next: Vertical Section ↓
        </p>
      </div>
    </div>
  )
}

export function Section4Content() {
  return (
    <div className="w-full min-h-[300vh] bg-gradient-to-br from-black/40 via-teal-950/30 to-black/40">
      {/* Top section */}
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(20,184,166,0.5)]">
          Section 4 - Start
        </h1>
        <p className="text-2xl text-teal-100 mt-4 text-center">
          Scroll down vertically ↓
        </p>
      </div>

      {/* Middle section */}
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-6xl font-bold text-teal-400 mb-4">
          Middle Content
        </h2>
        <p className="text-xl text-teal-100/80 text-center max-w-2xl">
          This is native vertical scrolling.<br />
          No JavaScript hijacking.<br />
          Keep scrolling down.
        </p>
      </div>

      {/* Bottom section */}
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-6xl font-bold text-teal-400 mb-4">
          End of Vertical Scroll
        </h2>
        <p className="text-xl text-teal-100/80 text-center max-w-2xl">
          Continue scrolling down<br />
          Horizontal scroll resumes automatically →
        </p>
      </div>
    </div>
  )
}

export function Section5Content() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-black/40 via-purple-950/30 to-black/40 relative">
      <div className="absolute inset-0 border-r border-white/10" />
      <div className="relative z-10">
        <h1 className="text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
          Section 5
        </h1>
        <p className="text-2xl text-purple-100 mt-4 text-center">
          Horizontal scroll continues
        </p>
      </div>
    </div>
  )
}

