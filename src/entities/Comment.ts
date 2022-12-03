import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Announcement } from "./Announcement";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @Column({ type: "text" })
    message: string
    @CreateDateColumn()
    createdAt: Date
    @ManyToOne(() => Announcement, (announcement) => announcement.comments)
    announcement: Announcement
}