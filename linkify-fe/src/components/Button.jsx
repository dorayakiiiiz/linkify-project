
export default function Button({ backgrond: { normal, hover}, color, text, onClick }) {
    const className = ``
    return (
        <button
            style={{
                backgroundColor: normal,
                color: color
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = normal)}
            className={`cursor-pointer px-[40px] py-[12px] font-semibold rounded-3xl`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}