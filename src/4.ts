class Key {
  private signature: number = Math.floor(Math.random() * 5) + 1;

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  public door: boolean = false;
  public tenants: Person[] = [];

  constructor(protected key: Key) {}

  abstract openDoor(key: Key): void;

  comeIn(person: Person): void {
    const { door, tenants } = this;

    door && tenants.push(person);
  }
}

class MyHouse extends House {
  openDoor(key: Key): void {
    console.log("key", key);
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("door opened");
    } else {
      this.door = false;
      console.log("wrong key");
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

console.log(house.door);
console.log("key:", key);

export {};
