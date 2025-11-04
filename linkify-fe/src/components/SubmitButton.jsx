
export default function SubmitButton({ backgrond: { normal, hover}, color, text }) {
    const className = ``
    return (
        <button
            type="submit"
            style={{
                backgroundColor: normal,
                color: color
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = normal)}
            className={`cursor-pointer px-[40px] py-[12px] font-semibold rounded-3xl`}
        >
            {text}
        </button>
    )
}