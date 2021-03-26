import { Restaurante } from './Restaurante'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Cidade {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: '' })
    nome: string

    @Column({ default: '' })
    siglaUf: string

    @Column({ default: '' })
    nomeUf: string

    @OneToMany(type => Restaurante, restaurante => restaurante.cidade)
    restaurantes: Restaurante[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}
