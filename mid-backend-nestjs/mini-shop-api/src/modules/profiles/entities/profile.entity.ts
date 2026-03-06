import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
    OneToOne, JoinColumn
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('profiles') // table name
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phone: string;

    @Column()
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => UserEntity, user => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: UserEntity;
}