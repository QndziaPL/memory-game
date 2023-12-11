import { Grid } from "./Components/Grid/Grid.tsx";
import { useEffect, useMemo, useState } from "react";
import {
  AvailableNumberOfCards,
  getNumberOfColumnsAndRows,
  prepareImageCards,
  rowsAndColumnsBasedOnCards,
} from "./helpers/images.ts";
import styles from "./App.module.scss";

const App = () => {
  const [numberOfCards, setNumberOfCards] = useState<AvailableNumberOfCards>(8);
  // const [cards, setCards] = useState(prepareImageCards(numberOfCards));
  const cards = useMemo(() => prepareImageCards(numberOfCards), [numberOfCards]);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [temporaryRevealed, setTemporaryRevealed] = useState<string[]>([]);
  const [clickEventBlocked, setClickEventBlocked] = useState(false);

  const [rows, columns] = getNumberOfColumnsAndRows(numberOfCards);

  const handleSetNumberOfCards = (direction: number) => () => {
    const arrayOfKeys = Object.keys(rowsAndColumnsBasedOnCards).map((key) => Number(key) as AvailableNumberOfCards);

    setNumberOfCards((prev) => {
      const currentIndex = arrayOfKeys.indexOf(prev);
      const newIndex = currentIndex + direction;
      const TEMPORARY_LOCK = newIndex > 3; //TODO: do wyjebania potem jak będize wincyj obrazkuf
      if (newIndex < 0 || newIndex > arrayOfKeys.length - 1 || TEMPORARY_LOCK) return prev;

      return arrayOfKeys[newIndex];
    });
  };

  const handleOnCardClick = (id: string) => {
    if (clickEventBlocked) return;

    const isTemporaryRevealed = temporaryRevealed.includes(id);
    if (!isTemporaryRevealed) {
      setTemporaryRevealed((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    let timeout: any;

    if (temporaryRevealed.length >= 2) {
      setClickEventBlocked(true);
      const [first, second] = [...temporaryRevealed];
      const firstTrimmed = first.slice(0, -2);
      const secondTrimmed = second.slice(0, -2);

      timeout = setTimeout(() => {
        if (firstTrimmed === secondTrimmed) {
          setRevealed((prev) => [...prev, first, second]);
        }

        setTemporaryRevealed([]);
        setClickEventBlocked(false);
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [temporaryRevealed]);

  return (
    <>
      <div className={styles.settingsPanel}>
        <div>cards: {numberOfCards}</div>
        <div>
          <button onClick={handleSetNumberOfCards(-1)}>-</button>
          <button onClick={handleSetNumberOfCards(1)}>+</button>
        </div>
      </div>

      <Grid
        rows={rows}
        columns={columns}
        cards={cards}
        revealed={revealed}
        temporaryRevealed={temporaryRevealed}
        onCardClick={handleOnCardClick}
      />
    </>
  );
};

export default App;
