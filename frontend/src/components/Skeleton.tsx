export const Skeleton = () => {
    return(
        <div role="status" className="w-full animate-pulse my-6">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full className max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full className mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full className max-w-lg mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full className max-w-xl mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full className max-w-2xl"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}