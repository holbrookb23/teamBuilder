const Intern = require('../lib/intern');

describe("Intern", () => {
    it("should return an extended employee with a School Name", () => {
        const intern= new Intern("John", 56, "john@gmail.com", "Doof Universery");
        expect(intern.school).toBe("Doof Universery");
    });
});