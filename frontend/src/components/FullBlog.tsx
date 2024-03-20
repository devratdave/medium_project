interface fullBlogParams {
    title: string,
    content: string,
    author: {
        name: string
    }
}

export const FullBlog = ({title, content, author}: fullBlogParams) => {
    return(
        <div className="flex justify-center">
            <div className="w-full md:max-w-3xl">
            <div className="grid grid-cols-12">
            <div className="col-span-8 m-4">
                <div className="text-4xl font-semibold">
                    {title}
                </div>
                <div className="text-md text-gray-400 mt-2 mb-4">
                    Published Recently
                </div>
                <div>
                    {content}
                </div>
            </div>
            <div className="col-span-4">
                <div className="mt-4 text-gray-500">
                    Author
                </div>
                <div className="flex items-center">
                    <div className="mr-2">
                        <div className="w-5 h-5 bg-gray-400 rounded-full text-xs flex items-center justify-center font-thin">
                            {author.name.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold">
                            {author.name}
                        </div>
                        <div className="text-sm">
                            This is general description text for the author
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        </div>
        
        
    )
}