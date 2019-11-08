create table product(
	id serial primary key,
	name varchar(255),
	value decimal,
	is_combo boolean
);

create table order_delivery(
	id serial primary key,
	delivery_state varchar(255),
	total decimal
);

create table client(
	id serial primary key,
  	name varchar(255),
  	email varchar(255)
);

create table order_product(
	id serial primary key,
	id_order integer references order_delivery(id),
	id_product integer references product(id)
);

create table order_memento(
	id serial primary key,
	id_order integer references order_delivery(id),
 	delivery_state varchar(255)
);

create table combo_product(
    id serial primary key,
    combo integer references product(id),
    id_product integer references product(id) 
);

create table order_observer(
	id_order integer references order_delivery(id),
	id_client integer references client(id),
	primary key(id_order, id_client)
);