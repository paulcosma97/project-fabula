import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Account {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    email: string;

    @Column()
    password: string;
    //
    // @Column()
    // characters:
}
