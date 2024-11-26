"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(name, position, nationality, club, rating, photo, logo, pace, shooting, passing, dribbling, defending, physical) {
        this.name = name;
        this.position = position;
        this.nationality = nationality;
        this.club = club;
        this.photo = photo;
        this.logo = logo;
        this.pace = pace;
        this.shooting = shooting;
        this.passing = passing;
        this.dribbling = dribbling;
        this.defending = defending;
        this.physical = physical;
        this._rating = rating; // geter and setter
    }
    get rating() {
        return this._rating;
    }
    set rating(value) {
        if (value < 0 || value > 100) {
            throw new Error("Rating must be between 0 and 100");
        }
        this._rating = value;
    }
    get flag() {
        return `https://cdn.sofifa.net/flags/${this.nationality.toLowerCase()}.png`;
    }
}
exports.default = Player;
