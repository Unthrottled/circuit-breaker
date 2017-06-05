"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var heroes = [
            { id: 11, name: 'Mr. Cool' },
            { id: 12, name: 'Elliot' },
            { id: 13, name: 'Brandon' },
            { id: 14, name: 'Jimbo' },
            { id: 15, name: 'Mr. Higgs' },
            { id: 16, name: 'Xavier' },
            { id: 17, name: 'Elmer' },
            { id: 18, name: 'Ms. P' },
            { id: 19, name: 'Dan' },
            { id: 20, name: 'Potatahs' }
        ];
        return { heroes: heroes };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map