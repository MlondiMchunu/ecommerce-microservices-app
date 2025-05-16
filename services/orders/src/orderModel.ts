const { Entity, PrimaryGeneratedColumn, Column, BaseEntity } = require('typeorm');

@Entity()
export class OrderEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    userId!: string;

    @Column()
    productsIds!: string[];

    @Column('decimal')
    total!: number;

    @Column()
    status!: string
}