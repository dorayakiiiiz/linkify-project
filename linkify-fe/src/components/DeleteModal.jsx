import { useLinks } from "../context/LinkContext";
import { useState } from "react";

// SHOP FEATURE - Updated to support custom onDelete function
export default function DeleteModal({ onClose, deleteId, onDelete }) {
  const [log, setLog] = useState({ type: "", content: "" });

  const { removeLink } = useLinks();

  const handleDelete = async () => {
    // SHOP FEATURE - Use custom onDelete if provided, otherwise use removeLink
    if (onDelete) {
      await onDelete(deleteId);
      setLog({
        type: "success",
        content: "Item deleted successfully.",
      });
    } else {
      removeLink(deleteId);
      setLog({
        type: "success",
        content: "Link deleted successfully.",
      });
    }

    setTimeout(() => onClose(), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-100 bg-black/50 backdrop-blur flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="flex flex-col w-full max-w-[560px] px-[50px] py-[30px] min-h-[220px] bg-white md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-momo text-2xl text-[#ff3838]">
          {/* SHOP FEATURE - Generic message */}
          Are you sure to delete this item from your profile?
        </div>

        <div className="font-quicksand mt-2.5">
          This action cannot be undone.
        </div>

        <div
          className={`w-full text-center h-3 my-2.5 ${
            log.type == "error" ? "text-[red]" : "text-[green] success-glow"
          } font-semibold`}
        >
          {log.content}
        </div>

        <div className="flex mt-3.5 items-center justify-center gap-5">
          <div
            className="cursor-pointer bg-[#ccc] hover:bg-[#e0e0e0] text-white rounded-xl px-5 py-2.5"
            onClick={onClose}
          >
            Cancel
          </div>

          <div
            className="cursor-pointer bg-[#fc5050] hover:bg-[#ff9696] text-white rounded-xl px-5 py-2.5"
            onClick={handleDelete}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}
