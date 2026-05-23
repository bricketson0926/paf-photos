'use client';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/95 backdrop-blur bottom-0 w-full fixed">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-1">
        <p className="text-center text-sm text-gray-500">
          Piercing Arrow & Frontier Media Database. All rights reserved.
        </p>
      </div>
      <RepeatingColorBanner repeats={5} />
    </footer>
  );
}
const BANNER_COLORS = ["bg-green-600", "bg-yellow-400", "bg-red-600", "bg-black"];

export function RepeatingColorBanner({ repeats = 10 }: { repeats?: number }) {
    return (
        <div className="w-full overflow-hidden border-t border-gray-200">
            <div className="flex h-2 w-full">
                {Array.from({ length: repeats }).flatMap((_, i) =>
                    BANNER_COLORS.map((color, j) => (
                        <span
                            key={`${i}-${j}`}
                            className={`h-full flex-1 ${color}`}
                            aria-hidden="true"
                        />
                    ))
                )}
            </div>
        </div>
    );
}