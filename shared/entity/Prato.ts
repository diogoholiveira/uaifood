import { Restaurante } from './Restaurante'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Prato {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '' })
  nome: string

  @Column({ default: '' })
  composicao: string

  @Column("double precision", { default: 1.0 })
  preco: number

  @Column("double precision", { default: 0.0 })
  peso: number

  @ManyToOne(type => Restaurante, restaurante => restaurante.pratos)
  @ManyToOne(type => Restaurante, pratos => Prato)
  restaurante: Restaurante

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

}
