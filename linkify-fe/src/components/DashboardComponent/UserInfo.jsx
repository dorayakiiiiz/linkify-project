export function ButtonAdd() {
    return (
        <div className="w-full">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-10 rounded-full font-medium transition">
            + Add
            </button>
        </div>
    )
}

export function UserInfo() {
    return (
        <div className=" w-full py-4 flex gap-2 ">
            <img
                src="../../../public/anonymous-avatar.jpg"
                alt="avatar"
                className="rounded-full w-20 h-20 mb-2"
            />
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">otis275</h2>
                <p className="text-gray-500 text-sm text-center">
                🌟 Software Engineer | Tech Enthusiast | Coding my way to success! 💻
                </p>
                <i className="fa-solid fa-plus text-xs bg-[#f1f0ee] pl-1 pr-4 py-1 rounded-full border border-[#ccc] border-solid"></i>
            </div>
        </div>
    )
}