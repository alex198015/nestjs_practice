import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({name: 'follows'})
export class FollowEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    followId: number;

    @Column()
    followingId: number;
}