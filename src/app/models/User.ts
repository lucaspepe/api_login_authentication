import { Entity, ObjectID, ObjectIdColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcryptjs';


@Entity('users')
class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}

export default User;
