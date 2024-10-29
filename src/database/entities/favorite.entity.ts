import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Favorite {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 40, name: 'band_name' })
    bandName: string;

    @Column({ type: 'int', name: 'song_id' })
    songId: number;

    @Column({ type: 'varchar', length: 30 })
    user: string;

    @Column({ type: 'varchar', length: 20 })
    ranking: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
