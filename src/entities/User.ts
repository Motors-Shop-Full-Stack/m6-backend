import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Announcement } from "./Announcement";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;
  @Column("varchar", { length: 50, nullable: false })
  name: string;
  @Column("varchar", { length: 50, nullable: false, unique: true })
  email: string;
  @Column("varchar", { length: 200, nullable: false })
  password: string;
  @Column("varchar", { length: 11, nullable: false, unique: true })
  cpf: string;
  @Column("varchar", { length: 12, nullable: false, unique: true })
  cel: string;
  @Column({ type: "date", nullable: false })
  birthdate: Date;
  @Column({ type: "text", nullable: false })
  description: string;
  @Column({ type: "varchar", nullable: false })
  accountType: string;
  @Column("varchar", { length: 8, nullable: false, default: true })
  cep: string;
  @Column("varchar", { length: 2, nullable: false })
  state: string;
  @Column("varchar", { length: 50, nullable: false })
  city: string;
  @Column("varchar", { length: 50, nullable: false, default: true })
  street: string;
  @Column("integer", { nullable: false })
  number: number;
  @Column("varchar", { length: 20, nullable: true })
  complement: string;
  @Column("boolean", { nullable: false, default: true })
  is_active: boolean;
  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Announcement[];
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
