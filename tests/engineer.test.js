const Engineer = require('../lib/engineer');

describe("Engineer", () => {
    it("should return an extended employee with a github", () => {
        const engineer = new Engineer("John", 56, "john@gmail.com", "johniscool");
        expect(engineer.github).toBe("johniscool");
    });
});