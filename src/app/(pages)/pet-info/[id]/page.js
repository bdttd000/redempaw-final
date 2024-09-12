"use client";

import { PageSection } from "@/app/components/shared/layout";
import Image from "next/image";
import styles from "./styles.scss";

// import config from "";

export default function Home({ params }) {
  const data = {
    activity: "calm",
    age: "young",
    avatarUrl: "/images/1.jpg",
    breed: "asd",
    city: "Warszawa",
    description: "asdasd",
    gender: "male",
    id: "0a842e8e-7d6f-4c6b-9e35-9098e68a744a",
    name: "Kicia",
    photos: [
      "/additional-photos/18365022-b1bc-4228-98e2-fbf570a812f6.jpg",
      "/additional-photos/379ff9b0-069e-41de-8d98-ebf4ba41f7bf.jpg",
      "/additional-photos/64888a71-d227-4505-bf07-9bda8a07ed80.jpg",
    ],
    spiece: "dog",
    status: "forAdoption",
  };

  return (
    <div>
      <PageSection title="Reksio" primary>
        <div className="m-auto w-2/3 flex justify-center bg-primary p-8 rounded-2xl">
          <div className="flex flex-row items-center">
            <div className="flex flex-col">
              <table className="table">
                <tr>
                  <td>
                    <h4 className="text-center">Dane zwierzaka</h4>
                  </td>
                </tr>
              </table>
              <table className="table">
                <tr>
                  <td>
                    <h4>Miasto</h4>
                  </td>
                  <td>
                    <h4>Warszawa</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Status</h4>
                  </td>
                  <td>
                    <h4>Do adopcji</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Gatunek</h4>
                  </td>
                  <td>
                    <h4>Pies</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Wiek</h4>
                  </td>
                  <td>
                    <h4>Senior</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Rasa</h4>
                  </td>
                  <td>
                    <h4>Mieszaniec</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Płeć</h4>
                  </td>
                  <td>
                    <h4>Samiec</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Poziom aktywności</h4>
                  </td>
                  <td>
                    <h4>Aktywny</h4>
                  </td>
                </tr>
              </table>
              <table className="table">
                <tr>
                  <td>
                    <h4 className="text-center">Dane właściciela</h4>
                  </td>
                </tr>
              </table>
              <table className="table">
                <tr>
                  <td>
                    <h4>Telefon</h4>
                  </td>
                  <td>
                    <h4>+48 123 345 567</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Adres</h4>
                  </td>
                  <td>
                    <h4>Warszawa, Szeroka 23</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>E-mail</h4>
                  </td>
                  <td>
                    <h4>test@mail.com</h4>
                  </td>
                </tr>
              </table>
            </div>
            <div className="bg-photo"></div>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
