import { useLinks } from "../../../context/LinkContext";
import { useState, useRef, useEffect } from "react";
import { SOCIALS } from "../../../constants/socials";
import { Validator } from "../../../utils/validators";
import Button from "../../../components/Shared/Button";

export default function LinkModal({ onClose, editingLink = null }) {
	const { addNewLink, updateLink } = useLinks();

	const formatDate = (dateString) => {
		if (!dateString) return "";
		return new Date(dateString).toISOString().slice(0, 16);
	};

	const [selectedPlatform, setSelectedPlatform] = useState(null);
	const [showSchedule, setShowSchedule] = useState(
		editingLink?.scheduledEnable || editingLink?.scheduledDisable ? true : false
	);

	const [title, setTitle] = useState(editingLink?.title || "");
	const [url, setUrl] = useState(editingLink?.url || "");
	const [scheduledEnable, setScheduledEnable] = useState(
		formatDate(editingLink?.scheduledEnable)
	);
	const [scheduledDisable, setScheduledDisable] = useState(
		formatDate(editingLink?.scheduledDisable)
	);

	const [log, setLog] = useState({ type: "", content: "" });
	useEffect(() => {
		if (log.content) {
			const timerId = setTimeout(() => setLog({ type: "", content: "" }), 3000);
			return () => clearTimeout(timerId);
		}
	}, [log]);

	const scrollRef = useRef(null);

	const handleScroll = (direction) => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: direction === "right" ? 100 : -100,
				behavior: "smooth",
			});
		}
	};

	const handleTogglePlatform = (platform) => {
		if (selectedPlatform?.id === platform.id) {
			setSelectedPlatform(null);
		} else {
			setSelectedPlatform(platform);
			setTitle(platform.name);
			setUrl(platform.baseUrl);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const urlError = Validator.validateUrl(url);
		if (urlError) {
			setLog({ type: "error", content: urlError });
			return;
		}

		if (!editingLink) {
			await addNewLink(title, url, scheduledEnable, scheduledDisable);

			setLog({
				type: "success",
				content: "Add new link successfully.",
			});
		} else {
			await updateLink(editingLink._id, {
				title,
				url,
				scheduledEnable,
				scheduledDisable,
			});

			setLog({
				type: "success",
				content: "Link updated successfully.",
			});
		}

		setTimeout(() => onClose(), 1500);
	};

	return (
		<div
			className="fixed inset-0 z-100 bg-black/50 backdrop-blur flex items-end md:items-center justify-center"
			onClick={onClose}
		>
			<div
				className="flex flex-col w-full max-w-[750px] px-10 py-[26px] min-h-[460px] bg-white rounded-t-4xl md:rounded-3xl animate-slide-up max-h-[90vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="w-full flex justify-between items-center">
					<div className="font-momo text-2xl">
						{editingLink ? "Edit link" : "Add a new link"}
						<i className="fa-solid fa-link ml-2.5 text-[#0099ff]"></i>
					</div>
					<div
						className=" text-[red] text-2xl cursor-pointer"
						onClick={onClose}
					>
						<i className="fa-regular fa-circle-xmark"></i>
					</div>
				</div>

				<div className="w-full flex-1 flex flex-col">
					{!editingLink && (
						<div className="w-full mt-5">
							<div className="text-[#5f6060] font-semibold mb-1.5">
								Pick a platform (optional)
							</div>

							<div className="flex items-center justify-between">
								<div
									className="cursor-pointer hover:text-[#aaa]"
									onClick={() => handleScroll("left")}
								>
									<i className="fa-solid fa-caret-left"></i>
								</div>

								<div
									ref={scrollRef}
									className="flex items-center gap-4 px-2.5 py-1.5 rounded-xl overflow-x-auto no-scrollbar"
								>
									{SOCIALS.map((platform) => {
										return (
											<div
												key={platform.id}
												className={`cursor-pointer h-20 w-20 shrink-0 flex flex-col items-center gap-1 justify-center rounded-2xl border ${platform.id === selectedPlatform?.id
													? "border-black border-2"
													: "border-[#E0E2D9]"
													}  hover:-translate-y-0.5 transition`}
												onClick={() => handleTogglePlatform(platform)}
											>
												<i
													className={`text-3xl ${platform.icon} text-[${platform.color}]`}
												></i>
												<div className="text-[#9f9fa5] font-quicksand text-sm">
													{platform.name}
												</div>
											</div>
										);
									})}
								</div>

								<div
									className="cursor-pointer hover:text-[#aaa]"
									onClick={() => handleScroll("right")}
								>
									<i className="fa-solid fa-caret-right"></i>
								</div>
							</div>
						</div>
					)}

					<div className="w-full mt-5 flex flex-col md:flex-row gap-5">
						<div className="flex-1">
							<div className="text-[#5f6060] font-semibold mb-1.5">
								Enter link title <span className="text-red-500">*</span>
							</div>

							<div className="flex items-center justify-between">
								<input
									type="text"
									className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
						</div>

						<div className="flex-2">
							<div className="text-[#5f6060] font-semibold mb-1.5">
								Enter URL <span className="text-red-500">*</span>
							</div>

							<div className="flex items-center justify-between">
								<input
									type="text"
									className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
								/>
							</div>
						</div>
					</div>

					<div className="w-full mt-5">
						<div
							className="w-fit flex items-center gap-2.5 cursor-pointer"
							onClick={() => setShowSchedule(!showSchedule)}
						>
							<i className="fa-regular fa-clock"></i>
							Schedule link (optional)
							<i
								className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${showSchedule ? "rotate-180" : ""
									}`}
							></i>
						</div>

						{showSchedule && (
							<div className="flex flex-col md:flex-row gap-[30px] mt-2.5">
								<div className="flex-1">
									<div className="text-[#5f6060] font-semibold mb-1.5">
										Schedule enable
									</div>

									<div className="flex items-center justify-between">
										<input
											type="datetime-local"
											className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
											value={scheduledEnable}
											onChange={(e) => setScheduledEnable(e.target.value)}
										/>
									</div>
								</div>
								<div className="flex-1">
									<div className="text-[#5f6060] font-semibold mb-1.5">
										Schedule disable
									</div>

									<div className="flex items-center justify-between">
										<input
											type="datetime-local"
											className="h-[50px] w-full rounded-xl bg-[#f7f8f6] px-5"
											value={scheduledDisable}
											onChange={(e) => setScheduledDisable(e.target.value)}
										/>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className="w-full text-center m-auto">
						<div
							className={`h-6 my-2.5 ${log.type == "error" ? "text-[red]" : "text-[green] success-glow"
								} font-semibold`}
						>
							{log.content}
						</div>

						<Button
							backgrond={{ normal: "#8129d9", hover: "#5D18A2 " }}
							color="#fff"
							text={editingLink ? "Save changes" : "Add link"}
							onClick={handleSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
