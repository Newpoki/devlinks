export const DragHandle = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            {...props}
            width="12"
            height="6"
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="12" height="1" fill="currentColor" />
            <rect y="5" width="12" height="1" fill="currentColor" />
        </svg>
    )
}
