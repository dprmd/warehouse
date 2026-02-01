import KainToMerge from "@/components/kain/KainToMerge";
import ListMerge from "@/components/kain/ListMerge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/Form";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { Separator } from "@/components/ui/separator";
import { useKain } from "@/context/KainContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MergeKain() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: listKain, loading } = useKain();
  const kainToMerge = listKain.find((item) => item.id === id);
  const [listMerged, setListMerged] = useState([]);
  const kainChoosed = listMerged.filter((item) => item.checked === true);

  const toggleChecked = (id) => {
    setListMerged((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  useEffect(() => {
    const getList = listKain
      .filter(
        (item) => item.id !== id && item.status === "ARRIVED_AT_WAREHOUSE",
      )
      .map((item) => ({ ...item, checked: false }));

    setListMerged(getList);
  }, [listKain]);

  return (
    <div className="px-8 py-3">
      <LoadingOverlay show={loading} text="Memuat . . ." />
      {!loading && (
        <div className="flex flex-col justify-center items-center md:items-start md:ute gap-2">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <KainToMerge cardData={kainToMerge} />
            <div className="w-10/12 flex flex-col justify-center items-center px-4 py-2 gap-y-4  m-4">
              <h3 className="text-xl">{kainChoosed.length} Kain Di Pilih</h3>
              <div className="flex justify-center items-center w-full gap-4">
                <Button
                  variant="danger"
                  onClick={() => {
                    navigate("/kainDiGudang");
                  }}
                >
                  Batalkan
                </Button>
                <Button>Konfirmasi</Button>
              </div>
            </div>
          </div>
          <Separator />
          <h3 className="font-bold text-xl">Pilih Kain Yang Akan Di Gabung</h3>
          <ul className="flex justify-center md:justify-start items-center flex-wrap gap-4">
            {listMerged?.map((kain) => (
              <li
                key={kain.id}
                className="flex justify-center items-center gap-x-2"
              >
                <Checkbox
                  className="border-2 border-gray-400"
                  id={kain.id}
                  checked={kain.checked}
                  onCheckedChange={() => toggleChecked(kain.id)}
                />
                <label htmlFor={kain.id}>
                  <ListMerge cardData={kain} />
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
