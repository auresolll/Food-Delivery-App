import { IsEmail, IsInt, Max, Min } from "class-validator";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./addresses";
import { Comments } from "./comments";
import { Favorites } from "./favorites";
import { Receiver } from "./message_receiver";
import { Sender } from "./message_sender";
import { NotificationToProductsAndUsers } from "./notificationToProductsAndUsers";
import { Orders } from "./orders";
import { SchedulesToProductsAndUsers } from "./schedulesToProductsAndUsers";

@Entity()
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	@IsEmail()
	email: string;

	@Column()
	@IsInt()
	@Min(8)
	@Max(11)
	phone: number;

	@ManyToOne(() => Addresses, (addresses) => addresses.users)
	addresses: Addresses;

	@OneToMany(() => Comments, (comment) => comment.users)
	comments: Comments[];

	@OneToMany(() => Orders, (order) => order.user)
	orders: Orders[];

	@OneToMany(() => Favorites, (favorite) => favorite.user)
	favorites: Favorites[];

	@OneToOne(() => Receiver)
	@JoinColumn()
	receiver: Receiver;

	@OneToOne(() => Sender)
	@JoinColumn()
	sender: Sender;

	@OneToMany(
		() => NotificationToProductsAndUsers,
		(notificationToProductsAndUsers) => notificationToProductsAndUsers.user
	)
	notificationToProductsAndUsers!: NotificationToProductsAndUsers[];

	@OneToMany(
		() => SchedulesToProductsAndUsers,
		(schedulesToProductsAndUser) => schedulesToProductsAndUser.user
	)
	schedulesToProductsAndUsers!: SchedulesToProductsAndUsers[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}