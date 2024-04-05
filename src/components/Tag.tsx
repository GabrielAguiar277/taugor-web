interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
}

export function Tag({ title, ...rest }: TagProps){
    return (
        <div {...rest} className="bg-[#269eef] text-white rounded-full px-5 py-1 cursor-pointer">
            <span>{ title }</span>
        </div>
    )
}