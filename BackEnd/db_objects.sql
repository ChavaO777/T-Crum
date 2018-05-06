####################################
#############  VIEW   ##############
####################################
CREATE VIEW membersForProjects AS
	SELECT m.name p.name




####################################
#########  CONSTRAINTS   ###########
####################################

##Checks that the id to insert has a length of 9, and the first letter is lowercase
ALTER TABLE "Members" 
	ADD CONSTRAINT "id" check (length("id") = 9 AND SUBSTRING ("id" FROM 1 FOR 1) = LOWER(SUBSTRING ("id" FROM 1 FOR 1)));


##NOTE: <grant root_user to db_user> is required to alter a table created by sequelize with db_user credentials