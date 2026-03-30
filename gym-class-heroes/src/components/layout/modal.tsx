export function Modal({
  children,
  onClose
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Modal content */}
      <div className="relative p-0">
        {/* X button */}
        <button
          onClick={onClose}
          className="
            absolute top-1 right-0
            w-8 h-8
            flex items-center justify-center
            rounded-full
            bg-white/25
            text-gray-300
            hover:bg-white/20 hover:text-white
            transition
          "
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
