const Employee = require('../lib/employee');

describe("Employee", () => {
    it("should be an object", () => {
        const employee = new Employee();

        expect(typeof employee).toBe("object");
    });

    it("should return an object with employee name, id, and email ", () => {
        const employee = new Employee("John", 56, "john@gmail.com");
        expect(employee.name).toBe("John");
    });
});