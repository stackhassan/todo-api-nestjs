import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  dueDate!: Date;

  @Column({
    type: "enum",
    enum: ["Pending", "Done", "In Progress", "Paused"],
    default: "Pending",
  })
  status!: "Pending" | "Done" | "In Progress" | "Paused";

  @Column({
    type: "enum",
    enum: ["Red", "Yellow", "Blue"],
    default: "Blue",
  })
  priority!: "Red" | "Yellow" | "Blue";

  @Column()
  dateOfCreation!: Date;

  @Column({ default: true })
  isActive!: boolean;
}
