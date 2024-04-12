interface HeadingProps {
    title: string
    description: string
}

export const Heading = ({ title, description }: HeadingProps) => {
    return (
        <>
            <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
                <div>
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
        </>
    )
}
