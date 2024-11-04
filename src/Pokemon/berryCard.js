import useBerryApi from "@/hooks/useBerryApi";

export default function BerryCard({ id = "", name = "", img = "" }) {
  const {} = useBerryApi();
  return (
    <div>
      <h4>{id}</h4>
      <h4>{name}</h4>
    </div>
  );
}
