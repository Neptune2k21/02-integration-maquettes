import { ProductRating } from "@arthur.eudeline/starbucks-tp-kit";
import styles from "../ProductAttributesTables.module.css";

export type ProductAttribute = {
  label: string;
  rating: number;
};

type ProductAttributesTableProps = {
  attributes: ProductAttribute[];
};

export default function ProductAttributesTable({ attributes }: ProductAttributesTableProps) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.headerCell} ${styles.leftAlign}`}>Attribut</th>
            <th className={`${styles.headerCell} ${styles.rightAlign}`}>Note</th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((attr) => (
            <tr key={attr.label} className={styles.row}>
              <td className={`${styles.cell} ${styles.leftAlign}`}>{attr.label}</td>
              <td className={`${styles.cell} ${styles.rightAlign}`}>
                <ProductRating value={attr.rating} icon="circle" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
