/**
 * Class to implement the required validations for the project.
 */

class Validation {

    /**
     * Function that validates that a user id is valid
     * @param userId the user id to validate
     * @returns True, if the user id is valid. Else, false.
     */
    static isAValidMemberId(userId){
    
        var userIdStr = String(userId).toLowerCase();
        var userIdStrSize = userIdStr.length;
        var userIdFirstChar = userIdStr.charAt(0);
    
        //All student or professor ids have 9 characters and start with 'A' or 'L'
        return userIdStrSize == 9 && (userIdFirstChar == 'a' || userIdFirstChar == 'l');
    }

    /**
     * Function that validates that a given department_major value
     * exists in the corresponding enum.
     * 
     * @param department_major the value to validate
     * @returns True, if the value exists in the enum. Else, false.
     */
    static isAValidDepartment_Major(department_major){

        //TODO: implement this function to validate against the department_major enum
        return true;
    }
}