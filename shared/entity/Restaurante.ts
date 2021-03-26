import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"

import { Prato } from './Prato'
import { Cidade } from './Cidade'

@Entity()
export class Restaurante {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: '' })
    nome: string

    @Column()
    cnpj: string

    @Column({ default: '' })
    rua: string

    @Column({ default: '' })
    numero: string

    @Column({ default: '' })
    bairro: string

    @Column({ default: '' })
    complemento: string

    @Column({ default: '' })
    referencia: string

    @ManyToOne(type => Cidade, cidade => cidade.restaurantes, { eager: true })
    cidade: Cidade

    @Column({ default: '' })
    tipoCulinaria: string

    @OneToMany(type => Prato, prato => prato.restaurante, { eager: true })
    pratos: Prato[]

    @Column("double precision", { default: 0.0 })
    latitude: number

    @Column("double precision", { default: 0.0 })
    longitude: number

    @Column({default: ''})
    usuario: string

    @Column({default: ''})
    senha: string

    @Column({default: ''})
    token: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}
