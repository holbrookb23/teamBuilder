const Manager = require('../lib/manager');

describe("Manager", () => {
    it("should return an extended employee with an Office Number", () => {
        const manager= new Manager("John", 56, "john@gmail.com", 2);
        expect(manager.officeNumber).toBe(2);
    });
});