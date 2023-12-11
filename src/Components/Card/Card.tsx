import { FC } from "react";
import styles from "./Card.module.scss";
import { clsx } from "clsx";
import questionmark from "../../../public/questionmark.png";

export type BaseCardProps = {
  imageURL: string;
  id: string;
};

export type CardComponentProps = BaseCardProps & { revealed: boolean; onCardClick: () => void };

export const Card: FC<CardComponentProps> = ({ imageURL, revealed, onCardClick }) => (
  <div className={clsx(styles.card, { [styles.revealed]: revealed })} onClick={revealed ? undefined : onCardClick}>
    <div className={clsx(styles.cardInner, { [styles.revealed]: revealed })}>
      <div className={clsx(styles.cardContent)}>
        <img className={clsx(styles.cardImage)} src={imageURL} alt="pipa" />
      </div>
      <div className={styles.cardBack} style={{ backgroundImage: `url(${questionmark})` }}></div>
    </div>
  </div>
);
