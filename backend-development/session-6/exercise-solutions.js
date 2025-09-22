/**
 * Exercise 1
 */

// Find country name with most population from table country
`
select name
from country
order by population desc
limit 1;
`

// Find the second one country with most population from table country
`
select name
from country
order by population desc
limit 1 offset 1;
`

// Find country name with lowest population from table country
`
select name
from country
order by population asc
limit 1;
`

// Find the third one country with lowest population from table country
`
select name
from country
order by population asc
limit 1 offset 2;
`

// Find the largest continent by sum surface area with life expectancy more than 75
`
select continent
from country
where life_expectancy > 75
group by continent
order by sum(surface_area) desc
limit 1;
`

/**
 * Exercise 2
 */

// Show all data using IN, and display the country_id and country columns of the following countries: China, Bangladesh, and India
`
select country_id, country
from country
where country in ('China', 'Bangladesh', 'India');
`

// Find every actors whose last names contain the letters OD. Order the rows by last name and first name, in that order
`
select actor_id, last_name, first_name
from actor
where last_name like '%OD%'
order by last_name, first_name;
`

// Modify table actors. Add a middle_name column to the table actor. Position it between first_name and last_name. Hint: you will need to specify the data type.
`
alter table actor
add column middle_name varchar(50);
`

// List every last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
`
select last_name, count(*)
from actor
group by last_name
having count(*) >= 2;
`

// Join the table and display the first and last names, as well as the address, of each staff member.
`
select s.first_name, s.last_name, a.address
from staff s
join address a on s.address_id = a.address_id;
`

// Find out how many copies of the film “Hunchback Impossible” exist in the inventory system
`
select count(*)
from inventory i
join film f on i.film_id = f.film_id
where f.title ilike 'Hunchback Impossible';
`

// Find and display the most frequently rented movies in descending order.
`
select f.title, count(r.rental_id)
from rental r
join inventory i on r.inventory_id = i.inventory_id
join film f on i.film_id = f.film_id
group by f.title
order by count(r.rental_id) desc;
`

// Write down a query in order to display each store its store ID, city, and country
`
select s.store_id, city.city, country.country
from store s
join address a on s.address_id = a.address_id
join city on a.city_id = city.city_id
join country on city.country_id = country.country_id;
`

// Use subqueries to display every actors who appear in the film Alone Trip.
`
select a.actor_id, a.first_name, a.last_name
from actor a
where a.actor_id in (
  select fa.actor_id
  from film_actor fa
  join film f on fa.film_id = f.film_id
  where title ilike 'Alone Trip'
);
`

// Delete the middle_name column from table actors
`
alter table actor
drop column middle_name;
`
/**
 * Work in a small group to design a database for library that could handle an activity:
 * How to become a member
 * Keep books information
 * Track member activity (borrow books, staff in charge)
 * Track member transaction (total, fine, member could borrow books more than one in single transaction)
 * Staff information
 * Staff schedule
 * Library branch (location)
 */

// solution posted in discord
// https://cdn.discordapp.com/attachments/1373932978991792198/1419701104140091504/image.png?ex=68d2b72f&is=68d165af&hm=684e362e59912078d7126484f19d98b368f240449bd631de68baff8aa64aee43&
