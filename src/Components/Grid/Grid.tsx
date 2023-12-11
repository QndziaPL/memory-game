import { FC } from "react";
import styles from "./Grid.module.scss";
import { BaseCardProps, Card } from "../Card/Card.tsx";

export type GridProps = {
  rows: number;
  columns: number;
  cards: BaseCardProps[];
  revealed: string[];
  temporaryRevealed: string[];
  onCardClick: (id: string) => void;
};
export const Grid: FC<GridProps> = ({ rows, columns, cards, revealed, temporaryRevealed, onCardClick }) => {
  const isCardRevealed = (id: BaseCardProps["id"]) => [...revealed, ...temporaryRevealed].includes(id);

  return (
    <div
      className={styles.grid}
      style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {cards.map((card) => (
        <Card {...card} key={card.id} revealed={isCardRevealed(card.id)} onCardClick={() => onCardClick(card.id)} />
      ))}
    </div>
  );
};
