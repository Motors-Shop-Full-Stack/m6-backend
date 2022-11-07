import {
    Column,
    Entity,
    Generated,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { User } from "./User";
  
  @Entity()
  export class Announcement {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @Column("varchar", { length: 50, nullable: false, unique: false })
    title: string;
    @Column("varchar", {nullable: false})
    announceType: string;
    @Column("varchar", {nullable: false})
    description: string;
    @Column("integer", {nullable: false})
    km: number;
    @Column("decimal", {nullable: false, precision: 8, scale: 2})
    price: string;
    @Column("varchar", { length: 200, nullable: false, unique: false })
    announceCover: string;
    @Column("boolean", { nullable: false, default: true})
    is_active: boolean;
    @Column("varchar", { nullable: false})
    category: string;
    @Column("integer", { nullable: false})
    fabricationYear: number;
    @ManyToOne(() => User, (user) => user.announcements)
    user: User
  }