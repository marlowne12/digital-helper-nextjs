export default function Loading() {
    return (
        <div className="min-h-screen bg-background-primary flex items-center justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-accent-primary/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] bg-accent-secondary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Animated Logo/Spinner */}
                <div className="relative">
                    {/* Outer ring */}
                    <div className="w-20 h-20 rounded-full border-2 border-accent-primary/20 animate-spin" style={{ animationDuration: '3s' }} />

                    {/* Inner ring */}
                    <div className="absolute inset-2 rounded-full border-2 border-t-accent-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1s' }} />

                    {/* Center dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-accent-primary animate-pulse" />
                    </div>
                </div>

                {/* Loading Text */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white font-medium text-lg">Loading</p>
                    <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>

                {/* Skeleton Content Preview */}
                <div className="mt-8 space-y-4 w-80">
                    <div className="h-4 bg-white/5 rounded-full animate-pulse" />
                    <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse" style={{ animationDelay: '100ms' }} />
                    <div className="h-4 bg-white/5 rounded-full w-1/2 animate-pulse" style={{ animationDelay: '200ms' }} />
                </div>
            </div>
        </div>
    )
}
