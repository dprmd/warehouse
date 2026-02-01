import LoadingOverlay from "@/components/ui/LoadingOverlay";

export default function UIList({
  data,
  loading,
  messageOnZeroData,
  Card,
  ...props
}) {
  return (
    <div className="p-4">
      <LoadingOverlay show={loading} text="Memuat . . ." />
      {!loading && data?.length === 0 && (
        <p className="text-center text-2xl font-black">{messageOnZeroData}</p>
      )}
      {!loading && data?.length > 0 && (
        <ul className="flex justify-center md:justify-start items-center flex-wrap gap-4">
          {data?.map((item) => (
            <Card key={item.id} cardData={item} {...props} />
          ))}
        </ul>
      )}
    </div>
  );
}
