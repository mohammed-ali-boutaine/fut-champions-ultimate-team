interface PlayerInterface {
  id: number;
  name: string;
  position: string;
  nationality: string;
  club: string;
  rating: number;

  // optional properties
  photo?: string;
  flag?: string; 
  logo?: string;
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physical?: number;
}

class Player implements PlayerInterface {
  id: number;
  name: string;
  position: string;
  nationality: string;
  club: string;
  private _rating: number;

  // optional properties
  photo?: string;
  logo?: string;
  flag?: string ;
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physical?: number;

  constructor(
    id: number,
    name: string,
    position: string,
    nationality: string,
    club: string,
    rating: number,
    photo?: string,
    logo?: string,
    pace?: number,
    shooting?: number,
    passing?: number,
    dribbling?: number,
    defending?: number,
    physical?: number
  ) {
    this.id = id;
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
    this._rating = rating; // Use getter and setter for rating
  }

  // Getter for rating
  get rating(): number {
    return this._rating;
  }

  // Setter for rating with validation
  set rating(value: number) {
    if (value < 0 || value > 100) {
      throw new Error("Rating must be between 0 and 100");
    }
    this._rating = value;
  }

}

export default Player;