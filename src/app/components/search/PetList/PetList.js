import React from "react";
import { selectPetState } from "@/redux/features/pet/petSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import Card from "../../shared/card/Card";

const PetList = () => {
  const pets = useAppSelector(selectPetState);
  console.log(pets);

  if (!pets) {
    return null;
  }

  return (
    <>
      {pets && pets?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          {pets.map((pet, index) => (
            <Card key={index} cardInfo={pet} />
          ))}
        </div>
      ) : (
        <h1 className="text-secondary">
          Nie znaleziono zwierząt pasujących do filtrów.
        </h1>
      )}
    </>
  );
};

export default PetList;
