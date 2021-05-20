import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export default class Character /* = player */ {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;
}
