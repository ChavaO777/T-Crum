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

##Procedure to change user role for a given user
CREATE OR REPLACE FUNCTION changeSystemRole (id_input varchar, new_role "enum_Users_system_role")
RETURNS void AS $$
BEGIN
    UPDATE "Members"
    SET system_role = new_role
    WHERE id = id_input;
END;
$$ LANGUAGE plpgsql;

###############################
######### TRIGGER #############
###############################

##Trigger table and functions to insert a delete record when a project is deleted
CREATE TABLE deleted_projects(
id SERIAL PRIMARY KEY,
project_id INTEGER,
deleted_timestamp timestamp with time zone
);

CREATE OR REPLACE FUNCTION addToDeletedProjects()
RETURNS TRIGGER AS $add_to_deleted_projects$
BEGIN
INSERT INTO deleted_projects(project_id, deleted_timestamp) VALUES (OLD.id, current_timestamp);
RETURN NEW;
END;
$add_to_deleted_projects$ LANGUAGE plpgsql;

CREATE TRIGGER add_to_deleted_projects
AFTER DELETE ON "Projects" 
FOR EACH ROW
EXECUTE PROCEDURE addToDeletedProjects();
