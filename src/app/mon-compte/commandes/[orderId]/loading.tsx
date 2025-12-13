export default function OrderDetailsLoading() {
  return (
    <div className="p-6 flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#00704A] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Chargement des détails...</p>
      </div>
    </div>
  );
}