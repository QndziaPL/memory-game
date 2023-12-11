import { BaseCardProps } from "../Components/Card/Card.tsx";
import { shuffle } from "./shuffle.ts";

const PARROT = "https://i.ebayimg.com/images/g/FlIAAOSwtgdknt-j/s-l1600.jpg" as const;
const MONKEY =
  "https://media.npr.org/assets/img/2015/09/23/ap_836720500193-13f1674f764e5180cf9f3349cfef258d181f2b32-s800-c85.webp" as const;
const PAMELA = "https://lastfm.freetls.fastly.net/i/u/ar0/1a0525da006d45c1863d3f70fd0df49c.jpg" as const;
const SANTA =
  "https://images.fineartamerica.com/images/artworkimages/medium/3/sexy-santa-stripper-for-christmas-2-barroa-artworks.jpg" as const;
const CAT =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ad19ad38-e729-4761-9c13-f0f75a5adb71/dem9i06-cace67f1-8bba-4383-a129-3eeda10d0337.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FkMTlhZDM4LWU3MjktNDc2MS05YzEzLWYwZjc1YTVhZGI3MVwvZGVtOWkwNi1jYWNlNjdmMS04YmJhLTQzODMtYTEyOS0zZWVkYTEwZDAzMzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Oi5-nUKOyyEt7zmhXL6-8KwIZaLAp_igP_Ouo3aIV20" as const;
const CHRISTMAS_TREE =
  "https://img.freepik.com/free-vector/christmas-tree-concept_23-2148780395.jpg?size=338&ext=jpg&ga=GA1.1.1222169770.1702252800&semt=ais" as const;
const DILDO =
  "https://a.allegroimg.com/original/119ddd/5a8ec4454d0ebd48eab193a40441/Dildo-XXL-do-glebokiej-penetracji-30cm" as const;
const VAGINA = "https://ero-bull.eu/wp-content/uploads/2020/10/pchgsknm003.jpg" as const;
export type CardImage = {
  name: string;
  url: string;
};
export const ALL_IMAGES: ReadonlyArray<CardImage> = [
  { name: "PAMELA", url: PAMELA },
  { name: "MONKEY", url: MONKEY },
  { name: "PARROT", url: PARROT },
  { name: "SANTA", url: SANTA },
  { name: "CAT", url: CAT },
  { name: "CHRISTMAS_TREE", url: CHRISTMAS_TREE },
  { name: "DILDO", url: DILDO },
  { name: "VAGINA", url: VAGINA },
];
export const prepareImageCards = (numberOfCards: number): BaseCardProps[] => {
  const images: BaseCardProps[] = [];
  const shuffledImages = shuffle(ALL_IMAGES).slice(0, numberOfCards / 2);

  shuffledImages.forEach((image) => {
    images.push({ imageURL: image.url, id: `${image.name}_1` });
    images.push({ imageURL: image.url, id: `${image.name}_2` });
  });

  return shuffle(images);
};

export type AvailableNumberOfCards = 6 | 8 | 12 | 16 | 20 | 24 | 30;

export const rowsAndColumnsBasedOnCards: Record<AvailableNumberOfCards, readonly [number, number]> = {
  6: [2, 3],
  8: [2, 4],
  12: [3, 4],
  16: [4, 4],
  20: [5, 4],
  24: [6, 4],
  30: [6, 5],
} as const;

export const getNumberOfColumnsAndRows = (cards: AvailableNumberOfCards): readonly [number, number] =>
  rowsAndColumnsBasedOnCards[cards];
