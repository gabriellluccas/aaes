-- Client insert
insert into client(name, email) values('Gabriell', 'gabriellluccas@gmail.com');


-- Product insert
insert into product(name, value, is_combo) values('Pizza',39.90, false);
insert into product(name, value, is_combo) values('2 Pizzas',59.90, true);
insert into combo_product(combo, id_product) values(2, 1); 
insert into combo_product(combo, id_product) values(2, 1); 