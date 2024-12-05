interface PlayerInterface {
  id: number;
  name: string;
  position: string;
  nationality: string;
  club: string;

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
  rating: number;
  // optional properties
  photo?: string;
  logo?: string;
  flag?: string;
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
    this.rating = rating;
  }

  // // Getter for rating
  // get getRating(): number {
  //   return this.rating;
  // }

  // // Setter for rating with validation
  // set setRating(value: number) {
  //   if (value < 0 || value > 100) {
  //     throw new Error("Rating must be between 0 and 100");
  //   }
  //   this.rating = value;
  // }
}

export default Player;
