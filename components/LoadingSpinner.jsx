export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full">
      <div className="relative w-16 h-16">
        
        {/* 1. Background Glow (Neon Effect) */}
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>

        {/* 2. Outer Static Track */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>

        {/* 3. Spinning Gradient Ring */}
        {/* We use border-t and border-r with colors to create a gradient-like spin */}
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent 
          border-t-cyan-400 border-r-blue-600 animate-spin"
        ></div>

        {/* 4. Inner Decorative Circle (Cyber Tech look) */}
        <div className="absolute inset-4 rounded-full border-2 border-gray-800 bg-gray-950 shadow-inner"></div>
        
      </div>

      {/* 5. Loading Text */}
      <p className="mt-6 text-sm font-bold tracking-[0.2em] text-cyan-500/70 animate-pulse">
        LOADING...
      </p>
    </div>
  );
}