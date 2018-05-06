####################################
#############  VIEWS   #############
####################################

##Displays all the members' names with all the projects' names he is involved in
CREATE VIEW membersForProjects AS
	SELECT m.name as "user_name", p.name as "project_name"
	FROM ("Users" m INNER JOIN "User_projects" mp 
	ON m.id = mp.member_id ) INNER JOIN "Projects" p 
	ON p.id = mp.project_id
	ORDER BY m.name, p.name ASC;


####################################
#########  CONSTRAINTS   ###########
####################################

##Checks that the id to insert has a length of 9, and the first letter is lowercase
ALTER TABLE "Users" 
	ADD CONSTRAINT "id" check (length("id") = 9 AND SUBSTRING ("id" FROM 1 FOR 1) = LOWER(SUBSTRING ("id" FROM 1 FOR 1)));


##NOTE: <grant root_user to db_user> is required to alter a table created by sequelize with db_user credentials


####################################
##########  FUNCTIONS   ############
####################################

##Counts the amount of projects a particular user is in
CREATE OR REPLACE FUNCTION countProjects (id_input varchar)
RETURNS integer AS $totalProjects$
declare 
    totalProjects integer;
BEGIN
    SELECT count(project_id) into totalProjects FROM "User_projects" WHERE member_id = id_input;
    RETURN totalProjects;
END;
$totalProjects$ LANGUAGE plpgsql;

####################################
#########  PROCEDURES   ############
####################################
CREATE OR REPLACE FUNCTION insertProject(p_vision text, p_name text,
	p_begin_date timestamp, p_end_date timestamp, p_background
	text, p_risks text, p_reach text, p_createdAt timestamp,
	p_updatedAt timestamp, p_scrum_master_id VARCHAR)
RETURNS integer AS $insertedID$

DECLARE
	insertedID integer;

BEGIN
	INSERT INTO "Projects"(vision, name, begin_date, end_date,
	background, risks, reach, "createdAt", "updatedAt",
	scrum_master_id) 
	VALUES (p_vision, p_name, p_begin_date, p_end_date,
	p_background, p_risks, p_reach, p_createdAt, p_updatedAt, 
	p_scrum_master_id);
	SELECT currval(pg_get_serial_sequence('Projects','id')) 
	INTO insertedID;

	RETURN insertedID;
END;
$insertedID$ LANGUAGE plpgsql;