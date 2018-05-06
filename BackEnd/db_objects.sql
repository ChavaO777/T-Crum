/*Function: Counts the number of projects a user is in*/
CREATE OR REPLACE FUNCTION countProjects (id_input varchar)
RETURNS integer AS $totalProjects$
declare 
    totalProjects integer;
BEGIN
    SELECT count(project_id) into totalProjects FROM "Member_projects" WHERE member_id = id_input;
    RETURN totalProjects;
END;
$totalProjects$ LANGUAGE plpgsql;
/*End function*/

