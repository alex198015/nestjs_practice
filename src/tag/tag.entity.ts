import { Column } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'tags'})
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string
}