import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";

  
  @Entity()
  export class Announcement {
    @PrimaryGeneratedColumn()
    readonly id: number;
    @Column("varchar", { length: 50, nullable: false, unique: false })
    title: string;
    @Column("varchar", {nullable: false})
    announcement_type: string;
    @Column("varchar", {nullable: false})
    description: string;
    @Column("integer", {nullable: false})
    km: number;
    @Column("decimal", {nullable: false, precision: 8, scale: 2})
    price: string;
    @Column("varchar", { length: 200, nullable: false, unique: false })
    announcement_cover: string;
    @Column("boolean", { nullable: false, default: true})
    is_active: boolean;
    @Column("varchar", { nullable: false})
    category: string;
    @Column("integer", { nullable: false})
    fabrication_year: number;
    // @Column()
    // created_at: Date;
  }