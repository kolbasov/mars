create table data
(
  terrestrial_date date primary key,
  min_temp numeric(5,2) null,
  max_temp numeric(5,2) null,
  pressure numeric(6,2) null,
  atmo_opacity varchar(10) null,
  season varchar(10) not null,
  sunrise timestamptz,
  sunset timestamptz
);
