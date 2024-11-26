interface PlayerInterface {
     name: string;
     position: string;
     nationality: string;
     club: string;
     rating: number; 

     // optionel
     photo?: string;
     flag?: string;// Flag as a getter method
     logo?:string,
     pace? : number,
     shooting? : number,
     passing? : number,
     dribbling? : number,
     defending? : number,
     physical? : number,
   }
   
   class Player implements PlayerInterface {
     name: string;
     position: string;
     nationality: string;
     club: string;
     private _rating: number;

     // optionel
     photo?: string;
     logo?: string;
     pace?: number;
     shooting?: number;
     passing?: number;
     dribbling?: number;
     defending?: number;
     physical?: number;
   
     constructor(
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
       this._rating = rating;// geter and setter
     }
   
     get rating(): number {
       return this._rating;
     }
   
     set rating(value: number) {
       if (value < 0 || value > 100) {
         throw new Error("Rating must be between 0 and 100");
       }
       this._rating = value;
     }
   
     get flag(): string {
          return `https://cdn.sofifa.net/flags/${this.nationality.toLowerCase()}.png`;
        }
   }

export default Player
 